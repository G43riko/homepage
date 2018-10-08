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
        result.birthday  = person.birthday;
        result.nick      = person.nick;

        if (person.address) {
            result.address = Address.parse(person.address);
        }

        if (Array.isArray(person.emails)) {
            result.emails = person.emails.map(Email.parse);
        }
        if (Array.isArray(person.numbers)) {
            result.numbers = person.numbers.map(Phone.parse);
        }
        if (Array.isArray(person.accounts)) {
            result.accounts = person.accounts.map(Account.parse);
        }

        result.person_id = person.person_id;

        return result;
    }
}
