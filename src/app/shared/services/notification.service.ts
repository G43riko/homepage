import {Injectable} from "@angular/core";
import {G43Notification} from "@g43/common";
import {NotificationInterface} from "../interfaces/notification.interface";
import {ErrorManagerService} from "./error-manager.service";

@Injectable({
    providedIn: "root"
})
export class NotificationService implements G43Notification {
    private readonly _defaultError = "Undefined error";
    private readonly notificationComponent: NotificationInterface = {
        showError(title: string, text: string): void {
            console.error(title + ": " + text);
        },
        showSuccess(title: string, text: string): void {
            console.log(title + ": " + text);
        },
        showWarn(title: string, text: string): void {
            console.warn(title + ": " + text);
        }
    };

    public constructor(private readonly _errorManager: ErrorManagerService) {
    }

    public openErrorNotification(error: any): void {
        this.notificationComponent.showError("Error: ", this._getMessage(error));
    }

    public openInfoNotification(info: any): void {
        this.notificationComponent.showSuccess("Info: ", this._getMessage(info));
    }

    public openSuccessNotification(success: any): void {
        this.notificationComponent.showSuccess("Success: ", this._getMessage(success));
    }

    private _getMessage(error: string | Response): string {
        return this._errorManager.getMessageFromError(error, this._defaultError);
    }
}
