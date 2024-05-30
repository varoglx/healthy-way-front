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
        localStorage.setItem('usuario', JSON.stringify(response.user));
        this.navCtrl.navigateRoot('/comidas');
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }

  goToRegisterPage() {
    this.navCtrl.navigateBack('/registro', { animated: false });
  }
}
