import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RealEstate} from "./real-estate";

@Injectable()
export class RealEstateHttpService {
    // private readonly URL = "https://g43-real-estates.herokuapp.com/";
    private readonly URL = "http://localhost:3001/";
    public constructor(
        private readonly httpClient: HttpClient
    ) {
    }

    public fetchList(limit: number, skip: number): Observable<RealEstate[]> {
        return this.httpClient.get<RealEstate[]>(this.URL + "query", {
            params: {
                limit: String(limit),
                skip: String(skip),
                operationType: "SALE",
                houseTypes: "",
            }
        });
    }
}
