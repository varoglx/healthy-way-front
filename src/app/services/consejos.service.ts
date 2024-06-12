import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsejosService {

  private counselingList: string[] = [
    "Bebe mucha agua.",
    "Come frutas y verduras.",
    "Haz ejercicio regularmente.",
    "Duerme al menos 7-8 horas.",
    "Evita el estrés.",
    "Mantén una actitud positiva.",
    "Come despacio y disfruta de la comida.",
    "Evita las comidas procesadas.",
    "Toma tiempo para ti mismo.",
    "Mantén una buena postura.",
    "Practica la meditación.",
    "Escucha música relajante.",
    "Pasa tiempo al aire libre.",
    "Conéctate con la naturaleza.",
    "Ríe todos los días.",
    "Rodéate de personas positivas.",
    "Establece metas alcanzables.",
    "Aprende algo nuevo cada día.",
    "Evita el consumo excesivo de alcohol.",
    "No fumes.",
    "Mantén una dieta equilibrada.",
    "Practica el autocuidado.",
    "Haz estiramientos diarios.",
    "Lee libros que te inspiren.",
    "Escribe un diario de gratitud.",
    "Toma descansos regulares durante el trabajo.",
    "Limita el tiempo frente a pantallas.",
    "Cocina en casa con ingredientes frescos.",
    "Participa en actividades que disfrutes.",
    "Practica la respiración profunda.",
    "Mantén un ambiente limpio y ordenado.",
    "Habla sobre tus sentimientos.",
    "Busca ayuda profesional cuando lo necesites.",
    "Involúcrate en tu comunidad.",
    "Haz actividades creativas.",
    "Desconéctate de la tecnología regularmente.",
    "Mantén un horario de sueño regular.",
    "Participa en actividades al aire libre.",
    "Haz ejercicio con amigos.",
    "Evita el azúcar refinada.",
    "Bebe té verde.",
    "Asegúrate de tener una buena iluminación en casa.",
    "Usa protector solar.",
    "Practica el yoga.",
    "Escucha a tu cuerpo.",
    "No te saltes el desayuno.",
    "Planifica tus comidas.",
    "Mantén relaciones saludables.",
    "Dedica tiempo a tus hobbies.",
    "Haz un voluntariado.",
    "Cuida tu salud mental.",
    "Prueba nuevas recetas saludables.",
    "Visita al médico regularmente.",
    "Mantén una actitud de aprendizaje.",
    "Dibuja o pinta para relajarte.",
    "Limita la cafeína.",
    "Aprende a decir no.",
    "Rodéate de naturaleza.",
    "Tómate vacaciones.",
    "Evita la negatividad.",
    "Practica la gratitud.",
    "Lava tus manos regularmente.",
    "Evita compararte con otros.",
    "Crea un espacio de trabajo ergonómico.",
    "Come alimentos ricos en fibra.",
    "Desayuna todos los días.",
    "Haz ejercicio cardiovascular.",
    "Mantén un diario de alimentos.",
    "Evita comer tarde en la noche.",
    "Haz chequeos dentales regulares.",
    "Toma tiempo para relajarte.",
    "Utiliza aceites esenciales.",
    "Escucha tu música favorita.",
    "Participa en actividades sociales.",
    "Evita los hábitos sedentarios.",
    "Usa ropa cómoda.",
    "Practica el tai chi.",
    "Aprende a gestionar el tiempo.",
    "Cuida tu higiene personal.",
    "Cultiva la paciencia.",
    "Haz una lista de cosas por hacer.",
    "Planta un jardín.",
    "Come nueces y semillas.",
    "Rodéate de colores que te gusten.",
    "Limita el uso de sal.",
    "Prueba la acupuntura.",
    "Pide ayuda cuando lo necesites.",
    "Disfruta de un hobby.",
    "Haz ejercicios de fortalecimiento.",
    "Reduce el consumo de carne roja.",
    "Pasa tiempo con tu familia.",
    "Evita el exceso de trabajo.",
    "Mantén un equilibrio entre trabajo y vida personal.",
    "Usa hilo dental.",
    "Lee sobre temas que te interesen.",
    "Participa en actividades culturales.",
    "Desarrolla una rutina matutina.",
    "Come pescado rico en omega-3.",
    "Evita los alimentos fritos.",
    "Mantén un peso saludable.",
    "Haz ejercicio al aire libre.",
    "Mantén la mente activa.",
    "Medita antes de dormir.",
    "Aprende a cocinar platos saludables.",
    "Toma suplementos si es necesario.",
    "Practica la empatía.",
    "Visita a un fisioterapeuta si es necesario.",
    "Practica la jardinería.",
    "Mantén la hidratación.",
    "Evita las bebidas azucaradas.",
    "Prueba el pilates.",
    "Mantén una actitud abierta.",
    "Usa gafas de sol.",
    "Escucha audiolibros.",
    "Participa en actividades de grupo.",
    "Toma baños relajantes.",
    "Cuida tus pies.",
    "Aprende a tocar un instrumento.",
    "Evita las grasas trans.",
    "Haz ejercicio de resistencia.",
    "Usa crema hidratante.",
    "Ten un botiquín de primeros auxilios.",
    "Prueba la aromaterapia.",
    "Come alimentos fermentados.",
    "Descansa lo suficiente.",
    "Limita el uso de dispositivos electrónicos antes de dormir.",
    "Practica la escritura creativa.",
    "Evita los alimentos ultraprocesados.",
    "Haz caminatas regulares.",
    "Come pequeñas porciones frecuentes.",
    "Mantén una actitud de gratitud.",
    "Rodéate de buenas vibras.",
    "Come alimentos ricos en antioxidantes.",
    "Establece límites saludables.",
    "Involucra a tu familia en hábitos saludables.",
    "Prueba la reflexología.",
    "Haz ejercicio de flexibilidad.",
    "Participa en actividades recreativas.",
    "Mantén tu espacio de trabajo limpio.",
    "Usa ropa adecuada para el clima.",
    "Mantén una vida sexual saludable.",
    "Aprende a gestionar el estrés.",
    "Practica el altruismo.",
    "Usa productos naturales.",
    "Prueba la hidroterapia.",
    "Mantén una mente abierta.",
    "Participa en juegos de mesa.",
    "Come superalimentos.",
    "Evita los edulcorantes artificiales.",
    "Haz ejercicios de respiración.",
    "Mantén una buena higiene del sueño.",
    "Desarrolla una rutina nocturna.",
    "Prueba nuevas actividades físicas.",
    "Haz masajes regularmente.",
    "Desconéctate de las redes sociales.",
    "Visita lugares nuevos.",
    "Rodéate de aromas agradables.",
    "Evita las discusiones innecesarias.",
    "Pasa tiempo con tus mascotas.",
    "Come alimentos orgánicos.",
    "Usa productos ecológicos.",
    "Participa en deportes de equipo.",
    "Cultiva amistades sinceras.",
    "Usa escaleras en lugar de ascensor.",
    "Evita el exceso de calorías.",
    "Practica el minimalismo.",
    "Toma tiempo para reflexionar.",
    "Haz limpieza profunda de tu hogar.",
    "Escucha tu intuición.",
    "Rodéate de naturaleza.",
    "Evita el ruido excesivo.",
    "Participa en actividades espirituales.",
    "Cultiva la paciencia.",
    "Mantén un diario personal.",
    "Haz ejercicio en intervalos.",
    "Aprende a gestionar tu dinero.",
    "Participa en clases de baile.",
    "Usa técnicas de relajación.",
    "Rodéate de flores.",
    "Haz senderismo.",
    "Come alimentos locales.",
    "Participa en actividades manuales.",
    "Haz ejercicios de equilibrio.",
    "Mantén un ambiente fresco en casa.",
    "Participa en actividades artísticas.",
    "Usa cremas solares adecuadas.",
    "Practica la bondad.",
    "Aprende a escuchar.",
    "Desayuna con proteínas.",
    "Practica el mindfulness.",
    "Cuida tus relaciones personales.",
    "Desarrolla una rutina de ejercicios.",
    "Toma vitaminas si es necesario.",
    "Usa jabones naturales.",
    "Mantén una actitud de gratitud.",
    "Evita el exceso de trabajo.",
    "Practica la moderación.",
    "Participa en actividades familiares.",
    "Desarrolla un plan de alimentación.",
    "Haz ejercicios de tonificación.",
    "Prueba el ciclismo.",
    "Mantén una actitud de aprendizaje.",
    "Cuida tu salud bucal.",
    "Participa en actividades al aire libre.",
    "Usa ropa adecuada para cada ocasión.",
    "Evita el sedentarismo.",
    "Desarrolla hábitos de lectura.",
    "Cuida tu piel.",
    "Participa en actividades recreativas.",
    "Mantén una buena hidratación.",
    "Usa productos naturales para la piel.",
    "Aprende a gestionar tu tiempo.",
    "Desarrolla una rutina diaria.",
    "Practica el reciclaje.",
    "Mantén una dieta variada.",
    "Usa técnicas de visualización.",
    "Cuida tus posturas.",
    "Desarrolla un plan de ejercicios.",
    "Participa en actividades culturales.",
    "Rodéate de gente positiva.",
    "Prueba nuevas experiencias.",
    "Evita los ambientes tóxicos.",
    "Usa técnicas de meditación.",
    "Cuida tu salud mental.",
    "Participa en actividades de voluntariado.",
    "Mantén una actitud proactiva.",
    "Evita los hábitos dañinos.",
    "Desarrolla una rutina de cuidado personal."
  ];

  constructor() { }

  getRandomCounseling(): string {
    const index = Math.floor(Math.random() * this.counselingList.length);
    return this.counselingList[index];
  }
}