import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-mixes-list",
    templateUrl: "./mixes-list.component.html",
    styleUrls: ["./mixes-list.component.scss"]
})
export class MixesListComponent implements OnInit {
    private readonly delay = 5000;
    private readonly params = "//www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&light=1&hide_artwork=1&feed=%2Fgcsollei%2F";
    public readonly urlObjects: { url: string, visible: boolean }[] = [
        this.params + "Fb2mix%2F",
        this.params + "Fnew-kings-nix-mix%2F",
        this.params + "Funbelieveble-nixmix%2F",
        this.params + "Fnew-years-nix-mix%2F",
        this.params + "F2014-nix-mix%2F",
        this.params + "Fg43-birthday-mix%2F",
        this.params + "Felectro%2F",
        this.params + "Fnixu%C5%A1-mixu%C5%A1%2F",
        this.params + "Fnixmix%2F",
        this.params + "Fg43-mix%2F",
    ].map((url) => ({url, visible: false}));

    public load(): void {
        const newItem = this.urlObjects.find((item) => !item.visible);
        if (!newItem) {
            return;
        }
        setTimeout(() => {
            newItem.visible = true;
        }, this.delay);
    }

    public ngOnInit(): void {
        this.load();
    }

}
