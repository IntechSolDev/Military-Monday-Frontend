import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { data } from '../../../../../Components/Data'
import BuyerCard from '../../../../../Components/BuyerComp/BuyerCard'
import Styles from '../../../../../Globalstyle/Index'
import Input from '../../../../../Components/Input'
import { searchApi } from '../../../../../Utils/Apis'
import { useSelector } from 'react-redux'
const Search = ({ navigation }) => {
  const { user } = useSelector(
    ({ AuthenticationReducer }) => AuthenticationReducer,
  );


  const userToken = user.token
  const [searchVal, setSearchval] = useState("")
  const [FilterProducts,setFilterProducts] = useState([])

  const searchPro = (txt) => {
    const userdata = new FormData()
    userdata.append("name", txt)
    searchApi({ userdata, userToken }).then((responce) => {
      let dummyArr = []
      if(txt){
        // responce.products.forEach(element => {
        //   if(element)
        //   dummyArr.push(element)
        // });
        setFilterProducts(responce.products)
      }
      else{
        setFilterProducts([])
      }
    }).catch((error) => {
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardR}>
        <Input placeholder={"Search here..."}
          value={searchVal}
          onChangeText={(txt) => {
            setSearchval(txt)
            searchPro(txt)
          }}

        />
        <Text style={styles.txt}>{"Recent Search"}</Text>
        <FlatList
          data={FilterProducts}
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ paddingBottom: 170, alignItems: 'center' }}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <BuyerCard
                buyer={false} 
                item={item} navigation={navigation} />
            )
          }}
        />
      </View>

    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.bgColor
  },
  txt: {
    fontFamily: Styles.Regular,
    fontSize: 16,
    paddingVertical: 10,
    color: 'black',
    marginLeft: 6
  },
  cardR: { marginHorizontal: 10, marginTop: 10 }
})