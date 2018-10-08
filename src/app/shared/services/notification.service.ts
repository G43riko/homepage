import { Injectable } from "@angular/core";
import { NotificationInterface } from "../interfaces/notification.interface";
import { ErrorManagerService } from "./error-manager.service";

@Injectable()
export class NotificationService {
    private readonly defaultError = "Undefined error";
    private notificationComponent: NotificationInterface;

    constructor(private readonly _errorManager: ErrorManagerService) {
    }

    public setComponent(notificationComponent: NotificationInterface): void {
        this.notificationComponent = notificationComponent;
    }

    public showErrorMessage(error: string | Response): void {
        this.notificationComponent.showError("Chyba: ", this.getMessage(error));
    }

    public showSuccessMessage(error: string | Response): void {
        this.notificationComponent.showSuccess("Úspech: ", this.getMessage(error));
    }

    private getMessage(error: string | Response): string {
        return this._errorManager.getMessageFromError(error, this.defaultError);
    }
}
