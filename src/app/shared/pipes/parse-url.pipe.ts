import { Pipe, PipeTransform } from "@angular/core";

const l = document.createElement("a");

@Pipe({
    name: "parseUrl"
})
export class ParseUrlPipe implements PipeTransform {

    public transform(url: string, type: "host" | "protocol" | "origin" | "path" = "host"): any {
        l.href = url;
        switch (type) {
            case "host":
                return l.hostname;
            case "protocol":
                return l.protocol;
            case "origin":
                return l.origin;
            case "path":
                return l.pathname;
            default:
                return url;
        }
    }

}
