import { browser, by, element, promise as wdpromise } from "protractor";

export class AppPage {
    public navigateTo(): wdpromise.Promise<any> {
        return browser.get("/");
    }

    public getParagraphText(): wdpromise.Promise<string> {
        return element(by.css("app-root h1")).getText();
    }
}
