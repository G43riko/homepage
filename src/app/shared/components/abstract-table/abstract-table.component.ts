import { SelectionModel } from "@angular/cdk/collections";
import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { merge, Observable, of } from "rxjs";
import { catchError, delay, map, startWith, switchMap, tap } from "rxjs/operators";
import { ColumnConfig } from "./column-config";
import { TableConfig } from "./table-config";

@Component({
    selector   : "app-abstract-table",
    templateUrl: "./abstract-table.component.html",
    styleUrls  : ["./abstract-table.component.scss"]
})
export class AbstractTableComponent<T = any> implements OnInit {
    public readonly selection = new SelectionModel<T>(true, []);

    @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) public sort: MatSort;
    @Input() public tableConfig: TableConfig;
    @Input() public data: Observable<T[]> | T[];
    @Input() public templates: { [key: string]: TemplateRef<any> } = {};
    public realData: T[]                                           = [];
    public resultsLength                                           = 0;
    public isLoadingResults                                        = true;

    public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    }

    public get pageSize(): number {
        return this.tableConfig.pageSize || 10;
    }

    public get pageSizeOptions(): number[] {
        if (!this.tableConfig || !this.tableConfig.paginateOptions) {
            return [5, 10, 20];
        }

        return this.tableConfig.paginateOptions;
    }

    public get visibleColumns(): ColumnConfig[] {
        if (!this.tableConfig) {
            return [];
        }

        return this.tableConfig.columns.filter((column) => column.visible !== false);
    }

    private paginateData(data: T[], paginator: MatPaginator): T[] {
        if (!paginator) {
            return data;
        }
        return data.splice(paginator.pageSize * paginator.pageIndex, paginator.pageSize);
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

    public ngOnInit(): void {
        if (!this.tableConfig) {
            return;
        }
        const observables: Observable<any>[] = [of(null as any)];

        if (this.sort && this.tableConfig.columns.some((column) => Boolean(column.sort))) {
            this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
            observables.push(this.sort.sortChange);
        }

        if (this.paginator && this.tableConfig.paginator) {
            observables.push(this.paginator.page);
        }

        merge(...observables).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;

                if (!this.data) {
                    return of({data: [], totalLength: 0});
                }
                if (Array.isArray(this.data)) {
                    return of({
                        data       : this.transformData(this.data),
                        totalLength: this.data.length
                    }).pipe(delay(100));
                }

                return this.data.pipe(
                    map((data) => ({
                            data       : this.transformData(data),
                            totalLength: data.length
                        }),
                        tap(() => this.changeDetectorRef.detectChanges())
                    ));
            }),
            map((data: { data: T[]; totalLength: number }) => {
                this.resultsLength = data.totalLength;
                this.isLoadingResults = false;

                return data.data;
            }),
            catchError((error) => {
                this.isLoadingResults = false;
                console.error(error);

                return of([]);
            })
        ).subscribe((data) => this.realData = data);
    }

    public getLabel(columnConfig: ColumnConfig, row: T): string {
        if (typeof columnConfig.customLabel === "function") {
            throw new Error("'customLabel' is no implemented");
        }

        return columnConfig.label || "";
    }


    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows     = this.realData.length;

        return numSelected === numRows;
    }

    public checkboxLabel(row?: T): string {
        if (!row) {
            return `${this.isAllSelected() ? "select" : "deselect"} all`;
        }

        return `${this.selection.isSelected(row) ? "deselect" : "select"} row`;
    }

    public getContent(columnConfig: ColumnConfig, row: any): string {
        if (typeof columnConfig.customContent === "function") {
            return columnConfig.customContent(row);
        }

        return row[columnConfig.name];
    }

    private sortData(data: any[], sort: Sort): any[] {
        if (!sort || !sort.active || !sort.direction) {
            return data;
        }

        if (sort.direction === "desc") {
            return data.sort((b, a) => String(b[sort.active]).localeCompare(String(a[sort.active])));
        }

        return data.sort((a, b) => String(b[sort.active]).localeCompare(String(a[sort.active])));
    }

    public masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.selection.select(...this.realData);
    }

    private transformData(data: any[]): any[] {
        const result = this.sortData([...data], this.sort);
        if (this.tableConfig.paginator) {
            return this.paginateData(result, this.paginator);
        }

        return result;
    }
}
