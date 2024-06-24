import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RecetaDetallesComponent } from '../modals/receta-detalles/receta-detalles.component';
import { RegistrarIngestaComponent } from '../modals/registrar-ingesta/registrar-ingesta.component';
import { RegistroComidasComponent } from '../modals/registro-comidas/registro-comidas.component';
import { RegistrarRecetaComponent } from '../modals/registrar-receta/registrar-receta.component';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.page.html',
  styleUrls: ['./comidas.page.scss'],
})
export class ComidasPage implements OnInit {
  recipes: any[] = [];

  tipoDieta$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private http: HttpClient
  ) { }

  get tipoDieta(): string | null {
    return this.tipoDieta$.value;
  }

  async openRegistrarReceta() {
    const modal = await this.modalController.create({
      component: RegistrarRecetaComponent
    });
    return await modal.present();
  }
  async openRegistroComidas() {
    const modal = await this.modalController.create({
      component: RegistroComidasComponent
    });
    return await modal.present();
  }

  async openRecipeDetails(recipe: any) {
    const modal = await this.modalController.create({
      component: RecetaDetallesComponent,
      componentProps: { receta: recipe },
    });
    return await modal.present();
  }

  loadRecipes(tipoDieta: string | null) {
    if (!tipoDieta) {
      this.presentAlert();
      return;
    }

    this.http
      .get<any[]>(`https://us-central1-healthy-way-f7636.cloudfunctions.net/api/recipes?type=${tipoDieta}`)
      .subscribe(
        (response) => {
          this.recipes = response.map((recipe, index) => ({
            ...recipe 
          }));
          console.log('Recetas:', this.recipes);
        },
        (error) => {
          console.error('Error al cargar las recetas', error);
          alert('Error al cargar las recetas: ' + error.message);
        }
      );
  }

  guardarTipoDieta(event: any) {
    const tipoDieta = event.detail.value;
    console.log(tipoDieta);
    this.tipoDieta$.next(tipoDieta); // Update the BehaviorSubject
    localStorage.setItem('tipo_dieta', tipoDieta); // Update local storage
    this.loadRecipes(tipoDieta); // Load recipes for the selected diet type
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Tipo de Dieta',
      message: 'Por favor, selecciona un tipo de dieta.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    const savedTipoDieta = localStorage.getItem('tipo_dieta');
    if (!savedTipoDieta) {
      this.presentAlert();
    } else {
      this.tipoDieta$.next(savedTipoDieta); // Load the saved tipoDieta value on init
      this.loadRecipes(savedTipoDieta);
    }
  }
}
