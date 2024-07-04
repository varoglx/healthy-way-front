import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';
import { FormularioContrasenaComponent } from '../modals/formulario-contrasena/formulario-contrasena.component';

import { PerfilPage } from './perfil.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule
  ],
  declarations: [PerfilPage,FormularioContrasenaComponent]
})
export class PerfilPageModule {}
