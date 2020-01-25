import {BehaviorSubject} from "rxjs";
import {AppConfig} from "../../app.config";

export abstract class AbstractPaginator<T = any> {
    public list = new BehaviorSubject<T[]>([]);
    protected _lastPage = 0;
    protected _count = 0;

    protected constructor(protected readonly _itemsPerPage = AppConfig.ITEMS_PER_PAGE) {
    }

    protected _actualPage = 0;

    public get actualPage(): number {
        return this._actualPage + 1;
    }

    public get pages(): number {
        return this._lastPage + 1;
    }

    public get pagesAround(): number[] {
        if (this._actualPage < 2) {
            return [1, 2, 3, 4, 5];
        }
        if (this._actualPage > this._lastPage - 3) {
            return [this._lastPage - 3, this._lastPage - 2, this._lastPage - 1, this._lastPage, this._lastPage + 1];
        }

        return [this._actualPage - 1, this._actualPage, this._actualPage + 1, this._actualPage + 2, this._actualPage + 3];
    }

    public get length(): number {
        return this._count;
    }

    public nextPage(): void {
        if (this._actualPage < this._lastPage) {
            this._actualPage++;

            return this._reCalcList();
        }
    }

    public setPage(page: number): void {
        if (page >= 0 && page <= this._lastPage) {
            this._actualPage = page;

            return this._reCalcList();
        }
    }

    public previousPage(): void {
        if (this._actualPage > 0) {
            this._actualPage--;

            return this._reCalcList();
        }
    }

    public firstPage(): void {
        this._actualPage = 0;

        return this._reCalcList();
    }

    public lastPage(): void {
        this._actualPage = this._lastPage;

        return this._reCalcList();
    }

    protected abstract _reCalcList(): void;

}
