import { TestBed } from '@angular/core/testing';

import { HtppInterceptorService } from './htpp-interceptor.service';

describe('HtppInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HtppInterceptorService = TestBed.get(HtppInterceptorService);
    expect(service).toBeTruthy();
  });
});
