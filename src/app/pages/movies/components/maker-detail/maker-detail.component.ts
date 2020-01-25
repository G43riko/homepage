import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractDetailComponent} from "../../../../shared/components/abstract-detail.component";
import {NotificationService} from "../../../../shared/services/notification.service";
import {Maker} from "../../models/maker.model";
import {MakerHttpService} from "../../services/maker-http.service";

@Component({
    selector: "app-maker-detail",
    templateUrl: "./maker-detail.component.html",
    styleUrls: ["./maker-detail.component.scss"]
})
export class MakerDetailComponent extends AbstractDetailComponent<Maker, MakerHttpService> implements OnInit {
    @Input() public selectedDetail: Maker;

    public constructor(route: ActivatedRoute,
                       router: Router,
                       formBuilder: FormBuilder,
                       notificationService: NotificationService,
                       httpService: MakerHttpService) {
        super(formBuilder, route, router, httpService, notificationService, "movies/maker");
    }

    public ngOnInit(): void {
        this.initialization();
    }

    public setDetail(detail: Maker): void {
        this.selectedDetail = detail;
        this.detailForm.patchValue({
            ...detail,
            year: new Date(detail.birthday)
        });
    }

    protected createForm(): FormGroup {
        return this.formBuilder.group({});
    }

}
