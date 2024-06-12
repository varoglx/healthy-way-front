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
      this.loadUserProfile();
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
              console.log('Perfil del usuario:', profile);
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
       
      }
    });
  }

  updateProfilePicture() {
    const newPicture = prompt("Ingrese la URL de la nueva foto de perfil:");
    if (newPicture) {
      this.profilePicture = newPicture;
    }
  }

  

  logout() {
    this.authService.logout().then(() => {
      localStorage.removeItem('usuario'); 
      this.router.navigate(['/login']); 
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }


  
}