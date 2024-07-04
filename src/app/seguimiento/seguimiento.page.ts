import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format, parseISO } from 'date-fns';
import { AuthService, UserProfile } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { FormularioSuenoComponent } from '../modals/formulario-sueno/formulario-sueno.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  uid: string = '';
  imcRecords: any[] = [];
  listaSueno: any[] = [];
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private as : AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.loadImcRecords();
      }
    });

    this.loadSueno();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FormularioSuenoComponent,
    });
    return await modal.present();
  }

  calcularIMC() {
    if (this.peso <= 0 || this.altura <= 0) {
      this.loading = false;
      alert("Por favor, ingrese valores válidos.");
      return;
    }
    const alturaEnMetros = this.altura / 100;
    this.imc = this.peso / (alturaEnMetros * alturaEnMetros);
    
    // Call the API to store the data
    this.storeBmiData();
    this.loading = false;
  }

  storeBmiData() {
    this.loading = true;
    const bmiData = {
      uid: this.uid,
      peso: this.peso,
      altura: this.altura,
      imc: this.imc,
      fecha: new Date().toISOString()
    };
  
    this.http.post('https://us-central1-healthy-way-f7636.cloudfunctions.net/api/storeBmiData', bmiData)
      .subscribe(
        response => {
          console.log('Data stored successfully', response);
          this.loadImcRecords(); 
        },
        error => console.error('Error storing data', error)
      );
  }

  loadImcRecords() {
    this.firestore.collection('bmiData', ref => ref.where('uid', '==', this.uid))
      .valueChanges().subscribe(data => {
        console.log('Retrieved data:', data);
        this.imcRecords = data.map((record: any) => {
          const date = parseISO(record.fecha);
          const month = date.toLocaleString('es-ES', { month: 'long' }); 
          return {
            month,
            peso: record.peso,
            altura: record.altura,
            imc: record.imc,
            fecha: record.fecha 
          };
        });
  
        
        this.imcRecords.sort((a, b) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });
  
        console.log('Formatted IMC records:', this.imcRecords);
      });
  }

  loadSueno() {
    this.as.getCurrentUser().subscribe(user => {
      if (user) {
        this.firestore.collection<any>(`users/${user.uid}/sueno`).valueChanges().subscribe(sueno => {
          this.listaSueno = sueno;
          console.log(this.listaSueno);
        });
      }
    });
  }
  


}