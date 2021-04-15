import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ErrorManagerService {
    public getMessageFromError(error: Response | string, defaultError: string): string {
        if (typeof error === "string") {
            return error;
        }

        if (error.status === 0) {
            return "Stránka je nedostupná";
        }

        return defaultError;
    }
}
