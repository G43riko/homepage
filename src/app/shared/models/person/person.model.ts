import { Account } from "./account.model";
import { Address } from "./address.model";
import { Email } from "./email.model";
import { Phone } from "./phone.model";

type Gender = "MAN" | "WOMAN";

export class Person {
    public person_id: number;
    public name: string;
    public surName: string;
    public birthday: string;
    public nick: string;
    public gender: Gender;
    public emails: Email[]     = [new Email()];
    public numbers: Phone[]    = [new Phone()];
    public address: Address    = new Address();
    public accounts: Account[] = [];

    public static parse(person: any): Person {
        const result = new Person();

        result.person_id = person.person_id;
        result.name      = person.name;
        result.surName   = person.surName;
        result.gender = person.gender;
        result.birthday  = person.birthday;
        result.nick      = person.nick;
        result.address = person.address ? Address.parse(person.address) : new Address();
        result.emails = Array.isArray(person.emails) ? person.emails.map(Email.parse) : [];
        result.emails = Array.isArray(person.emails) ? person.emails.map(Email.parse) : [];
        result.numbers = Array.isArray(person.numbers) ? person.numbers.map(Phone.parse) : [];
        result.accounts = Array.isArray(person.accounts) ? person.accounts.map(Account.parse) : [];

        return result;
    }

    public toModel(): any {
        return {
            name: this.name || "",
            surName: this.surName || "",
            nick: this.nick || "",
            gender: this.gender || "",
            birthday: this.birthday || "",
            address: this.address.toModel(),
        };
    }
}
