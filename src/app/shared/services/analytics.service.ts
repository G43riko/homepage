import {Injectable} from "@angular/core";

declare const gtag: any;

@Injectable({
    providedIn: "root"
})
export class AnalyticsService {
    public eventUploadFile(fileName: string): void {
        gtag("event", "fileUpload", {fileName});
    }

    public login(method: "google"): void {
        gtag("event", "login", {method});
    }

    public signOut(): void {
        gtag("event", "logout");
    }

    public visitPage(page_path: string): void {
        gtag("config", "UA-47857230-3", {page_path});
    }
}
