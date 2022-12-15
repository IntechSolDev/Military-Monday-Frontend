import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Appscreens/Tabs/Buyerside/Home/Home'
import Notifications from '../Screens/Appscreens/Tabs/Buyerside/Notifications/Notifications'
import Search from '../Screens/Appscreens/Tabs/Buyerside/Search/Search'
import Profile from '../Screens/Appscreens/Tabs/Buyerside/Profile/Profile'
import HomeIcon from 'react-native-vector-icons/Entypo'
import SearchIcon from 'react-native-vector-icons/AntDesign'
import Bell from 'react-native-vector-icons/FontAwesome5'
import User from 'react-native-vector-icons/FontAwesome5'

import Styles from '../Globalstyle/Index';

const Tab = createBottomTabNavigator();

export default function BuyerTabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <View style={{ width: 60, alignItems: 'center' }}>
                <HomeIcon name={"home"} color={color} size={18} />
                <Text style={{
                  fontFamily:focused ? Styles.Medium:Styles.Regular,
                  fontSize: 10,
                  top: 4,

                  color: focused ? Styles.PrimaryColor : "grey"
                }}>Home</Text>
              </View>
            );
          } else if (route.name === 'Search') {
            return (
              <View style={{ width: 60, alignItems: 'center' }}>
                <SearchIcon name={"search1"} color={color} size={18} />
                <Text style={{
                  fontFamily:focused ? Styles.Medium:Styles.Regular,
                  fontSize: 10,
                  top: 4,

                  color: focused ? Styles.PrimaryColor : "grey"
                }}>Search</Text>
              </View>
            );
          } else if (route.name === 'Profile') {
            return (
              <View style={{ alignItems: 'center', width: 60 }}>
                <User name={"user-circle"} color={color} size={18} />
                <Text style={{
                  fontFamily:focused ? Styles.Medium:Styles.Regular,
                  fontSize: 10,
                  top: 4,

                  color: focused ? Styles.PrimaryColor : "grey"
                }}>Profile</Text>
              </View>

            );
          }
          else if (route.name === 'Notifications') {
            return (
              <View style={{ alignItems: 'center', width: 80 }}>
                <Bell name={"bell"} color={color} size={18} />
                <Text style={{
                  fontFamily:focused ? Styles.Medium:Styles.Regular,
                  fontSize: 10,
                  top: 4,
                  color: focused ? Styles.PrimaryColor : "grey"
                }}>Notifications</Text>

              </View>
            );
          }
        },
        tabBarActiveTintColor: Styles.PrimaryColor,

        tabBarInactiveTintColor: 'gray',
        tabBarLabel: '',
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: Styles.SemiBold,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: Styles.Medium
        },
        tabBarStyle: {
          paddingBottom: Platform.OS == "android" ? 6 : 16,
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 1,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: .5
          },
          shadowRadius: 1,
          shadowOpacity: 0.5,
          padding: 10,
          // width: DEVICE_WIDTH,
          height: 60,
          zIndex: 8
        },
        headerTitleAlign: 'center',
        headerTintColor: 'black',

      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* 
            
            */}
    </Tab.Navigator>
  );
}