import { StyleSheet, Text, View, Image,ScrollView,KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../../../Components/Button'
import InputField from '../../../../../Components/Input'
import { authStyle } from '../../../../../Screens/Authscreens/styles'
import Styles from '../../../../../Globalstyle/Index'
import CheckIcon from 'react-native-vector-icons/AntDesign'
import Loader from '../../../../../Components/Loader'
import { _changePass } from '../../../../../Utils/Apis'
import { useSelector } from 'react-redux'
import IconEy from 'react-native-vector-icons/Entypo'

const ChangePass = ({ navigation }) => {
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );

    const userToken = user.token;
    const [data, setdata] = useState({
        oldPass: '',
        newPass: '',
        cnewPass: '',
        eye:false,
        eye2:false,
        eye3:false,
        loader: false
    })
    const [err, seterr] = useState({
        oldPasslErr: '',
        newPassErr: '',
        cnewPassErr: '',
        incorectErr: '',
        lngthErr: ''

    })

    const _Verify = () => {
        if (Validator()) {
            setdata({ ...data, loader: true })
            const userdata = new FormData()
            userdata.append("old_password", data.oldPass)
            userdata.append("password", data.newPass)
            userdata.append("password_confirmation", data.cnewPass)
            _changePass({ userdata, userToken }).then((responce) => {
                setdata({ ...data, loader: false })
                if(responce.status==="success"){
                    navigation.goBack()
                }
            }).catch((error) => {
                seterr({ ...err, incorectErr: error.response.data.message.old_password[0] })
                setdata({ ...data, loader: false })
            })
        }
    }
    const Validator = () => {
        if (!data.oldPass && !data.newPass && !data.cnewPass) {
            seterr({ ...err, oldPasslErr: 'asd', newPassErr: "asd", cnewPassErr: "asd" })
            return false
        }
        else if (!data.oldPass) {
            seterr({ ...err, oldPasslErr: 'asd' })
            return false
        }
        else if (!data.newPass) {
            seterr({ ...err, newPassErr: 'asd' })
            return false
        }
        else if (!data.cnewPass) {
            seterr({ ...err, cnewPassErr: 'asd' })
            return false
        }
        else if (data.newPass.length < 6 || data.cnewPass.length < 6) {
            seterr({ ...err, lngthErr: 'asd' })
            return false
        }
        return true
    }
    return (
        <View style={authStyle.mainBody}>
        {data.loader && <Loader />}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
          <KeyboardAvoidingView style={{ flex: 1 }}>
  
  
            <View style={styles.subntainer}>
              <Image source={require('../../../../../Assets/reset.png')} style={{
                height: 120,
                alignSelf: 'center',
                width: 120, resizeMode: 'contain'
              }} />
              <Text style={[authStyle.txt, {
                marginTop: 30,
                textAlign: 'center', fontFamily: Styles.Regular, paddingHorizontal: 16
              }]}>Please enter your new password.</Text>
              <View style={{ top: 20 }}>
               <InputField
               placeholderTextColor="grey"
                    value={data.oldPass}
                    secureTextEntry={!data.eye}
                    onChangeText={(txt) => {
                        setdata({ ...data, oldPass: txt })
                        seterr({ ...err, oldPasslErr: '',lngthErr:'',incorectErr:'' })
                    }}
                    Icon={<IconEy name={data.eye ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye: !data.eye })} />}

                    fieldStyle={{
                        borderWidth: err.oldPasslErr ? 1 : 0,
                        borderColor: err.oldPasslErr ? Styles.PrimaryColor : null
                    }}
                    MyIcon={data.oldPass ? <CheckIcon name={"checkcircle"} size={16} color={Styles.PrimaryColor} /> : null}
                    placeholder={"Old Password"} placeholderTextColor={"grey"} />
                <InputField
                    value={data.newPass}
                    secureTextEntry={!data.eye2}
                    placeholderTextColor="grey"
                    onChangeText={(txt) => {
                        setdata({ ...data, newPass: txt })
                        seterr({ ...err, newPassErr: '',lngthErr:'',incorectErr:'' })
                    }}
                    fieldStyle={{
                        borderWidth: err.newPassErr ? 1 : 0,
                        borderColor: err.newPassErr ? Styles.PrimaryColor : null
                    }}
                    Icon={<IconEy name={data.eye2 ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye2: !data.eye2 })} />}
                    placeholder={"New Password"} placeholderTextColor={"grey"} />
                <InputField
                    value={data.cnewPass}
                    placeholderTextColor="grey"
                    onChangeText={(txt) => {
                        setdata({ ...data, cnewPass: txt })
                        seterr({ ...err, cnewPassErr: '',lngthErr:'',incorectErr:'' })
                    }}
                    secureTextEntry={!data.eye3}
                    fieldStyle={{
                        borderWidth: err.newPassErr ? 1 : 0,
                        borderColor: err.newPassErr ? Styles.PrimaryColor : null
                    }}
                    Icon={<IconEy name={data.eye3 ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye3: !data.eye3 })} />}
                    placeholder={"Confirm New Password"} placeholderTextColor={"grey"} />
              </View>
  
             {err.lngthErr ? <Text style={styles.errstyle}>Password length should be greater than 6 character</Text> : null}
             {err.matchErr ? <Text style={styles.errstyle}>Password and Confirm donot matched.</Text> : null}
  
              {/* {err.forgotErr ? <Text style={{
                textAlign: 'center', color: 'red',
                marginTop: 10,
                fontFamily: Styles.Regular
              }}>We can'nt find user with that e-mail address.</Text> : null} */}
  
            </View>
  
            <View style={styles.endcontainer}>
              <Button
               title={"Update"}
                style={{ marginTop: 30 }}
                onPress={() => _Verify()}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
        // <View style={authStyle.mainBody}>
        //     {data.loader && <Loader />}
        //     <View style={styles.midcontainer}>
        //         <InputField
        //             value={data.oldPass}
        //             autoCapitalize={'none'}
        //             onChangeText={(txt) => {
        //                 setdata({ ...data, oldPass: txt })
        //                 seterr({ ...err, oldPasslErr: '',lngthErr:'',incorectErr:'' })
        //             }}
        //             fieldStyle={{
        //                 borderWidth: err.oldPasslErr ? 1 : 0,
        //                 borderColor: err.oldPasslErr ? Styles.PrimaryColor : null
        //             }}
        //             MyIcon={data.oldPass ? <CheckIcon name={"checkcircle"} size={16} color={Styles.PrimaryColor} /> : null}
        //             placeholder={"Old Password"} placeholderTextColor={"grey"} />
        //         <InputField
        //             value={data.newPass}
        //             autoCapitalize={'none'}
        //             onChangeText={(txt) => {
        //                 setdata({ ...data, newPass: txt })
        //                 seterr({ ...err, newPassErr: '',lngthErr:'',incorectErr:'' })
        //             }}
        //             fieldStyle={{
        //                 borderWidth: err.newPassErr ? 1 : 0,
        //                 borderColor: err.newPassErr ? Styles.PrimaryColor : null
        //             }}
        //             MyIcon={data.newPass ? <CheckIcon name={"checkcircle"} size={16} color={Styles.PrimaryColor} /> : null}
        //             placeholder={"New Password"} placeholderTextColor={"grey"} />
        //         <InputField
        //             value={data.cnewPass}
        //             autoCapitalize={'none'}
        //             onChangeText={(txt) => {
        //                 setdata({ ...data, cnewPass: txt })
        //                 seterr({ ...err, cnewPassErr: '',lngthErr:'',incorectErr:'' })
        //             }}
        //             fieldStyle={{
        //                 borderWidth: err.newPassErr ? 1 : 0,
        //                 borderColor: err.newPassErr ? Styles.PrimaryColor : null
        //             }}
        //             MyIcon={data.newPass != "" ? <CheckIcon name={"checkcircle"} size={16} color={Styles.PrimaryColor} /> : null}
        //             placeholder={"Confirm New Password"} placeholderTextColor={"grey"} />
        //                <Text style={{ fontSize: 12,
        //                 fontFamily:Styles.Regular,
        //                 textAlign: 'center', color: 'red' }}>{err.incorectErr}</Text>
        //                {err.lngthErr ?<Text style={{ fontSize: 12,
        //                 fontFamily:Styles.Regular,
        //                 textAlign: 'center', color: 'red' }}>{"Your password length should be greater than 6 character"}</Text>:null}

        //     </View>

        //     <View style={styles.endcontainer}>
        //         <Button
        //             title={"Update"}
        //             onPress={() => _Verify()}
        //         />
        //     </View>
        // </View>
    )
}

export default ChangePass

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'red'
    },
    subntainer: {
      flex: 2,
      // alignItems: 'center',
      paddingHorizontal:12,
      justifyContent: 'center',
      // backgroundColor: 'green'
    },
    midcontainer: {
      flex: .5,
      padding: 12,
      justifyContent: 'center',
      // backgroundColor: 'red'
    },
    endcontainer: {
      flex: 1.5,
      // paddingHorizontal: 12,
      // justifyContent: 'center',
      // backgroundColor: 'blue'
    }
  })