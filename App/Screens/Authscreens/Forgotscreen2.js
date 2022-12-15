import React, { useState } from 'react';
import { ScrollView,KeyboardAvoidingView, Text, View, Image, StyleSheet } from 'react-native';
import { authStyle } from './styles'

import Button from '../../Components/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Styles from '../../Globalstyle/Index';
import { userComformationCode } from '../../Utils/Apis'
import Loader from '../../Components/Loader';
const CELL_COUNT = 4;

const Forgetscreen2 = ({ navigation, route }) => {
  const { email } = route.params;
  const [token, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [bdColor,setbdColor] =useState(false)
  const [loader, setLoader] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ token, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    token,
    setValue,
  });


  const Verify = () => {
    if (token) {
      setLoader(true);
      const userdata = new FormData();
      userdata.append('token', token);
      userdata.append('email', email);
      userComformationCode(userdata)
        .then(responce => {
          setLoader(false);
          if (responce) {
            navigation.navigate('Forgetscreen3', {
              email: email,
              token: token,
            });
          } else {
            if (token.length === CELL_COUNT) {
              setCodeErr('This password reset token is invalid.');
            }
            setValueErr('ask');
          }
        })
        .catch(err => {
          setLoader(false);
        });
    } else {
      setValueErr('ask');
    }
  }



  return (
    <View style={authStyle.mainBody}>
      {loader && <Loader />}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={70} style={{ flex: 1 }}>
          <View style={styles.subntainer}>
            <Image source={require('../../Assets/code.png')} style={{
              height: 120,
              alignSelf: 'center',
              width: 120, resizeMode: 'contain'
            }} />
            <Text style={[authStyle.txt, {
              marginTop: 30,
              textAlign: 'center', fontFamily: Styles.Regular, paddingHorizontal: 16
            }]}>Enter 4 digit code that send to your email.</Text>
            <View style={{ top: 20 }}>
              <CodeField
                ref={ref}
                {...props}
                value={token}
                onChangeText={(txt) => {
                  setValue(txt)
                  setValueErr("")
                  setbdColor(true)
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell, {
                      borderColor: valueErr  ? "red" : "#000"

                    }]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>

            {/* {err.forgotErr ? <Text style={{
              textAlign: 'center', color: 'red',
              marginTop: 10,
              fontFamily: Styles.Regular
            }}>We can'nt find user with that e-mail address.</Text> : null} */}

          </View>

          <View style={styles.endcontainer}>
            <Button
              title={"Verify"}
              style={{ marginTop: 30 }}
              onPress={() => Verify()}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    // <SafeAreaView style={styles.root}>
    //   {loader && <Loader />}
    //   <View style={styles.subntainer}>
    //     <Image source={require('../../Assets/code.png')} style={{ height: 120, width: 120, resizeMode: 'contain' }} />
    //     <Text style={[authStyle.txt, { marginTop: 10, textAlign: 'center', fontFamily: Styles.Regular, paddingHorizontal: 16 }]}>Enter 4 digit code that send to your email.</Text>

    //   </View>
    //   <View style={styles.midcontainer}>
    //     <CodeField
    //       ref={ref}
    //       {...props}
    //       value={token}
    //       onChangeText={(txt) => {
    //         setValue(txt)
    //         setValueErr("")
    //       }}
    //       cellCount={CELL_COUNT}
    //       rootStyle={styles.codeFieldRoot}
    //       keyboardType="number-pad"
    //       textContentType="oneTimeCode"
    //       renderCell={({ index, symbol, isFocused }) => (
    //         <Text
    //           key={index}
    //           style={[styles.cell, isFocused && styles.focusCell, {
    //             borderColor: valueErr ? Styles.PrimaryColor : "#979797"

    //           }]}
    //           onLayout={getCellOnLayoutHandler(index)}>
    //           {symbol || (isFocused ? <Cursor /> : null)}
    //         </Text>
    //       )}
    //     />
    //   </View>
    //   <View style={styles.endcontainer}>
    //     <Button
    //       title={"Verify"}

    //       onPress={() => Verify()}
    //     />
    //   </View>
    //   {/* */}
    // </SafeAreaView>
  );
};

export default Forgetscreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  subntainer: {
    flex: 2,
    // alignItems: 'center',
    paddingHorizontal: 12,
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
  },
  root: { flex: 1, backgroundColor: '#fff' },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'red',
    color:'black',
    textAlign: 'center',
  },
  focusCell: {
    borderColor:"#000",
  },
})
// const styles = StyleSheet.create({
//   root: { flex: 1,backgroundColor:'#fff' },
//   title: { textAlign: 'center', fontSize: 30 },
//   codeFieldRoot: { marginTop: 20 },
//   cell: {
//     width: 40,
//     height: 40,
//     lineHeight: 38,
//     fontSize: 24,
//     borderRadius: 4,
//     borderWidth: 2,
//     borderColor: '#00000030',
//     textAlign: 'center',
//   },
//   focusCell: {
//     borderColor: '#000',
//   },
//   container: {
//     flex: 1,
//     // backgroundColor: 'red'
//   },
//   subntainer: {
//     flex: 2,
//     alignItems: 'center',
//     justifyContent: 'center'
//     // backgroundColor: 'green'
//   },
//   midcontainer: {
//     flex: 1,
//     padding: 12,
//     paddingHorizontal: 40,
//     justifyContent: 'center',
//     // backgroundColor: 'red'
//   },
//   endcontainer: {
//     flex: 1,
//     paddingHorizontal: 12,
//     justifyContent: 'center',
//     // backgroundColor: 'blue'
//   }
// });