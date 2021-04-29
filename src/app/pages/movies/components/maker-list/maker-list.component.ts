import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { tap } from "rxjs/operators";
import { TableConfig } from "../../../../shared/components/abstract-table/table-config";
import { ImageDialogComponent } from "../../../../shared/components/image-dialog/image-dialog.component";
import { Maker } from "../../models/maker.model";
import { MakerHttpService } from "../../services/maker-http.service";
import { MovieService } from "../../services/movie.service";

@Component({
    selector       : "app-movie-makers",
    templateUrl    : "./maker-list.component.html",
    styleUrls      : ["./maker-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MakerListComponent {
    @Input() public disabled    = true;
    public readonly makersList$ = this.makerHttpService.getList(10).pipe(tap(console.log));

    public readonly makerConfig: TableConfig<Maker & { external: unknown, detail: unknown }> = {
        selection      : "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        pageSize       : 10,
        stickyEnd      : 6,
        paginator      : false,
        columns        : [
            {
                name : "name",
                label: "Meno"
            },
            {
                name : "birthday",
                label: "Dátum narodenia"
            },
            {
                name : "external",
                label: ""
            },
            {
                name : "detail",
                label: ""
            }
        ]
    };

    public constructor(private readonly makerHttpService: MakerHttpService,
                       private readonly dialog: MatDialog,
                       public readonly movieService: MovieService) {
    }

    public openImageDetail(url: string): void {
        this.dialog.open(ImageDialogComponent, {
            data: url
        });
    }
}
