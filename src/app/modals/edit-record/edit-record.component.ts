import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-edit-record',
  templateUrl: './edit-record.component.html',
  styleUrls: ['./edit-record.component.scss'],
})
export class EditRecordComponent implements OnInit{
  @Input() alarm: any;
  loading = false;
  alarmForm: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedSound: string = '';

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private platform: Platform,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) {
    this.alarmForm = this.fb.group({
      type: ['', Validators.required],
      time: ['', Validators.required],
      repeat: [false],
      Lunes: [false],
      Martes: [false],
      Miércoles: [false],
      Jueves: [false],
      Viernes: [false],
      Sábado: [false],
      Domingo: [false]
    });
  }

  ngOnInit() {
    this.loadAlarmDetails();
  }

  loadAlarmDetails() {
    this.alarmForm.patchValue(this.alarm);
    this.daysOfWeek.forEach(day => {
      this.alarmForm.get(day)?.setValue(this.alarm.daysOfWeek.includes(day));
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  openNotificationSettings() {
    if (this.platform.is('android') && window.Android) {
      window.Android.openNotificationSettings();
    } else if (this.platform.is('ios')) {
      window.open('app-settings:');
    } else {
      console.error('La configuración de sonido no está disponible en este dispositivo.');
    }
  }

  async save() {
    if (this.alarmForm.valid) {
      this.loading = true;
      const user = await this.afa.currentUser;
      if (user) {
        const updatedAlarm = {
          id: this.alarm.id,
          type: this.alarmForm.value.type,
          time: this.alarmForm.value.time,
          repeat: this.alarmForm.value.repeat,
          daysOfWeek: this.daysOfWeek.filter(day => this.alarmForm.get(day)?.value === true),
          enabled: true,
        };

        try {
          await this.afs.doc(`users/${user.uid}/alarms/${updatedAlarm.id}`).update(updatedAlarm);
          this.modalController.dismiss(updatedAlarm);
        } catch (error) {
          console.error('Error al actualizar la alarma en Firestore:', error);
        } finally {
          this.loading = false;
        }
      }
    } else {
      console.error('Formulario incompleto. No se guardará la alarma.');
      this.modalController.dismiss();
    }
  }
}
