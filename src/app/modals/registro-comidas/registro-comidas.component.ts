import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { RegistrarIngestaComponent } from '../registrar-ingesta/registrar-ingesta.component';

@Component({
  selector: 'app-registro-comidas',
  templateUrl: './registro-comidas.component.html',
  styleUrls: ['./registro-comidas.component.scss'],
})
export class RegistroComidasComponent implements OnInit, OnDestroy {

  ingestaForm: FormGroup;
  ingestaHoy: any[] = [];
  private intervalId: any;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.ingestaForm = this.formBuilder.group({
      nombre_receta: ['', Validators.required],
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async openRegistrarIngesta() {
    const modal = await this.modalController.create({
      component: RegistrarIngestaComponent
    });
    return await modal.present();
  }

  ngOnInit() {
    this.loadIngestaHoy();
    this.startPolling();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  startPolling() {
    this.intervalId = setInterval(() => {
      this.loadIngestaHoy();
    }, 1000); // Check every second
  }

  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadIngestaHoy() {
    const ingestaHoyStr = localStorage.getItem('ingestaHoy');
    this.ingestaHoy = ingestaHoyStr ? JSON.parse(ingestaHoyStr) : [];
    console.log(this.ingestaHoy)
  }

}
