import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string='';
  password: string='';

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response);
        localStorage.setItem('usuario', JSON.stringify(response.user));
        this.navCtrl.navigateRoot('/menu');
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    );
  }
}
