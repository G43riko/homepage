export class Phone {
    public number_id: string;

    public constructor(public readonly phoneNumber = "", public readonly active = true) {
        this.phoneNumber = phoneNumber;
    }

    public static parse(phoneNumber: any): Phone | null {
        if (!phoneNumber) {
            return null;
        }

        const result: Phone = new Phone(phoneNumber.number ?? phoneNumber.phoneNumber, phoneNumber.active);

        result.number_id   = phoneNumber.number_id;

        return result;
    }

}
