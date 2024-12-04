import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ServiceguardService } from '../service/serviceguard.service';
import { Router } from '@angular/router';

export const Docenteguard: CanActivateFn = (route, state) => {
  
  const Serviceguard= inject(ServiceguardService);
  const router = inject(Router);


  const role = localStorage.getItem('role');
  if (role === 'docente') {
    return true; 
  } else {
    return router.createUrlTree(['/login']); 
  }
};
