import {Subject} from "rxjs";
import {debounceTime, take} from "rxjs/operators";
import {AppConfig} from "../../app.config";
import {AbstractPaginator} from "./AbstractPaginator";
import {PaginatorService} from "./paginable-service.model";

export class ApiPaginator<T = any> extends AbstractPaginator<T> {
    private groupedItems = 1;
    private searchKey = "";
    private readonly searchByKey = new Subject();

    public constructor(private readonly service: PaginatorService<T>,
                       {
                           pageSize = AppConfig.ITEMS_PER_PAGE,
                           debounce = 300,
                       }) {
        super(pageSize);
        service.getCount().pipe(take(1)).subscribe((count) => {
            this._lastPage = Math.floor(count / this._itemsPerPage);
            this._count = count;
            this._reCalcList();
        });
        this.searchByKey.pipe(debounceTime(debounce)).subscribe(() => this._reCalcList());
    }

    public search(key: string): void {
        this.searchKey = key;
        this.searchByKey.next();
    }

    public loadNext(count = this._itemsPerPage): void {
        const start = (this._actualPage + this.groupedItems) * this._itemsPerPage;
        this.groupedItems++;
        this.service.getList(count, start, this.searchKey).pipe(take(1)).subscribe((data) => {
            this.list.next(this.list.value.concat(data));
        });
    }

    protected _reCalcList(): void {
        this.groupedItems = 1;
        const start = this._actualPage * this._itemsPerPage;
        this.service.getList(this._itemsPerPage, start, this.searchKey).pipe(take(1)).subscribe((data) => {
            this.list.next(data);
        });
    }
}
