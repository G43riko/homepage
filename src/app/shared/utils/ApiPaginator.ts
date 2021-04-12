import { Subject } from "rxjs";
import { debounceTime, first, take, takeUntil } from "rxjs/operators";
import { AppStaticConfig } from "../../appStaticConfig";
import { AbstractPaginator } from "./AbstractPaginator";
import { PaginatorService } from "./paginable-service.model";

export class ApiPaginator<T = any> extends AbstractPaginator<T> {
    private readonly killer$     = new Subject();
    private groupedItems         = 1;
    private searchKey            = "";
    private readonly searchByKey = new Subject();

    public constructor(private readonly service: PaginatorService<T>,
                       {
                           pageSize = AppStaticConfig.ITEMS_PER_PAGE,
                           debounce = 300
                       }) {
        super(pageSize);
        service.getCount().pipe(first()).subscribe((count) => {
            this._lastPage = Math.floor(count / this._itemsPerPage);
            this._count    = count;
            this._reCalcList();
        });
        this.searchByKey.pipe(
            debounceTime(debounce),
            takeUntil(this.killer$),
        ).subscribe(() => this._reCalcList());
    }

    public cleanUp(): void {
        this.killer$.next();
        this.killer$.complete();
    }

    public search(key: string): void {
        this.searchKey = key;
        this.searchByKey.next();
    }

    public loadNext(count = this._itemsPerPage): void {
        const start = (this._actualPage + this.groupedItems) * this._itemsPerPage;
        this.groupedItems++;
        this.service.getList(count, start, this.searchKey).pipe(take(1)).subscribe((data) => {
            this.listSource$.next(this.listSource$.value.concat(data));
        });
    }

    protected _reCalcList(): void {
        this.groupedItems = 1;
        const start       = this._actualPage * this._itemsPerPage;
        this.service.getList(this._itemsPerPage, start, this.searchKey).pipe(take(1)).subscribe((data) => {
            this.listSource$.next(data);
        });
    }
}
