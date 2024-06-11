import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name: string = '';
  age: string = '';
  gender: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private router: Router) { }

  register() {
    this.authService.registerWithEmail(this.email, this.password).then(
      response => {
        console.log('Registro exitoso', response);
        const userId = response.user?.uid;
        if (userId) {
          const profileData = {
            name: this.name,
            age: this.age,
            gender: this.gender
          };
          this.authService.updateUserProfile(userId, profileData).then(() => {
            console.log('Perfil actualizado exitosamente');
            this.navCtrl.navigateRoot('/login');
          });
        }
      },
      error => {
        console.error('Error en el registro', error);
      }
    );
  }
  
  goToLoginPage() {
    this.navCtrl.navigateBack('/login', { animated: false });
  }
}
