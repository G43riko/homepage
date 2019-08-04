import {ColumnConfig} from "./column-config";

export interface TableConfig {
    pageSize?: number;
    columns: ColumnConfig[];
    paginateOptions?: number[];
    paginator?: boolean;
    stickyHeader?: boolean;
    selection?: "" | "single" | "multi";
    selectOptions?: {
        icon?: string;
        label?: string;
        action: (selected: any[]) => void;
    }[];
}
