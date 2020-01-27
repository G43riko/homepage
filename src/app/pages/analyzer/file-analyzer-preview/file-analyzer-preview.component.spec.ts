import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAnalyzerPreviewComponent } from './file-analyzer-preview.component';

describe('FileAnalyzerPreviewComponent', () => {
  let component: FileAnalyzerPreviewComponent;
  let fixture: ComponentFixture<FileAnalyzerPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAnalyzerPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAnalyzerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
