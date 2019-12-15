import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

export interface Icon {
    name: string;
    pattern: string;
    icon: string;
    iconType: string;
    type: string;
}

@Injectable({
    providedIn: "root"
})
export class IconService {
    public constructor(httpClient: HttpClient,
                       matIconRegistry: MatIconRegistry,
                       domSanitizer: DomSanitizer) {
        // httpClient.get<Icon[]>("assets/icons.json").subscribe((data) => {
        //     console.log("anooo");
        //     data.forEach((icon) => {
        //         matIconRegistry.addSvgIcon(icon.icon, domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon_" + icon.icon + ".svg"));
        //     });
        // });
    }
}
