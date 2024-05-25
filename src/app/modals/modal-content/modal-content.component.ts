import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent  implements OnInit {

  counter = 0;
  alarmForm: FormGroup;
  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(private modalController: ModalController, private fb: FormBuilder) {
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

  saveAlarm() {
    if (this.alarmForm.valid) {
      const newAlarm = {
        id: ++this.counter,
        type: this.alarmForm.value.type,
        time: this.alarmForm.value.time,
        repeat: this.alarmForm.value.repeat,
        daysOfWeek: this.daysOfWeek.filter(day => this.alarmForm.get(day)?.value === true),
      };
  
      this.modalController.dismiss(newAlarm);
      console.log(newAlarm);
    }
  }
  
}
