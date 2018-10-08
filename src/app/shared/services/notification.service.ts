import { Injectable } from "@angular/core";
import { NotificationInterface } from "../interfaces/notification.interface";
import { ErrorManagerService } from "./error-manager.service";

@Injectable()
export class NotificationService {
    private readonly _defaultError = "Undefined error";
    private _notificationComponent: NotificationInterface;

    constructor(private readonly _errorManager: ErrorManagerService) {
    }

    public setComponent(notificationComponent: NotificationInterface): void {
        this._notificationComponent = notificationComponent;
    }

    public showErrorMessage(error: string | Response): void {
        this._notificationComponent.showError("Chyba: ", this._getMessage(error));
    }

    public showSuccessMessage(error: string | Response): void {
        this._notificationComponent.showSuccess("Úspech: ", this._getMessage(error));
    }

    private _getMessage(error: string | Response): string {
        return this._errorManager.getMessageFromError(error, this._defaultError);
    }
}
