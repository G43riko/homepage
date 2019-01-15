import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material-module/material.module";

@NgModule({
    imports     : [],
    declarations: [],
    exports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserAnimationsModule, // NoopAnimationsModule
    ],
})
export class CoreModule {
}
