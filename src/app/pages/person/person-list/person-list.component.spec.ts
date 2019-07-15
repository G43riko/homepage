import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { FirebaseModule } from "../../../shared/modules/firebase.module";
import { MaterialModule } from "../../../shared/modules/material.module";
import { TestingModule } from "../../../testing-module/testing.module";
import { PersonListRowComponent } from "../person-list-row/person-list-row.component";
import { PersonListComponent } from "./person-list.component";

describe("PersonListComponent", () => {
    let component: PersonListComponent;
    let fixture: ComponentFixture<PersonListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PersonListComponent,
                PersonListRowComponent,
                PaginatorComponent,
            ],
            imports: [
                FirebaseModule,
                TestingModule,
                MaterialModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture   = TestBed.createComponent(PersonListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be created", () => {
        expect(component).toBeTruthy();
    });
});
