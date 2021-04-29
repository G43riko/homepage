import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ObjectMergeComponent } from "./object-merge/object-merge.component";

@NgModule({
    imports     : [
        CommonModule,
    ],
    declarations: [
        ObjectMergeComponent
    ],
    exports: [
        ObjectMergeComponent,
    ]
})
export class ObjectMergeModule {

}
