import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { LocalNotifications } = Plugins;

@Injectable({
    providedIn: 'root'
  })
  export class NotificationBackgroundService {

;
  
    constructor() {
      this.setupNotificationListener();

    }
  
    setupNotificationListener() {
        LocalNotifications.addListener('localNotificationReceived', (notification: any) => {
          console.log('Notificación recibida en segundo plano:', notification);
          // Aquí puedes manejar la notificación recibida
        });
      }
  }