import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({name: "safe"})
export class SafePipe implements PipeTransform {
    public constructor(private readonly sanitizer: DomSanitizer) {
    }

    public transform(url: any): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
