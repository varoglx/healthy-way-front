
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

  categories = [
    {
      name: 'Perdida de Peso',
      exercises: [
        {
          name: 'Saltar la cuerda',
          description: 'Este ejercicio es excelente para quemar calorías y mejorar la resistencia cardiovascular. Simplemente sostén una cuerda en cada mano y salta sobre ella, manteniendo los codos cerca del cuerpo y girando las muñecas para mover la cuerda.',
          image: 'assets/ejercicios/SaltarLacuerda.webp'
        },
        
        {
          name: 'Sentadillas',
          description: 'Excelente ejercicio para fortalecer las piernas y glúteos. Párate con los pies separados al ancho de los hombros, baja el cuerpo flexionando las rodillas y manteniendo la espalda recta, como si te fueras a sentar en una silla. Luego, vuelve a la posición inicial.',
          image: 'assets/ejercicios/sentadillas.jpg' 
        },
        {
          name: 'Plancha',
          description: 'Gran ejercicio para fortalecer el core y mejorar la estabilidad. Apóyate en el suelo con los antebrazos y los dedos de los pies, manteniendo el cuerpo en línea recta desde la cabeza hasta los talones. Mantén esta posición durante 30 segundos o más.',
          image: 'assets/ejercicios/plancha.webp'
        },
        {
          name: 'Flexiones de brazos',
          description: 'Perfectas para fortalecer los brazos, el pecho y los hombros. Apóyate en el suelo boca abajo, con las manos a la altura de los hombros y los pies juntos. Baja el cuerpo flexionando los codos y luego vuelve a la posición inicial extendiendo los brazos.',
          image: 'assets/ejercicios/flexiones.webp'
        },
        {
          name: 'Lunges o zancadas',
          description: 'Ayudan a fortalecer las piernas y mejorar el equilibrio. Da un paso hacia adelante con una pierna y baja el cuerpo hasta que ambas rodillas estén flexionadas en ángulos de 90 grados. Luego, vuelve a la posición inicial y repite con la otra pierna.',
          image: 'assets/ejercicios/sancada.webp'
        },
        {
          name: 'Burpees',
          description: 'Un ejercicio de cuerpo completo que mejora la resistencia y quema calorías. Comienza de pie, luego agáchate y coloca las manos en el suelo, salta hacia atrás en posición de plancha, haz una flexión de brazos, salta hacia adelante, levántate y salta hacia arriba con los brazos extendidos.',
          image:'assets/ejercicios/burpees.webp'
        },
        {
          name: 'Mountain climbers',
          description: 'Excelente ejercicio cardiovascular que también trabaja el core y los brazos. Apóyate en el suelo en posición de plancha y alterna rápidamente llevando las rodillas hacia el pecho, como si estuvieras corriendo en el lugar.',
          image: 'assets/ejercicios/mountan.webp'
        },
        {
          name: 'Crunches o abdominales',
          description: 'Ayudan a fortalecer los músculos abdominales. Acuéstate boca arriba con las rodillas dobladas y los pies apoyados en el suelo. Coloca las manos detrás de la cabeza, levanta el torso hacia arriba y luego baja de nuevo, manteniendo el abdomen contraído.',
          image: 'assets/ejercicios/abdominales.webp'
        },
        {
          name: 'Flexiones de piernas',
          description: 'Trabajan los músculos de la parte posterior de las piernas. Acuéstate boca arriba con las piernas extendidas y levántalas hacia arriba lo más alto posible, manteniendo los abdominales contraídos. Luego, baja las piernas lentamente sin tocar el suelo y repite.',
          image: 'assets/ejercicios/flexiondepierna.webp'
        },
      ]
    },
    
  ];

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }
}