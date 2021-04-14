import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { finalize, first, map, shareReplay, switchMap, tap } from "rxjs/operators";
import { AbstractHttpService } from "../services/abstract-http.service";
import { NotificationService } from "../services/notification.service";

export abstract class AbstractDetailComponent<T extends { id: number } = any, S extends AbstractHttpService = AbstractHttpService<T>> {
    public selectedDetail: T;
    protected readonly selectedDetailSource$ = new BehaviorSubject<T | null>(null);
    public readonly selectedDetail$        = this.selectedDetailSource$.asObservable();
    public readonly isNew$                 = this.route.params.pipe(
        map((data) => data.id === "new"),
        shareReplay(1),
    );
    protected readonly loadingSource$      = new BehaviorSubject<boolean>(false);
    public readonly loading$               = this.loadingSource$.asObservable();
    public readonly detailForm             = this.createForm();

    public readonly loading = true;

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
        this.setDisabled(true);
    }

    public back(): void {
        this.isNew$.pipe(
            switchMap((isNew) => {
                if (isNew) {
                    return this.router.navigate([this.listUrl]);
                }

                if (this.disabled) {
                    return of(window.history.back());
                }
                this.loadingSource$.next(true);

                return this.httpService.getDetail(this.selectedDetail.id).pipe(
                    finalize(() => this.loadingSource$.next(false)),
                    tap((data) => {
                        this.setDetail(data);
                        this.setDisabled(true);
                    })
                );
            }),
        ).subscribe();
    }

    public setDetail(detail: T): void {
        this.selectedDetail = detail;
        this.selectedDetailSource$.next(detail);
        this.detailForm.patchValue(detail);
    }

    public edit(): void {
        this.setDisabled(false);
    }

    public setDisabled(value: boolean): void {
        value ? this.detailForm.disable() : this.detailForm.enable();
    }

    protected initialization(): void {
        this.loadingSource$.next(true);
        this.route.params.pipe(
            tap(() => this.loadingSource$.next(true)),
            switchMap((data) => data.id === "new" ? of(null) : this.httpService.getDetail(data.id)),
            first(),
        ).subscribe({
            next    : (detail) => {
                this.setDisabled(!!detail);
                this.setDetail(detail ? detail : {} as any);
            },
            error   : (error) => this.notificationService.openErrorNotification(error),
            complete: () => this.loadingSource$.next(false)
        });
    }

    protected abstract createForm(): FormGroup;
}
