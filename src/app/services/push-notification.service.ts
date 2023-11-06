import { Injectable } from '@angular/core';
import { PushNotifications, PushNotification, PushNotificationToken, ActionPerformed } from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor() {}

  initPushNotifications() {
    PushNotifications.register();

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      // Handle the registration token here (e.g., send it to your server).
      console.log('Push registration token:', token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error registering for push notifications:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      // Handle received push notification (e.g., display a notification in your app).
      console.log('Push notification received', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push notification action performed', notification);
    });
  }
}
