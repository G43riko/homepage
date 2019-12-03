import {Observable, of} from "rxjs";
import {PaginateModel} from "../shared/models/paginate.model";
import {AbstractDatabaseService} from "./abstract-database.service";
import {AbstractFixture} from "./abstract.fixture";

export class SimpleMemoryDatabaseService<T extends { id: any }> extends AbstractDatabaseService<T> {
    private readonly data: T[] = [];

    public constructor(fixture?: AbstractFixture<T>) {
        super();
        if (fixture) {
            this.data.push(...fixture.list);
        }
    }

    public create(restaurant: T): Observable<T> {
        restaurant.id = this.data.length + 1;
        this.data.push(restaurant);
        return of(restaurant);
    }

    public search(key: string, paginate?: PaginateModel): Observable<T[]> {
        return of([]);
    }

    public getList(paginate?: PaginateModel): Observable<T[]> {
        const validPaginator = PaginateModel.validate(paginate);
        return of(
            this.data
                .filter((e, i) => i >= validPaginator.offset)
                .filter((e, i) => i < validPaginator.limit),
        );
    }

    public getCount(): Observable<number> {
        return of(this.data.length);
    }

    public clear(): Observable<any> {
        this.data.splice(0, this.data.length);
        return of([]);
    }

    public getDetail(id: string): Observable<T | null> {
        return of(this.data.find((item) => item.id.toString() === id) || null);
    }

    public delete(id: string): Observable<T | null> {
        const index = this.data.findIndex((item) => item.id.toString() === id);
        if (index < 0) {
            return of(null);
        }
        return of(this.data.splice(index, 1)[0]);
    }

    public update(id: string, object: T): Observable<T | null> {
        const index = this.data.findIndex((item) => item.id.toString() === id);
        if (index < 0) {
            return of(null);
        }
        const oldObject = this.data[index];
        this.data[index] = object;
        return of(oldObject);
    }
}
