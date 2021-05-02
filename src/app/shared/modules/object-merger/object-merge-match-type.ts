export enum ObjectMergeMatchType {
    /**
     * If some properties were merged
     */
    PARTIALLY_MERGED     = "PARTIALLY_MERGED",
    MISS_TYPE            = "MISS_TYPE",
    /**
     * When all properties from array are unresolved or primitive values has diff
     */
    UNRESOLVED           = "UNRESOLVED",
    INDENT_DIFF          = "INDENT_DIFF",
    TYPE_AND_INDENT_DIFF = "TYPE_AND_INDENT_DIFF",

    /**
     * When external function is used to object-merger
     */
    MERGED_EXTERNALLY = "MERGED_EXTERNALLY",

    /**
     * ValueA was used
     */
    VALUE_A              = "VALUE_A",

    /**
     * ValueB was used
     */
    VALUE_B              = "VALUE_B",

    /**
     * If all properties were merged
     */
    FULLY_MERGED         = "FULLY_MERGED",
    EQUALS               = "EQUALS",
}
