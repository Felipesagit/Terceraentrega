import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Nf404Page } from './nf404.page';

const routes: Routes = [
  {
    path: '',
    component: Nf404Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Nf404PageRoutingModule {}
