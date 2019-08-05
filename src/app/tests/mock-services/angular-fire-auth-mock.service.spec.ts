import { TestBed } from "@angular/core/testing";

import { AngularFireAuthMockService } from "./angular-fire-auth-mock.service";

describe("AngularFireAuthMockService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AngularFireAuthMockService = TestBed.get(AngularFireAuthMockService);
    expect(service).toBeTruthy();
  });
});
