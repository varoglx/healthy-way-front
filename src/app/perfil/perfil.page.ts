// perfil.page.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements AfterViewInit, OnInit {
  
  username = localStorage.getItem('usuario');
  email: string = '';
  profilePicture: string | null = null;
  loadUserEmail() {
    this.http.post<{ message: string, email: string }>('https://us-central1-healthy-way-f7636.cloudfunctions.net/api/getUserEmail', { username: this.username })
      .subscribe(
        response => {
          this.email = response.email;
          console.log('thismail: ',this.email)
        },
        error => {
          console.error('Error al cargar el correo del usuario', error);
        }
      );
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const userJsonString = localStorage.getItem('usuario');
    const userObject = userJsonString ? JSON.parse(userJsonString) : null;
    this.username = userObject ? userObject.username : null;
    console.log(this.username);
    this.loadUserEmail()
  
  }

  ngAfterViewInit() {
    this.createDoughnutChart();
  }

  updateProfilePicture() {
    // Lógica para actualizar la foto de perfil
    // this.profilePicture = 'ruta/nueva-imagen.jpg';
  }

  createDoughnutChart() {
    const canvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Perdidos este mes'],
            datasets: [{
              label: 'Evolución',
              data: [200],
              backgroundColor: ['#ff6384'],
              hoverOffset: 4
            }]
          }
        });
      }
    }
  }


}
