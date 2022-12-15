import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import Styles from '../../../../../Globalstyle/Index'
import Button from '../../../../../Components/Button'
import Input from '../../../../../Components/Input'
import LogOut from 'react-native-vector-icons/AntDesign'
import Info from 'react-native-vector-icons/AntDesign'
import { SAVE_USER } from '../../../../../redux/Actions/UsersActionFiles'
import { useDispatch, useSelector } from 'react-redux'
const Profile = ({ navigation }) => {
  const { user } = useSelector(
    ({ AuthenticationReducer }) => AuthenticationReducer,
  );

  const dispatch = useDispatch()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <View style={{ flexDirection: 'row', paddingRight: 10 }}>
            <LogOut name={"logout"}
              onPress={() => SAVE_USER(null)(dispatch)}
              color={"black"}
              size={20} style={{
                transform: [
                  {
                    rotate: '270deg'
                  }
                ]
              }} />
          </View>


        </View>
      )
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      {/* {loader && <Loader />} */}
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 14 }}>
            <Image source={{ uri: user.userdata.image ? user.userdata.image : "https://images.unsplash.com/photo-1599842057874-37393e9342df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" }} style={styles.userImg} />
            <View style={{ height: 10 }} />

          </View>
          <View style={{
            position: 'absolute', alignItems: "flex-end",
            paddingHorizontal: 12,
            paddingTop: 10,
            justifyContent: 'flex-end', width: '100%'
          }}>
            <Text onPress={() => navigation.navigate("EditProFil")} style={[styles.giftTxt, { color: Styles.PrimaryColor }]}>Edit</Text>
          </View>
          <View style={{ padding: 12 }}>
            <Input placeholder={user.userdata.username} placeholderTextColor={'black'} editible={false} />
            <Input placeholder={user.userdata.email} placeholderTextColor={'black'} editible={false} />
            <Input placeholder={user.userdata.phoneno ? user.userdata.phoneno : "XXXXXXXX"} placeholderTextColor={'black'} editible={false} />
          {/* <Input placeholder={"Haward Street USA"} placeholderTextColor={'black'} editible={false} /> */}
            {/* <Input placeholder={user.userdata.business_type ? user.userdata.business_type : "Nill"} placeholderTextColor={'black'} editible={false} /> */}
          </View>
        </View>
        <View style={styles.endcontainer}>
          <View style={{ paddingHorizontal: 12 }}>
            <Button
              title={"Change Password"}
              onPress={() => navigation.navigate("ChangePass")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'green'
  },
  subcontainer: {
    flex: 3,
    // padding: 4,
    // backgroundColor: 'red'
  },
  giftTxt: {
    fontSize: 14,
    fontFamily: Styles.Regular,
    color: '#000'
  },
  seelAlltxt: {
    fontSize: 14,
    fontFamily: Styles.Medium,
  },
  txtstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  endcontainer: {
    flex: 2,
    // paddingHorizontal: 14,
    justifyContent: 'center'

    // backgroundColor: 'blue'
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  nameTxt: {
    fontSize: 16,
    fontFamily: Styles.SemiBold,
    color: 'black'
  },
  priceTxt: {
    fontSize: 16,
    fontFamily: Styles.Regular,
    color: Styles.PrimaryColor
  }
})