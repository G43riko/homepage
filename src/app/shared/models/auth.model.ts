// export interface Roles {
//     admin?: boolean;
//     user?: boolean;
// }

import {Roles} from "../enums/roles.enum";

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteRestaurants?: string[];
    roles: { [role in Roles]?: boolean };
}
