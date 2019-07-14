import { Roles } from "../enums/roles.enum";

export interface MenuItemModel {
    icon: string;
    link: string;
    label: string;
    access: "" | Roles[];
}
