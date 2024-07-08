import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  // Métodos CRUD para ejercicios
  addExercise(exercise: Exercise) {
    return this.firestore.collection('exercises').add(exercise);
  }

  getExercises() {
    return this.firestore.collection('exercises').snapshotChanges();
  }

  updateExercise(categoryName: string, exercise: Exercise) {
    const user = JSON.parse(localStorage.getItem('usuario')!);

    if (user) {
      return this.firestore.collection('users').doc(user.uid).collection('categories').doc(categoryName)
        .collection('exercises').doc(exercise.name).update(exercise);
    } else {
      return Promise.reject(new Error('No hay usuario autenticado'));
    }
  }


  deleteExercise(id: string) {
    return this.firestore.collection('exercises').doc(id).delete();
  }
}
