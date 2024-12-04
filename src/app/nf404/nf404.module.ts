import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Nf404PageRoutingModule } from './nf404-routing.module';

import { Nf404Page } from './nf404.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Nf404PageRoutingModule
  ],
  declarations: [Nf404Page]
})
export class Nf404PageModule {}
