import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalContentComponent } from '../modals/modal-content/modal-content.component';

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
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      this.alarms = JSON.parse(storedAlarms);
      console.log(this.alarms)
    }
  }

  
  deleteAll(){
    localStorage.removeItem('alarms')
    this.alarms=[]
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalContentComponent,
    });
  
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== undefined) {
        const newAlarm = dataReturned.data;
        newAlarm.enabled = true;
        this.alarms.push(newAlarm);
        // Guardar las alarmas en el localStorage después de agregar una nueva alarma
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
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

  toggleEnabled(alarm: Alarm) {
    if (alarm.enabled){
      alarm.enabled = true
      const storedAlarms = JSON.stringify(this.alarms);
      localStorage.setItem('alarms', storedAlarms);
      console.log(this.alarms)
    }else{
      alarm.enabled = false
      const storedAlarms = JSON.stringify(this.alarms);
      localStorage.setItem('alarms', storedAlarms);
      console.log(this.alarms)
    }
  }

  deleteAlarms(idsToDelete: number[]) {
    // Filtrar las alarmas no seleccionadas
    this.alarms = this.alarms.filter(alarm => !idsToDelete.includes(alarm.id));
    // Guardar el array actualizado en localStorage
    localStorage.setItem('alarms', JSON.stringify(this.alarms));
    this.resetIds();
    // Resetear la selección de las alarmas después de eliminarlas
    this.resetSelection();
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
