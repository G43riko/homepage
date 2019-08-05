import { TestBed } from '@angular/core/testing';

import { AngularFireStorageMockService } from './angular-fire-storage-mock.service';

describe('AngularFireStorageMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularFireStorageMockService = TestBed.get(AngularFireStorageMockService);
    expect(service).toBeTruthy();
  });
});
