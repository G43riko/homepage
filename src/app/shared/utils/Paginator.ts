import { AppStaticConfig } from "../../appStaticConfig";
import { AbstractPaginator } from "./AbstractPaginator";

export class Paginator<T = any> extends AbstractPaginator<T> {
    public constructor(private readonly allItems: T[],
                       _itemsPerPage = AppStaticConfig.ITEMS_PER_PAGE) {
        super(_itemsPerPage);
        this._lastPage = allItems ? Math.floor(allItems.length / this._itemsPerPage) : 0;
        this._reCalcList();
    }

    public remove(index: number): void {
        this.allItems.splice(index + this._actualPage * this._itemsPerPage, 1);

        return this._reCalcList();
    }

    protected _reCalcList(): void {
        const start = this._actualPage * this._itemsPerPage;
        this.list.next(this.allItems ? this.allItems.slice(start, start + this._itemsPerPage) : []);
    }
}
