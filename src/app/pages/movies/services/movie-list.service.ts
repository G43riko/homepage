import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ApiPaginator} from "../../../shared/utils/ApiPaginator";
import {MovieHttpService} from "./movie-http.service";

@Injectable()
export class MovieListService {
    private readonly previewTypeSource$ = new BehaviorSubject<"table" | "grid">("table");
    public readonly previewType$ = this.previewTypeSource$.asObservable();

    private readonly paginator = new ApiPaginator(this.movieHttpService, {pageSize: 10});

    public readonly movieList$ = this.paginator.list$;


    public constructor(
        private readonly movieHttpService: MovieHttpService
    ) {
    }

    public ngOnDestroy(): void {
        this.paginator.cleanUp();
    }

    public loadNext(count?: number): void {
        this.paginator.loadNext(count);
    }

    public setPreviewType(type: "table" | "grid"): void {
        this.previewTypeSource$.next(type);
        this.paginator.firstPage();
    }

    public searchPatternChange(value: string): void {
        this.paginator.search(value);
    }
}
