import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RealEstateListService} from "./real-estate-list.service";
import {TableConfig} from "../../../shared/components/abstract-table/table-config";
import {RealEstate} from "../real-estate";
import {MatDialog} from "@angular/material/dialog";
import {RealEstateDetailComponent} from "../real-estate-detail/real-estate-detail.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: "app-real-estate-list",
    templateUrl: "./real-estate-list.component.html",
    styleUrls: ["./real-estate-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        RealEstateListService,
    ]
})
export class RealEstateListComponent {
    public readonly data$ = this.realEstateListService.data$;

    public readonly tableConfig: TableConfig<RealEstate & { insulation: unknown; status: unknown; construction: unknown; elevator: unknown }> = {
        columns: [
            {
                name: "title",
                label: this.translateService.instant("real-estate.property.title")
            },
            {
                name: "address",
                label: this.translateService.instant("real-estate.property.address"),
                customContent: (row) => row.location + " " + row.street,
            },
            {
                name: "size",
                label: this.translateService.instant("real-estate.property.size"),
                customContent: (row) => row.size ? (typeof row.size === "string" ? row.size : `${row.size?.value} ${row.size?.type}`) : "",
            },
            {
                name: "type",
                label: this.translateService.instant("real-estate.property.type"),
                customContent: (row) =>  this.translateService.instant("real-estate.type." + row.type)
            },
            {
                name: "operationType",
                label: this.translateService.instant("real-estate.property.operation"),
                customContent: (row) =>  this.translateService.instant("real-estate.operation." + row.operationType)
            },
            {
                name: "status",
                label: this.translateService.instant("real-estate.property.status"),
                customContent: (row) =>  this.translateService.instant("real-estate.status." + row.characteristics.status)
            },
            {
                name: "price",
                label: this.translateService.instant("real-estate.property.price"),
                customContent: (row) => row.price ? (typeof row.price === "string" ? row.price : `${row.price?.value} ${row.price?.type}`) : "",
            },
            {
                name: "elevator",
                label: this.translateService.instant("real-estate.property.elevator"),
                customContent: (row) =>  this.translateService.instant("real-estate.boolean." + row.characteristics.elevator),
            },
            {
                name: "insulation",
                label: this.translateService.instant("real-estate.property.insulation"),
                customContent: (row) =>  this.translateService.instant("real-estate.boolean." + row.characteristics.insulation),
            },
            {
                name: "construction",
                label: this.translateService.instant("real-estate.property.construction"),
                customContent: (row) =>  this.translateService.instant("real-estate.construction." + row.characteristics.construction),
            },
            {
                label: this.translateService.instant("real-estate.property.created"),
                name: "created",
            },
            {
                label: this.translateService.instant("real-estate.property.updated"),
                name: "updated",
            },
        ]
    };

    public constructor(
        private readonly realEstateListService: RealEstateListService,
        private readonly translateService: TranslateService,
        private readonly dialog: MatDialog,
    ) {
    }

    public onRowClick(realEstate: RealEstate): void {
        this.dialog.open(RealEstateDetailComponent, {
            data: {realEstate},
        });
    }
}
