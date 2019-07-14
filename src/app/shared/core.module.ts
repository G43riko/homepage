import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material-module/material.module";

@NgModule({
    imports     : [],
    declarations: [],
    exports     : [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        CommonModule,
        HttpClientJsonpModule,
    ],
})
export class CoreModule {
}
