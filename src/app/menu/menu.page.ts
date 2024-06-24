import { Component, OnInit } from '@angular/core';
import { ConsejosService } from '../services/consejos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { EjerciciosComponent } from '../modals/ejercicios/ejercicios.component';

interface SuenoEntry {
  time: number;
  date: string;
  day?: string;
  hour?: string; // Hacer opcional si no siempre la vas a tener disponible
  averageSleep?: number;
}

interface SuenoMesEntry {
  time: number;
  date: string;
  day?: string; // Hacer opcional si no siempre la vas a tener disponible
  averageSleep?: number;
}

interface CaloriasEntry {
  calorias: number;
  fecha: string;
  day?: string;
  averageCalories?: number;
  totalCalorias: number;
}


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
  sleepChart: any;
  sleepChartMes: any;
  caloriesChart: any;
  fecha: string = '';

  constructor(
    private consejosService: ConsejosService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private as: AuthService,
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
        this.loadCaloriesData();
      }
    });
    console.log(this.userUid);
    this.consulta();
    this.consultaMes();

    this.fecha = this.getMonth(new Date().getMonth())
  }

  getMonth(monthNumber: number) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[monthNumber];
  }

  // Usando la función para obtener el nombre del mes actual



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

  consulta() {
    this.as.getCurrentUser().subscribe(async user => {
      if (user) {
        this.userUid = user.uid;
  
        // Obtén los datos de sueno directamente
        this.firestore.collection(`users/${user.uid}/sueno`).valueChanges()
          .subscribe((sueno: unknown[]) => {
            const entries: SuenoEntry[] = sueno as SuenoEntry[];
  
            // Paso 1: Filtrar los datos de la semana actual
            const startOfWeek = this.getStartOfWeek(new Date());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999); // Asegurarse de incluir todo el día domingo
  
            const datosDeLaSemanaActual: SuenoEntry[] = entries.filter(entry => {
              const entryDate = new Date(entry.date);
              return entryDate >= startOfWeek && entryDate <= endOfWeek;
            });
  
            // Paso 2: Crear un array con todos los días de la semana
            const daysOfWeek: { date: string; day: string; time: number }[] = [];
            for (let i = 0; i < 7; i++) {
              const dayOfWeek = new Date(startOfWeek);
              dayOfWeek.setDate(dayOfWeek.getDate() + i);
              daysOfWeek.push({
                date: dayOfWeek.toISOString().split('T')[0], // Solo la parte de la fecha
                day: dayOfWeek.toLocaleDateString('es-ES', { weekday: 'long' }),
                time: 0
              });
            }
  
            // Paso 3: Llenar los datos de sueño para cada día
            daysOfWeek.forEach(day => {
              const dayEntries = datosDeLaSemanaActual.filter(entry => {
                const entryDate = entry.date.split('T')[0];
                return entryDate === day.date;
              });
              if (dayEntries.length > 0) {
                day.time = dayEntries.reduce((total, entry) => total + entry.time, 0);
              }
            });
  
            // Paso 4: Pasar los datos completos al gráfico
            this.renderSleepChart(daysOfWeek);
          });
      }
    });
  }
  
  renderSleepChart(sueno: { date: string; day: string; time: number }[]) {
    const canvas = document.getElementById('sleepChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (!this.sleepChart) {
          this.sleepChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: sueno.map(entry => entry.day), // Usar el día de la semana como etiqueta del eje X
              datasets: [{
                label: 'Horas de Sueño',
                data: sueno.map(entry => entry.time),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    text: 'Horas de Sueño'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Días de la Semana'
                  }
                }
              }
            }
          });
        } else {
          this.sleepChart.data.labels = sueno.map(entry => entry.day);
          this.sleepChart.data.datasets[0].data = sueno.map(entry => entry.time);
          this.sleepChart.update();
        }
      }
    }
  }
  
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);  // Ajuste si el día es domingo
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0); // Establecer al inicio del día
    return startOfWeek;
  }
  
  loadCaloriesData() {
    this.as.getCurrentUser().subscribe(async user => {
      if (user) {
        this.userUid = user.uid;

        this.firestore.collection(`users/${user.uid}/calorias`).valueChanges()
          .subscribe((calorias: unknown[]) => {
            const entries: CaloriasEntry[] = calorias as CaloriasEntry[];
            console.log('Datos recuperados:', entries);

            // Filtrar los datos del mes actual
            const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

            const datosDelMesActual: CaloriasEntry[] = entries.filter(entry => {
              const entryDate = new Date(entry.fecha);
              return entryDate >= startOfMonth && entryDate <= endOfMonth;
            });
            console.log('Datos del mes actual:', datosDelMesActual);

            // Calcular el promedio de calorías por día del mes
            const datosPromediadosPorDia: CaloriasEntry[] = [];
            for (let i = 0; i < endOfMonth.getDate(); i++) {
              const dayOfMonth = new Date(startOfMonth);
              dayOfMonth.setDate(dayOfMonth.getDate() + i);
              const dayEntries = datosDelMesActual.filter(entry => {
                const entryDate = new Date(entry.fecha);
                return entryDate.toDateString() === dayOfMonth.toDateString();
              });
              console.log('dayEntries:', dayEntries);

              const totalCalorias = dayEntries.reduce((total, entry) => total + entry.totalCalorias, 0);
              const promedioCalorias = dayEntries.length > 0 ? totalCalorias / dayEntries.length : 0;
              console.log('promedioCalorias:', promedioCalorias);

              datosPromediadosPorDia.push({
                fecha: dayOfMonth.toISOString(),
                calorias: promedioCalorias,
                day: dayOfMonth.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
                averageCalories: promedioCalorias,
                totalCalorias: promedioCalorias
              });
            }
            console.log('datosPromediadosPorDia:', datosPromediadosPorDia);

            // Pasar los datos procesados al gráfico
            this.renderCaloriesChart(datosPromediadosPorDia);
          });
      }
    });
  }

  renderCaloriesChart(calorias: CaloriasEntry[]) {
    const canvas = document.getElementById('caloriesChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (!this.caloriesChart) {
          this.caloriesChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: calorias.map(entry => entry.day), // Usar el día del mes como etiqueta del eje X
              datasets: [{
                label: 'Calorías Consumidas',
                data: calorias.map(entry => entry.averageCalories),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                    text: 'Calorías Consumidas'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Días del Mes'
                  }
                }
              }
            }
          });
        } else {
          this.caloriesChart.data.labels = calorias.map(entry => entry.day);
          this.caloriesChart.data.datasets[0].data = calorias.map(entry => entry.averageCalories);
          this.caloriesChart.update();
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

  consultaMes() {
    this.as.getCurrentUser().subscribe(async user => {
      if (user) {
        this.userUid = user.uid;

        // Obtén los datos de sueno directamente
        this.firestore.collection(`users/${user.uid}/sueno`).valueChanges()
          .subscribe((sueno: unknown[]) => {
            const entries: SuenoMesEntry[] = sueno as SuenoMesEntry[];

            // Paso 1: Filtrar los datos del mes actual
            const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

            const datosDelMesActual: SuenoMesEntry[] = entries.filter(entry => {
              const entryDate = new Date(entry.date);
              return entryDate >= startOfMonth && entryDate <= endOfMonth;
            });

            // Paso 2: Calcular el total de horas por día del mes
            const datosPorDiaDelMes: { [key: string]: number } = {};
            datosDelMesActual.forEach(entry => {
              const entryDate = new Date(entry.date);
              // Ajustar a la zona horaria local para evitar desajustes de fecha
              const localDate = new Date(entryDate.getTime() + entryDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
              if (!datosPorDiaDelMes[localDate]) {
                datosPorDiaDelMes[localDate] = 0;
              }
              datosPorDiaDelMes[localDate] += entry.time;
            });

            // Convertir el objeto en un array de SuenoEntry y ordenarlo por fecha
            const datosDelMesArray: SuenoMesEntry[] = Object.keys(datosPorDiaDelMes).map(date => {
              const currentDate = new Date(date);
              // Sumar un día a la fecha actual para mostrar el día correcto en la interfaz
              currentDate.setDate(currentDate.getDate() + 1);

              return {
                date: currentDate.toISOString().split('T')[0],
                time: datosPorDiaDelMes[date],
                day: currentDate.getDate().toString(), // Mostrar el día del mes como etiqueta
                averageSleep: datosPorDiaDelMes[date] // Total de horas de sueño
              };
            }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            // Paso 3: Pasar los datos procesados al gráfico
            this.renderSleepChartMes(datosDelMesArray);
          });
      }
    });
  }

  renderSleepChartMes(sueno: SuenoMesEntry[]) {
    const canvas = document.getElementById('sleepChartMes') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (!this.sleepChartMes) {
          this.sleepChartMes = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: sueno.map(entry => entry.day), // Usar el día del mes como etiqueta del eje X
              datasets: [{
                label: 'Horas de Sueño',
                data: sueno.map(entry => entry.averageSleep),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    text: 'Horas de Sueño'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Días del Mes'
                  }
                }
              }
            }
          });
        } else {
          this.sleepChartMes.data.labels = sueno.map(entry => entry.day);
          this.sleepChartMes.data.datasets[0].data = sueno.map(entry => entry.averageSleep);
          this.sleepChartMes.update();
        }
      }
    }
  }



}


