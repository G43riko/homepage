import { HttpClientModule } from "@angular/common/http";
import { async, TestBed } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { forkJoin } from "rxjs";
import { last } from "rxjs/operators";
import { ScriptService, ScriptStore, StylesStore } from "./script.service";

xdescribe("ScriptService", () => {
    let scriptService: ScriptService;

    // load appComponent to test the scriptService on
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                BrowserModule,
                RouterModule,
                HttpClientModule,
            ],
            providers: [
                ScriptService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        scriptService = TestBed.get(ScriptService);
    });

    it("loadScript should import a correct script tag", async(() => {
        scriptService.loadScripts([ScriptStore.semantic])
                     .subscribe(() => {
                         const script = window.document.querySelector(
                             "script[src=\"assets/semantic.min.js\"]");

                         expect(script).toBeTruthy();
                     });
    }));

    it("loadScripts should import correct script tags", async(() => {
        scriptService.loadScripts([ScriptStore.semantic, ScriptStore.jquery])
                     .subscribe(() => {
                         const jqueryScript = window.document.querySelector(`script[src="${ScriptStore.jquery}"]`);
                         const semanticScript = window.document.querySelector(`script[src="${ScriptStore.semantic}"]`);

                         expect(jqueryScript).toBeTruthy();
                         expect(semanticScript).toBeTruthy();
                     });
    }));

    it("loadScript multiple times should import a given script only once", async(() => {
        forkJoin(
            scriptService.loadScripts([ScriptStore.semantic]),
            scriptService.loadScripts([ScriptStore.semantic]),
        ).pipe(last())
         .subscribe(() => {
             const scripts = window.document.querySelectorAll(`script[src="${ScriptStore.semantic}"]`);

             expect(scripts.length).toEqual(1);
         });
    }));

    it("loadStyle should import a correct link tag", async(() => {
        scriptService.loadStyles(StylesStore.amchartsStyles)
                     .subscribe(() => {
                         const cssLink = window.document.querySelector(
                             "link[href=\"assets/js/plugins/amcharts/amcharts.css\"][rel=\"stylesheet\"]" +
                             "[type=\"text/css\"][media=\"all\"]");

                         expect(cssLink).toBeTruthy();
                     });
    }));

    it("loadStyle multiple times should import a given link only once", async(() => {
        forkJoin(
            scriptService.loadStyles(StylesStore.semantic),
            scriptService.loadStyles(StylesStore.semantic),
        ).pipe(last())
         .subscribe(() => {
             const cssLinks = window.document.querySelectorAll(
                 `script[src="${ScriptStore.semantic}"][rel="stylesheet"][type="text/css"][media="all"]`
             );

             expect(cssLinks.length).toEqual(1);
         });
    }));
});
