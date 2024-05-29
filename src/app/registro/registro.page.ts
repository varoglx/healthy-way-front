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
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private router: Router) { }

  register() {
    this.authService.registerWithEmail(this.email, this.password).then(
      response => {
        console.log('Registro exitoso', response);
        // Navegar a otra página o mostrar mensaje de éxito
        this.navCtrl.navigateRoot('/login');
      },
      error => {
        console.error('Error en el registro', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }
  
  goToLoginPage() {
    this.navCtrl.navigateBack('/login', { animated: false });
  }
}
