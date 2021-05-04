import {SelectionModel} from "@angular/cdk/collections";
import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {merge, Observable, of, Subject} from "rxjs";
import {first, map, shareReplay, startWith} from "rxjs/operators";
import {AbstractTableColumnTemplateComponent} from "./abstract-table-column-template.component";
import {ColumnConfig} from "./column-config";
import {TableConfig} from "./table-config";

@Component({
    selector: "app-abstract-table",
    templateUrl: "./abstract-table.component.html",
    styleUrls: ["./abstract-table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbstractTableComponent<T = unknown> {
    public readonly selection = new SelectionModel<T>(true, []);
    public readonly dataSource = new MatTableDataSource<T>([]);
    private readonly dataChangeSource$ = new Subject();

    @Output("rowClick")
    public readonly rowClick = new EventEmitter<T>();

    public readonly columnTemplates: { [name in string]: TemplateRef<unknown> } = {};

    @ContentChildren(AbstractTableColumnTemplateComponent)
    private set setColumnTemplates(data: QueryList<AbstractTableColumnTemplateComponent>) {
        data.forEach((item) => {
            this.columnTemplates[item.name] = item.template;
        });
    }

    @ViewChild(MatPaginator)
    public set paginator(paginator: MatPaginator) {
        this.dataSource.paginator = paginator;
        this.dataChangeSource$.next();
    }

    @ViewChild(MatSort)
    public set sort(sort: MatSort) {
        this.dataSource.sort = sort;
        this.dataChangeSource$.next();
    }

    @Input()
    public set data(data: T[]) {
        this.dataSource.data = data ?? [];
        this.dataChangeSource$.next();
    }

    public readonly isAllSelected$ = merge(this.dataChangeSource$, this.selection.changed).pipe(
        startWith(null),
        map(() => this.dataSource.data.length === this.selection.selected.length),
        shareReplay(1),
    );


    @Input() public tableConfig: TableConfig;


    @Input() public templates: { [key: string]: TemplateRef<unknown> } = {};

    public get pageSize(): number {
        return this.tableConfig.pageSize || 10;
    }

    public get pageSizeOptions(): number[] {
        if (!this.tableConfig || !this.tableConfig.paginateOptions) {
            return [5, 10, 20];
        }

        return this.tableConfig.paginateOptions;
    }

    public get visibleColumns(): ColumnConfig<unknown>[] {
        if (!this.tableConfig) {
            return [];
        }

        return this.tableConfig.columns.filter((column) => column.visible !== false);
    }


    public get displayedColumns(): string[] {
        if (!this.tableConfig) {
            return [];
        }
        const columnsNames = this.visibleColumns.map((column) => column.name);
        if (this.tableConfig.selection) {
            return ["select", ...columnsNames];
        }

        return columnsNames;
    }

    public getLabel(columnConfig: ColumnConfig<T>, row: T): Observable<string> {
        if (typeof columnConfig.customLabel === "function") {
            throw new Error("'customLabel' is no implemented");
        }
        if (columnConfig.label$) {
            return columnConfig.label$;
        }

        return of(columnConfig.label || "");
    }

    public getContent(columnConfig: ColumnConfig<T>, row: T): string {
        if (typeof columnConfig.customContent === "function") {
            return columnConfig.customContent(row);
        }

        return (row as any)[columnConfig.name];
    }

    public masterToggle(): void {
        this.isAllSelected$.pipe(
            first()
        ).subscribe((isAllSelected) => {
            isAllSelected ? this.selection.clear() :
                this.selection.select(...this.dataSource.data);
        });
    }

    public onRowClick(row: T): void {
        this.rowClick.next(row);
    }
}
