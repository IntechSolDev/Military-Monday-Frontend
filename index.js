

/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import messaging from '@react-native-firebase/messaging';
 import PushNotificationConfig from './App/config/PushNotificationconfig';
 import PushNotification from 'react-native-push-notification';
 
 messaging().setBackgroundMessageHandler(async remoteMessage => {
     PushNotification.localNotification(remoteMessage);
   });
   PushNotificationConfig.congigurations();
 
 AppRegistry.registerComponent(appName, () => App);
 