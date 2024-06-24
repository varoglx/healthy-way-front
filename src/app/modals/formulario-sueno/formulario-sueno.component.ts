import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-sueno',
  templateUrl: './formulario-sueno.component.html',
  styleUrls: ['./formulario-sueno.component.scss'],
})
export class FormularioSuenoComponent  implements OnInit {

  suenoForm: FormGroup;
  date: any;
  hour: any;


  constructor(private modalController: ModalController,private fb: FormBuilder,private afs : AngularFirestore, private afa : AngularFireAuth,private alertController: AlertController) {
    
  
    this.suenoForm = this.fb.group({
      time: ['', Validators.required],
      customDate: [''],
    });
  }

  ngOnInit() {
    const now = new Date();
    this.date = this.formatDate(now)
    this.hour = this.formatTime(now)

    console.log(this.date)
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async saveSueno() {
    if (this.suenoForm.valid) {
      const selectedDate = this.suenoForm.value.customDate || this.date;
      console.log(selectedDate);

      try {
        const user = await this.afa.currentUser;
        if (user) {
          const form = {
            time: this.suenoForm.value.time,
            date: selectedDate,
            hour: this.hour
          };

          const suenoRef = this.afs.collection(`users/${user.uid}/sueno`, ref => ref.where('date', '==', selectedDate));
          const querySnapshot = await suenoRef.get().toPromise();

          console.log("Query Snapshot:", querySnapshot); // Registro de consola para depurar

          if (querySnapshot && !querySnapshot.empty) {
            console.log("Documents found:", querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
            const docId = querySnapshot.docs[0].id; // Obtener el ID del documento existente
            console.log("Document ID:", docId); // Registro de consola para depurar
            await this.showAlert('Ya existe un registro para esta fecha. ¿Desea actualizarlo?', () => this.updateSueno(user.uid, docId, form));
          } else {
            await this.afs.collection(`users/${user.uid}/sueno`).doc().set(form);
            this.modalController.dismiss();
            console.log(form);
          }
        } else {
          console.error('No user is currently logged in.');
        }
      } catch (error) {
        console.error('Error al guardar el formulario en Firestore:', error);
      }
    }
  }
  

  private async showAlert(message: string, confirmHandler: () => void) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            confirmHandler();
          }
        }
      ]
    });
    await alert.present();
  }

  private async updateSueno(uid: string, docId: string, form: any) {
    try {
      await this.afs.collection(`users/${uid}/sueno`).doc(docId).update(form);
      this.modalController.dismiss();
      console.log(form);
    } catch (error) {
      console.error('Error al actualizar el formulario en Firestore:', error);
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
