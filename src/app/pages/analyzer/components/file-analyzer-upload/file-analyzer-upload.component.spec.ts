import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAnalyzerUploadComponent } from './file-analyzer-upload.component';

describe('FileAnalyzerUploadComponent', () => {
  let component: FileAnalyzerUploadComponent;
  let fixture: ComponentFixture<FileAnalyzerUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAnalyzerUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAnalyzerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
