import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
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

  nameError: boolean = false;
  ageError: boolean = false;
  genderError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;

  nameErrorMessage: string = 'El nombre es obligatorio.';
  emailErrorMessage: string = 'El correo electrónico es obligatorio y debe tener un formato válido.';
  passwordErrorMessage: string = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras, números y un carácter especial.';

  constructor(private authService: AuthService, private navCtrl: NavController, private router: Router, private firestore: AngularFirestore) { }

  validateInputs() {
    this.nameError = !this.name;
    this.ageError = !this.age || isNaN(Number(this.age));
    this.genderError = !this.gender;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !this.email || !emailPattern.test(this.email);

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
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
      const nameExists = await this.checkNameAvailability(this.name);
      if (nameExists) {
        this.nameError = true;
        this.nameErrorMessage = 'El nombre ya está en uso. Por favor, elija otro nombre.';
        return;
      }

      const emailExists = await this.checkEmailAvailability(this.email);
      if (emailExists) {
        this.emailError = true;
        this.emailErrorMessage = 'El correo electrónico ya está en uso. Por favor, utilice otro correo.';
        return;
      }

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
          if (error.code === 'auth/email-already-in-use') {
            this.emailError = true;
            this.emailErrorMessage = 'El correo electrónico ya está en uso. Por favor, utilice otro correo.';
          }
        }
      );
    }
  }

  goToLoginPage() {
    this.navCtrl.navigateBack('/login', { animated: false });
  }
}
