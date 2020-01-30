interface AnyInterface {
    [key: string]: any;
}

export interface DailyMenu extends AnyInterface {
    restaurant: string;
    id: number;
    dishes: {
        name: string;
        nameHTML?: string;
        weight?: string;
        type?: string | "pizza" | "soup" | "fish" | "steak" | "meat" | "food" | "special" | "empty";
        price?: number;
    }[];
}
