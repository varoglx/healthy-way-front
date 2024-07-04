import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})


export class ModalContentComponent implements OnInit {

  loading = false;
  counter = 0;
  previousAlarmId = 0;
  alarmForm: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  selectedSound: string = '';

  constructor(private modalController: ModalController, private fb: FormBuilder,private platform: Platform,private afs : AngularFirestore, private afa : AngularFireAuth) {
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
    this.loadAlarms()

  }



  async loadAlarms() {
    const user = await this.afa.currentUser;
    if (user) {
      this.afs.collection(`users/${user.uid}/alarms`).valueChanges().subscribe(alarms => {
        if (alarms.length > 0) {
          this.previousAlarmId = Math.max(...alarms.map((alarm: any) => alarm.id));
        } else {
          this.previousAlarmId = 0;
        }
      });
    }
  }

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
      this.loading = true;
      const user = await this.afa.currentUser;
      if (user) {
      const newAlarm = {
        id: this.previousAlarmId + 1,
        type: this.alarmForm.value.type,
        time: this.alarmForm.value.time,
        repeat: this.alarmForm.value.repeat,
        daysOfWeek: this.daysOfWeek.filter(day => this.alarmForm.get(day)?.value === true),
        enabled: true,
      };

      try {
        await this.afs.collection(`users/${user.uid}/alarms`).doc(newAlarm.id.toString()).set(newAlarm);
        this.counter = newAlarm.id;
        this.modalController.dismiss();
        console.log(newAlarm);
      } catch (error) {
        console.error('Error al guardar la alarma en Firestore:', error);
      }

      try {
        // Crear el canal de notificación
        await LocalNotifications.createChannel({
          id: 'channel-id',
          name: 'Recodatorio de Actividad',
          description: '',
          importance: 5, // Usar el ID del sonido cargado
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

        if (notificationTime <= now) {
          // Si la hora seleccionada ya ha pasado, ajusta para el día siguiente
          notificationTime.setDate(notificationTime.getDate() + 1);
        }
    
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
        }} catch (error) {
        console.error('Error al programar la notificación:', error);
        }}}
     else {
      console.error('recordatorio incompleto. No se agregará a la lista.');
      this.modalController.dismiss();
    }
  }

  deleteAll() {
    localStorage.clear();
  }

}
