import { Component } from "@angular/core";
import { MatSelectionListChange } from "@angular/material/list";

@Component({
    selector   : "app-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent {
    public onExternalLinkClick(event: MatSelectionListChange): void {
        window.open(event.options[0].value, "__blank");
    }
}
