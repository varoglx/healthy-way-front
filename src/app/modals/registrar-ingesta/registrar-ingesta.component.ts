import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-ingesta',
  templateUrl: './registrar-ingesta.component.html',
  styleUrls: ['./registrar-ingesta.component.scss'],
})
export class RegistrarIngestaComponent implements OnInit {
  recipes: any[] = [];
  tipoDieta$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  ingestaForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private http: HttpClient
  ) {
    this.ingestaForm = this.formBuilder.group({
      nombre_receta: ['', Validators.required],
    });
  }

  guardarTipoDieta(event: any) {
    const tipoDieta = event.detail.value;
    this.tipoDieta$.next(tipoDieta);
    localStorage.setItem('tipo_dieta', tipoDieta);
    this.loadRecipes(tipoDieta);
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
      this.tipoDieta$.next(savedTipoDieta);
      this.loadRecipes(savedTipoDieta);
    }
  }

  dismissModal() {
    this.modalController.dismiss();
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
          this.recipes = response.map((recipe) => ({
            ...recipe
          }));
        },
        (error) => {
          console.error('Error al cargar las recetas', error);
          alert('Error al cargar las recetas: ' + error.message);
        }
      );
  }

  async confirmAddRecipe(recipe: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Ingesta',
      message: `¿Deseas agregar la receta "${recipe.nombre_receta}" a tu ingesta del día?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: () => {
            this.addRecipeToIngesta(recipe);
          }
        }
      ]
    });

    await alert.present();
  }

  addRecipeToIngesta(recipe: any) {
    const ingestaHoyStr = localStorage.getItem('ingestaHoy');
    let ingestaHoy = ingestaHoyStr ? JSON.parse(ingestaHoyStr) : [];

    const newRecipe = {
      nombre: recipe.nombre_receta,
      calorias: recipe.calorias_totales,
      imagen: recipe.imageUrl
    };

    // Extender la lista existente con la nueva receta
    ingestaHoy = [...ingestaHoy, newRecipe];
    localStorage.setItem('ingestaHoy', JSON.stringify(ingestaHoy));

    this.dismissModal();
  }
}
