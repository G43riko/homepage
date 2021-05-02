import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ImageDialogComponent } from "../../../../shared/components/image-dialog/image-dialog.component";
import { Maker } from "../../models/maker.model";
import { MovieService } from "../../services/movie.service";

@Component({
    selector: "app-maker-preview-row",
    templateUrl: "./maker-preview-list.component.html",
    styleUrls: ["./maker-preview-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakerPreviewListComponent {
    @Input() public maker: Maker;

    public constructor(public readonly movieService: MovieService,
                       private readonly dialog: MatDialog) {
    }

    public openImageDetail(url: string): void {
        this.dialog.open(ImageDialogComponent, {
            data: url
        });
    }
}
