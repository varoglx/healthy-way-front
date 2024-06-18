import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { RegistrarIngestaComponent } from '../registrar-ingesta/registrar-ingesta.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-registro-comidas',
  templateUrl: './registro-comidas.component.html',
  styleUrls: ['./registro-comidas.component.scss'],
})
export class RegistroComidasComponent implements OnInit, OnDestroy {

  ingestaForm: FormGroup;
  ingestaHoy: any[] = [];
  totalCalorias: number = 0;
  private intervalId: any;
  usuario: any;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private http: HttpClient,
    private authService: AuthService,
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
    this.loadUsuario();
    this.loadIngestaHoy();
    this.startPolling();
  }
  loadUsuario() {
    const usuarioStr = localStorage.getItem('usuario');
    this.usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
    console.log(this.usuario.uid);
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  startPolling() {
    this.intervalId = setInterval(() => {
      this.loadIngestaHoy();
      this.calculateTotalCalorias();
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
  }

  calculateTotalCalorias() {
    this.totalCalorias = this.ingestaHoy.reduce((total, comida) => total + comida.calorias, 0);
  }

  async enviarTotalCalorias() {
    this.authService.getCurrentUser().subscribe(async user => {
      if (user) {
        const userUid = user.uid;
        const fechaHoy = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
  
        await this.firestore.collection(`users/${userUid}/calorias`).add({
          fecha: fechaHoy,
          totalCalorias: this.totalCalorias
        });
        localStorage.setItem('ingestaHoy', JSON.stringify([]));
        console.log(`Total de Calorías Hoy: ${this.totalCalorias}`);
      }
    });
  }
  

}
