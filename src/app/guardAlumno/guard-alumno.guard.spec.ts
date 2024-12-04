import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardAlumnoGuard } from './guard-alumno.guard';

describe('guardAlumnoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardAlumnoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
