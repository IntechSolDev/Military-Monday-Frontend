import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Button from '../../Components/Button'
import InputField from '../../Components/Input'
import { authStyle } from './styles'
import Styles from '../../Globalstyle/Index'
import CheckIcon from 'react-native-vector-icons/AntDesign'
// import { Forgetpass } from '../lib/APIS'
import { Forgetpass } from '../../Utils/Apis'
// import Loader from '../Component/Loader'
import Loader from '../../Components/Loader'
const Forgetscreen1 = ({ navigation }) => {

  const [data, setdata] = useState({
    email: '',
    loader: false
  })
  const [err, seterr] = useState({
    emailErr: '',
    forgotErr: '',


  })

  const _Verify = () => {
    if (Validator()) {
      setdata({ ...data, loader: true })
      const userdata = new FormData();
      userdata.append('email', data.email);
      Forgetpass(userdata)
        .then(res => {
          setdata({ ...data, loader: false })
          if (res) {
            navigation.navigate('Forgetscreen2', { email: data.email });
          } else if (res.status === 'error') {
            // setforgotErr(res.message);
          }
        })
        .catch(Err => {
          setdata({ ...data, loader: false })
          seterr({ ...err, forgotErr: 'asd' })

        });
    }
  }
  const Validator = () => {
    if (!data.email) {
      seterr({ ...err, emailErr: 'asd' })
      return false
    }
    return true
  }
  return (
    <View style={authStyle.mainBody}>
      {data.loader && <Loader />}
<ScrollView contentContainerStyle={{flexGrow:1,
  paddingBottom:100,
  paddingTop:20}}>

<KeyboardAvoidingView  
keyboardVerticalOffset={100}
behavior="padding"
>


      <View style={styles.subntainer}>
        <Image source={require('../../Assets/forget.png')} style={{
          height: 120,
          alignSelf: 'center',
          width: 120, resizeMode: 'contain'
        }} />
        <Text style={[authStyle.txt, {
          marginTop: 30,
          textAlign: 'center', fontFamily: Styles.Regular, paddingHorizontal: 16
        }]}>Enter your e-mail for the verification
          process. We will send a 4 digits code
          to your email.</Text>
          <View style={{top:20}}>
          <InputField
          value={data.email}
          placeholderTextColor="grey"
          autoCapitalize={'none'}
          onChangeText={(txt) => {
            setdata({ ...data, email: txt })
            seterr({ ...err, emailErr: '' })
          }}
          style={{
            borderWidth: err.emailErr ? 1 : 0,
            borderColor: err.emailErr ? Styles.PrimaryColor : null
          }}
          MyIcon={data.email ? <CheckIcon name={"checkcircle"} size={16} color={Styles.PrimaryColor} /> : null}
          placeholder={"Email"} placeholderTextColor={"grey"} />
          </View>
      
        {err.forgotErr ? <Text style={{
          textAlign: 'center', color: 'red',
          marginTop: 10,
          fontFamily: Styles.Regular
        }}>We can'nt find user with that e-mail address.</Text> : null}

      </View>

      <View style={styles.endcontainer}>
        <Button
          title={"Send"}
          style={{marginTop:50}}
          onPress={() => _Verify()}
        />
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default Forgetscreen1

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