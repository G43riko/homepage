import { AppConfig } from "../../app.config";

export class Paginator<T = any> {
    private static readonly _itemsPerPage = AppConfig.ITEMS_PER_PAGE;
    private _actList: T[];
    private readonly _lastPage: number;

    public constructor(private readonly allItems: T[]) {
        this._lastPage = allItems ? Math.floor(allItems.length / Paginator._itemsPerPage) : 0;
        this._actList  = this._reCalcList();
    }

    private _actualPage = 0;

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

    public getList(): T[] {
        return this._actList;
    }

    public nextPage(): T[] {
        if (this._actualPage < this._lastPage) {
            this._actualPage++;
            return this._reCalcList();
        }
        return this.getList();
    }

    public setPage(page: number): T[] {
        if (page >= 0 && page <= this._lastPage) {
            this._actualPage = page;
            return this._reCalcList();
        }
        return this.getList();
    }

    public previousPage(): T[] {
        if (this._actualPage > 0) {
            this._actualPage--;
            return this._reCalcList();
        }
        return this.getList();
    }

    public firstPage(): T[] {
        this._actualPage = 0;
        return this._reCalcList();
    }

    public lastPage(): T[] {
        this._actualPage = this._lastPage;
        return this._reCalcList();
    }

    private _reCalcList(): T[] {
        const start = this._actualPage * Paginator._itemsPerPage;
        this._actList = this.allItems ? this.allItems.slice(start, start + Paginator._itemsPerPage) : [];
        return this._actList;
    }
}
