export class Address {
    public country: string;
    public city: string;
    public street: string;
    public streetNumber: string;

    public constructor(country: string = "SK", city: string = "", street: string = "", streetNumber: string = "") {
        this.streetNumber = streetNumber;
        this.country      = country;
        this.street       = street;
        this.city         = city;
    }

    public static parse(address: any): Address {
        const result: Address = new Address();
        if (!address) {
            return result;
        }
        result.streetNumber = address.streetNumber;
        result.street       = address.street;
        result.country      = address.country;
        result.city         = address.city;

        return result;
    }

}
