import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

export interface UserProfile {
  name?: string;
  age?: number | null;
  gender?: string;
  profilePicture?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      localStorage.setItem('usuario', JSON.stringify(user)); 
    });
  }

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
  
}
