import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PersonListComponent } from "./person-list.component";
import { TestingModule } from "../../../testing-module/testing.module";
import { FirebaseModule } from "../../../shared/modules/firebase.module";
import { MaterialModule } from "../../../shared/modules/material.module";
import { PersonListRowComponent } from "../person-list-row/person-list-row.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";

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
