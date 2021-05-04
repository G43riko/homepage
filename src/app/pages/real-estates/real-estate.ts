export type UnitNumberModel<T extends string = string> = { type: T, value: number } | string | null;
export enum OperationType {
    SALE = "SALE",
    PURCHASE = "PURCHASE",
    RENT = "RENT",
    LEASE = "LEASE",
    AUCTION = "AUCTION",
    EXCHANGE = "EXCHANGE",
}

export interface RealEstate {
    readonly id: string;

    readonly externalLink: string;

    readonly content: string;
    readonly address: {
        raw?: string;
        coordinates?: {
            lat: number;
            long: number;
        };
        street?: string;
        country?: string;
        city?: string;
        location?: string;
        streetNumber?: string;
    };
    readonly title: string;
    readonly created: string;
    readonly imageUrl: string;
    readonly updated: string;
    readonly images: string[];
    readonly type: string;

    readonly size: UnitNumberModel;

    readonly price: UnitNumberModel;
    readonly unitPrice: UnitNumberModel;
    readonly operationType: OperationType;

    readonly basicInfo: any;
    readonly floor?: string | {current: number, total: number} ;
    readonly characteristics: any;
    readonly location: string;
    readonly street: string;

    readonly coordinates: {
        lat: number;
        long: number;
    };
}
