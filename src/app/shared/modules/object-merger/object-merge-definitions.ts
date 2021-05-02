export interface ObjectMergeDefinitions<T, S = unknown> {
    readonly keepIndent?: boolean;
    readonly keepTypes?: boolean;
    readonly comparator?: (a: T, b: T) => number;
    readonly merger?: (a: T, b: T) => T;
    readonly keys?: {
        [key in keyof T]?: ObjectMergeDefinitions<T[key] extends (infer R)[] ? R : T[key]>;
    };
}
