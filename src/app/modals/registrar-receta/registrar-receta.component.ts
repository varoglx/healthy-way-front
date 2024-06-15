import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ingrediente } from '../../schema/Ingrediente.model';  // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-registrar-receta',
  templateUrl: './registrar-receta.component.html',
  styleUrls: ['./registrar-receta.component.scss'],
})
export class RegistrarRecetaComponent implements OnInit {
  recetaForm: FormGroup;
  availableIngredients: Ingrediente[] = [
    { nombre: 'Filetes de salmón', cantidad: '200 gramos', proteinas: 40, carbohidratos: 0, grasas: 20, fibra: 0, azucares: 0, sodio: 75, omega3: 2.5, omega6: 0.4 },
    { nombre: 'Quinoa', cantidad: '200 gramos', proteinas: 12, carbohidratos: 39, grasas: 4, fibra: 5, azucares: 1, sodio: 5, omega3: 0.1, omega6: 0.9 },
    { nombre: 'Espinacas', cantidad: '55.6 gramos', proteinas: 2, carbohidratos: 2, grasas: 0, fibra: 2, azucares: 1, sodio: 24, omega3: 0.03, omega6: 0.04 },
    // Otros ingredientes...
  ];

  constructor(private modalController: ModalController, private formBuilder: FormBuilder) {
    this.recetaForm = this.formBuilder.group({
      nombre_receta: ['', Validators.required],
      porciones: ['', [Validators.required, Validators.min(1)]],
      tiempo_elaboracion: ['', Validators.required],
      ingredientes: [[], Validators.required],
      forma_cocinar: ['', Validators.required]  // Mantenerlo como string por ahora
    });
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.recetaForm.valid) {
      const receta = this.recetaForm.value;
      receta.forma_cocinar = receta.forma_cocinar.split('\n'); // Convertir textarea en array de pasos
      receta.vitaminas = this.calculateVitamins(receta.ingredientes);
      receta.nutrientes_totales = this.calculateNutrients(receta.ingredientes);
      receta.calorias = this.calculateCalories(receta.ingredientes);
      console.log(receta);
      // Aquí puedes manejar el envío de los datos, como enviarlos a tu API
      this.dismissModal();
    }
  }

  calculateVitamins(ingredientes: Ingrediente[]): string[] {
    // Lógica para calcular las vitaminas totales
    return ['Vitamina A', 'Vitamina C', 'Vitamina E']; // Ejemplo estático
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
    // Lógica para calcular las calorías totales
    let calorias_totales = 0;
    ingredientes.forEach((ingrediente: Ingrediente) => {
      // Supongamos que las calorías pueden derivarse de las macros: 4 cal/g para proteínas y carbohidratos, 9 cal/g para grasas
      calorias_totales += (ingrediente.proteinas * 4) + (ingrediente.carbohidratos * 4) + (ingrediente.grasas * 9);
    });
    return calorias_totales;
  }
}
