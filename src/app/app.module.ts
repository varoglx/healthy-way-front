import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RecetasComponent } from './modals/recetas/recetas.component'; // Importa el componente
import { RecetaDetallesComponent } from './modals/receta-detalles/receta-detalles.component'; // Importa el componente
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@capacitor/status-bar';
import { LocalNotifications } from '@capacitor/local-notifications';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EditProfileModalComponent } from './modals/edit-profile-modal/edit-profile-modal.component';

@NgModule({
  declarations: [AppComponent, RecetasComponent,RecetaDetallesComponent],
  imports: [
    BrowserModule,
    // Inicializa AngularFire con tu configuración de Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule ,// Importa el módulo de Firestore
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
