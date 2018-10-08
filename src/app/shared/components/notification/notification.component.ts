import { Component, OnInit } from "@angular/core";
import { NotificationInterface } from "../../interfaces/notification.interface";
import { NotificationService } from "../../services/notification.service";

type AlertType = "success" | "danger" | "warn";

export interface IAlert {
    id: number;
    type: string;
    title: string;
    message: string;
}

@Component({
    selector: "notification-component",
    templateUrl: "./notification.component.html",
    styles: [
            `
            .alertParent {
                margin-bottom: 0;
                position: fixed;
                top: 10px;
                left: 10px;
                right: 10px;
                z-index: 100
            }
            `
    ],
})
export class NotificationComponent implements OnInit, NotificationInterface {
    public alerts: IAlert[] = [];

    constructor(private readonly notificationService: NotificationService) {
        this.notificationService.setComponent(this);
    }

    public remove(index: number): void {
        this.alerts.splice(index, 1);
    }

    public showError(title: string, text: string): void {
        this.showAlert("danger", title, text);
    }

    public showSuccess(title: string, text: string): void {
        this.showAlert("success", title, text);
    }

    public showWarn(title: string, text: string): void {
        this.showAlert("success", title, text);
    }

    public ngOnInit(): void {
    }

    public closeAlert(index: number): void {
        this.alerts.splice(index, 1);
        // this.alert = "";
    }

    public reset(): void {
        this.alerts = [];
        // this.alert = this.showUploadAlert(false);
        // this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
    }

    private showAlert(type: AlertType, title: string, message: string): void {
        this.alerts.push({
            id: 3,
            type,
            title,
            message,
        });
    }
}
