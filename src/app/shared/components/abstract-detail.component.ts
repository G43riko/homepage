import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractHttpService} from "../services/abstract-http.service";
import {NotificationService} from "../services/notification.service";

export abstract class AbstractDetailComponent<T extends { id: number } = any, S extends AbstractHttpService = AbstractHttpService<T>> {
    public selectedDetail: T;
    public isNew = false;
    public loading = false;
    public detailForm = this.createForm();

    protected constructor(protected readonly formBuilder: FormBuilder,
                          private readonly route: ActivatedRoute,
                          protected readonly router: Router,
                          protected readonly httpService: S,
                          protected readonly notificationService: NotificationService,
                          private readonly listUrl: string) {
    }

    public get disabled(): boolean {
        return this.detailForm.disabled;
    }

    public save(): void {
        console.log(this.detailForm.value);
        this.setDisabled(true);
    }

    public back(): void {
        if (this.isNew || this.disabled) {
            this.router.navigate([this.listUrl]);
        } else {
            this.loading = true;
            this.httpService.getDetail(this.selectedDetail.id).subscribe((data) => {
                this.setDetail(data);
                this.setDisabled(true);
                this.loading = false;
            }, (error) => {
                this.loading = false;
                this.notificationService.openErrorNotification(error);
            });
        }
    }

    public setDetail(detail: T): void {
        this.selectedDetail = detail;
        this.detailForm.patchValue(detail);
    }

    public edit(): void {
        this.setDisabled(false);
    }

    public setDisabled(value: boolean): void {
        value ? this.detailForm.disable() : this.detailForm.enable();
    }

    protected initialization(): void {
        this.route.params.subscribe((data: any) => {
            const actId = data["id"];
            if (actId === "new") {
                this.setDetail({} as T);
                this.isNew = true;
                this.setDisabled(false);
            } else {
                this.loading = true;
                this.httpService.getDetail(actId).subscribe((detail: T) => {
                    this.setDetail(detail);
                    this.setDisabled(true);
                    this.loading = false;
                }, (error) => {
                    this.notificationService.openErrorNotification(error);
                    this.loading = false;
                });
            }
        }, (error) => this.notificationService.openErrorNotification(error));
    }

    protected abstract createForm(): FormGroup;
}
