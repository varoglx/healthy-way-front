import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-sueno',
  templateUrl: './formulario-sueno.component.html',
  styleUrls: ['./formulario-sueno.component.scss'],
})
export class FormularioSuenoComponent  implements OnInit {

  suenoForm: FormGroup;
  date: any;

  constructor(private modalController: ModalController,private fb: FormBuilder,private afs : AngularFirestore, private afa : AngularFireAuth) { 
    this.suenoForm = this.fb.group({
      time: ['', Validators.required],
    });
  }

  ngOnInit() {
    const now = new Date();
    this.date = this.formatDate(now) + ' ' + this.formatTime(now),
  

    console.log(this.date)
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async saveSueno() {
    if (this.suenoForm.valid) {
      try {
        const user = await this.afa.currentUser;
        if (user) {
          const form = {
            time: this.suenoForm.value.time,
            date: this.date,
          };
  
          await this.afs.collection(`users/${user.uid}/sueno`).doc().set(form);
          this.modalController.dismiss();
          console.log(form);
        } else {
          console.error('No user is currently logged in.');
        }
      } catch (error) {
        console.error('Error al guardar la formulario en Firestore:', error);
      }
    }
  }

  private formatTime(date: Date): string {
    return `${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
  }

  private formatDate(date: Date): string {
    const day = this.pad(date.getDate());
    const month = this.pad(date.getMonth() + 1); // Months are zero-indexed
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }
}
