import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordatoriosPageRoutingModule } from './recordatorios-routing.module';

import { RecordatoriosPage } from './recordatorios.page';
import { ModalContentComponent } from '../modals/modal-content/modal-content.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordatoriosPageRoutingModule,ReactiveFormsModule,IonicModule.forRoot(),
  ],
  declarations: [RecordatoriosPage,ModalContentComponent]
})
export class RecordatoriosPageModule {}
