import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  
  constructor(private authService: AuthService, private navCtrl: NavController, private router: Router, private alertController: AlertController) { }

  login() {
    this.loading = true;
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
        this.showErrorAlert(error.code);
      }
    );
  }

  goToRegisterPage() {
    this.navCtrl.navigateBack('/registro', { animated: false });
  }

  goToPasswordResetPage() {
    this.router.navigate(['/password-recovery']);
  }
  
  async showErrorAlert(errorCode: string) {
    this.loading = false;
    const alert = await this.alertController.create({
      header: 'Error',
      message: '',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('Confirm OK');
        }
      }]
    });
  
    switch (errorCode) {
      case 'auth/user-not-found':
        alert.message = 'El usuario no existe.';
        break;
      case 'auth/wrong-password':
        alert.message = 'La contraseña proporcionada no coincide con el usuario especificado.';
        break;
      case 'auth/invalid-email':
        alert.message = 'El correo electrónico proporcionado no tiene un formato válido.';
        break;
      case 'auth/too-many-requests':
        alert.message = 'Se ha alcanzado el límite de solicitudes permitidas.';
        break;
      case 'auth/weak-password':
        alert.message = 'La contraseña proporcionada es demasiado débil.';
        break;
      case 'auth/email-already-in-use':
        alert.message = 'El correo electrónico ya está en uso por otra cuenta.';
        break;
              case 'auth/email-already-in-use':
        alert.message = 'El correo electrónico ya está en uso por otra cuenta.';
        break;
        case 'auth/missing-password':
          alert.message = 'La contraseña esta vacia.';
          break;
          case 'auth/invalid-credential':
            alert.message = 'Las credenciales no son validas.';
            break;
      default:
        alert.message = 'Ocurrió un error desconocido.';
    }
  
    await alert.present();
  }
  
}
