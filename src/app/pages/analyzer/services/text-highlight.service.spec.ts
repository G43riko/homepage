import { TestBed } from '@angular/core/testing';

import { TextHighlightService } from './text-highlight.service';

describe('TextHighlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextHighlightService = TestBed.get(TextHighlightService);
    expect(service).toBeTruthy();
  });
});
