import {browser, by, element, promise as wdpromise} from "protractor";

export class PersonsPage {
    public navigateTo(): wdpromise.Promise<any> {
        return browser.get("/persons");
    }

    public getPersonsSize(): wdpromise.Promise<number> {
        return element.all(by.css("app-abstract-table tr")).count();
    }

}
