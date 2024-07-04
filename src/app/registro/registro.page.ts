import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  loading: boolean = false;


  nameError: boolean = false;
  ageError: boolean = false;
  genderError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  nameErrorMessage: string = 'El nombre es obligatorio.';
  emailErrorMessage: string = 'El correo electrónico es obligatorio y debe tener un formato válido.';
  passwordErrorMessage: string = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y un carácter especial.';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) { }




  validateInputs() {
    this.nameError = !this.name;
    this.genderError = !this.gender;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !this.email || !emailPattern.test(this.email);

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,16}$/;
    this.passwordError = !this.password || !passwordPattern.test(this.password);

    return !this.nameError && !this.ageError && !this.genderError && !this.emailError && !this.passwordError;
  }

  async checkNameAvailability(name: string) {
    const snapshot = await this.firestore.collection('users', ref => ref.where('name', '==', name)).get().toPromise();
    return snapshot && !snapshot.empty;
  }

  async checkEmailAvailability(email: string) {
    const snapshot = await this.firestore.collection('users', ref => ref.where('email', '==', email)).get().toPromise();
    return snapshot && !snapshot.empty;
  }

  async register() {
    if (this.validateInputs()) {
      this.loading = true;
      const nameExists = await this.checkNameAvailability(this.name);
      if (nameExists) {
        this.loading = false;
        this.nameError = true;
        this.nameErrorMessage = 'El nombre ya está en uso. Por favor, elija otro nombre.';
        return;
      }

      const emailExists = await this.checkEmailAvailability(this.email);
      if (emailExists) {
        this.loading = false;
        this.emailError = true;
        this.emailErrorMessage = 'El correo electrónico ya está en uso. Por favor, utilice otro correo.';
        return;
      }

        this.authService.registerWithEmail(this.email, this.password).then(
        async response => {
          console.log('Registro exitoso', response);
          const userId = response.user?.uid;
          if (userId) {
            const profileData = {
              name: this.name,
              gender: this.gender
            };
            await this.authService.updateUserProfile(userId, profileData);
            console.log('Perfil actualizado exitosamente');
            await this.showSuccessAlert();
            this.loading = false;
          }
        }
        ,
        error => {
          console.error('Error en el registro', error);
          if (error.code === 'auth/email-already-in-use') {
            this.loading = false;
            this.emailError = true;
            this.emailErrorMessage = 'El correo electrónico ya está en uso. Por favor, utilice otro correo.';
          }
        }
      );
    }
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: '¡Felicitaciones!',
      message: 'Se ha registrado exitosamente en el HEALTHY WAY!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.navigateRoot('/login');
        }
      }]
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  validateAge(event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 2) {
      this.age = value.slice(0, 2);
    }
  }

  goToLoginPage() {
    this.navCtrl.navigateBack('/login', { animated: false });
  }
}
