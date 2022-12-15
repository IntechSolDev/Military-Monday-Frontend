import { StyleSheet, Text, Image, View, ScrollView, Alert,KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import { authStyle } from './styles'
import Styles from '../../Globalstyle/Index'
import Loader from '../../Components/Loader'
import { userResetPassword } from '../../Utils/Apis'
import IconEy from 'react-native-vector-icons/Entypo'

const Forgetscreen3 = ({ navigation, route }) => {
  const { email, token } = route.params;

  const [data, setdata] = useState({
    pass: '',
    Confirmpass: '',
    loader: false,
    eye:false,
    eye2:false
  })
  const [err, seterr] = useState({
    passErr: '',
    ConfirmpassErr: '',
    matchErr: '',
    lngthErr: ''
  })

  const updatePass = () => {
    if (Validator()) {
      // navigation.navigate("Login")
      setdata({ ...data, loader: true })
      const userdata = new FormData();
      userdata.append('email', email);
      userdata.append('token', token);
      userdata.append('password', data.pass);
      userdata.append('password_confirmation', data.Confirmpass);
      userResetPassword(userdata).then((responce) => {
        setdata({ ...data, loader: false })
        if (responce.status === "success") {
          Alert.alert('Hello!', 'Your password was updated successfully.', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.navigate("Login") },
          ]);
        }
      }).catch((err) => {
        setdata({ ...data, loader: false })
      })

    }
  }

  const Validator = () => {
    if (!data.pass && !data.Confirmpass) {
      seterr({ ...err, passErr: 'asd', ConfirmpassErr: 'asd' })
      return false
    }
    else if (!data.pass) {
      seterr({ ...err, passErr: 'asd' })
      return false
    }
    else if (!data.Confirmpass) {
      seterr({ ...err, ConfirmpassErr: 'asd' })
      return false
    }
    else if (data.pass.length < 6) {
      seterr({ ...err, lngthErr: 'asd' })
      return false
    }
    else if (data.pass != data.Confirmpass) {
      seterr({ ...err, matchErr: 'asd' })
      return false
    }
    return true
  }
  return (
    <View style={authStyle.mainBody}>
      {data.loader && <Loader />}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <KeyboardAvoidingView keyboardVerticalOffset={70} behavior='padding' style={{ flex: 1 }}>


          <View style={styles.subntainer}>
            <Image source={require('../../Assets/reset.png')} style={{
              height: 120,
              alignSelf: 'center',
              width: 120, resizeMode: 'contain'
            }} />
            <Text style={[authStyle.txt, {
              marginTop: 30,
              textAlign: 'center', fontFamily: Styles.Regular, paddingHorizontal: 16
            }]}>Please enter your new password.</Text>
            <View style={{ top: 20 }}>
            <Input
            value={data.pass}
            placeholderTextColor="grey"
            onChangeText={(txt) => {
              setdata({ ...data, pass: txt })
              seterr({ ...err, passErr: '', matchErr: '', lngthErr: '' })
            }}
            secureTextEntry={!data.eye}
            fieldStyle={{
              borderWidth: err.passErr ? 1 : 0,
              borderColor: err.passErr ? Styles.PrimaryColor : null
            }}
            Icon={<IconEy name={data.eye ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye: !data.eye })} />}

            placeholder={"Passwrod"} placeholderTextColor={"grey"} />
          <Input
            value={data.Confirmpass}
            placeholderTextColor="grey"
            onChangeText={(txt) => {
              setdata({ ...data, Confirmpass: txt })
              seterr({ ...err, ConfirmpassErr: '', matchErr: '', lngthErr: '' })
            }}
            fieldStyle={{
              borderWidth: err.ConfirmpassErr ? 1 : 0,
              borderColor: err.ConfirmpassErr ? Styles.PrimaryColor : null
            }}
            secureTextEntry={!data.eye2}

            Icon={<IconEy name={data.eye2 ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye2: !data.eye2 })} />}

            placeholder={"Confirm Password"} placeholderTextColor={"grey"} />
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
              onPress={() => updatePass()}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    // <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 6 }}>
    //   {data.loader && <Loader />}
    //   <View style={styles.container}>
    //     <View style={styles.subntainer}>
    //       <Image source={require('../../Assets/reset.png')} style={{ height: 120, width: 120, resizeMode: 'contain' }} />
    //       <Text style={[authStyle.txt, { marginTop: 10, textAlign: 'center', fontFamily: Styles.Regular, paddingHorizontal: 16 }]}>Enter 4 digit code that send to your email.</Text>

    //     </View>
    //     <View style={styles.midcontainer}>
    //       <Input
    //         value={data.pass}
    //         onChangeText={(txt) => {
    //           setdata({ ...data, pass: txt })
    //           seterr({ ...err, passErr: '', matchErr: '', lngthErr: '' })
    //         }}
    //         fieldStyle={{
    //           borderWidth: err.passErr ? 1 : 0,
    //           borderColor: err.passErr ? Styles.PrimaryColor : null
    //         }}
    //         placeholder={"Passwrod"} placeholderTextColor={"grey"} />
    //       <Input
    //         value={data.Confirmpass}
    //         onChangeText={(txt) => {
    //           setdata({ ...data, Confirmpass: txt })
    //           seterr({ ...err, ConfirmpassErr: '', matchErr: '', lngthErr: '' })
    //         }}
    //         fieldStyle={{
    //           borderWidth: err.ConfirmpassErr ? 1 : 0,
    //           borderColor: err.ConfirmpassErr ? Styles.PrimaryColor : null
    //         }}
    //         placeholder={"Confirm Password"} placeholderTextColor={"grey"} />
    //     </View>
    //     <View>
    //       {err.lngthErr ? <Text style={styles.errstyle}>Password length should be greater than 6 character</Text> : null}
    //       {err.matchErr ? <Text style={styles.errstyle}>Password and Confirm donot matched.</Text> : null}

    //     </View>
    //     <View style={styles.endcontainer}>
    //       <Button
    //         title={"Update"}
    //         onPress={() => updatePass()}
    //       />
    //     </View>
    //   </View>
    // </ScrollView>
  )
}

export default Forgetscreen3

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