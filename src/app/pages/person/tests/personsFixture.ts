import {Gender} from "gtools";
import {AbstractFixture} from "gtools/out/tests/abstract.fixture";
import {Person} from "../../../shared/models/person/person.model";

export class PersonsFixture extends AbstractFixture<Person> {
    public constructor() {
        super([
            {
                id: 111,
                name: "EmptyPersonName",
                accounts: [],
                numbers: [],
                emails: [],
                gender: Gender.parse("")
            },
            {
                id: 112,
                name: "TestPersonName",
                surName: "TestPersonSurName",
                birthday: "1999-11-22",
                nick: "TestPersonNick",
                numbers: [
                    {
                        number: "0905123456",
                        active: true,
                        number_id: "TestPersonNumber1Id"
                    },
                    {
                        number: "0905654321",
                        active: false,
                        number_id: "TestPersonNumber2Id"
                    }
                ],
                emails: [
                    {
                        email: "abc@gmail.com",
                        active: true,
                        email_id: "TestPersonEmail1Id"
                    },
                    {
                        email: "gmail@abc.com",
                        active: false,
                        email_id: "TestPersonEmail2Id"
                    }
                ],
                accounts: [
                    {
                        type: "FACEBOOK",
                        userName: "TestPersonAccountFbUserName",
                        active: true,
                        link: "TestPersonAccountFbLink",
                        account_id: 221
                    }, {
                        type: "LINKEDIN",
                        userName: "TestPersonAccountLIUserName",
                        active: true,
                        link: "TestPersonAccountLILink",
                        account_id: 222
                    }
                ],
                gender: Gender.parse("MAN"),
                address: {
                    country: "SK",
                    city: "TestPersonAddressCity",
                    street: "TestPersonAddressStreet",
                    streetNumber: "TestPersonAddressStreetNumber"
                }
            },
            {
                id: 113,
                name: "Gabriel",
                surName: "Csollei",
                birthday: "12.11.1993",
                nick: "Gabo",
                numbers: [
                    {
                        number: "0905123456",
                        active: true,
                        number_id: "1"
                    },
                    {
                        number: "0905654321",
                        active: true,
                        number_id: "2"
                    }
                ],
                emails: [
                    {
                        email: "gcsollei@hotmail.com",
                        active: true,
                        email_id: "1"
                    },
                    {
                        email: "gcsollei@gmail.com",
                        active: true,
                        email_id: "2"
                    }
                ],
                accounts: [
                    {
                        type: "FACEBOOK",
                        userName: "Gabriel",
                        active: true,
                        link: "TestPersonAccountFbLink",
                        account_id: 223
                    }, {
                        type: "LINKEDIN",
                        userName: "TestPersonAccountLIUserName",
                        active: true,
                        link: "TestPersonAccountLILink",
                        account_id: 224
                    }
                ],
                gender: Gender.parse("MALE"),
                address: {
                    country: "SK",
                    city: "Slovakia",
                    street: "Mierová",
                    streetNumber: "23"
                }
            }
        ]);
    }
}
