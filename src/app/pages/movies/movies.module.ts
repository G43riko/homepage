import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { SharedDirectivesModule } from "../../shared/directives/shared-directives.module";
import { SharedPipesModule } from "../../shared/pipes/shared-pipes.module";
import { MakerDetailComponent } from "./components/maker-detail/maker-detail.component";
import { MovieMakersComponent } from "./components/movie-makers.component";
import { ExternalMakerDirective } from "./directives/external-maker.directive";
import { ExternalMovieDirective } from "./directives/external-movie.directive";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { MovieFilterPipe } from "./pipes/movie-filter.pipe";

@NgModule({
    imports: [
        CommonModule,
        SharedPipesModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        SharedDirectivesModule,
        FormsModule,
        SharedPipesModule,
        RouterModule,
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
