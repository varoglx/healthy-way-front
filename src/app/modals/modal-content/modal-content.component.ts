import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})


export class ModalContentComponent implements OnInit {

  
  counter = 0;
  previousAlarmId = 0;
  alarmForm: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedSound: string = '';

  constructor(private modalController: ModalController, private fb: FormBuilder,private platform: Platform) {
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

    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      const alarms = JSON.parse(storedAlarms);
      this.previousAlarmId = alarms.length > 0 ? alarms[alarms.length - 1].id : 0;
    } else {
      this.previousAlarmId = 0;
    }
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
        id: this.previousAlarmId + 1,
        type: this.alarmForm.value.type,
        time: this.alarmForm.value.time,
        repeat: this.alarmForm.value.repeat,
        daysOfWeek: this.daysOfWeek.filter(day => this.alarmForm.get(day)?.value === true),
        sound: this.selectedSound,
      };

      if (newAlarm.type && newAlarm.time) {
        this.modalController.dismiss(newAlarm);
        this.counter = newAlarm.id;
        console.log(newAlarm);
  
        // Resto del código para crear y programar la notificación
      } else {
        console.error('La alarma está incompleta. No se agregará a la lista.');
      }

      try {
        // Crear el canal de notificación
        await LocalNotifications.createChannel({
          id: 'channel-id',
          name: 'Recodatorio de Actividad',
          description: '',
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
    
        if (newAlarm.daysOfWeek.length === 0) {
            // Programar la notificación sin días de la semana específicos
            const scheduledNotification = {
                title: `Recordatorio de ${newAlarm.type}`,
                body: 'Es hora de tu actividad programada.',
                id: newAlarm.id,
                schedule: { at: notificationTime },
                channelId: 'channel-id',
                attachments: undefined,
                actionTypeId: '',
                extra: null,
            };
    
            await LocalNotifications.schedule({ notifications: [scheduledNotification] });
        } else {
            // Programar la notificación para los días de la semana seleccionados
            const scheduledNotifications = newAlarm.daysOfWeek.map(day => ({
                title: `Recordatorio de ${newAlarm.type}`,
                body: 'Es hora de tu actividad programada.',
                id: newAlarm.id,
                schedule: { at: notificationTime },
                channelId: 'channel-id',
                attachments: undefined,
                actionTypeId: '',
                extra: null,
            }));
    
            await LocalNotifications.schedule({ notifications: scheduledNotifications });
        }
    } catch (error) {
        console.error('Error al programar la notificación:', error);
    }
    } else {
      console.error('recordatorio incompleto. No se agregará a la lista.');
      this.modalController.dismiss();
    }
    
  }

  deleteAll() {
    localStorage.clear();
  }

}
