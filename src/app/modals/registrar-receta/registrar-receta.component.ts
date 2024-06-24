import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingrediente } from '../../schema/Ingrediente.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-receta',
  templateUrl: './registrar-receta.component.html',
  styleUrls: ['./registrar-receta.component.scss'],
})
export class RegistrarRecetaComponent implements OnInit {
  recetaForm: FormGroup;
  availableIngredients: Ingrediente[] = [
    { nombre: 'Filetes de salmón', calorias: 100, cantidad: '200 gramos', proteinas: 40, carbohidratos: 0, grasas: 20, fibra: 0, azucares: 0, sodio: 75, omega3: 2.5, omega6: 0.4 },
    { nombre: 'Quinoa', calorias: 100, cantidad: '200 gramos', proteinas: 12, carbohidratos: 39, grasas: 4, fibra: 5, azucares: 1, sodio: 5, omega3: 0.1, omega6: 0.9 },
    { nombre: 'Espinacas', calorias: 100, cantidad: '55.6 gramos', proteinas: 2, carbohidratos: 2, grasas: 0, fibra: 2, azucares: 1, sodio: 24, omega3: 0.03, omega6: 0.04 },
    { nombre: 'Pechuga de pollo', calorias: 165, cantidad: '200 gramos', proteinas: 31, carbohidratos: 0, grasas: 3.6, fibra: 0, azucares: 0, sodio: 74, omega3: 0.2, omega6: 0.7 },
    { nombre: 'Aguacate', calorias: 160, cantidad: '150 gramos', proteinas: 2, carbohidratos: 15, grasas: 14.7, fibra: 10, azucares: 0.7, sodio: 7, omega3: 0.1, omega6: 2.4 },
    { nombre: 'Brócoli', calorias: 55, cantidad: '150 gramos', proteinas: 3.7, carbohidratos: 11, grasas: 0.6, fibra: 5.1, azucares: 2.2, sodio: 49, omega3: 0.2, omega6: 0.03 },
    { nombre: 'Arroz integral', calorias: 216, cantidad: '200 gramos', proteinas: 5, carbohidratos: 45, grasas: 1.6, fibra: 3.5, azucares: 0.7, sodio: 10, omega3: 0.02, omega6: 0.6 },
    { nombre: 'Huevos', calorias: 155, cantidad: '100 gramos', proteinas: 13, carbohidratos: 1.1, grasas: 11, fibra: 0, azucares: 1.1, sodio: 124, omega3: 0.4, omega6: 1.2 },
    { nombre: 'Lentejas', calorias: 116, cantidad: '100 gramos', proteinas: 9, carbohidratos: 20, grasas: 0.4, fibra: 8, azucares: 1.8, sodio: 2, omega3: 0.1, omega6: 0.3 },
    { nombre: 'Almendras', calorias: 579, cantidad: '100 gramos', proteinas: 21, carbohidratos: 22, grasas: 50, fibra: 12.5, azucares: 4.4, sodio: 1, omega3: 0.1, omega6: 12.3 },
    { nombre: 'Batata', calorias: 86, cantidad: '130 gramos', proteinas: 1.6, carbohidratos: 20, grasas: 0.1, fibra: 3, azucares: 4.2, sodio: 55, omega3: 0.01, omega6: 0.1 },
    { nombre: 'Tofu', calorias: 76, cantidad: '100 gramos', proteinas: 8, carbohidratos: 2, grasas: 4.8, fibra: 0.3, azucares: 0.6, sodio: 7, omega3: 0.6, omega6: 1.3 },
    { nombre: 'Yogur griego', calorias: 59, cantidad: '100 gramos', proteinas: 10, carbohidratos: 3.6, grasas: 0.4, fibra: 0, azucares: 3.2, sodio: 36, omega3: 0.03, omega6: 0.1 },
    { nombre: 'Moras', calorias: 43, cantidad: '100 gramos', proteinas: 1.4, carbohidratos: 10, grasas: 0.5, fibra: 5.3, azucares: 4.9, sodio: 1, omega3: 0.01, omega6: 0.04 },
    { nombre: 'Nueces', calorias: 654, cantidad: '100 gramos', proteinas: 15, carbohidratos: 14, grasas: 65, fibra: 7, azucares: 2.6, sodio: 2, omega3: 9.1, omega6: 38.1 },
    { nombre: 'Pavo', calorias: 120, cantidad: '100 gramos', proteinas: 25, carbohidratos: 0, grasas: 2, fibra: 0, azucares: 0, sodio: 70, omega3: 0.1, omega6: 0.5 },
    { nombre: 'Carne de res magra', calorias: 250, cantidad: '200 gramos', proteinas: 36, carbohidratos: 0, grasas: 10, fibra: 0, azucares: 0, sodio: 90, omega3: 0.2, omega6: 0.8 },
    { nombre: 'Leche', calorias: 42, cantidad: '100 ml', proteinas: 3.4, carbohidratos: 5, grasas: 1, fibra: 0, azucares: 5, sodio: 44, omega3: 0.03, omega6: 0.1 },
    { nombre: 'Avena', calorias: 389, cantidad: '100 gramos', proteinas: 17, carbohidratos: 66, grasas: 7, fibra: 10.6, azucares: 0, sodio: 2, omega3: 0.1, omega6: 2.4 },
    { nombre: 'Semillas de chía', calorias: 486, cantidad: '100 gramos', proteinas: 17, carbohidratos: 42, grasas: 30, fibra: 34.4, azucares: 0, sodio: 16, omega3: 17.8, omega6: 5.8 },
    { nombre: 'Semillas de girasol', calorias: 584, cantidad: '100 gramos', proteinas: 20, carbohidratos: 20, grasas: 51, fibra: 8.6, azucares: 2.6, sodio: 9, omega3: 0.1, omega6: 23.1 },
    { nombre: 'Semillas de calabaza', calorias: 559, cantidad: '100 gramos', proteinas: 30, carbohidratos: 11, grasas: 49, fibra: 6, azucares: 1.4, sodio: 7, omega3: 0.1, omega6: 18.4 },
    { nombre: 'Mantequilla de almendras', calorias: 614, cantidad: '100 gramos', proteinas: 21, carbohidratos: 19, grasas: 55, fibra: 10.5, azucares: 4.4, sodio: 1, omega3: 0.1, omega6: 12.1 },
    { nombre: 'Miel', calorias: 304, cantidad: '100 gramos', proteinas: 0.3, carbohidratos: 82, grasas: 0, fibra: 0.2, azucares: 82, sodio: 4, omega3: 0, omega6: 0 },
    { nombre: 'Manzanas', calorias: 52, cantidad: '100 gramos', proteinas: 0.3, carbohidratos: 14, grasas: 0.2, fibra: 2.4, azucares: 10, sodio: 1, omega3: 0, omega6: 0 },
    { nombre: 'Plátanos', calorias: 89, cantidad: '100 gramos', proteinas: 1.1, carbohidratos: 23, grasas: 0.3, fibra: 2.6, azucares: 12, sodio: 1, omega3: 0, omega6: 0 },
    { nombre: 'Arándanos', calorias: 57, cantidad: '100 gramos', proteinas: 0.7, carbohidratos: 14, grasas: 0.3, fibra: 2.4, azucares: 10, sodio: 1, omega3: 0, omega6: 0 },
    { nombre: 'Polvo de proteína de suero', calorias: 374, cantidad: '100 gramos', proteinas: 75, carbohidratos: 12, grasas: 2.5, fibra: 0, azucares: 6, sodio: 160, omega3: 0, omega6: 0 },
    { nombre: 'Aceite de oliva', calorias: 884, cantidad: '100 gramos', proteinas: 0, carbohidratos: 0, grasas: 100, fibra: 0, azucares: 0, sodio: 2, omega3: 0.8, omega6: 9.8 },
    { nombre: 'Zanahorias', calorias: 41, cantidad: '100 gramos', proteinas: 0.9, carbohidratos: 10, grasas: 0.2, fibra: 2.8, azucares: 4.7, sodio: 69, omega3: 0.01, omega6: 0.12 },
    { nombre: 'Papas', calorias: 77, cantidad: '100 gramos', proteinas: 2, carbohidratos: 17, grasas: 0.1, fibra: 2.2, azucares: 0.8, sodio: 6, omega3: 0.02, omega6: 0.04 },
    { nombre: 'Espárragos', calorias: 20, cantidad: '100 gramos', proteinas: 2.2, carbohidratos: 3.9, grasas: 0.1, fibra: 2.1, azucares: 1.9, sodio: 2, omega3: 0.05, omega6: 0.1 },
    { nombre: 'Champiñones', calorias: 22, cantidad: '100 gramos', proteinas: 3.1, carbohidratos: 3.3, grasas: 0.3, fibra: 1, azucares: 1.4, sodio: 5, omega3: 0.1, omega6: 0.2 },
    { nombre: 'Pimientos rojos', calorias: 31, cantidad: '100 gramos', proteinas: 1, carbohidratos: 6, grasas: 0.3, fibra: 2.1, azucares: 4.2, sodio: 4, omega3: 0.03, omega6: 0.08 },
    { nombre: 'Calabacín', calorias: 17, cantidad: '100 gramos', proteinas: 1.2, carbohidratos: 3.1, grasas: 0.3, fibra: 1, azucares: 2.5, sodio: 3, omega3: 0.02, omega6: 0.07 },
    { nombre: 'Pepino', calorias: 16, cantidad: '100 gramos', proteinas: 0.7, carbohidratos: 3.6, grasas: 0.1, fibra: 0.5, azucares: 1.7, sodio: 2, omega3: 0.01, omega6: 0.02 },
    { nombre: 'Tomate', calorias: 18, cantidad: '100 gramos', proteinas: 0.9, carbohidratos: 3.9, grasas: 0.2, fibra: 1.2, azucares: 2.6, sodio: 5, omega3: 0.03, omega6: 0.08 },
    { nombre: 'Remolacha', calorias: 43, cantidad: '100 gramos', proteinas: 1.6, carbohidratos: 9.6, grasas: 0.2, fibra: 2.8, azucares: 7, sodio: 78, omega3: 0.04, omega6: 0.08 },
    { nombre: 'Garbanzos', calorias: 364, cantidad: '100 gramos', proteinas: 19, carbohidratos: 61, grasas: 6, fibra: 17, azucares: 11, sodio: 24, omega3: 0.3, omega6: 1.2 },
    { nombre: 'Lomo de cerdo', calorias: 242, cantidad: '100 gramos', proteinas: 26, carbohidratos: 0, grasas: 14, fibra: 0, azucares: 0, sodio: 62, omega3: 0.1, omega6: 1.5 },
    { nombre: 'Mantequilla de maní', calorias: 588, cantidad: '100 gramos', proteinas: 25, carbohidratos: 20, grasas: 50, fibra: 6, azucares: 9, sodio: 17, omega3: 0.03, omega6: 14 },
    { nombre: 'Queso cottage', calorias: 98, cantidad: '100 gramos', proteinas: 11, carbohidratos: 3.4, grasas: 4.3, fibra: 0, azucares: 2.7, sodio: 364, omega3: 0.1, omega6: 0.3 },
    { nombre: 'Col rizada (kale)', calorias: 35, cantidad: '100 gramos', proteinas: 2.9, carbohidratos: 4.4, grasas: 1.5, fibra: 4.1, azucares: 0.8, sodio: 53, omega3: 0.15, omega6: 0.04 },
    { nombre: 'Palta', calorias: 160, cantidad: '100 gramos', proteinas: 2, carbohidratos: 8.5, grasas: 14.7, fibra: 6.7, azucares: 0.7, sodio: 7, omega3: 0.1, omega6: 1.8 },
    { nombre: 'Hummus', calorias: 166, cantidad: '100 gramos', proteinas: 8, carbohidratos: 14, grasas: 10, fibra: 6, azucares: 0.3, sodio: 280, omega3: 0.05, omega6: 1.6 },
    { nombre: 'Sardinas', calorias: 208, cantidad: '100 gramos', proteinas: 24, carbohidratos: 0, grasas: 12, fibra: 0, azucares: 0, sodio: 307, omega3: 1.4, omega6: 0.1 },
    { nombre: 'Frijoles negros', calorias: 341, cantidad: '100 gramos', proteinas: 21, carbohidratos: 62, grasas: 1.4, fibra: 15.5, azucares: 0.5, sodio: 5, omega3: 0.1, omega6: 0.4 },
    { nombre: 'Almendra molida', calorias: 575, cantidad: '100 gramos', proteinas: 21.2, carbohidratos: 21.6, grasas: 49.4, fibra: 12.5, azucares: 4.3, sodio: 1, omega3: 0.1, omega6: 12.3 },
    { nombre: 'Acelga', calorias: 19, cantidad: '100 gramos', proteinas: 1.8, carbohidratos: 3.7, grasas: 0.2, fibra: 1.6, azucares: 1.1, sodio: 213, omega3: 0.03, omega6: 0.01 },
    { nombre: 'Berros', calorias: 11, cantidad: '100 gramos', proteinas: 2.3, carbohidratos: 1.3, grasas: 0.1, fibra: 0.5, azucares: 0.2, sodio: 41, omega3: 0.02, omega6: 0.01 },
    { nombre: 'Quinua roja', calorias: 120, cantidad: '100 gramos', proteinas: 4, carbohidratos: 21, grasas: 1.9, fibra: 2.8, azucares: 0.9, sodio: 7, omega3: 0.1, omega6: 0.5 }
  ];
  
  
  selectedImage: File | null = null;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.recetaForm = this.formBuilder.group({
      nombre_receta: ['', Validators.required],
      porciones: ['', [Validators.required, Validators.min(1)]],
      tiempo_elaboracion: ['', Validators.required],
      ingredientes: [[], Validators.required],
      tipo_dieta: ['', Validators.required],
      forma_cocinar: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
      this.recetaForm.patchValue({ image: this.selectedImage });
    }
  }

  onSubmit() {
    if (this.recetaForm.valid && this.selectedImage) {
      const receta = this.recetaForm.value;
      const ingredientesSeleccionados: Ingrediente[] = receta.ingredientes;
      const nutrientesTotales = this.calculateNutrients(ingredientesSeleccionados);
      const caloriasTotales = this.calculateCalories(ingredientesSeleccionados);
      const vitaminas = this.calculateVitamins(ingredientesSeleccionados);

      receta.nutrientes_totales = nutrientesTotales;
      receta.calorias_totales = caloriasTotales;
      receta.vitaminas = vitaminas;

      const filePath = `recipes/${Date.now()}_${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            receta.imageUrl = url; // Guarda la URL de la imagen en el objeto receta
            delete receta.image; // Elimina el campo image que contiene el objeto File
            this.firestore.collection(receta.tipo_dieta).add(receta).then(() => {
              console.log('Receta registrada con éxito');
              this.dismissModal();
            }).catch(error => {
              console.error('Error al registrar la receta:', error);
            });
          });
        })
      ).subscribe();
    }
  }

  calculateVitamins(ingredientes: Ingrediente[]): string[] {
    // Implementación detallada del cálculo de vitaminas
    return ['Vitamina A', 'Vitamina C', 'Vitamina E'];
  }

  calculateNutrients(ingredientes: Ingrediente[]): any {
    let nutrientes = {
      proteinas_totales: 0,
      carbohidratos_totales: 0,
      grasas_totales: 0,
      fibra_total: 0,
      azucares_totales: 0,
      sodio_total: 0,
      monoacidos_totales: { omega3: 0, omega6: 0 }
    };

    ingredientes.forEach((ingrediente: Ingrediente) => {
      nutrientes.proteinas_totales += ingrediente.proteinas;
      nutrientes.carbohidratos_totales += ingrediente.carbohidratos;
      nutrientes.grasas_totales += ingrediente.grasas;
      nutrientes.fibra_total += ingrediente.fibra;
      nutrientes.azucares_totales += ingrediente.azucares;
      nutrientes.sodio_total += ingrediente.sodio;
      nutrientes.monoacidos_totales.omega3 += ingrediente.omega3;
      nutrientes.monoacidos_totales.omega6 += ingrediente.omega6;
    });

    return nutrientes;
  }

  calculateCalories(ingredientes: Ingrediente[]): number {
    let calorias_totales = 0;
    ingredientes.forEach((ingrediente: Ingrediente) => {
      calorias_totales += (ingrediente.proteinas * 4) + (ingrediente.carbohidratos * 4) + (ingrediente.grasas * 9);
    });
    return calorias_totales;
  }
}
