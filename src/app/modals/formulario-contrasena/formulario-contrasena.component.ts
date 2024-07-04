import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-contrasena',
  templateUrl: './formulario-contrasena.component.html',
  styleUrls: ['./formulario-contrasena.component.scss'],
})
export class FormularioContrasenaComponent  implements OnInit {
  newPassword: string = '';
  loading: boolean = false;
  showError: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private modalController: ModalController,private alertController: AlertController) { }

  ngOnInit() {
    this.showAlert1('Para el cambio de contraseña, es necesario que haya iniciado sesión hace menos de 5 minutos.');
  }

  changePassword() {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,16}$/;

    if (!passwordPattern.test(this.newPassword)) {
      this.errorMessage = 'La contraseña debe tener entre 8 y 16 caracteres, incluir al menos una letra, un número y un carácter especial.';
      this.showError = true;
      return;
    }

    this.loading = true;
    this.authService.updatePassword(this.newPassword).then(
      () => {
        this.loading = false;
        this.showSuccess = true;
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Error al cambiar la contraseña: ' + error.message;
        this.showError = true;
      }
    );
  }
  dismiss() {
    this.modalController.dismiss();
  }
 async showAlert1(message: string) {
    const alert = this.alertController.create({
      header: 'Advertencia',
      message: message,
      buttons: [
        {
          text: 'Aceptar',
        }
      ]
    });
    (await alert).present();
  }
}
