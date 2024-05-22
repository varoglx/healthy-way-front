import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string='';
  username: string='';
  password: string='';

  constructor(private authService: AuthService, private navCtrl: NavController) { }

  register() {
    this.authService.register(this.email, this.username, this.password).subscribe(
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
}
