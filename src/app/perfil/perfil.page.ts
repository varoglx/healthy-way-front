import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { AuthService, UserProfile } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements AfterViewInit, OnInit {

  username: string | null = '';
  email: string = '';
  profilePicture: string | null = null;
  age: number | null = null;
  gender: string = '';

  userProfile: UserProfile | null = null;

  constructor(private http: HttpClient, 
    private authService: AuthService, 
    private modalController: ModalController,
    private router: Router) { }

  ngOnInit(): void {
    const userJsonString = localStorage.getItem('usuario');
    const userObject = userJsonString ? JSON.parse(userJsonString) : null;
    this.username = userObject ? userObject.username : null;
    console.log(this.username);

    this.loadUserEmail();

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.authService.getUserProfile(user.uid).subscribe(profile => {
          if (profile) {
            this.userProfile = profile as UserProfile;
            this.username = this.userProfile?.username ?? '';
            this.email = user.email ?? '';
            this.profilePicture = this.userProfile?.profilePicture ?? null;
            this.age = this.userProfile?.age ?? null;
            this.gender = this.userProfile?.gender ?? '';
            console.log('Perfil del usuario:', profile);
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.createDoughnutChart();
  }

  loadUserEmail() {
    this.http.post<{ message: string, email: string }>('https://us-central1-healthy-way-f7636.cloudfunctions.net/api/getUserEmail', { username: this.username })
      .subscribe(
        response => {
          this.email = response.email;
          console.log('Correo electrónico:', this.email);
        },
        error => {
          console.error('Error al cargar el correo del usuario', error);
        }
      );
  }

  updateProfilePicture() {
    const newPicture = prompt("Ingrese la URL de la nueva foto de perfil:");
    if (newPicture) {
      this.profilePicture = newPicture;
    }
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
              data: [1.256],
              backgroundColor: ['#ff6384'],
              hoverOffset: 2
            }]
          },
          options: {
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return tooltipItem.raw + ' KG perdidos este mes';
                  }
                }
              }
            }
          }
        });
      }
    }
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      componentProps: { userProfile: this.userProfile }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.userProfile = data.data;
        this.username = this.userProfile?.username ?? '';
        this.profilePicture = this.userProfile?.profilePicture ?? null;
        this.age = this.userProfile?.age ?? null;
        this.gender = this.userProfile?.gender ?? '';
      }
    });
    return await modal.present();
  }

  logout() {
    this.authService.logout().then(() => {
      localStorage.removeItem('usuario'); // Eliminar usuario del localStorage si es necesario
      this.router.navigate(['/login']); // Redirigir a la página de login
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
