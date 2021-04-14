import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppStaticConfig } from "../../../appStaticConfig";
import { Person, PersonId } from "../../../shared/models/person/person.model";
import { AbstractHttpService } from "../../../shared/services/abstract-http.service";
import { AuthService } from "../../../shared/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";

const URL = AppStaticConfig.BASE_URL + "/persons";

@Injectable()
export class PersonHttpService extends AbstractHttpService {
    public constructor(http: HttpClient, authService: AuthService, notificationService: NotificationService) {
        super(http, authService, notificationService);
    }

    public getPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(URL)
            .pipe(
                catchError(this.handleError<Person[]>("getPersons"))
            );
    }

    public getDetail(personId: number): Observable<Person> {
        return this.http.get<Person>(URL + "/" + personId)
            .pipe(
                map(Person.parse),
                catchError(this.handleError<Person>("cannot get person with id " + personId))
            );
    }

    public update(person: Person): Observable<Person> {
        return this.http.put<Person>(URL + "/" + person.id, person, {
            headers: this.getHeaders()
        })
            .pipe(
                map(Person.parse),
                catchError(this.handleError<Person>("update person with id" + person.id))
            );
    }

    public delete(personId: PersonId): Observable<string> {
        return this.http.delete<string>(URL + "/" + personId)
            .pipe(
                catchError(this.handleError<string>("delete person with id" + personId))
            );
    }

    public add(person: Person): Observable<Person> {
        return this.http.post<Person>(URL, JSON.stringify(person), {
            headers: this.getHeaders()
        })
            .pipe(
                map(Person.parse),
                catchError(this.handleError<Person>("add person"))
            );
    }

    public addAll(persons: Person[]): Observable<Person[]> {
        return this.http.post<Person[]>(URL + "/all", JSON.stringify(persons), {
            headers: this.getHeaders()
        })
            .pipe(
                map((data) => data.map(Person.parse)),
                catchError(this.handleError<Person[]>("addAll persons"))
            );
    }
}
