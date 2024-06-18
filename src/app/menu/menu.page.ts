import { Component, OnInit } from '@angular/core';
import { ConsejosService } from '../services/consejos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart, registerables } from 'chart.js';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';
import { ModalController } from '@ionic/angular';
import { EjerciciosComponent } from '../modals/ejercicios/ejercicios.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  consejoDelDia: string = '';
  userUid: string = '';
  userWeights: { month: string, weight: number | null }[] = [];
  weightChart: Chart | null = null; // Store chart instance

  constructor(
    private consejosService: ConsejosService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private modalController: ModalController
  ) {
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {
    this.consejoDelDia = this.consejosService.getRandomCounseling();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userUid = user.uid;
        this.loadUserWeights();
      }
    });
  }

  loadUserWeights() {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.userWeights = months.map(month => ({ month, weight: null }));
  
    this.firestore.collection('bmiData', ref => ref.where('uid', '==', this.userUid)).valueChanges().subscribe(imcData => {
      
  
     
      this.userWeights.forEach(weight => weight.weight = null);
  
      imcData.forEach((data: any) => {
        const [year, month] = data.fecha.split('-');
        const monthIndex = parseInt(month) - 1; 
        const weight = data.peso;
  
        
  
        if (monthIndex >= 0 && monthIndex < 12) {
          this.userWeights[monthIndex].weight = weight;
        }
      });
  
     
      this.renderWeightChart();
    });
  }

  renderWeightChart() {
    const canvas = document.getElementById('weightChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (this.weightChart) {
          // Update existing chart data
          this.weightChart.data.datasets[0].data = this.userWeights.map(data => data.weight);
          this.weightChart.update();
        } else {
          // Create new chart
          this.weightChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.userWeights.map(data => data.month),
              datasets: [{
                label: 'Peso',
                data: this.userWeights.map(data => data.weight),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Peso'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Meses'
                  }
                }
              }
            }
          });
        }
      }
    }
  }

  async openExerciseRecommendations() {
    const modal = await this.modalController.create({
      component: EjerciciosComponent
    });
    return await modal.present();
  }

  
}
