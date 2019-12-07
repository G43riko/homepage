import {Component, Input, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {TableConfig} from "../../../../shared/components/abstract-table/table-config";
import {ImageDialogComponent} from "../../../../shared/components/image-dialog/image-dialog.component";
import {Maker} from "../../models/maker.model";
import {MakerHttpService} from "../../services/maker-http.service";
import {MovieService} from "../../services/movie.service";

@Component({
    selector: "app-movie-makers",
    templateUrl: "./maker-list.component.html",
    styleUrls: ["./maker-list.component.scss"],
})

export class MakerListComponent implements OnInit {
    @Input() public makers: Maker[] = [];
    @Input() public disabled = true;
    public readonly makersData: Observable<Maker[]>;

    public readonly makerConfig: TableConfig = {
        selection: "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        pageSize: 10,
        stickyEnd: 6,
        paginator: false,
        columns: [
            {
                name: "name",
                label: "Meno",
            },
            {
                name: "birthday",
                label: "Dátum narodenia",
            },
            {
                name: "external",
                label: "",
            },
            {
                name: "detail",
                label: "",
            },
        ],
    };

    public constructor(private readonly httpService: MakerHttpService,
                       private readonly dialog: MatDialog,
                       public readonly movieService: MovieService) {
        this.makersData = httpService.getList(10);
    }

    public openImageDetail(url: string): void {
        this.dialog.open(ImageDialogComponent, {
            data: url,
        });
    }

    public ngOnInit(): void {
    }
}
