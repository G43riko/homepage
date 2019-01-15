import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./Routes";

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
