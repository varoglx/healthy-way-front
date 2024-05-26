import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Healthy Way',
  webDir: 'www',
  plugins: {
    "LocalNotifications": {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "alarm1.wav",
    },
    "FileChooser": {
      "android": {
        "PACKAGE_NAME": {}
      }
    }
  }
}

export default config;
