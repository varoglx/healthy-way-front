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

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    if (this.newEmail && this.password) {
      try {
        await this.authService.updateEmail(this.newEmail);
        this.userProfile.email = this.newEmail;
        console.log('Correo electrónico actualizado con éxito');
        // Opcionalmente, muestra un mensaje de éxito aquí
      } catch (error) {
        console.error('Error al actualizar el correo electrónico:', error);
      }
    }

    if (this.userProfile) {
      this.authService.getCurrentUser().subscribe(user => {
        if (user) {
          this.authService.updateUserProfile(user.uid, this.userProfile).then(() => {
            console.log('Perfil actualizado con éxito');
            this.closeModal();
          }).catch(error => {
            console.error('Error al actualizar el perfil:', error);
          });
        }
      });
    }
  }
}
