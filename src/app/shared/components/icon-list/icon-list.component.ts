import { Component, Input, OnInit } from "@angular/core";
import { IconService } from "../../services/icon.service";

@Component({
    selector   : "app-icon-list",
    templateUrl: "./icon-list.component.html",
    styleUrls  : ["./icon-list.component.scss"]
})
export class IconListComponent implements OnInit {
    @Input() public readonly keys: string[];
    @Input() public readonly type: "technology" | "food";
    @Input() public readonly showAlsoKeys     = false;
    @Input() public readonly defaultCharacter = "?";
    @Input() public readonly defaultIcon: string;

    public constructor(private readonly iconService: IconService) {
    }

    public ngOnInit(): void {
    }

    public getIconFor(key: string): { icon: string, type: "font-awesome" | "material" } | null {
        if (!key) {
            return null;
        }
        switch (this.type) {
            case "food":
                return this.getFoodIcon(key);
            case "technology":
                return this.getTechnologyIcon(key);
            default:
                return null;
        }
    }

    private getTechnologyIcon(key: string): { icon: string, type: "font-awesome" | "material" } | null {
        const technologyKes = ["angular", "bitbucket", "bootstrap", "sass", "codepen", "postgres", "jira", "firebase", "docker", "gulp", "facebook", "github", "gitlab", "git", "grunt", "hackerrank", "instagram", "linkedin", "mixcloud", "npm", "php", "python", "redis", "mongodb"];

        const result = technologyKes.find((title) => !!key.match(new RegExp(title, "i")));
        if (result) {
            return {icon: result, type: "font-awesome"};
        }

        if (key.match(/(css)/i)) {
            return {icon: "css3", type: "font-awesome"};
        }
        if (key.match(/html/i)) {
            return {icon: "html5", type: "font-awesome"};
        }
        if (key.match(/(node.?js)/i)) {
            return {icon: "node-js", type: "font-awesome"};
        }
        if (key.match(/(javascript|js)/i)) {
            return {icon: "js", type: "font-awesome"};
        }
        if (key.match(/(java)/i)) {
            return {icon: "java", type: "font-awesome"};
        }
        if (key.match(/(typescript|ts)/i)) {
            return {icon: "ts", type: "font-awesome"};
        }
        if (key.match(/(socket.?io)/i)) {
            return {icon: "socketio", type: "font-awesome"};
        }

        return null;
    }

    private getFoodIcon(key: string): { icon: string, type: "font-awesome" | "material" } {
        if (key.match(/(fish|ryba)/i)) {
            return {icon: "fish", type: "font-awesome"};
        }
        if (key.match(/burger/i)) {
            return {icon: "hamburger", type: "font-awesome"};
        }
        if (key.match(/(polievka|soup)/i)) {
            return {icon: "soup", type: "font-awesome"};
        }
        if (key.match(/(steak)/i)) {
            return {icon: "steak", type: "font-awesome"};
        }

        return {icon: "food", type: "material"};
    }
}
