interface AnyInterface {
    [key: string]: any;
}

export interface DailyMenu extends AnyInterface {
    restaurant: string;
    dishes: {
        name: string;
        weight: string;
        price: number;
    }[];
}
