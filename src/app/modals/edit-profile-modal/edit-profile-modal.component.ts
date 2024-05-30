import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService , UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent {

  @Input() userId: string = '';
  userProfile: UserProfile = {};

  constructor(private modalController: ModalController, private authService: AuthService) {}

  ngOnInit() {
    if (this.userId) {
      this.authService.getUserProfile(this.userId).subscribe(profile => {
        if (profile) {
          this.userProfile = profile;
        }
      }, error => {
        console.error('Error al cargar el perfil del usuario', error);
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveProfile() {
    this.authService.updateUserProfile(this.userId, this.userProfile).then(() => {
      console.log('Perfil actualizado exitosamente');
      this.dismiss();
    }).catch(error => {
      console.error('Error al actualizar el perfil', error);
    });
  }
}
