import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalContentComponent } from '../modals/modal-content/modal-content.component';
import { EditRecordComponent } from '../modals/edit-record/edit-record.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { LocalNotifications } from '@capacitor/local-notifications';


interface Alarm {
  id: number;
  type: string;
  time: string;
  repeat: boolean;
  daysOfWeek: string[];
  selected?: boolean; // Añadir la propiedad selected
  enabled: boolean;
}

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.page.html',
  styleUrls: ['./recordatorios.page.scss'],
})
export class RecordatoriosPage implements OnInit {

  showCheckboxes = false;
  counter: any;
  alarms: Alarm[]=[];
  constructor(private modalController: ModalController,private afs : AngularFirestore, private afa : AngularFireAuth,private as : AuthService) { }

  ngOnInit() {
    this.loadUser();
    this.schedulePredefinedNotification();
  }

  async schedulePredefinedNotification() {
    try {
      // Crear el canal de notificación
      await LocalNotifications.createChannel({
        id: '',
        name: 'Notificación Predefinida',
        description: 'Canal para notificaciones predefinidas diarias',
        importance: 5,
        visibility: 1,
      });
    } catch (error) {
      console.error('Error al crear el canal de notificación:', error);
    }

    try {
      await LocalNotifications.requestPermissions();

      const hours = 12; // Hora predefinida (8 AM)
      const minutes = 0; // Minutos predefinidos

      const predefinedNotification = {
        title: 'Recordatorio Diario',
        body: 'Recuerda registrar tu imc, sueño y comida semanalmente para mejor precision en los informes',
        id: 1, // ID predefinido
        schedule: {
          on: {
            hour: hours,
            minute: minutes,
          },
          repeats: true,
        },
        channelId: 'predefined-channel-id',
        attachments: undefined,
        actionTypeId: '',
        extra: null,
      };

      await LocalNotifications.schedule({ notifications: [predefinedNotification] });
    } catch (error) {
      console.error('Error al programar la notificación predefinida:', error);
    }
  }

  loadUser(){
    this.as.getCurrentUser().subscribe(user => {
      if (user) {
        this.afs.collection<Alarm>(`users/${user.uid}/alarms`).valueChanges().subscribe(alarms => {
          this.alarms = alarms;
          console.log(this.alarms);
        });
      }
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalContentComponent,
    });
    return await modal.present();
  }

  async editAlarm(alarm: Alarm) {
    const modal = await this.modalController.create({
      component: EditRecordComponent,
      componentProps: { alarm }
    });

    modal.onDidDismiss().then(async (detail: any) => {
      if (detail.data) {
        const user = await this.afa.currentUser;
        if (user) {
          await this.afs.doc(`users/${user.uid}/alarms/${alarm.id}`).update(detail.data);
        }
      }
    });

    return await modal.present();
  }
  
  toggleCheckboxes() {
    this.showCheckboxes = !this.showCheckboxes;
    // Resetear la selección de las alarmas si showCheckboxes es false
    if (!this.showCheckboxes) {
      this.resetSelection();
    }
  }
  
  resetSelection() {
    this.alarms.forEach(alarm => {
      alarm.selected = false;
    });
  }

  toggleSelection(alarm: Alarm) {
    alarm.selected = !alarm.selected;
  }

  async toggleEnabled(alarm: Alarm, user: any) {
    if (alarm.enabled) {
      alarm.enabled = false;
      // Actualizar el estado del documento en Firestore
      await this.afs.doc(`users/${user.uid}/alarms/${alarm.id}`).update({ enabled: false });
    } else {
      alarm.enabled = true;
      // Actualizar el estado del documento en Firestore
      await this.afs.doc(`users/${user.uid}/alarms/${alarm.id}`).update({ enabled: true });
    }
  }

  async deleteMultipleAlarms(idsToDelete: number[]) {
    const batch = this.afs.firestore.batch();
    const user = await this.afa.currentUser || null;
    if (user) {
    idsToDelete.forEach(id => {
      const docRef = this.afs.doc(`users/${user.uid}/alarms/${id}`).ref;
      batch.delete(docRef);
    });}
    await batch.commit();
  }

  async deleteAllAlarms() {
    const batch = this.afs.firestore.batch();
    const user = await this.afa.currentUser;
    if (user) {
      const alarmCollection = this.afs.collection<Alarm>(`users/${user.uid}/alarms`);
      alarmCollection.get().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docRef = doc.ref;
          batch.delete(docRef);
        });
        batch.commit();
      });
    }
  }

  deleteAlarms(idsToDelete: number[]) {
    // Filtrar las alarmas no seleccionadas
    this.alarms = this.alarms.filter(alarm =>!idsToDelete.includes(alarm.id));
    // Guardar el array actualizado en localStorage
    localStorage.setItem('alarms', JSON.stringify(this.alarms));
    this.resetIds();
    // Resetear la selección de las alarmas después de eliminarlas
    this.resetSelection();
    // Eliminar las alarmas seleccionadas de Firestore
    this.deleteMultipleAlarms(idsToDelete);
  }
  
  
  resetIds() {
      // Recalcular los IDs de las alarmas restantes
      this.counter = 0;
      this.alarms.forEach((alarm: any) => {
          alarm.id = ++this.counter;
      });
      // Guardar el array actualizado nuevamente para reflejar los nuevos IDs
      localStorage.setItem('alarms', JSON.stringify(this.alarms));
  }

  getSelectedIds(): number[] {
    if (!this.showCheckboxes) {
      return [];
    }
      const selectedIds = this.alarms.filter(alarm => alarm.selected).map(alarm => alarm.id);
      console.log(selectedIds);
      return selectedIds;

  }
  
}
