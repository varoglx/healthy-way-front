import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService, Exercise } from '../../services/auth.service';

interface Category {
  name: string;
  exercises: Exercise[];
}

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss'],
})
export class EjerciciosComponent implements OnInit {
  categories: Category[] = [
    {
      name: 'Perdida de Peso',
      exercises: []
    },
  ];

  newExercise: Exercise = { name: '', description: '', image: '', category: 'Perdida de Peso' };
  selectedFile: File | null = null;
  isLoading = false;

  @ViewChild('btnSubirAdjunto', { static: false }) btnSubirAdjunto!: ElementRef;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises() {
    this.authService.getExercises().subscribe(data => {
      this.categories[0].exercises = data.map(e => {
        const data = e.payload.doc.data() as Exercise;
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async addExercise() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }

    this.isLoading = true;

    // Verificar si btnSubirAdjunto está definido antes de acceder a nativeElement
    if (this.btnSubirAdjunto && this.btnSubirAdjunto.nativeElement) {
      this.btnSubirAdjunto.nativeElement.disabled = true;
    }

    try {
      const url = await this.authService.subirImagen(this.selectedFile);
      this.newExercise.image = url;

      await this.authService.addExercise(this.newExercise);
      this.newExercise = { name: '', description: '', image: '', category: 'Perdida de Peso' };
      this.selectedFile = null;
      this.isLoading = false;

      // Verificar y deshabilitar btnSubirAdjunto después de completar la operación
      if (this.btnSubirAdjunto && this.btnSubirAdjunto.nativeElement) {
        this.btnSubirAdjunto.nativeElement.disabled = false;
      }

      this.loadExercises(); // Actualizar la lista de ejercicios después de la carga
    } catch (error) {
      console.error('Error al agregar el ejercicio:', error);
      this.isLoading = false;

      // Manejar el error de manera adecuada (mostrar mensaje al usuario, etc.)
    }
  }

  updateExercise(exercise: Exercise) {
    // Implementa la lógica para actualizar un ejercicio existente
  }

  deleteExercise(id: string) {
    // Implementa la lógica para eliminar un ejercicio existente
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
