import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AbstractDetailComponent} from "../../../../shared/components/abstract-detail.component";
import {NotificationService} from "../../../../shared/services/notification.service";
import {Maker} from "../../models/maker.model";
import {MovieHttpService} from "../../movie-http.service";

@Component({
    selector: "app-maker-detail",
    templateUrl: "./maker-detail.component.html",
    styleUrls: ["./maker-detail.component.scss"],
})
export class MakerDetailComponent extends AbstractDetailComponent implements OnInit {
    @Input() public selectedMaker: Maker;
    public isDisabled = true;
    public selectedMovie: Maker;
    public isNew: boolean;
    public readonly makerForm = this.formBuilder.group({});

    public constructor(private readonly route: ActivatedRoute,
                       private readonly formBuilder: FormBuilder,
                       private readonly notificationService: NotificationService,
                       private readonly movieHttpService: MovieHttpService) {
        super();
    }

    public ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            const actId = data["id"];
            if (actId === "new") {
                this.selectedMovie = new Maker();
                this.isNew = true;
            } else {
                this.movieHttpService.getMakerDetail(actId).subscribe((maker: Maker) => {
                    this.selectedMovie = maker;
                    this.makerForm.patchValue({
                        ...maker,
                        year: new Date(maker.birthday),
                    });
                }, (error) => this.notificationService.openErrorNotification(error));
            }
        }, (error) => this.notificationService.openErrorNotification(error));
    }

    public setDisabled(value: boolean = this.disabled): void {
        value ? this.makerForm.disable() : this.makerForm.enable();
    }

    public back(): void {
        this.disabled = true;
        this.setDisabled();
    }

    public edit(): void {
        this.disabled = false;
        this.setDisabled();
    }

    public save(): void {
        console.log(this.makerForm.value);
        this.disabled = true;
    }

}
