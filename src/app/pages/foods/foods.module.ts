import {NgModule} from "@angular/core";
import {CoreModule} from "../../shared/core.module";
import {SharedModule} from "../../shared/shared.module";
import {FoodsOverviewComponent} from "./components/foods-overview/foods-overview.component";
import {RestaurantRowComponent} from "./components/restaurant-row/restaurant-row.component";
import {RestaurantSelectorComponent} from "./components/restaurant-selector/restaurant-selector.component";
import {FoodsRoutingModule} from "./foods-routes.module";
import {DailyMenuHttpService} from "./services/daily-menu-http.service";
import {RestaurantHttpService} from "./services/restaurant-http.service";

@NgModule({
    declarations: [
        FoodsOverviewComponent,
        RestaurantSelectorComponent,
        RestaurantRowComponent,
    ],
    providers: [
        RestaurantHttpService,
        DailyMenuHttpService,
    ],
    imports: [
        SharedModule,
        FoodsRoutingModule,
        CoreModule,
    ],
})
export class FoodsModule {
}
