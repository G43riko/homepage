import { createFilledArray, deepEqual } from "gtools/utils";
import { ObjectMergeDefinitions } from "./object-merge-definitions";
import { ObjectMergeMatchType } from "./object-merge-match-type";

export interface ObjectMergerResult<T> {
    readonly mergedResult?: T;
    readonly arrayResult?: readonly ObjectMergerResult<any>[];
    readonly arrayResult2?: readonly ObjectMergerResult<T extends (infer R)[] ? R : T>[];
    readonly objectResult?: {
        readonly [key in keyof T]: ObjectMergerResult<key>
    };
    readonly matchType: ObjectMergeMatchType;
    readonly valueA: T;
    readonly valueB: T;
    readonly indexA?: number;
    readonly indexB?: number;
}

function isNil(value: any): boolean {
    return typeof value === "undefined" || value === null;
}

function findArrayDiff<T>(arrA: T[], arrB: T[], comparator: (a: T, b: T) => number): { same: [T, T][], missingInA: T[], missingInB: T[] };
function findArrayDiff<T>(arrA: T[], arrB: T[], comparator: (a: T, b: T) => number, merger: (a: T, b: T) => T): { same: T[], missingInA: T[], missingInB: T[] };
function findArrayDiff<T>(arrA: T[], arrB: T[], comparator: (a: T, b: T) => number, merger?: (a: T, b: T) => T): { same: (T | [T, T])[], missingInA: T[], missingInB: T[] } {
    const sortedArrayA = [...arrA].sort(comparator);
    const sortedArrayB = [...arrB].sort(comparator);

    const same: (T | [T, T])[] = [];
    const missingInA: T[]      = [];
    const missingInB: T[]      = [];
    let i                      = 0;
    let j                      = 0;
    while (i < sortedArrayA.length || j < sortedArrayB.length) {
        if (i === sortedArrayA.length) {
            missingInA.push(sortedArrayB[j]);
            j++;
            continue;
        }
        if (j === sortedArrayB.length) {
            missingInB.push(sortedArrayA[i]);
            i++;
            continue;
        }
        const comparatorResult = comparator(sortedArrayA[i], sortedArrayB[j]);
        if (comparatorResult === 0) {
            same.push(merger ? merger(sortedArrayA[i], sortedArrayB[j]) : [sortedArrayA[i], sortedArrayB[i]]);
            i++;
            j++;
        } else if (comparatorResult < 0) {
            missingInB.push(sortedArrayA[i]);
            i++;
        } else if (comparatorResult > 0) {
            missingInA.push(sortedArrayB[j]);
            j++;
        }
    }

    return {same, missingInA, missingInB};
}

export class ObjectMerger {
    private static mergeArrayWithComparatorMerger<T>(
        valueA: T[],
        valueB: T[],
        comparator: (a: T, b: T) => number,
        merger: (a: T, b: T) => T,
        parent?: string,
    ): ObjectMergerResult<T[]> {
        const diff = findArrayDiff(valueA, valueB, comparator, merger);

        // all array values are same
        if (!diff.missingInA.length && !diff.missingInB.length) {
            return {
                valueA,
                valueB,
                matchType   : ObjectMergeMatchType.EQUALS,
                mergedResult: diff.same,
                arrayResult : diff.same.map((value, index) => {
                    return {
                        matchType   : ObjectMergeMatchType.EQUALS,
                        // parent      : parent + "." + index,
                        // key         : String(index),
                        valueA      : value,
                        valueB      : value,
                        mergedResult: value,
                    } as ObjectMergerResult<any>;
                }),
            };
        }

        const mergedResult = [
            ...diff.missingInB.map((value) => ({value, type: ObjectMergeMatchType.VALUE_A})),
            ...diff.same.map((value) => ({value, type: ObjectMergeMatchType.MERGED_EXTERNALLY})),
            ...diff.missingInA.map((value) => ({value, type: ObjectMergeMatchType.VALUE_B})),
        ].sort((a, b) => comparator(a.value, b.value));

        return {
            valueA,
            valueB,
            matchType   : ObjectMergeMatchType.FULLY_MERGED,
            mergedResult: mergedResult.map((e) => e.value),
            arrayResult : mergedResult.map((e) => ({
                valueA      : e.type === ObjectMergeMatchType.VALUE_B ? undefined : e.value,
                valueB      : e.type === ObjectMergeMatchType.VALUE_A ? undefined : e.value,
                mergedResult: e.value,
                matchType   : e.type,
            })),
        };
    }

    private static mergeArrayWithComparator<T>(valueA: T[], valueB: T[], config: ObjectMergeDefinitions<T>, parent?: string): ObjectMergerResult<T[]> {

        const nonMergedDiff = findArrayDiff(valueA, valueB, config.comparator!);

        console.error("nonMergedDiff", nonMergedDiff);
        const arrayResult: ObjectMergerResult<unknown>["arrayResult"] = [
            ...nonMergedDiff.missingInB.map((valA) => ({
                valueA      : valA,
                valueB      : undefined,
                matchType   : ObjectMergeMatchType.VALUE_A,
                mergedResult: valA,
            })),
            ...nonMergedDiff.same.map(([valA, valB], index) => ObjectMerger.mergeProperty(valA, valB, config, parent ? `${parent}.${index}` : String(index))),
            ...nonMergedDiff.missingInA.map((valB) => ({
                valueB      : valB,
                valueA      : undefined,
                matchType   : ObjectMergeMatchType.VALUE_B,
                mergedResult: valB,
            })),
        ].sort((a, b) => config.comparator!(a.mergedResult!, b.mergedResult!));

        return {
            arrayResult,
            valueA,
            valueB,
            mergedResult: arrayResult.map((e) => e.mergedResult),
            matchType   : ObjectMerger.getTypeFromResults(arrayResult),
        };
    }

    public static mergeArray<T>(valueA: T[], valueB: T[], config: ObjectMergeDefinitions<T>, parent?: string): ObjectMergerResult<T[]> {
        if (!valueA.length && !valueB.length) {
            return {
                valueA,
                valueB,
                matchType   : ObjectMergeMatchType.EQUALS,
                mergedResult: [],
                arrayResult : [],
            };
        }

        if (config.comparator) {
            if (config.merger) {
                return ObjectMerger.mergeArrayWithComparatorMerger(valueA, valueB, config.comparator, config.merger, parent);
            }

            return ObjectMerger.mergeArrayWithComparator(valueA, valueB, config, parent);
        }

        const max = Math.max(valueA.length, valueB.length);

        const arrayResult = createFilledArray<ObjectMergerResult<any>>(
            max,
            // @ts-ignore
            (i: any) => ObjectMerger.mergeProperty(valueA[i], valueB[i], config, parent ? parent + "." + i : String(i)),
        );

        return {
            valueA,
            valueB,
            arrayResult,
            mergedResult: arrayResult.map((r) => r.mergedResult),
            matchType   : ObjectMerger.getTypeFromResults(arrayResult),
        };
    }

    private static getTypeFromResults<T>(data: readonly ObjectMergerResult<T>[]): ObjectMergeMatchType {
        let resolved   = 0;
        let unresolved = 0;
        let equals = 0;

        data.forEach((result) => {
            if (result.matchType === ObjectMergeMatchType.UNRESOLVED) {
                unresolved++;
            } else {
                resolved++;
            }
            if (result.matchType === ObjectMergeMatchType.EQUALS) {
                equals++;
            }
        });

        console.assert(resolved + unresolved > 0, "Empty array should be caught earlier");

        if (equals === data.length) {
            return ObjectMergeMatchType.EQUALS;
        }

        if (resolved && unresolved) {
            return ObjectMergeMatchType.PARTIALLY_MERGED;
        }
        if (unresolved) {
            return ObjectMergeMatchType.UNRESOLVED;
        }

        return ObjectMergeMatchType.FULLY_MERGED;
    }

    public static mergeObject<T>(objA: Partial<T>, objB: Partial<T>, config: ObjectMergeDefinitions<T>, parent?: string): ObjectMergerResult<T> {
        const uniqueKeys = Array.from(new Set([...Object.keys(objA ?? {}), ...Object.keys(objB ?? {})] as (string & keyof T)[]));

        // TODO: What is objects are empty?
        //  what is one of objects is nill

        // if (uniqueKeys.length === 0) {
        //     return {
        //         valueA: objA,
        //         valueB: objB,
        //         mergedResult: {},
        //         matchType: ObjectMergeMatchType.EQUALS,
        //     }
        // }


        const globalMergeResult: Partial<T> = {};

        const objectResult = uniqueKeys.reduce((acc, key) => {
            const propertyConfig   = config.keys?.[key] ?? {};
            const result           = ObjectMerger.mergeProperty(objA[key], objB[key], propertyConfig, parent ? `${parent}.${key}` : key);
            globalMergeResult[key] = result.mergedResult ?? undefined;

            return Object.assign(acc, {[key]: result});
        }, {} as ObjectMergerResult<T>["objectResult"]);

        return {
            objectResult,
            valueA      : objA as T,
            valueB      : objB as T,
            mergedResult: globalMergeResult as T,
            matchType   : ObjectMerger.getTypeFromResults(Object.values(objectResult as any)),
        };
    }

    public static mergeProperty<T>(valueA: T, valueB: T, config: ObjectMergeDefinitions<T>, parent?: string): ObjectMergerResult<T> {
        if (isNil(valueA) || isNil(valueB)) {
            // null === null or undefined === undefined
            if (valueA === valueB) {
                return {
                    valueA,
                    valueB,
                    mergedResult: valueA,
                    matchType   : ObjectMergeMatchType.EQUALS,
                };
            }

            // null ==== undefined or undefined === null
            if (isNil(valueA) && isNil(valueB)) {
                return {
                    valueA,
                    valueB,
                    mergedResult: valueA,
                    matchType   : ObjectMergeMatchType.MISS_TYPE,
                };
            }

            // something - null | undefined
            if (isNil(valueB)) {
                return {
                    valueA,
                    valueB,
                    mergedResult: valueA,
                    matchType   : ObjectMergeMatchType.VALUE_A,
                };
            }
            // null | undefined === something

            return {
                valueA,
                valueB,
                mergedResult: valueB,
                matchType   : ObjectMergeMatchType.VALUE_B,
            };
        }

        if (deepEqual(valueA, valueB)) {
            return {
                valueA,
                valueB,
                mergedResult: config?.merger ? config.merger(valueA, valueB) : valueA,
                matchType   : ObjectMergeMatchType.EQUALS,
            };
        }

        if (Array.isArray(valueA) && Array.isArray(valueB)) {
            return ObjectMerger.mergeArray(valueA, valueB, config, parent) as any;
        }

        if (typeof valueA === "object" || typeof valueB === "object") {
            return ObjectMerger.mergeObject(valueA, valueB, config, parent);
        }

        const strA = String(valueA);
        const strB = String(valueB);

        // Check if string vales are equal
        if (strA === strB) {
            return {
                valueA,
                valueB,
                matchType   : ObjectMergeMatchType.MISS_TYPE,
                mergedResult: config.merger ? config.merger(valueA, valueB) : (config.keepTypes ? undefined : valueA),
            };
        }

        // Check if string trimmed values are equals
        if (strA.trim() === strB.trim()) {
            if (typeof valueA === typeof valueB) {
                return {
                    valueA,
                    valueB,
                    matchType   : ObjectMergeMatchType.INDENT_DIFF,
                    mergedResult: config.merger ? config.merger(valueA, valueB) : (config.keepIndent ? undefined : strA.trim() as any),
                };
            }

            return {
                valueA,
                valueB,
                matchType   : ObjectMergeMatchType.TYPE_AND_INDENT_DIFF,
                mergedResult: config.merger ? config.merger(valueA, valueB) : (config.keepIndent || config.keepTypes ? undefined : strA.trim() as any),
            };
        }

        if (!strA && strB) {
            return {
                valueA,
                valueB,
                matchType: ObjectMergeMatchType.VALUE_B,
                mergedResult: valueB,
            };
        }
        if (strA && !strB) {
            return {
                valueA,
                valueB,
                matchType: ObjectMergeMatchType.VALUE_A,
                mergedResult: valueA,
            };
        }

        return {
            valueA,
            valueB,
            matchType   : ObjectMergeMatchType.UNRESOLVED,
            mergedResult: config.merger ? config.merger(valueA, valueB) : undefined,
        };
    }
}
