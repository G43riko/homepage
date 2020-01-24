import { NgModule } from "@angular/core";
import { CoreModule } from "../../shared/core.module";
import { SharedModule } from "../../shared/shared.module";
import { FoodsOverviewComponent } from "./components/foods-overview/foods-overview.component";
import { RestaurantRowComponent } from "./components/restaurant-row/restaurant-row.component";
import { RestaurantSelectorComponent } from "./components/restaurant-selector/restaurant-selector.component";
import { FoodsRoutingModule } from "./foods-routes.module";
import { SearchFoodPipe } from "./pipes/search-food.pipe";
import { SearchRestaurantPipe } from "./pipes/search-restaurant.pipe";
import { DailyMenuHttpService } from "./services/daily-menu-http.service";
import { RestaurantHttpService } from "./services/restaurant-http.service";

@NgModule({
    declarations: [
        FoodsOverviewComponent,
        RestaurantSelectorComponent,
        RestaurantRowComponent,
        SearchFoodPipe,
        SearchRestaurantPipe,
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
