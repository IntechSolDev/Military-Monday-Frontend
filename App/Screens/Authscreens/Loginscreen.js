
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,

} from 'react-native';
import IconEy from 'react-native-vector-icons/Entypo'
import { authStyle } from "./styles"
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import Styles from '../../Globalstyle/Index'
import { SAVE_USER } from '../../redux/Actions/UsersActionFiles';
import Loader from '../../Components/Loader';
import { userLogin } from '../../Utils/Apis'
import { useDispatch } from 'react-redux'
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: '',
    pass: '',
    eye: false,
    loader: false
  })
  const [err, seterr] = useState({
    emailErr: '',
    passErr: '',
    passlenghtErr: '',
    invalidErr: ''

  })


  const _login = () => {
    if (_validator()) {
      setdata({ ...data, loader: true })
      const userdata = new FormData();
      userdata.append("email", data.email)
      userdata.append("password", data.pass)
      userLogin(userdata).then((responce) => {
        SAVE_USER(responce)(dispatch)
        setdata({ ...data, loader: false })
      }).catch((err) => {
        seterr({ ...err, invalidErr: err.response.data.message })
        setdata({ ...data, loader: false })

      })
    }
  }

  const _validator = () => {
    if (!data.email && !data.pass) {
      seterr({ ...err, emailErr: 'asd', passErr: 'asd' })
      return false;
    }
    else if (!data.email) {
      seterr({ ...err, emailErr: 'asd' })
      return false
    }
    else if (!data.pass) {
      seterr({ ...err, passErr: 'asd' })
      return false
    }
    else if (data.pass.length < 6) {
      seterr({ ...err, passlenghtErr: 'asd' })
      return false
    }
    return true
  }

  return (
    <View style={authStyle.mainBody}>
      {data.loader && <Loader />}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} >
          <View style={{
            justifyContent: "center",

            flex: 1
          }}>
            <View style={{ height: 200, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Image source={require("../../Assets/mm.png")} style={authStyle.img} />
            </View>
            <Text style={[authStyle.txt, { paddingLeft: 12 }]}>Login to continue</Text>
            <View style={authStyle.mCont}>
              <View style={authStyle.Fcont}>
                <Input
                  value={data.email}
                  autoCapitalize={'none'}
                  placeholderTextColor="grey"
                  onChangeText={(txt) => {
                    setdata({ ...data, email: txt })
                    seterr({ ...err, emailErr: '', invalidErr: '', passlenghtErr: '' })
                  }}
                  style={{
                    borderWidth: err.emailErr ? 1 : 0,
                    borderColor: err.emailErr ? 'red' : null
                  }}
                  placeholder={"Email"}

                />
                <Input
                  value={data.pass}
                  placeholderTextColor="grey"
                  onChangeText={(txt) => {
                    setdata({ ...data, pass: txt })
                    seterr({ ...err, passErr: '', invalidErr: '', passlenghtErr: '' })
                  }}
                  secureTextEntry={!data.eye}
                  style={{
                    borderWidth: err.passErr ? 1 : 0,
                    borderColor: err.passErr ? 'red' : null
                  }}

                  Icon={<IconEy name={data.eye ? "eye" : "eye-with-line"} size={24} onPress={() => setdata({ ...data, eye: !data.eye })} />}
                  placeholder={"Password"} />

                <Text onPress={() => navigation.navigate("Forgetscreen1")} style={[authStyle.txt, { textAlign: 'right', fontFamily: Styles.Regular, bottom: 10 }]}>Forget Password?</Text>
                {err.invalidErr ? <Text style={authStyle.invalidUser}>{err.invalidErr}</Text> : null}
                {err.passlenghtErr ? <Text style={authStyle.invalidUser}>{"Password length should be greater than 6 character"}</Text> : null}

              </View>

            </View>
            <View style={{ marginTop: 50 }}>
              <Button title={"Login"} onPress={() => _login()} />
              <Text onPress={() => navigation.navigate("Signup")} style={[authStyle.txt, {
                fontFamily: Styles.Regular,
                fontSize: 14,
                textAlign: 'center', bottom: 10
              }]}>Don't have an account? <Text style={[authStyle.txt, { color: Styles.PrimaryColor }]}>Signup</Text></Text>

            </View>
          </View>

        </KeyboardAvoidingView>

      </ScrollView>

    </View>

  );
};
export default LoginScreen;
