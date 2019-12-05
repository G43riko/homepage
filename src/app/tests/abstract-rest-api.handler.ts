import {HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {AbstractFixture} from "./abstract.fixture";
import {AbstractDatabaseService} from "./abstract-database.service";
import {map} from "rxjs/operators";
import {HttpStatusCodes} from "gtools";

/**
 * TODO: allow process parameters like
 *  offset
 *  limit
 *  formatter
 */
export class AbstractRestApiHandler<T extends { id: number }> {
    public constructor(private readonly database: AbstractDatabaseService<T>, private readonly path: string, private urlMap = {
        list: (url: string) => url.indexOf(`/${this.path}`) >= 0,
        add: (url: string) => url.endsWith(`/${this.path}`),
        update: (url: string) => url.match(new RegExp(`/${this.path}/[1-9][0-9]?`)),
        delete: (url: string) => url.match(new RegExp(`/${this.path}/[1-9][0-9]?`)),
        count: (url: string) => url.endsWith(`/${this.path}/count`),
        detail: (url: string) => url.match(new RegExp(`/${this.path}/[1-9][0-9]?`)),
    }) {
    }

    public use(request: HttpRequest<T>): Observable<HttpResponse<T | T[] | number>> | null {
        // get count
        if (this.urlMap.count(request.url) && request.method === "GET") {
            return this.database.getCount().pipe(map((body) => new HttpResponse({status: 200, body})));
        }
        // get data by id
        if (this.urlMap.detail(request.url) && request.method === "GET") {
            const splitUrl = request.url.split("/");
            const id = splitUrl[splitUrl.length - 1];
            return this.database.getDetail(id).pipe(map((body) => new HttpResponse({status: 200, body})));
        }
        // get all data
        if (this.urlMap.list(request.url) && request.method === "GET") {
            return this.database.getList().pipe(map((body) => new HttpResponse({status: 200, body})));
        }

        // add new item
        if (this.urlMap.add(request.url) && request.method === "POST") {
            if (request.body) {
                return this.database.create(request.body).pipe(map(() => new HttpResponse({
                    status: 200,
                    body: request.body,
                })));
            }
            return throwError(new HttpResponse({status: HttpStatusCodes.BAD_REQUEST, body: "Body is missing"}));
        }

        // delete data by id
        if (this.urlMap.delete(request.url) && request.method === "DELETE") {
            const splitUrl = request.url.split("/");
            const id = splitUrl[splitUrl.length - 1];
            return this.database.delete(id).pipe(map((body) => new HttpResponse({status: 200, body})));
        }

        // update data by id
        if (this.urlMap.update(request.url) && request.method === "PUT") {
            const splitUrl = request.url.split("/");
            const id = splitUrl[splitUrl.length - 1];
            if (request.body) {
                return this.database.update(id, request.body).pipe(map((body) => new HttpResponse({
                    status: 200,
                    body
                })));
            }
            return throwError(new HttpResponse({status: HttpStatusCodes.BAD_REQUEST, body: "Body is missing"}));
        }

        return null;
    }
}
