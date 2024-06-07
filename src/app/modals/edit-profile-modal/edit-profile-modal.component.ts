import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent {
  @Input() userProfile: UserProfile = {};

  constructor(private modalController: ModalController, private authService: AuthService) { }

  closeModal() {
    this.modalController.dismiss();
  }

  saveProfile() {
    if (this.authService.currentUser) {
      this.authService.updateUserProfile(this.authService.currentUser.uid, this.userProfile)
        .then(() => {
          this.modalController.dismiss(this.userProfile);
        })
        .catch(error => {
          console.error('Error updating profile:', error);
        });
    }
  }
}
