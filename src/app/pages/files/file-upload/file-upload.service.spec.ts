import { TestBed } from "@angular/core/testing";
import {TestingModule} from "../../../tests/testing.module";

import { FileUploadService } from "./file-upload.service";

describe("FileUploadService", () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
          TestingModule,
      ],
  }));

  it("should be created", () => {
    const service: FileUploadService = TestBed.get(FileUploadService);
    expect(service).toBeTruthy();
  });
});
