import { TestBed } from '@angular/core/testing';

import { ServiceguardService } from './serviceguard.service';

describe('ServiceguardService', () => {
  let service: ServiceguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
