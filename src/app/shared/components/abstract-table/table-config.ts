import { ColumnConfig } from "./column-config";

export interface TableConfig<T = unknown> {
    pageSize?: number;
    columns: ColumnConfig<T>[];
    paginateOptions?: number[];
    paginator?: boolean;
    stickyHeader?: boolean;
    stickyStart?: number;
    stickyEnd?: number;
    selection?: "" | "single" | "multi";
    selectOptions?: {
        icon?: string;
        label?: string;
        action: (selected: any[]) => void;
    }[];
}
