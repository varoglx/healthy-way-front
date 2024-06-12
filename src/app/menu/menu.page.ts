import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ConsejosService } from '../services/consejos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  
  consejoDelDia: string = '';
  constructor(private consejosService: ConsejosService) { }

  ngOnInit(): void {
    this.loadCharts();
    this.consejoDelDia = this.consejosService.getRandomCounseling();
  
  }

  loadCharts() {
    this.loadSleepChart();
    this.loadActivityChart();
    this.loadFoodChart();
  }

  loadSleepChart() {
    const canvas = document.getElementById('sleepChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [{
              label: 'Horas de Sueño',
              data: [7, 8, 6, 7.5, 8, 9, 7],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        });
      }
    }
  }

  loadActivityChart() {
    const canvas = document.getElementById('activityChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [{
              label: 'Minutos de Actividad Física',
              data: [30, 45, 60, 40, 50, 30, 60],
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        });
      }
    }
  }

  loadFoodChart() {
    const canvas = document.getElementById('foodChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Frutas', 'Vegetales', 'Proteínas', 'Carbohidratos', 'Grasas'],
            datasets: [{
              data: [25, 30, 20, 15, 10],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        });
      }
    }
  }

}
