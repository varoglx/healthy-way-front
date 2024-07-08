import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordatoriosPageRoutingModule } from './recordatorios-routing.module';

import { RecordatoriosPage } from './recordatorios.page';
import { ModalContentComponent } from '../modals/modal-content/modal-content.component';
import { EditRecordComponent } from '../modals/edit-record/edit-record.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordatoriosPageRoutingModule,ReactiveFormsModule,IonicModule.forRoot(),
  ],
  declarations: [RecordatoriosPage,ModalContentComponent,EditRecordComponent],
  providers: [FileChooser,LocalNotifications,InAppBrowser],
})
export class RecordatoriosPageModule {}
