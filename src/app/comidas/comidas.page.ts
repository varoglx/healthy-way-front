import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { RecetasComponent } from '../modals/recetas/recetas.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.page.html',
  styleUrls: ['./comidas.page.scss'],
})
export class ComidasPage implements OnInit {

  tipoDieta: string | null = null; // Define the tipoDieta property

  constructor(private modalController: ModalController, private alertController: AlertController) { }

  async openModal() {
    this.tipoDieta = localStorage.getItem('tipo_dieta'); // Ensure tipoDieta is updated from local storage
    if (!this.tipoDieta) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Debe seleccionar un tipo de dieta antes de ver las recetas.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      console.log('Abrir modal con recetas');
      const modal = await this.modalController.create({
        component: RecetasComponent
      });
      return await modal.present();
    }
  }

  guardarTipoDieta(event: any) {
    const tipoDieta = event.detail.value;
    console.log(tipoDieta);
    this.tipoDieta = tipoDieta; // Set the tipoDieta property
    localStorage.setItem('tipo_dieta', tipoDieta); // Update local storage
  }

  ngOnInit() {
    this.tipoDieta = localStorage.getItem('tipo_dieta'); // Load the saved tipoDieta value on init
  }

}
