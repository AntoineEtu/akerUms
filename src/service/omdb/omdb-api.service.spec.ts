import { TestBed } from '@angular/core/testing';

import { OmdbApiService } from './omdb-api.service';

describe('OmdbApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmdbApiService = TestBed.get(OmdbApiService);
    expect(service).toBeTruthy();
  });
});
