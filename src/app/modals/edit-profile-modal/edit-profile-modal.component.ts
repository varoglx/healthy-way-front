import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent {
  @Input() userProfile: UserProfile = {
    name: '',
    age: null,
    gender: '',
    profilePicture: null,
    email: ''
  };

  newEmail: string = '';
  password: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    const namePattern = /^[A-Za-z\s]{4,15}$/;

    // Verificar si el nombre es undefined
    if (!this.userProfile.name) {
      this.errorMessage = 'El nombre no puede estar vacío.';
      this.showError = true;
      return;
    }

    // Validar el nombre con el patrón
    if (!namePattern.test(this.userProfile.name)) {
      this.errorMessage = 'El nombre debe tener entre 4 y 15 caracteres y no debe contener números ni caracteres especiales.';
      this.showError = true;
      return;
    }

    if (this.userProfile) {
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.authService.updateUserProfile(user.uid, this.userProfile).then(() => {
            console.log('Perfil actualizado con éxito');
            this.closeModal();
          }).catch(error => {
            this.errorMessage = 'Error al actualizar el perfil: ' + error.message;
            this.showError = true;
            console.error('Error al actualizar el perfil:', error);
          });
        }
      });
    }
  }
}
