import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TopMenuComponent } from "./top-menu.component";
import { SharedComponentsModule } from "../shared-components.module";
import { TestingModule } from "../../../testing-module/testing.module";

describe("TopMenuComponent", () => {
    let component: TopMenuComponent;
    let fixture: ComponentFixture<TopMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports     : [
                TestingModule,
                SharedComponentsModule,
            ],
            declarations: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(TopMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
