
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import {RegistrarRecetaComponent  } from './modals/registrar-receta/registrar-receta.component';
import {RegistroComidasComponent  } from './modals/registro-comidas/registro-comidas.component';
import {RegistrarIngestaComponent  } from './modals/registrar-ingesta/registrar-ingesta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
@NgModule({
  declarations: [AppComponent,RecetaDetallesComponent,RegistrarIngestaComponent ,RegistrarRecetaComponent,EditProfileModalComponent,RegistroComidasComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule ,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule { }
