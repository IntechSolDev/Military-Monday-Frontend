import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Styles from '../../../../../Globalstyle/Index'
// import { useSelector } from 'react-redux'
// import { NoticationList, _deleteNoticationList } from '../../lib/APIS'
// import Loader from '../../Component/Loader'
import Loader from '../../../../../Components/Loader'
import moment from 'moment'
import { getNotifications } from '../../../../../Utils/Apis'
import { useSelector } from 'react-redux'
const Notifications = ({ navigation }) => {
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );
    const userToken = user.token;
    const [notification, setnotification] = useState([])
    const [loader, setloader] = useState(false)
    const [refresh, setrefresh] = useState(false);
    const [singlePro, setsinglePro] = useState([])


    useEffect(() => {
        _NotList();
    }, [])

    const _NotList = () => {
        setloader(true)
        getNotifications(userToken).then((responce) => {
            setloader(false)
            setnotification(responce.data)
            setsinglePro(responce.data[0].product)

        }).catch((err) => {
            setloader(false)
        })
    }
    const _reFreshPage = () => {
        setrefresh(true)
        getNotifications(userToken).then((responce) => {
            setrefresh(false)
            setnotification(responce.data)
        }).catch((err) => {
            setrefresh(false)
        })

    };

    console.log("singlProd", singlePro)
    // const deleteNotitifcation = (id) => {
    //     setloader(true)
    //     const userdata = new FormData();
    //     userdata.append("id", id)
    //     _deleteNoticationList({ userdata, userToken }).then((res) => {
    //         setloader(false)
    //         if (res.status === "success") {
    //             _NotList();
    //         }
    //     }).catch((err) => {
    //         setloader(false)
    //     })


    // }
    return (
        <View style={{ flex: 1 }}>
            {loader && <Loader />}
            <View style={{ padding: 12 }}>
                <FlatList
                    data={notification}
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={_reFreshPage} />
                    }
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Offerdetail", { item: singlePro })}
                                activeOpacity={.8}
                                // onPress={() => Alert.alert(
                                //     "Delete Notification",
                                //     ``,
                                //     [
                                //         {
                                //             text: "Cancel",
                                //             onPress: () => console.log("Cancel Pressed"),
                                //             style: "cancel"
                                //         },
                                //         { text: "OK", onPress: () =>console.log("ok")}
                                //     ]
                                // )
                                // }
                                style={styles.notiCard}>
                                <View style={{ flexDirection: 'row' }}>
                                    {item.image ? <Image source={{ uri: item.image }} style={{ height: 60, width: 60, borderRadius: 30 }} /> : <Image source={require("../../../../../Assets/user.png")} style={{ height: 60, width: 60, borderRadius: 30 }} />}
                                    <View style={{ width: "80%", paddingHorizontal: 12, justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text numberOfLines={1} style={styles.Namstyle}>{item.title}</Text>
                                            <Text style={[styles.Namstyle, {
                                                fontSize: 10,

                                                color: 'black', left: 10
                                            }]}>{moment(item.date).format("HH:MM")}</Text>
                                        </View>
                                        <Text numberOfLines={2} style={[styles.Namstyle, { fontFamily: Styles.Regular, fontSize: 12, color: 'black', top: 5 }]}>{item.message}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />


            </View>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    notiCard: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        paddingVertical: 12,
        margin: 5,
        borderRadius: 5,
        // marginVertical: 10,
        // borderBottomWidth: .3,
        // borderBottomColor: '#979797',
        // backgroundColor:'red',
        alignItems: 'center', justifyContent: 'space-between'
    },
    Namstyle: {
        fontSize: 14,
        color: 'black',
        fontFamily: Styles.SemiBold
    },
    notiTxt: {
        width: '80%',
        paddingLeft: 12, color: 'black',
        fontFamily: Styles.Regular, fontSize: 14
    },
    onlineBulet: {
        bottom: 10,
        textAlign: 'right',
        color: Styles.Pink
    }
})