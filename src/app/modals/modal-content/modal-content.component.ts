import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})


export class ModalContentComponent implements OnInit {

  
  counter = 0;
  alarmForm: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedSound: string = '';

  constructor(private modalController: ModalController, private fb: FormBuilder,private platform: Platform, private inAppBrowser: InAppBrowser) {
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

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  openSoundSettings() {
    if (this.platform.is('android')) {
      window.open('content://settings/system/notification_sound');
    } else if (this.platform.is('ios')) {
      window.open('app-settings:');
    } else {
      // Otros sistemas operativos
      console.error('La configuración de sonido no está disponible en este dispositivo.');
    }
  }

  openNotificationSettings() {
    if (this.platform.is('android') && window.Android) {
      window.Android.openNotificationSettings();
    } else if (this.platform.is('ios')) {
      window.open('app-settings:');
    } else {
      // Otros sistemas operativos
      console.error('La configuración de sonido no está disponible en este dispositivo.');
    }
  }


  
  async saveAlarm() {
    if (this.alarmForm.valid) {
      const newAlarm = {
        id: ++this.counter,
        type: this.alarmForm.value.type,
        time: this.alarmForm.value.time,
        repeat: this.alarmForm.value.repeat,
        daysOfWeek: this.daysOfWeek.filter(day => this.alarmForm.get(day)?.value === true),
        sound: this.selectedSound,
      };

      this.modalController.dismiss(newAlarm);
      console.log(newAlarm);

      try {
        // Crear el canal de notificación
        await LocalNotifications.createChannel({
          id: 'channel-id',
          name: 'Nombre del Canal',
          description: 'Descripción del Canal',
          importance: 5,
          sound: newAlarm.sound, // Usar el ID del sonido cargado
          visibility: 1,
        });
      } catch (error) {
        console.error('Error al crear el canal de notificación:', error);
      }

      try {
        // Programar la notificación local
        await LocalNotifications.requestPermissions();

        const [hours, minutes] = newAlarm.time.split(':').map(Number);
        const now = new Date();
        const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        await LocalNotifications.schedule({
          notifications: [
            {
              title: `Recordatorio de ${newAlarm.type}`,
              body: 'Es hora de tu actividad programada.',
              id: newAlarm.id,
              schedule: { at: notificationTime },
              channelId: 'channel-id', // ID del canal creado anteriormente
              attachments: undefined,
              actionTypeId: '',
              extra: null,
            },
          ],
        });
      } catch (error) {
        console.error('Error al programar la notificación:', error);
      }
    }
  }

  deleteAll() {
    localStorage.clear();
  }

}
