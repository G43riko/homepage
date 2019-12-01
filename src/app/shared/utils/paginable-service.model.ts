import {Observable} from "rxjs";

export interface PaginatorService<T> {
    getList(count: number, offset: number, key?: string): Observable<T[]>;

    getCount(): Observable<number>;
}
