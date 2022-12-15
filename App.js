import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import RouteNav from './App/Navigator/ParentNav'
import { Provider } from 'react-redux'
import { Store, persistor } from './App/redux/ConfigFile'
import { PersistGate } from 'redux-persist/integration/react'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  useEffect(() => {
    Platform.OS == "android" && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
    return unsubscribe;
  }, []);

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => { },
    );
  };
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <RouteNav />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})