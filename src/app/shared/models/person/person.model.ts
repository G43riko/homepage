import { GenderType } from "gtools";
import { Account } from "./account.model";
import { Address } from "./address.model";
import { Email } from "./email.model";
import { Phone } from "./phone.model";

export type PersonId = number;

export class Person {
    public id: PersonId;
    public givenName: string;
    public familyName?: string;
    public birthday?: string;
    public nick?: string;
    public gender: GenderType;
    public emails: Email[] = [new Email()];
    public numbers: Phone[] = [new Phone()];
    public address?: Address = new Address();
    public accounts: Account[] = [];

    public static parse(person: any): Person {
        const result = new Person();
        if (!person) {
            return result;
        }

        result.id         = person.person_id || person.id;
        result.givenName  = person.givenName;
        result.familyName =  person.familyName;
        result.gender     = person.gender;
        result.birthday = person.birthday;
        result.nick = person.nick;
        result.address = person.address ? Address.parse(person.address) : new Address();
        result.emails = Array.isArray(person.emails) ? person.emails.map(Email.parse) : [];
        result.numbers = Array.isArray(person.numbers) ? person.numbers.map(Phone.parse) : [];
        result.accounts  = Array.isArray(person.accounts) ? person.accounts.map(Account.parse) : [];

        return result;
    }

    public static toModel(person: Person): any {
        return {
            name: person.givenName || "",
            surName: person.familyName || "",
            nick: person.nick || "",
            gender: person.gender || "",
            birthday: person.birthday || "",
            address: person.address ? Address.toModel(person.address) : undefined
        };
    }
}
