import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {
  email: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  async resetPassword() {
    if (!this.email) {
      this.errorMessage = 'Por favor, ingresa tu correo electrónico.';
      return;
    }

    this.loading = true;
    try {
      await this.authService.recuperarContrasena(this.email);
      this.errorMessage = '';
      console.log('Se ha enviado un correo electrónico para restablecer tu contraseña.');

      const toast = await this.toastController.create({
        message: 'Correo de recuperación enviado. Serás redirigido al inicio de sesión.',
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();

      setTimeout(() => {
        this.navCtrl.navigateRoot('/login');
      }, 3000);
    } catch (error: any) {
      this.errorMessage = error.message || 'Ha ocurrido un error al recuperar la contraseña.';
      console.error('Error al recuperar la contraseña:', error);
    } finally {
      this.loading = false;
    }
  }

  goToLoginPage() {
    this.navCtrl.navigateBack('/login');
  }
  
}
