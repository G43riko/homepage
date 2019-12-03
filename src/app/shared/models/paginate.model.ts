import {AppConfig} from "../../app.config";

export class PaginateModel {
    public limit: number;
    public offset: number;

    public constructor(count = AppConfig.ITEMS_PER_PAGE, offset = 0) {
        this.limit = +count;
        this.offset = +offset;
    }
    public static validate(paginate?: PaginateModel): PaginateModel {
        if (!paginate) {
            return new PaginateModel();
        }
        return new PaginateModel(
            isNaN(paginate.limit) ? AppConfig.ITEMS_PER_PAGE : paginate.limit,
            isNaN(paginate.offset) ? 0 : paginate.offset,
        );
    }
}
