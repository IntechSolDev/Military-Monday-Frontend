import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Promotions from '../../../../../Components/BuyerComp/Promotions'
import Styles from '../../../../../Globalstyle/Index'
import BuyerCard from '../../../../../Components/BuyerComp/BuyerCard'
import { _buyerSideproducts } from '../../../../../Utils/Apis'
import { useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import moment from 'moment'
import Loader from '../../../../../Components/Loader'
let lrt
const Home = ({ navigation }) => {
  const { user } = useSelector(
    ({ AuthenticationReducer }) => AuthenticationReducer,
  );


  const [loader, setloader] = useState(false)
  const [buyerstoreList, setbuyerStoreList] = useState([])
  const [serviceList, setservicesList] = useState([])
  const [promotions, Setpromotions] = useState([])
  const [refreshPage, setrefreshPage] = useState(false)
  const userToken = user.token
  let Time = ""
  let date = new Date();
  const Today = moment(date).format("YYYY-M-DD");
  let today = new Date();
  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
  let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
  let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
  Time = hours + ':' + minutes + ':' + seconds
  useEffect(() => {
    _buyerStoresList(userToken)
    lrt = "upcoming"
    getToken()

  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      _buyerStoresList1()
    }, 5000);
    return () => clearInterval(interval);
  }, [Time]);

  const _buyerStoresList = () => {
    setloader(true)
    const userdata = new FormData();
    userdata.append("time", Time)
    userdata.append("date", Today)
    _buyerSideproducts({ userdata, userToken }).then((responce) => {
      let dummyArr = []
      let dummy2 = []
      responce.product.forEach(element => {
        if (element.current_product === "expired") {
          dummyArr.push(element)
        }
      });
      setloader(false)
      setbuyerStoreList(dummyArr)
      responce.service.forEach(element => {
        if (element.current_product == "expired") {
          dummy2.push(element)
        }
      });
      setloader(false)
      setservicesList(dummy2)
      Setpromotions(responce.active)
    }).catch((err) => {
      console.log("Error",err)

      setloader(false)
    })

  }
  const _buyerStoresList1 = () => {
    // setloader(true)
    const userdata = new FormData();
    userdata.append("time", Time)
    userdata.append("date", Today)
    _buyerSideproducts({ userdata, userToken }).then((responce) => {
      let dummyArr = []
      let dummy2 = []
      responce.product.forEach(element => {
        if (element.current_product === "expired") {
          dummyArr.push(element)
        }
      });
      setbuyerStoreList(dummyArr)
      responce.service.forEach(element => {
        if (element.current_product == "expired") {
          dummy2.push(element)
        }
      });
      setloader(false)
      setservicesList(dummy2)
      Setpromotions(responce.active)
      // }
    }).catch((err) => {
      console.log("Error",err)

      setloader(false)
    })

  }


  
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
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


  const _Refreshpagge = () => {
    setrefreshPage(true)
    const userdata = new FormData();
    userdata.append("time", Time)
    userdata.append("date", Today)
    _buyerSideproducts({ userdata, userToken }).then((responce) => {
      setrefreshPage(false)

      let dummyArr = []
      let dummy2 = []
      responce.product.forEach(element => {
        if (element.current_product == "expired") {
          dummyArr.push(element)
        }
      });
      setrefreshPage(false)

      // setloader(false)
      setbuyerStoreList(dummyArr)
      responce.service.forEach(element => {
        if (element.current_product == "expired") {
          dummy2.push(element)
        }
      });
      setrefreshPage(false)
      setservicesList(dummy2)
      if (responce.active.length) {
        let arr = []
        arr.push(responce.active)
        Setpromotions(...promotions, arr)
      }
    }).catch((err) => {
      console.log("Error",err)
      setrefreshPage(false)
    })
  }

  return (
    <View style={styles.container}>
      {loader && <Loader />}
      <FlatList
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={
          <View>
            {promotions.length > 0 ? <View>
              <View style={styles.seelAllview}>
                <Text style={styles.txt}>Active deal</Text>
                <Text onPress={() => navigation.navigate("SeeAllScreenData", {
                  title: 'Upcoming deals',
                  time: true,
                })} style={[styles.txt, { fontFamily: Styles.Regular, fontSize: 12 }]}>See all</Text>
              </View>
              <View style={styles.promotions}>
                <Promotions
                  navigation={navigation}
                  promotions={promotions}
                  x={true} onPressItem={(res) => console.log("res", res)} />
              </View>
            </View> : null}

          </View>
        }

        ListFooterComponent={
          <View style={{ paddingHorizontal: 6 }}>
            <View style={styles.seelAllview}>
              <Text style={styles.txt}>Products</Text>
              <Text onPress={() => navigation.navigate("SeeAllScreenData", {
                title: 'Products',
                titlle1: 'show',
                time: false
              })} style={[styles.txt, { fontFamily: Styles.Regular, fontSize: 12 }]}>See all</Text>
            </View>
            <FlatList
              data={buyerstoreList}
              refreshControl={
                <RefreshControl refreshing={refreshPage} onRefresh={_Refreshpagge} />
              }
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <BuyerCard item={item} navigation={navigation} scrc="home" type={lrt} />
                )
              }}
            />
            <View style={styles.seelAllview}>
              <Text style={styles.txt}>Services</Text>
              <Text onPress={() => navigation.navigate("SeeAllScreenData", {
                title: 'Services',
                time: false
              })} style={[styles.txt, { fontFamily: Styles.Regular, fontSize: 12 }]}>See all</Text>
            </View>
            <FlatList
              data={serviceList}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <BuyerCard item={item} navigation={navigation} />
                )
              }}
            />
          </View>
        }
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
  promotions: {
    height: 200,
    marginTop: 0
  },
  txt: {
    fontSize: 14,
    color: '#000',
    fontFamily: Styles.SemiBold
  },
  seelAllview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between'
  }

})