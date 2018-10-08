export class Phone {
    public number: string;
    public active: boolean;
    public number_id: string;

    public constructor(number: string = "", active = true) {
        this.number = number;
        this.active = active;
    }

    public static parse(number: any): Phone | null {
        if (!number) {
            return null;
        }

        const result: Phone = new Phone();

        result.number_id = number.number_id;
        result.number    = number.number;
        result.active    = number.active;

        return result;
    }

}
