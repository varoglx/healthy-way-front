import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface UserProfile {
  username?: string;
  age?: number | null;
  gender?: string;
  profilePicture?: string | null;
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  
  currentUser: any;
 

  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
   }
  

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

 
  updateUserProfile(userId: string, profileData: any) {
    return this.firestore.collection('users').doc(userId).set(profileData, { merge: true });
  }

  getUserProfile(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }
}


