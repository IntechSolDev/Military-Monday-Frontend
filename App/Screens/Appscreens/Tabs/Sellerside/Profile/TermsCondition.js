import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import Styles from '../../../../../Globalstyle/Index'
import Button from '../../../../../Components/Button'
const TermsCondition = ({navigation}) => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.topView}>
        <Image source={require("../../../../../Assets/accept.png")} style={styles.img} />
        <View style={styles.txtView}>
          <Text style={styles.txtstyle}>Terms of services:</Text>
          <Text style={[styles.txtstyle, { fontFamily: Styles.Regular, fontSize: 15, marginTop: 6, color: 'grey' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s</Text>
          <Text style={[styles.txtstyle, { fontFamily: Styles.Regular, fontSize: 15, color: 'grey' }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s</Text>
        </View>
      </View>
      <View style={styles.endView}>
        <Button onPress={()=>navigation.goBack()} title={"Decline"} ttstyle={{color:Styles.PrimaryColor}}  style={{width:'45%',
        height:45,
        backgroundColor:null,borderWidth:1,borderColor:Styles.PrimaryColor}}/>
        <Button onPress={()=>navigation.goBack()} title={"Accept"} style={{width:'45%',height:45}}/>
      </View>
    </View>
  </ScrollView> 
  )
}

export default TermsCondition


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.bgColor
    // backgroundColor: 'red'
  },
  topView: {
    flex: 4,
    // backgroundColor: 'green'
  },
  txtstyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: Styles.SemiBold
  },
  endView: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingBottom:10,
    paddingHorizontal:6,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  txtView: {
    padding: 12
  },
  img: {
    height: 250,
    width: '100%',
    marginTop: 20,
    resizeMode: 'contain'
  }
})