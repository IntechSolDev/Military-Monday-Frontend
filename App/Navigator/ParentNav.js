// In App.js in a new project

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../Navigator/AuthNav'
import BuyerTab from './BuyerTabNav'
import SellerTab from './SellerTabNav'
import Offerdetail from '../Screens/Appscreens/Tabs/Sellerside/Home/Offerdetail';
import Offerdetail2 from '../Screens/Appscreens/Tabs/Sellerside/Home/Offerdetail2';

import Sumary from '../Screens/Appscreens/Tabs/Sellerside/Addproduct/Sumary';
import EditProfilescreen from '../Screens/Appscreens/Tabs/Sellerside/Profile/EditProfile';
import EditProFil from '../Screens/Appscreens/Tabs/Buyerside/Profile/EditProfile';
import ChangePass from "../Screens/Appscreens/Tabs/Sellerside/Profile/ChangePass"
import About from '../Screens/Appscreens/Tabs/Sellerside/Profile/About';
import Rating from '../Screens/Appscreens/Tabs/Sellerside/Profile/Rating';
import TermsCondition from '../Screens/Appscreens/Tabs/Sellerside/Profile/TermsCondition';
import PrivacyPolicy from '../Screens/Appscreens/Tabs/Sellerside/Profile/PrivacyPolicy';
import Slots from '../Screens/Appscreens/Tabs/Sellerside/Addproduct/Slots';
import SeeAllScreenData from '../Screens/Appscreens/Tabs/Buyerside/Home/SeeAllScreenData';
import Styles from '../Globalstyle/Index';
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();

function ParentNav() {
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );
    // console.log("user of redux", user.userdata.type)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? <Fragment>
                    <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
                </Fragment> :
                    <Fragment>{
                        user?.userdata?.type === "seller" ?
                            <Fragment>
                                <Stack.Screen name="SellerTab" component={SellerTab} options={{ headerShown: false }} />
                                <Stack.Screen name="Offerdetail" component={Offerdetail} options={{
                                    headerTitleAlign: 'center',
                                    title: "Offer Detail",
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                 <Stack.Screen name="Offerdetail2" component={Offerdetail2} options={{
                                    headerTitleAlign: 'center',
                                    title: "Edit Offer Detail",
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="Summary" component={Sumary} options={{
                                    headerShown:false
                                    // headerTitleAlign: 'center',
                                    // title: "Product summary",
                                    // headerTitleStyle: {
                                    //     fontSize: 16,
                                    //     fontFamily: Styles.Medium
                                    // }
                                }} 
                                />
                                <Stack.Screen name="EditProfile" component={EditProfilescreen} options={{
                                    headerTitleAlign: 'center',
                                    title: "Edit Profile",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="AboutUs" component={About} options={{
                                    headerTitleAlign: 'center',
                                    title: "About Us",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="Rate" component={Rating} options={{
                                    headerTitleAlign: 'center',
                                    title: "Rate Us",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                                    headerTitleAlign: 'center',
                                    title: "Privacy Policy",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="Terms" component={TermsCondition} options={{
                                    headerTitleAlign: 'center',
                                    title: "Terms and  conditions",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="Slots" component={Slots} options={{
                                    headerTitleAlign: 'center',
                                    title: "Slots",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="ChangePass" component={ChangePass} options={{
                                    headerTitleAlign: 'center',
                                    title: "Change Password",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                            </Fragment> : <Fragment>
                                <Stack.Screen name="BuyerTab" component={BuyerTab} options={{ headerShown: false }} />
                                <Stack.Screen name="SeeAllScreenData" component={SeeAllScreenData} options={{
                                    headerTitleAlign: 'center',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }

                                }} />
                                <Stack.Screen name="Slots" component={Slots} options={{
                                    headerTitleAlign: 'center',
                                    title: "Slots",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="Offerdetail" component={Offerdetail} options={{
                                    headerTitleAlign: 'center',
                                    title: "Offer Detail",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                  <Stack.Screen name="Offerdetail2" component={Offerdetail2} options={{
                                    headerTitleAlign: 'center',
                                    title: "Edit Offer Detail",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="EditProFil" component={EditProFil} options={{
                                    headerTitleAlign: 'center',
                                    headerBackTitle:'',
                                    title: "Edit Profile",
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                                <Stack.Screen name="ChangePass" component={ChangePass} options={{
                                    headerTitleAlign: 'center',
                                    title: "Change Password",
                                    headerBackTitle:'',
                                    headerTitleStyle: {
                                        fontSize: 16,
                                        fontFamily: Styles.Medium
                                    }
                                }} />
                            </Fragment>
                    }
                        {/* <Stack.Screen name="SellerTab" component={SellerTab} options={{ headerShown: false }} />
                        <Stack.Screen name="Offerdetail" component={Offerdetail} options={{
                            headerTitleAlign: 'center',
                            title: "Offer Detail",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} />
                        <Stack.Screen name="Summary" component={Sumary} options={{
                            headerTitleAlign: 'center',
                            title: "Product summary",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} />
                        <Stack.Screen name="EditProfile" component={EditProfilescreen} options={{
                            headerTitleAlign: 'center',
                            title: "Edit Profile",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} />
                        <Stack.Screen name="AboutUs" component={About} options={{
                            headerTitleAlign: 'center',
                            title: "About Us",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} />
                        <Stack.Screen name="Rate" component={Rating} options={{
                            headerTitleAlign: 'center',
                            title: "Rate Us",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} />
                        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                            headerTitleAlign: 'center',
                            title: "Privacy Policy",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} />
                        <Stack.Screen name="Terms" component={TermsCondition} options={{
                            headerTitleAlign: 'center',
                            title: "Terms and  conditions",
                            headerTitleStyle: {
                                fontFamily: Styles.Regular,
                                fontSize: 18
                            }
                        }} /> */}
                    </Fragment>
                }
                {/* <Stack.Screen name="BuyerTab" component={BuyerTab} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name="SellerTab" component={SellerTab} options={{ headerShown: false }} /> */}

                {/*........Seller tab screens*/}
                {/* <Stack.Screen name="Offerdetail" component={Offerdetail} options={{
                    headerTitleAlign: 'center',
                    title: "Offer Detail",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} />
                <Stack.Screen name="Summary" component={Sumary} options={{
                    headerTitleAlign: 'center',
                    title: "Product summary",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} />
                <Stack.Screen name="EditProfile" component={EditProfilescreen} options={{
                    headerTitleAlign: 'center',
                    title: "Edit Profile",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} />
                <Stack.Screen name="AboutUs" component={About} options={{
                    headerTitleAlign: 'center',
                    title: "About Us",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} />
                <Stack.Screen name="Rate" component={Rating} options={{
                    headerTitleAlign: 'center',
                    title: "Rate Us",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{
                    headerTitleAlign: 'center',
                    title: "Privacy Policy",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} />
                <Stack.Screen name="Terms" component={TermsCondition} options={{
                    headerTitleAlign: 'center',
                    title: "Terms and  conditions",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} /> */}
                {/* ..............Buyer side............ */}
                {/* <Stack.Screen name="SeeAllScreenData" component={SeeAllScreenData} options={{
                    headerTitleAlign: 'center',

                }} />
                <Stack.Screen name="Slots" component={Slots} options={{
                    headerTitleAlign: 'center',
                    title: "Slots",
                    headerTitleStyle: {
                        fontFamily: Styles.Regular,
                        fontSize: 18
                    }
                }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ParentNav;