import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'; 
import { Router } from '@angular/router';
import { ServiceguardService } from '../service/serviceguard.service';

export const guardAlumnoGuard: CanActivateFn = (route, state) => {
  const Serviceguard= inject(ServiceguardService);
  const router = inject(Router);

  const role = localStorage.getItem('role');

  if ( role === 'alumno') {
    return true; // Permitir el acceso a la ruta para alumnos
  } else {
    return router.createUrlTree(['/login']); // Redirigir a login si no es alumno
  }
};
