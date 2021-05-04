import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {RealEstate} from "../real-estate";
import {RealEstateHttpService} from "../real-estate-http.service";

@Injectable()
export class RealEstateListService {
    private readonly dataSource$ = new BehaviorSubject<RealEstate[]>([]);
    public readonly data$ = this.dataSource$.asObservable();

    public constructor(
        private readonly realEstateHttpService: RealEstateHttpService,
    ) {

        this.realEstateHttpService.fetchList(100, 0).subscribe((data) => {
            this.dataSource$.next(data);
        });
    }
}
