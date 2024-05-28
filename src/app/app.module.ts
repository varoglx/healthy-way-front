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


@NgModule({
  declarations: [AppComponent, RecetasComponent,RecetaDetallesComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
