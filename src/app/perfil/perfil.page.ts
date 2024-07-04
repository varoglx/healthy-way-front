import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { AuthService, UserProfile } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { EditProfileModalComponent } from '../modals/edit-profile-modal/edit-profile-modal.component';
import { Router } from '@angular/router';
import { FormularioContrasenaComponent } from '../modals/formulario-contrasena/formulario-contrasena.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements AfterViewInit, OnInit {

  name: string | null = '';
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
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.loadUserProfile();
        } else {
          console.log('No hay usuario autenticado');
          this.router.navigate(['/login']);
        }
      });
    }

  ngAfterViewInit() {
    
  }

  loadUserProfile() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.authService.getUserProfile(user.uid).subscribe(
          profile => {
            if (profile) {
              this.userProfile = profile as UserProfile;
              this.name = this.userProfile?.name ?? '';
              this.email = user.email ?? '';
              this.profilePicture = this.userProfile?.profilePicture ?? null;
              this.age = this.userProfile?.age ?? null;
              this.gender = this.userProfile?.gender ?? '';
              
            } else {
              console.log('No se encontró el perfil del usuario');
            }
          },
          error => {
            console.error('Error al obtener el perfil del usuario:', error);
          }
        );
      } else {
        console.log('No hay usuario autenticado');
        this.router.navigate(['/login']);
      }
    });
  }

  updateProfilePicture() {
    const newPicture = prompt("Ingrese la URL de la nueva foto de perfil:");
    if (newPicture) {
      this.profilePicture = newPicture;
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }

  async abrirModalEditarPerfil() {
    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      componentProps: {
        userProfile: this.userProfile
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.loadUserProfile(); // Recargar el perfil del usuario después de cerrar el modal
      }
    });
    return await modal.present();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FormularioContrasenaComponent
    });
    return await modal.present();
  }
}