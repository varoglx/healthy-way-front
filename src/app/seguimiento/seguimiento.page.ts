import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { format, parseISO } from 'date-fns';
import { AuthService, UserProfile } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


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

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.loadImcRecords();
      }
    });
  }

  calcularIMC() {
    if (this.peso <= 0 || this.altura <= 0) {
      alert("Por favor, ingrese valores válidos.");
      return;
    }
    const alturaEnMetros = this.altura / 100;
    this.imc = this.peso / (alturaEnMetros * alturaEnMetros);
    
    // Call the API to store the data
    this.storeBmiData();
  }

  storeBmiData() {
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
          this.loadImcRecords(); // Refresh the records after storing new data
        },
        error => console.error('Error storing data', error)
      );
  }

  loadImcRecords() {
    this.firestore.collection('bmiData', ref => ref.where('uid', '==', this.uid))
      .valueChanges().subscribe(data => {
        console.log('Retrieved data:', data);
        this.imcRecords = data.map((record: any) => {
          const date = parseISO(record.fecha); // Parsear la fecha en formato UTC
          const month = date.toLocaleString('es-ES', { month: 'long' }); // Obtener nombre del mes en español
          return {
            month,
            peso: record.peso,
            altura: record.altura,
            imc: record.imc,
            fecha: record.fecha // Mantener la fecha original
          };
        });
  
        // Ordenar los registros por fecha (de más reciente a más antiguo)
        this.imcRecords.sort((a, b) => {
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });
  
        console.log('Formatted IMC records:', this.imcRecords);
      });
  }
  


}