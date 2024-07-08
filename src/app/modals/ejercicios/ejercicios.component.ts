import { Component, OnInit } from '@angular/core';
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

  constructor(private modalController: ModalController, private authService: AuthService) { }

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

  addExercise() {
    this.authService.addExercise(this.newExercise).then(() => {
      this.newExercise = { name: '', description: '', image: '', category: 'Perdida de Peso' };
      this.loadExercises();
    });
  }

  updateExercise(exercise: Exercise) {
    if (exercise.id) {
      this.authService.updateExercise(exercise.id, exercise).then(() => {
        this.loadExercises();
      });
    }
  }

  deleteExercise(id: string) {
    this.authService.deleteExercise(id).then(() => {
      this.loadExercises();
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }
}



