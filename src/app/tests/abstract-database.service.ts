import { Observable } from "rxjs";
import { AnnotatedPaginateModel } from "./models/annotated-paginate.model";

export abstract class AbstractDatabaseService<T> {
    public abstract create(object: T): Observable<T>;

    public abstract getList(paginate?: AnnotatedPaginateModel): Observable<T[]>;

    public abstract search(key: string, paginate?: AnnotatedPaginateModel): Observable<T[]>;

    public abstract getCount(): Observable<number>;

    public abstract clear(): Observable<any>;

    public abstract getDetail(id: string): Observable<T | null>;

    public abstract delete(id: string): Observable<T | null>;

    public abstract update(id: string, object: T): Observable<T | null>;
}
