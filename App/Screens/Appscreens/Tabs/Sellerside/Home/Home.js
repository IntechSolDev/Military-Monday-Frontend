import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../../../../Components/Card'
import { data } from '../../../../../Components/Data'
import Styles from '../../../../../Globalstyle/Index'
import { useSelector } from 'react-redux'
import { _sellerCreatedProducts } from "../../../../../Utils/Apis"
import messaging from '@react-native-firebase/messaging';

import moment from 'moment'
import Loader from '../../../../../Components/Loader'
const Home = ({ navigation }) => {
  const { user } = useSelector(
    ({ AuthenticationReducer }) => AuthenticationReducer,
  );
  const [loader, setloader] = useState(false)
  const [storeList, setStoreList] = useState([])

  let Time = ""
  const userToken = user.token
  let date = new Date();
  const Today = moment(date).format("YYYY-M-DD");

  let today = new Date();
  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
  let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
  let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
   Time = hours + ':' + minutes + ':' + seconds
  // settimeUpdate(Time)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _sellercreatedStoresList()

    });
  
    getToken()
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    const interval = setInterval(() => {
    _sellercreatedStoresList1()
    }, 5000);
    return () => clearInterval(interval);
  }, [Time]);
  useEffect(() => {
   
    getToken()
    

  }, []);
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setbool(true)
  //     if(bool==true){
  //       _sellercreatedStoresList1()

  //     }
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, [bool]);
 




  // useEffect(() => {
  //   setTimeout(() => {
  //     _sellercreatedStoresList(userToken)
  //   }, 1000);
  // }, [])


  const _sellercreatedStoresList = () => {
    setloader(true)
    const userdata = new FormData();
    userdata.append("time", Time)
    userdata.append("date", Today)
    _sellerCreatedProducts({ userdata, userToken }).then((responce) => {
      setloader(false)
      setStoreList(responce.data)
    }).catch((err) => {
      console.log("---------",err)
      setloader(false)
    })

  }

  const _sellercreatedStoresList1 = () => {
    // setloader(true)
    const userdata = new FormData();
    userdata.append("time", Time)
    userdata.append("date", Today)
    _sellerCreatedProducts({ userdata, userToken }).then((responce) => {
      setloader(false)
      setStoreList(responce.data)
    }).catch((err) => {
       setloader(false)
    })

  }
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("token",fcmToken)
      _updateToken(fcmToken);
    }
    messaging().onTokenRefresh(token => {
      _updateToken(token);
    });
  };
  const _updateToken = token => {
    const data = JSON.stringify({ fcm_token: token });
    fetch(`https://intechsol-developer.co/military-monday/api/update-fcm`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(res => res.json())
      .then(res => {
      })
      .catch(e => { });
  };
  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between', }}
        data={storeList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.flist}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
        renderItem={({ item, index }) => (
          <Card item={item} index={index} navigation={navigation} />
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.bgColor
  },
  flist: { flex: 1, paddingHorizontal: 6, marginTop: 10 }
})