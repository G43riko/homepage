import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Account } from "../../../shared/models/person/account.model";
import { Email } from "../../../shared/models/person/email.model";
import { Person } from "../../../shared/models/person/person.model";
import { Phone } from "../../../shared/models/person/phone.model";
import { NotificationService } from "../../../shared/services/notification.service";
import { PersonService } from "../../../shared/services/person.service";
import { Paginator } from "../../../shared/utils/Paginator";

declare let $: any;

@Component({
    selector: "app-person-list",
    templateUrl: "./person-list.component.html",
    // templateUrl: "./tmp-list.component.html",
    styleUrls: ["./person-list.component.scss"],
})

export class PersonListComponent implements OnInit {
    public personList: Person[];
    public selectedAll: boolean;
    public paginator: Paginator<Person>;

    public constructor(private readonly route: ActivatedRoute,
                       private readonly personService: PersonService,
                       private readonly notificationService: NotificationService) {
    }

    public ngOnInit(): void {
        this.personService.getPersons().subscribe((data: Person[]) => {
            // this.allPersonList = data;
            this.paginator = new Paginator(data);
            // this.personList = this.allPersonList.slice(0, PersonListComponent.itemsPerPage);
            // console.log(this.paginator.getList());
            this.personList = this.paginator.getList();
            $(".ui.pointing.dropdown")
                .dropdown({
                    maxSelections: 3,
                });
        }, (error) => this.notificationService.showErrorMessage(error));
    }

    public selectAll(checkbox: HTMLInputElement): void {
        console.log(checkbox);
        const elements: NodeListOf<any> = document.getElementsByName("personSelector");
        for (let i = 0; i < elements.length; i++) {
            elements[i].checked = !this.selectedAll;
        }
    }

    public loadItems(): void {
        console.log("Loadujem všetky");
    }

    public remove(personId: number): void {
        this.personService.delete(personId).subscribe((data) => {
            console.log("removed(" + personId + "): ", data);
            this.personList.splice(this.personList.findIndex((person) => person.person_id === personId), 1);
        }, (error) => this.notificationService.showErrorMessage(error));
    }

    public begin() {
        const lines  = document.getElementsByTagName("tr");
        const result = [];
        for (let i = 0; i < lines.length; i++) {
            const tr      = lines[i];
            const columns = tr.querySelectorAll("td");
            const person  = new Person();

            person.name    = columns[0].innerText;
            person.surName = columns[1].innerText;
            person.nick    = columns[2].innerText;
            if (!isNaN(new Date(columns[3].innerText).getTime())) {
                person.birthday = new Date(columns[3].innerText).toISOString().slice(0, 10);
            }

            person.emails = [];

            const email1 = new Email(columns[4].innerText);
            if (email1.email) {
                person.emails.push(email1);
                const email2 = new Email(columns[5].innerText);
                if (email2.email && email2.email !== email1.email) {
                    person.emails.push(email2);
                    const email3 = new Email(columns[6].innerText);
                    if (email3.email && email3.email !== email1.email && email3.email !== email2.email) {
                        person.emails.push(email3);
                    }
                }
            }

            person.numbers = [];

            // TODO format tel number
            const number1 = new Phone(columns[7].innerText);
            if (number1.number) {
                person.numbers.push(number1);
                const number2 = new Phone(columns[8].innerText);
                if (number2.number && number2.number !== number1.number) {
                    person.numbers.push(number2);
                    const number3 = new Phone(columns[9].innerText);
                    if (number3.number && number3.number !== number1.number && number3.number !== number2.number) {
                        person.numbers.push(number3);
                    }
                }
            }

            const divider  = ":::";
            const postEdit = (title: string[]): string => {

                return title.map((e) => e.trim()).join(", ");
            };

            // COMPARE ADDRESS
            // person.address.street = columns[11].innerText;
            person.address.street  = postEdit(Array.from(new Set(columns[11].innerText.split(divider))));
            // person.address.city = columns[12].innerText;
            person.address.city    = postEdit(Array.from(new Set(columns[12].innerText.split(divider))));
            // person.address.country = columns[16].innerText;
            person.address.country = postEdit(Array.from(new Set(columns[16].innerText
                                                                            .replace("Slovakia", "SK")
                                                                            .replace("Slovenská Republika", "SK")
                                                                            .split(divider).map((a) => a.trim()))));

            result.push(person);
        }
        this.personService.addAll(result).subscribe((data) => {
            console.log("recieved: ", data);
        });
        console.log(result);
    }

    public getTitle(account: Account): string {
        return "[" + account.userName + "] - " + Account.getLink(account);
    }

    public goTo(account: Account): void {
        window.open(Account.getLink(account), "_blank");
    }

    public getIcon(account: Account): string {
        return Account.getIcon(account);
    }
}
