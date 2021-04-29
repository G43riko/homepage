import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

interface ObjectMergeDefinitions<T> {
    readonly keys: { [key in keyof T]: MergeDefinitions<T[key]> };
}

interface ArrayMergeDefinitions<T> {
    comparator: (a: T, b: T) => number;
    mergeOptions: MergeDefinitions<T>;
}

type MergeDefinitions<T> = {
    [key in keyof T]: {
        readonly arrayOptions?: ArrayMergeDefinitions<unknown>;
        readonly objectOptions?: ObjectMergeDefinitions<unknown>
    }
};

interface RowMergeEntry<T> {
    valueA: T;
    valueB: T;
    matchType: string;
    parent?: string;
    typeA: string;
    typeB: string;
    mergedResult?: T;
    key: string;
}

@Component({
    selector       : "app-object-merge",
    templateUrl    : "./object-merge.component.html",
    styleUrls      : ["./object-merge.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectMergeComponent {
    public readonly data: RowMergeEntry<unknown>[] = [];
    @Input("objectA")
    public readonly objectA: any                   = {
        rating   : "PG-13",
        imdbId   : "tt1231654654",
        saw      : " true",
        wantSee  : false,
        year     : 2020,
        genres   : [],
        countries: ["USA", "CZ"],
        duration : 123,
        makers   : [
            {
                name: "MakerA",
            },
            {
                name: "MakerB",
            },
            {
                name: "MakerC",
            }
        ],
        content  : "     ABCD      ",
    };

    @Input("objectB")
    public readonly objectB: any = {
        rating   : "PG-13",
        year     : "2020",
        saw      : true,
        wantSee  : "false ",
        genres   : [],
        countries: ["UK", "CZ", "SK"],
        makers   : [
            {
                name: "MakerA",
            },
            {
                name: "MakerC",
            }
        ],
        MovieDbId: 153685486,
        duration : 123,
        content  : "ABCD",

    };

    private findArrayDiff<T>(
        arrA: T[],
        arrB: T[],
        comparator: (a: T, b: T) => number,
        merger?: (a: T, b: T) => T
    ): { same: T[], missingInA: T[], missingInB: T[] } {
        const sortedArrayA = [...arrA].sort(comparator);
        const sortedArrayB = [...arrB].sort(comparator);

        const same: T[]       = [];
        const missingInA: T[] = [];
        const missingInB: T[] = [];
        let i                 = 0;
        let j                 = 0;
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
                same.push(merger ? merger(sortedArrayA[i], sortedArrayB[j]) : sortedArrayA[i]);
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

    private mergeArrayProperty<T>(
        arrA: T[],
        arrB: T[],
        parent?: string,
        comparator?: (a: T, b: T) => number,
        merger?: (a: T, b: T) => T
    ): { mergedResult?: T[]; matchType: string; entries: RowMergeEntry<T>[]; } {
        if (!arrA.length && !arrB.length) {
            return {
                matchType   : "EQUALS",
                mergedResult: [],
                entries     : [],
            };
        }

        if (comparator) {
            const diff = this.findArrayDiff(arrA, arrB, comparator, merger);

            if (!diff.missingInA.length && !diff.missingInB.length) {
                return {
                    matchType   : "ARRAY_COMPARATOR_ARE_EQUALS",
                    mergedResult: diff.same,
                    entries     : diff.same.map((value, index) => {
                        return {
                            matchType   : "EQUALS",
                            parent      : parent + "." + index,
                            key         : String(index),
                            typeA       : undefined,
                            typeB       : undefined,
                            valueA      : undefined,
                            valueB      : undefined,
                            mergedResult: value,
                        } as any;
                    }),
                };
            }

            return {
                matchType   : "ARRAY_COMPARATOR_ARE_EQUALS",
                mergedResult: [],
                entries     : [],
            };
        }

        const max = Math.max(arrA.length, arrB.length);

        const entries: RowMergeEntry<T>[] = [];
        const mergedResult: (T)[]         = [];
        for (let i = 0; i < max; i++) {
            const result = this.mergeProperty(arrA[i], arrB[i]);

            mergedResult.push(result.mergedResult as T);

            entries.push({
                parent,
                key         : String(i),
                typeA       : typeof arrA[i],
                typeB       : typeof arrB[i],
                matchType   : result.matchType,
                mergedResult: result.mergedResult,
                valueA      : arrA[i],
                valueB      : arrB[i],
            });
        }

        return {
            entries,
            mergedResult,
            matchType: "ARRAY_EQUALS",
        };

    }

    private mergeProperty<T>(valueA: T, valueB: T, parent?: string): { mergedResult?: T, matchType: string } {
        // TODO: replace with deepEqual
        if (JSON.stringify(valueA) === JSON.stringify(valueB)) {
            return {
                mergedResult: valueA,
                matchType   : "EQUALS",
            };
        }

        if (Array.isArray(valueA) && Array.isArray(valueB)) {
            const result = this.mergeArrayProperty(valueA, valueB, parent);

            this.data.push(...result.entries);

            return {
                matchType   : result.matchType,
                mergedResult: result.mergedResult as any,
            };
        }


        const strA = String(valueA);
        const strB = String(valueB);

        // Check if string vales are equal
        if (strA === strB) {
            return {
                matchType   : `MISS TYPE`,
                mergedResult: undefined,
            };
        }

        // Check if string trimmed values are equals
        if (strA.trim() === strB.trim()) {
            if (typeof valueA === typeof valueB) {
                return {
                    matchType   : `INDENT_DIFF`,
                    mergedResult: undefined,
                };
            }

            return {
                matchType   : `TYPE_AND_INDENT_DIFF`,
                mergedResult: undefined,
            };
        }


        return {
            matchType   : "UNRESOLVED",
            mergedResult: undefined,
        };
    }

    private mergeObjectProperty<T>(objA: Partial<T>, objB: Partial<T>, parent?: string): { mergedResult?: T; matchType: string; entries: RowMergeEntry<unknown>[] } {
        const uniqueKeys = Array.from(new Set([...Object.keys(objA), ...Object.keys(objB)] as (string & keyof T)[]));

        const globalMergeResult: Partial<T> = {};
        let globalMatchType: any            = "EMPTY";
        const entries                       = uniqueKeys.map((key) => {
            let mergedResult: any;
            let matchType: string;
            if (objA[key] && objB[key]) {
                const result = this.mergeProperty(objA[key], objB[key], key);
                mergedResult = result.mergedResult;
                matchType    = result.matchType;
            } else {
                if (objA[key]) {
                    mergedResult = objA[key];
                    matchType    = "A_VALUE";
                } else if (objB[key]) {
                    mergedResult = objB[key];
                    matchType    = "B_VALUE";
                } else {
                    matchType = "EMPTY";
                }
            }
            globalMatchType = "TODO";

            return {
                key,
                mergedResult,
                matchType,
                valueA: objA[key],
                valueB: objB[key],
                typeA : typeof objA[key],
                typeB : typeof objB[key],
            };
        });

        return {
            entries,
            matchType   : globalMatchType,
            mergedResult: globalMergeResult as T,
        };
    }

    public constructor() {
        const mergeResult = this.mergeObjectProperty(this.objectA, this.objectB);

        this.data.push(...mergeResult.entries);

        // const uniqueKeys = Array.from(new Set([...Object.keys(this.objectA), ...Object.keys(this.objectB)]));
        //
        // uniqueKeys.forEach((key) => {
        //     let mergedResult: any;
        //     let matchType: string;
        //     if (this.objectA[key] && this.objectB[key]) {
        //         const result = this.mergeProperty(this.objectA[key], this.objectB[key], key);
        //         mergedResult = result.mergedResult;
        //         matchType    = result.matchType;
        //     } else {
        //         if (this.objectA[key]) {
        //             mergedResult = this.objectA[key];
        //             matchType    = "A_VALUE";
        //         } else if (this.objectB[key]) {
        //             mergedResult = this.objectB[key];
        //             matchType    = "B_VALUE";
        //         } else {
        //             matchType = "EMPTY";
        //         }
        //     }
        //
        //     this.data.push({
        //         key,
        //         mergedResult,
        //         matchType,
        //         valueA: this.objectA[key],
        //         valueB: this.objectB[key],
        //         typeA : typeof this.objectA[key],
        //         typeB : typeof this.objectB[key],
        //     });
        // });

    }

}
