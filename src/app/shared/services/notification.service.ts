import { Injectable } from "@angular/core";
import { NotificationInterface } from "../interfaces/notification.interface";
import { ErrorManagerService } from "./error-manager.service";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    private readonly _defaultError = "Undefined error";
    private _notificationComponent: NotificationInterface = {
        showError(title: string, text: string): void {
            console.error(title + ": " + text);
        },
        showSuccess(title: string, text: string): void {
            console.log(title + ": " + text);
        },
        showWarn(title: string, text: string): void {
            console.warn(title + ": " + text);
        },
    };

    constructor(private readonly _errorManager: ErrorManagerService) {
    }

    public setComponent(notificationComponent: NotificationInterface): void {
        this._notificationComponent = notificationComponent;
    }

    public showErrorMessage(error: string | Response): void {
        this._notificationComponent.showError("Error: ", this._getMessage(error));
    }

    public showSuccessMessage(error: string | Response): void {
        this._notificationComponent.showSuccess("Success: ", this._getMessage(error));
    }

    private _getMessage(error: string | Response): string {
        return this._errorManager.getMessageFromError(error, this._defaultError);
    }
}
