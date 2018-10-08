import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { SharedComponentsModule } from "./components/shared-components.module";
import { SharedDirectivesModule } from "./directives/shared-directives.module";
import { AccountsService } from "./services/accounts.service";
import { ErrorManagerService } from "./services/error-manager.service";
import { FileService } from "./services/file.service";
import { MapsService } from "./services/maps.service";
import { MoviesService } from "./services/movies.service";
import { NotificationService } from "./services/notification.service";
import { PersonService } from "./services/person.service";
import { SongsService } from "./services/songs.service";
import { YoutubeService } from "./services/youtube.service";

@NgModule({
    imports: [
        CommonModule,
        SharedDirectivesModule,
        SharedComponentsModule,
    ],
    declarations: [],
    providers: [
        FileService,
        SongsService,
        AuthService,
        NotificationService,
        ErrorManagerService,
        AccountsService,
        YoutubeService,
        MoviesService,
        MapsService,
        PersonService,
    ],
    exports: [
        CommonModule,
        SharedDirectivesModule,
        SharedComponentsModule,
    ],
})
export class SharedModule {
}
