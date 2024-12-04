import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { Docenteguard } from './Docente.guard';

describe('Docenteguard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => Docenteguard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
