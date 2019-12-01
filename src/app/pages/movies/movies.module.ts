import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {MakerDetailComponent} from "./components/maker-detail/maker-detail.component";
import {MakersListComponent} from "./components/makers-list/makers-list.component";
import {MovieDetailBasicInfoComponent} from "./components/movie-detail-basic-info/movie-detail-basic-info.component";
import {MovieDetailComponent} from "./components/movie-detail/movie-detail.component";
import {MovieListComponent} from "./components/movie-list/movie-list.component";
import {MoviePosterPreviewComponent} from "./components/movie-poster-preview/movie-poster-preview.component";
import {MovieSearchComponent} from "./components/movie-search/movie-search.component";
import {ExternalMakerDirective} from "./directives/external-maker.directive";
import {ExternalMovieDirective} from "./directives/external-movie.directive";
import {MovieHttpService} from "./movie-http.service";
import {MoviesRoutingModule} from "./movies-routes.module";
import {MovieFilterPipe} from "./pipes/movie-filter.pipe";

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        MoviesRoutingModule,
    ],
    providers: [
        MovieHttpService,
    ],
    declarations: [
        MovieListComponent,
        MovieSearchComponent,
        MakersListComponent,
        MovieFilterPipe,
        MoviePosterPreviewComponent,
        MovieDetailBasicInfoComponent,
        MakerDetailComponent,
        MovieDetailComponent,
        ExternalMakerDirective,
        ExternalMovieDirective,
    ],
})
export class MoviesModule {
}
