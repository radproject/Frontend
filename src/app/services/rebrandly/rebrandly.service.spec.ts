import { TestBed } from '@angular/core/testing';

import { RebrandlyService } from './rebrandly.service';

describe('RebrandlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RebrandlyService = TestBed.get(RebrandlyService);
    expect(service).toBeTruthy();
  });
});
