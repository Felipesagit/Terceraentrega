import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { guardAlumnoGuard } from './guardAlumno/guard-alumno.guard';
import { Docenteguard } from './guardDocente/Docente.guard';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./docente/docente.module').then(m => m.DocentePageModule),
    canActivate:[Docenteguard]
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoPageModule),
    canActivate:[guardAlumnoGuard]

  },
  {
    path: 'qrdocente',
    loadChildren: () => import('./qrdocente/qrdocente.module').then(m => m.QrdocentePageModule),
    canActivate:[Docenteguard]

  },
  {
    path: 'qralumno',
    loadChildren: () => import('./qralumno/qralumno.module').then(m => m.QralumnoPageModule),
    canActivate:[guardAlumnoGuard]

  },
  {
    path: 'nf404', // Ruta corregida para la página de error 404
    loadChildren: () => import('./nf404/nf404.module').then(m => m.Nf404PageModule)
  },
  {
    path: '**',
    redirectTo: 'nf404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }