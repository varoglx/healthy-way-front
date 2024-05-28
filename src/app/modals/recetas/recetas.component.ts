import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RecetaDetallesComponent } from '../receta-detalles/receta-detalles.component';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss'],
})
export class RecetasComponent implements OnInit {

  recipes: any[] = [];

  constructor(private modalController: ModalController, private http: HttpClient) { }
  images: string[] = [
    '../../../assets/img/batido.webp',
    '../../../assets/img/tacos_de_lechuga.webp',
    '../../../assets/img/omellet_claras_espinacas.webp',
    
    '../../../assets/img/salmon_al_horno_esparragos.webp',
    '../../../assets/img/quinoa_con_vegetales.webp',



  ];

  ngOnInit() {
    this.loadRecipes();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
  async openRecipeDetails(recipe: any) {
    const modal = await this.modalController.create({
      component: RecetaDetallesComponent,
      componentProps: { receta: recipe }
    });
    return await modal.present();
  }
  loadRecipes() {
    this.http.get<any[]>('http://127.0.0.1:5001/healthy-way-f7636/us-central1/api/recipes')
      .subscribe(
        response => {
          this.recipes = response.map((recipe, index) => ({
            ...recipe,
            image: this.images[index % this.images.length] // Asignar imagen de forma cíclica
          }));
          console.log('Recetas:', this.recipes);
        },
        error => {
          console.error('Error al cargar las recetas', error);
        }
      );
  }
}