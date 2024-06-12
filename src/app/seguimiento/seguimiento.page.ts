import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { format } from 'date-fns';
@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  peso: number = 0;
  altura: number = 0;
  imc: number = 0;
  name:string='';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const userJsonString = localStorage.getItem('usuario');
    const userObject = userJsonString ? JSON.parse(userJsonString) : null;
    this.name = userObject ? userObject.username : null;
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
      name: this.name,  // Replace with actual username
      peso: this.peso,
      altura: this.altura,
      imc: this.imc,
      fecha: new Date().toISOString()
    };

    this.http.post('https://us-central1-healthy-way-f7636.cloudfunctions.net/api/storeBmiData', bmiData)
      .subscribe(
        response => console.log('Data stored successfully', response),
        error => console.error('Error storing data', error)
      );
  }
}