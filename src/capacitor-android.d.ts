// src/capacitor-android.d.ts
interface AndroidInterface {
    openNotificationSettings(): void;
  }
  
  interface Window {
    Android: AndroidInterface;
  }