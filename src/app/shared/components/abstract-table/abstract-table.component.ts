import {SelectionModel} from "@angular/cdk/collections";
import {AfterViewInit, Component, EventEmitter, Input, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {MatPaginator, MatSort, Sort} from "@angular/material";
import {merge, Observable, of} from "rxjs";
import {catchError, delay, map, startWith, switchMap} from "rxjs/operators";
import {ColumnConfig} from "./column-config";
import {TableConfig} from "./table-config";

@Component({
    selector: "app-abstract-table",
    templateUrl: "./abstract-table.component.html",
    styleUrls: ["./abstract-table.component.scss"],
})
export class AbstractTableComponent<T = any> implements OnInit, AfterViewInit {
    public readonly selection = new SelectionModel<T>(true, []);

    @ViewChild(MatPaginator, {static: false}) public paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) public sort: MatSort;
    @Input() public tableConfig: TableConfig;
    @Input() public data: Observable<T[]> | T[];
    @Input() public templates: { [key: string]: TemplateRef<any> } = {};
    public realData: T[] = [];
    public resultsLength = 0;
    public isLoadingResults = true;

    public constructor() {
    }

    public get pageSize(): number {
        return this.tableConfig.pageSize || 10;
    }

    public get pageSizeOptions(): number[] {
        return this.tableConfig.paginateOptions || [5, 10, 20];
    }

    public get visibleColumns(): ColumnConfig[] {
        return this.tableConfig.columns.filter((column) => column.visible !== false);
    }

    private paginateData(data: T[], paginator: MatPaginator): T[] {
        return data.splice(paginator.pageSize * paginator.pageIndex, paginator.pageSize);
    }

    private sortData(data: any[], sort: Sort): any[] {
        if (!sort.active || !sort.direction) {
            return data;
        }

        if (sort.direction === "desc") {
            return data.sort((b, a) => String(b[sort.active]).localeCompare(String(a[sort.active])));
        }
        return data.sort((a, b) => String(b[sort.active]).localeCompare(String(a[sort.active])));
    }

    private transformData(data: any[]): any[] {
        return this.paginateData(this.sortData([...data], this.sort), this.paginator);
    }

    public ngAfterViewInit(): void {
        const observables: EventEmitter<any>[] = [];

        if (this.tableConfig.columns.some((column) => Boolean(column.sort))) {
            this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
            observables.push(this.sort.sortChange);
        }

        if (this.tableConfig.paginator) {
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
                        data: this.transformData(this.data),
                        totalLength: this.data.length,
                    }).pipe(delay(100));
                }
                return this.data.pipe(map((data) => ({
                        data: this.transformData(data),
                        totalLength: data.length,
                    }
                )));
            }),
            map((data: { data: T[], totalLength: number }) => {
                this.isLoadingResults = false;
                this.resultsLength = data.totalLength;

                return data.data;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                return of([]);
            }),
        ).subscribe((data) => this.realData = data);
    }

    public ngOnInit(): void {
    }

    public get displayedColumns(): string[] {
        const columnsNames = this.visibleColumns.map((column) => column.name);
        if (this.tableConfig.selection) {
            return ["select", ...columnsNames];
        }
        return columnsNames;
    }

    public getLabel(columnConfig: ColumnConfig, row: T): string {
        if (typeof columnConfig.customLabel === "function") {
            return columnConfig.customLabel(row);
        }
        return columnConfig.label || "";
    }

    public getContent(columnConfig: ColumnConfig, row: any): string {
        if (typeof columnConfig.customContent === "function") {
            return columnConfig.customContent(row);
        }

        return row[columnConfig.name];
    }

    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.realData.length;
        return numSelected === numRows;
    }

    public masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.selection.select(...this.realData);
    }

    public checkboxLabel(row?: T): string {
        if (!row) {
            return `${this.isAllSelected() ? "select" : "deselect"} all`;
        }
        return `${this.selection.isSelected(row) ? "deselect" : "select"} row`;
    }
}
