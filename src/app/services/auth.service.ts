import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importar AngularFireStorage
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize, switchMap } from 'rxjs/operators'; // Importar map, switchMap
import { Observable } from 'rxjs'; // Importar Observable
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



export interface UserProfile {
  name?: string;
  age?: number | null;
  gender?: string;
  profilePicture?: string | null;
  email?: string; 
}

export interface Exercise {
  id?: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afStorage: AngularFireStorage, 
    private router: Router,
    private toastController: ToastController
  ) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      localStorage.setItem('usuario', JSON.stringify(user)); 
    });
  }

  // Métodos de autenticación
  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUser() {
    const user = localStorage.getItem('usuario');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    return this.afAuth.authState;
  }

  updateUserProfile(userId: string, profileData: any) {
    return this.firestore.collection('users').doc(userId).set(profileData, { merge: true });
  }

  getUserProfile(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('usuario');
      localStorage.clear(); 
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  async recuperarContrasena(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      const toast = await this.toastController.create({
        message: 'Se ha enviado un correo electrónico para restablecer tu contraseña.',
        duration: 5000,
        position: 'bottom'
      });
      await toast.present();
    } catch (error: any) {
      const errorMessage = (typeof error === 'object' && error.message) ? error.message : 'Ha ocurrido un error.';
      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 5000,
        position: 'bottom'
      });
      await toast.present();
      throw error;
    }
  }
  
  async updateEmail(newEmail: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.verifyBeforeUpdateEmail(newEmail);
        await user.updateEmail(newEmail);
        console.log('Correo electrónico actualizado exitosamente');
      } else {
        console.error('No se ha encontrado un usuario actual');
      }
    } catch (error) {
      console.error('Error al actualizar el correo electrónico:', error);
    }
  }

  async updateEmailInAuthAndFirestore(newEmail: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updateEmail(newEmail);
        await this.firestore.collection('users').doc(user.uid).update({ email: newEmail });
        console.log('Correo electrónico actualizado correctamente en Auth y Firestore');
      } else {
        console.error('No se ha encontrado un usuario actual');
      }
    } catch (error) {
      console.error('Error al actualizar el correo electrónico:', error);
    }
  }

  async subirImagen(archivo: File): Promise<string> {
    const filePath = `images/${Date.now()}_${archivo.name}`;
    const storageRef = this.afStorage.ref(filePath); // Obtener la referencia al archivo

    const task: AngularFireUploadTask = this.afStorage.upload(filePath, archivo); // Subir el archivo a Firebase Storage

    try {
      // Obtener la URL de descarga como Observable<string>
      const downloadUrl$: Observable<string> = task.snapshotChanges().pipe(
        finalize(async () => {
          const url: string = await storageRef.getDownloadURL(); // Obtener la URL de descarga del archivo subido
          return url;
        })
      );

      return downloadUrl$.toPromise(); // Retornar la URL de descarga como string
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }

  
  // Métodos CRUD para ejercicios (ya existentes)...
  addExercise(exercise: Exercise) {
    return this.firestore.collection('exercises').add(exercise);
  }

  getExercises() {
    return this.firestore.collection('exercises').snapshotChanges();
  }

  updateExercise(id: string, exercise: Exercise) {
    return this.firestore.collection('exercises').doc(id).update(exercise);
  }

  deleteExercise(id: string) {
    return this.firestore.collection('exercises').doc(id).delete();
  }
}
  

