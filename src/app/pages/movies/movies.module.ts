import { NgModule } from "@angular/core";
import { CoreModule } from "../../shared/core.module";
import { SharedModule } from "../../shared/shared.module";
import { MakerDetailComponent } from "./components/maker-detail/maker-detail.component";
import { MovieMakersComponent } from "./components/movie-makers.component";
import { ExternalMakerDirective } from "./directives/external-maker.directive";
import { ExternalMovieDirective } from "./directives/external-movie.directive";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { MoviesRoutingModule } from "./movies-routes.module";
import { MovieFilterPipe } from "./pipes/movie-filter.pipe";

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        MoviesRoutingModule,
    ],
    declarations: [
        MovieListComponent,
        MovieSearchComponent,
        MovieMakersComponent,
        MovieFilterPipe,
        MakerDetailComponent,
        MovieDetailComponent,
        ExternalMakerDirective,
        ExternalMovieDirective,
    ],
})
export class MoviesModule {
}
