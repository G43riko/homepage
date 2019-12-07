import {Component, OnInit} from "@angular/core";
import {TableConfig} from "../../../shared/components/abstract-table/table-config";
import {SongsService} from "../songs.service";

export interface Song {
    preview: string;
    artists: string;
    title: string;
}

@Component({
    selector: "app-songs",
    templateUrl: "./songs-list.component.html",
    styleUrls: ["./songs-list.component.scss"],
})
export class SongsListComponent implements OnInit {
    public readonly songsConfig: TableConfig = {
        columns: [
            {
                name: "artists",
                label: "Autory",
            },
            {
                name: "title",
                label: "Názov",
            },
            {
                name: "duration",
                label: "Dĺžka",
            },
            {
                name: "popularity",
                label: "Popularita",
            },
            {
                name: "preview",
                label: "Ukážka",
            },
            {
                name: "video",
                label: "Video",
            },
        ],
        stickyHeader: true,
        selection: "multi",
        paginateOptions: [5, 10, 20, 50, 100],
        pageSize: 10,
        paginator: true,
    };

    public constructor(public readonly songsService: SongsService) {
    }

    public ngOnInit(): void {
    }
}
