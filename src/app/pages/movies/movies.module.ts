import { NgModule } from "@angular/core";
import { CoreModule } from "../../shared/core.module";
import { MaterialModule } from "../../shared/modules/material.module";
import { SharedModule } from "../../shared/shared.module";
import { CsfdUserDetailComponent } from "./components/csfd-user-detail/csfd-user-detail.component";
import { ExternalLinksComponent } from "./components/external-links/external-links.component";
import { MakerDetailComponent } from "./components/maker-detail/maker-detail.component";
import { MakerListComponent } from "./components/maker-list/maker-list.component";
import { MakerPreviewListComponent } from "./components/maker-preview-list/maker-preview-list.component";
import { MovieDetailAdminViewComponent } from "./components/movie-detail-admin-view/movie-detail-admin-view.component";
import { MovieDetailBasicInfoComponent } from "./components/movie-detail-basic-info/movie-detail-basic-info.component";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";
import { MoviePosterPreviewComponent } from "./components/movie-poster-preview/movie-poster-preview.component";
import { MovieSearchComponent } from "./components/movie-search/movie-search.component";
import { ExternalMakerDirective } from "./directives/external-maker.directive";
import { ExternalMovieDirective } from "./directives/external-movie.directive";
import { MoviesRoutingModule } from "./movies-routes.module";
import { MovieFilterPipe } from "./pipes/movie-filter.pipe";
import { ExternalMovieService } from "./services/external-movie.service";
import { MakerHttpService } from "./services/maker-http.service";
import { MovieHttpService } from "./services/movie-http.service";
import { MovieService } from "./services/movie.service";

@NgModule({
    imports     : [
        CoreModule,
        SharedModule,
        MoviesRoutingModule,
        MaterialModule,
    ],
    providers   : [
        MovieHttpService,
        ExternalMovieService,
        MovieService,
        MakerHttpService
    ],
    declarations: [
        CsfdUserDetailComponent,
        MovieListComponent,
        MovieSearchComponent,
        MovieDetailAdminViewComponent,
        MakerPreviewListComponent,
        MakerListComponent,
        MovieFilterPipe,
        MoviePosterPreviewComponent,
        ExternalLinksComponent,
        MovieDetailBasicInfoComponent,
        MakerDetailComponent,
        MovieDetailComponent,
        ExternalMakerDirective,
        ExternalMovieDirective
    ]
})
export class MoviesModule {
}
