import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { data } from '../../../../../Components/Data'
import BuyerCard from '../../../../../Components/BuyerComp/BuyerCard'
import Styles from '../../../../../Globalstyle/Index'
import { _buyerSideproducts, _upcome } from '../../../../../Utils/Apis'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Loader from '../../../../../Components/Loader'
let lrt
const Upcomingdeals = ({ navigation, route }) => {

    const { title, time, titlle1 } = route.params;
    const [loader, setloader] = useState(false)
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );

    const [buyerstoreList, setbuyerStoreList] = useState([])
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
        if (title === "Upcoming deals") {
            upCOmings(userToken)
            lrt = "upcoming"
        } else {
            _buyerStoresList(userToken)
            lrt = "other"

        }
    }, [])

    const _buyerStoresList = () => {
        setloader(true)
        const userdata = new FormData();
        userdata.append("time", Time)
        userdata.append("date", Today)
        _buyerSideproducts({ userdata, userToken }).then((responce) => {

            setloader(false)
            let dumyArr = []
            {
                title === "Products" ? (
                    responce.product.forEach(element => {
                        if (element.current_product) {
                            dumyArr.push(element)
                        }
                    }),
                    setbuyerStoreList(dumyArr)
                )
                    :
                    responce.service.forEach(element => {
                        if (element.current_product) {
                            dumyArr.push(element)
                        }
                    }),
                    setbuyerStoreList(dumyArr)
            }
        }).catch((err) => {
            setloader(false)
        })

    }


    const upCOmings = () => {
        setloader(true)
        const userdata = new FormData();
        userdata.append("time", Time)
        userdata.append("date", Today)
        _upcome({ userdata, userToken }).then((responce) => {
            setloader(false)
            let dumyArr = []
            responce.upcoming_deals.forEach(element => {
                if (element.current_product != "live") {
                    dumyArr.push(element)
                }
            });
            setbuyerStoreList(dumyArr)


        }).catch((err) => {
            setloader(false)
        })

    }
    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerTitleStyle: {
                fontSize: 16,
                fontFamily: Styles.Medium
            }
        })
    }, [])
    return (
        <View style={styles.container}>
            {loader && <Loader />}
            <View style={styles.cardR}>
                <Text style={styles.txt}>{title === "Upcoming deals" ? "Products & Services" : title}</Text>
                <View>
                    <FlatList
                        data={buyerstoreList}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        numColumns={2}
                        renderItem={({ item }) => {
                            return (
                                <BuyerCard
                                    title={title}
                                    time={time}
                                    type={lrt}
                                    tu={titlle1}
                                    buyer={title === "Upcoming deals" ? true : false} item={item} navigation={navigation} />
                            )
                        }}
                    />
                </View>

            </View>

        </View>
    )
}

export default Upcomingdeals

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.bgColor
    },
    txt: {
        fontFamily: Styles.SemiBold,
        fontSize: 14,
        paddingVertical: 10,
        color: 'black',
        marginLeft: 6
    },
    cardR: { marginHorizontal: 10 }
})