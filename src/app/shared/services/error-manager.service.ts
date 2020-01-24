import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ErrorManagerService {
    public getMessageFromError(error: Response | string, defaultError: string): string {
        let message = defaultError;
        if (typeof error === "string") {
            message = error;
        } else if (error.status === 0) {
            message = "Stránka je nedostupná";

        }

        return message;
    }
}
