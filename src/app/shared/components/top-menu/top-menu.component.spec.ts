import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TopMenuComponent } from "./top-menu.component";
import { AppModule } from "../../../app.module";

describe("TopMenuComponent", () => {
    let component: TopMenuComponent;
    let fixture: ComponentFixture<TopMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            declarations: [TopMenuComponent],
        })
               .compileComponents();
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
