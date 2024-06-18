import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoPageRoutingModule } from './seguimiento-routing.module';

import { SeguimientoPage } from './seguimiento.page';
import { FormularioSuenoComponent } from '../modals/formulario-sueno/formulario-sueno.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [SeguimientoPage,FormularioSuenoComponent]
})
export class SeguimientoPageModule {}
