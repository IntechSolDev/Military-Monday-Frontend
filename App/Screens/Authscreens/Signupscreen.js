
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Switch
} from 'react-native';
import { authStyle } from "./styles"
import IconEy from 'react-native-vector-icons/Entypo'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Styles from '../../Globalstyle/Index'
import { RadioButton } from 'react-native-paper';
import { userRegister, buyerNotificationHandler } from '../../Utils/Apis'
import { SAVE_USER } from '../../redux/Actions/UsersActionFiles';
import Loader from '../../Components/Loader';
// import { REGISTERING_USER } from '../redux/actions/useraction/Index';
import { useDispatch, useSelector } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';

// import {userLogin} from '../lib/APIS'
// import Loader from '../Component/Loader';
const Signupscreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    ({ AuthenticationReducer }) => AuthenticationReducer,
  );

  const [data, setdata] = useState({
    username: '',
    email: '',
    pass: '',
    cpass: '',
    businesType: '',
    mobile: '',
    eye: false,
    eye2: false,
    loader: false,
    image: '',
    check: 'seller',
    modal: false,
    appNot: false,
    emailNot: false,
    userData: {}

  })


  const [err, seterr] = useState({
    emailErr: '',
    passErr: '',
    passlenghtErr: '',
    invalidErr: '',
    businesTypeErr: '',
    cpassErr: '',
    mobileErr: '',
    usernameErr: '',
    passMatchErr: '',
    imageErr: ''

  })

  const _addImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setdata({ ...data, image: image.path })
      seterr({ ...err, imageErr: '' })
    });
  }
  //   useEffect(()=>{
  //     if(data.appNot || data.emailNot )
  // {
  //   handleuser_Not(responce)
  // }
  //     console.log("--------")
  //   },[data.appNot,data.emailNot])
  const _registerUser = () => {
    if (_validator()) {
      setdata({ ...data, loader: true })
      const userdata = new FormData();
      userdata.append("username", data.username)
      userdata.append("email", data.email)
      userdata.append("phoneno", data.mobile)
      userdata.append("password", data.pass)
      userdata.append("password_confirmation", data.cpass)
      userdata.append("type", data.check)
      userdata.append("business_type", data.businesType)
      userdata.append('image', {
        uri: data.image,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      })

      console.log("User data", userdata)
      userRegister(userdata).then((responce) => {
        setdata({ ...data, loader: false })
        if (responce.status === "success") {
          if (data.check != "seller") {
            setdata({ ...data, modal: true, userData: responce })

          } else {
            SAVE_USER(responce)(dispatch)
          }

        }

      }).catch((err) => {

        console.log("Error in register", err)
        seterr({ ...err, invalidErr: err.response.data.message.email[0] })
        setdata({ ...data, loader: false })

      })
    }
  }



  const _validator = () => {
    if (data.check != "buyer") {
      if (!data.image && !data.email && !data.pass && !data.username && !data.mobile && !data.cpass && !data.businesType) {
        seterr({
          ...err,
          imageErr: 'asd',
          emailErr: 'asd', passErr: 'asd', usernameErr: 'asd', mobileErr: 'asd', cpassErr: 'asd', businesTypeErr: 'asd'
        })
        return false;
      }
      else if (!data.image) {
        seterr({ ...err, imageErr: 'asd' })
        return false
      }
      else if (!data.email) {
        seterr({ ...err, emailErr: 'asd' })
        return false
      }
      else if (!data.username) {
        seterr({ ...err, usernameErr: 'asd' })
        return false
      }
      else if (!data.mobile) {
        seterr({ ...err, mobileErr: 'asd' })
        return false
      }
      else if (!data.businesType) {
        seterr({ ...err, businesTypeErr: 'asd' })
        return false
      }
      else if (!data.pass) {
        seterr({ ...err, passErr: 'asd' })
        return false
      }
      else if (data.pass != data.cpass) {
        seterr({ ...err, passMatchErr: 'asd' })
        return false
      }
      else if (data.pass.length < 6 || data.cpass.length < 6) {
        seterr({ ...err, passlenghtErr: 'asd' })
        return false
      }
      return true
    }
    else {
      if (!data.image && !data.email && !data.pass && !data.username && !data.mobile && !data.cpass) {
        seterr({
          ...err,
          imageErr: 'asd',

          emailErr: 'asd', passErr: 'asd', usernameErr: 'asd', mobileErr: 'asd', cpassErr: 'asd'
        })
        return false;
      }
      else if (!data.image) {
        seterr({ ...err, imageErr: 'asd' })
        return false
      }
      else if (!data.email) {
        seterr({ ...err, emailErr: 'asd' })
        return false
      }
      else if (!data.username) {
        seterr({ ...err, usernameErr: 'asd' })
        return false
      }
      else if (!data.mobile) {
        seterr({ ...err, mobileErr: 'asd' })
        return false
      }

      else if (!data.pass) {
        seterr({ ...err, passErr: 'asd' })
        return false
      }
      else if (data.pass != data.cpass) {
        seterr({ ...err, passMatchErr: 'asd' })
        return false
      }
      else if (data.pass.length < 6 || data.cpass.length < 6) {
        seterr({ ...err, passlenghtErr: 'asd' })
        return false
      }
      return true
    }

  }


  const userToken = data.userData.token;

  const handleuser_Not = () => {
    setdata({ ...data, loader: true })
    let res = data.userData

    const userdata = new FormData();
    userdata.append("is_email", data.emailNot ? 1 : 0)
    userdata.append("is_notify", data.appNot ? 1 : 0)
    buyerNotificationHandler({ userdata, userToken }).then((responce) => {
      if (responce.status === "success") {
        setdata({ ...data, modal: false, loader: false })
        SAVE_USER(res)(dispatch)
      }

    }).catch((err) => {
    })

  }

  return (
    <View style={[authStyle.mainBody, { paddingHorizontal: 12 }]}>
      {data.loader && <Loader />}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrolcontainer}>

        <View style={styles.imgCon}>
          <TouchableOpacity onPress={() => _addImage()}>
            {data.image ? <Image source={{ uri: data.image }} style={styles.img1} /> : <Image source={require("../../Assets/user.png")} style={[styles.img, {
              borderWidth: err.imageErr ? 1 : 0,
              borderColor: err.imageErr ? 'red' : null,
            }]} />}
          </TouchableOpacity>
        </View>
        <View style={styles.fielCon}>
          <Text style={authStyle.txt}>Register Now!</Text>
          <View style={styles.spacer} />
          <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>

            <Input
              placeholderTextColor={'grey'}

              value={data.username}
              onChangeText={(txt) => {
                setdata({ ...data, username: txt })
                seterr({ ...err, usernameErr: '', invalidErr: '' })
              }}
              style={{
                borderWidth: err.usernameErr ? 1 : 0,
                borderColor: err.usernameErr ? 'red' : null
              }}
              placeholder={"Username"} />
            <Input
                          placeholderTextColor={'grey'}

              value={data.email}
              onChangeText={(txt) => {
                setdata({ ...data, email: txt })
                seterr({ ...err, emailErr: '', invalidErr: '' })

              }}
              style={{
                borderWidth: err.emailErr ? 1 : 0,
                borderColor: err.emailErr ? 'red' : null
              }}
              autoCapitalize={'none'}
              placeholder={"Email"} />
            <Input
                          placeholderTextColor={'grey'}

              value={data.mobile}
              keyboardType={"number-pad"}
              onChangeText={(txt) => {
                setdata({ ...data, mobile: txt })
                seterr({ ...err, mobileErr: '', invalidErr: '' })

              }}
              style={{
                borderWidth: err.mobileErr ? 1 : 0,
                borderColor: err.mobileErr ? 'red' : null
              }}
              placeholder={"Mobile"} />
            <Input
                          placeholderTextColor={'grey'}

              value={data.pass}
              onChangeText={(txt) => {
                setdata({ ...data, pass: txt })
                seterr({ ...err, passErr: '', passMatchErr: "", invalidErr: '', passlenghtErr: '' })
              }}
              secureTextEntry={!data.eye}
              style={{
                borderWidth: err.passErr ? 1 : 0,
                borderColor: err.passErr ? 'red' : null
              }}
              Icon={<IconEy name={data.eye ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye: !data.eye })} />}

              placeholder={"Password"} />
            <Input
             placeholderTextColor={'grey'}

              value={data.cpass}
              onChangeText={(txt) => {
                setdata({ ...data, cpass: txt })
                seterr({ ...err, cpassErr: '', passMatchErr: "", invalidErr: '', passlenghtErr: '' })
              }}
              secureTextEntry={!data.eye2}

              style={{
                borderWidth: err.cpassErr ? 1 : 0,
                borderColor: err.cpassErr ? 'red' : null
              }}
              Icon={<IconEy name={data.eye2 ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye2: !data.eye2 })} />}

              placeholder={"Confirm Password"} />

            {err.passMatchErr ? <Text style={styles.ErrTxt}>Password & Confirm password do'not matched</Text> : null}
            {err.invalidErr ? <Text style={authStyle.invalidUser}>{err.invalidErr}</Text> : null}
            {err.passlenghtErr ? <Text style={styles.ErrTxt}>Passwords length should be greater than 6 characters</Text> : null}

            <View style={styles.radBtnstyl}>
              <View style={{
                flexDirection: 'row',
                marginLeft: 4,
                alignItems: 'center'
              }}>
                <View style={styles.radBtn}>
                  <RadioButton
                    style={{ backgroundColor: 'red' }}
                    value={data.check}
                    color={'black'}
                    status={data.check === 'seller' ? 'checked' : 'unchecked'}
                    onPress={() => setdata({ ...data, check: 'seller' })}
                  />
                </View>

                <Text style={[authStyle.txt, {
                  fontSize: 14,
                  marginLeft: 4,
                  fontFamily: Styles.Regular
                }]}>Seller</Text>

              </View>

              <View style={styles.byerView}>
                <View style={styles.radBtn}>
                  <RadioButton
                    value={data.check}
                    color={'black'}
                    status={data.check === 'buyer' ? 'checked' : 'unchecked'}
                    onPress={() => setdata({ ...data, check: 'buyer' })}
                  />
                </View>
                <Text style={[authStyle.txt, {
                  fontSize: 14,
                  marginLeft: 4,
                  fontFamily: Styles.Regular
                }]}>Buyer</Text>
              </View>
            </View>
            {data.check === "seller" ? <Input
              value={data.businesType}
              placeholderTextColor={'grey'}
              onChangeText={(txt) => {
                setdata({ ...data, businesType: txt })
                seterr({ ...err, businesTypeErr: '', invalidErr: '' })
              }}
              style={{
                borderWidth: err.businesTypeErr ? 1 : 0,
                borderColor: err.businesTypeErr ? 'red' : null
              }}
              placeholder={"Type of bussiness"} /> : null}



          </KeyboardAvoidingView>

        </View>
        <View style={[styles.signUpcont, { marginTop: 50 }]}>
          <Button title={"Sign Up"} onPress={() => _registerUser()} />
          <Text onPress={() => navigation.goBack()} style={[authStyle.txt, {
            fontFamily: Styles.Regular,
            fontSize: 14,
            textAlign: 'center', bottom: 10
          }]}>Already have an account? <Text style={[authStyle.txt, { color: Styles.PrimaryColor }]}>Sign In</Text></Text>

          {/* <Text onPress={() => navigation.navigate("Signup")} style={[authStyle.txt, { fontFamily: Styles.Regular, textAlign: 'center', bottom: 10 }]}>Already have an account? Login</Text> */}
        </View>
        <View>
          <Modal
            visible={data.modal} transparent={true}>
            <View style={styles.modalBackground}>
              <View style={styles.Data}>
                <Text style={[authStyle.txt, { fontFamily: Styles.SemiBold, textAlign: 'center', color: '#000' }]}>Push Notifications</Text>
                <View style={{ alignItems: "flex-start", justifyContent: 'center', flex: 1 }}>
                  <View style={styles.notiView}>
                    <Text style={[authStyle.txt, { fontFamily: Styles.Regular, color: '#000' }]}>App Notifications</Text>
                    <Switch value={data.appNot}
                      trackColor={{ false: "#767577", true: "lightgrey" }}
                      thumbColor={data.appNot ? Styles.PrimaryColor : "#f4f3f4"}
                      onValueChange={(e) => {
                        setdata({ ...data, appNot: e })
                      }
                      }
                    />
                  </View>
                  <View style={styles.notiView}>
                    <Text style={[authStyle.txt, { fontFamily: Styles.Regular, color: '#000' }]}>Email Notifications</Text>
                    <Switch
                      value={data.emailNot}
                      trackColor={{ false: "#767577", true: "lightgrey" }}
                      thumbColor={data.emailNot ? Styles.PrimaryColor : "#f4f3f4"}
                      onValueChange={(e) => setdata({ ...data, emailNot: e })}

                    />
                  </View>
                  <Button
                    style={{
                      width: "40%", height: 40,
                      marginTop: 30,
                      alignSelf: 'center'
                    }}
                    title={"Submit"} onPress={() => handleuser_Not()} />
                </View>

              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>

    </View>
  );
};
export default Signupscreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
    backgroundColor: Styles.bgColor,
    alignContent: 'center',
  },
  scrolcontainer: {
    flexGrow: 1
  },
  notiView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', alignItems: 'center'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  Data: {
    height: 200,
    paddingHorizontal: 12,
    backgroundColor: Styles.bgColor, borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3
  },
  byerView: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center'
  },
  radBtnstyl: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center', justifyContent: "flex-start"
  },
  signUpcont: { flex: 1, justifyContent: 'center' },
  imgCon: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  img: {
    height: 100,

    borderRadius: 50,
    marginTop: 60,
    width: 100, resizeMode: 'contain'
  },
  radBtn: {
    backgroundColor: '#fff', borderRadius: 50,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    marginTop: 10,
    shadowRadius: 1,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img1: {
    height: 100,
    marginTop: 60,
    borderRadius: 50,
    width: 100, 
    // resizeMode: 'contain'
  },
  fielCon: { flex: 1, marginTop: 50 },

  spacer: { height: 0 },
  ErrTxt: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Styles.Regular,
    color: 'red'
  }


});

