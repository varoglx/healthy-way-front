import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  
  constructor(private authService: AuthService, private navCtrl: NavController, private router: Router) { }

  login() {
    this.authService.loginWithEmail(this.email, this.password).then(
      response => {
        console.log('Inicio de sesión exitoso', response);
        if (response.user && response.user.uid) {
          this.authService.getUserProfile(response.user.uid).subscribe(
            userProfile => {
              
              localStorage.setItem('usuario', JSON.stringify(userProfile));
              this.navCtrl.navigateRoot('/menu');
            },
            error => {
              console.error('Error al obtener datos del usuario', error);
            }
          );
        } else {
          console.error('El objeto de usuario en la respuesta es nulo');
          
        }
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        
      }
    );
  }

  goToRegisterPage() {
    this.navCtrl.navigateBack('/registro', { animated: false });
  }
}
