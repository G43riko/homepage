import { TestBed } from '@angular/core/testing';

import { HistogramGeneratorService } from './histogram-generator.service';

describe('HistogramGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistogramGeneratorService = TestBed.get(HistogramGeneratorService);
    expect(service).toBeTruthy();
  });
});
