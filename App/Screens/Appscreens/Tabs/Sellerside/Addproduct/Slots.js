import { FlatList, StyleSheet, Text, TouchableOpacity, RefreshControl, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Styles from '../../../../../Globalstyle/Index'
import Button from '../../../../../Components/Button'
import { useSelector } from 'react-redux'
import { _getSlots } from '../../../../../Utils/Apis'
import Loader from '../../../../../Components/Loader'
import Loader2 from '../../../../../Components/Loader2'
import Arrow from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'
let sItem = []
let y = 0
const Slots = ({ route, navigation }) => {
    const { data } = route.params;
    console.log("dataaaaaa",data.sDate)
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );



    const currentDate = moment().format("YYYY-MM-DD");
    const [firstState, setfirstState] = useState(-1)
    const [secondState, setsecondState] = useState(-1)
    const [selectedItem1, setselectedItem1] = useState([])


    const [sitemslot, setsitemslot] = useState([])

    const [fItem, setFItem] = useState([])
    const [Page, setPage] = useState(1)
    const [loader, setloader] = useState(false)
    const [numberPage, setnumberPage] = useState([])

    let newArr = []

    const userToken = user.token

    console.log("uyuyuyuyuy",userToken)
    useEffect(() => {
        sItem=[]
        _Slots(1, sItem);


    }, [navigation])

    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _Slots(1, sItem);
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    const _Slots = (Pag, SItem) => {

        setloader(true)
        setselectedItem1([])
        const formData = new FormData()
        formData.append('date', data.sDate);
        fetch(`https://intechsol-developer.co/military-monday/api/get-slots?page=${Pag}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`
            },
            body: formData
        })
            .then(response => response.json())
            .then((json) => {
                if(json)
                {
                setPage(Pag)
                setloader(false)
                let y = 0
                let dumyArr = []
                for (let index = 1; index <= json?.slot_list.last_page; index++) {
                    dumyArr.push(index)

                }
                setnumberPage(dumyArr)
                json.slot_list.data.forEach(element => {
                    newArr.push(element)
                });
                if (sItem.length > 0) {

                    let ayy = []
                    json.slot_list.data.forEach(element => {
                        let ry = sItem.findIndex(itm => itm.slot == element.slot)
                        if (ry != -1) {
                            ayy.push({ "is_avaliable": element.is_avaliable, "slot": element.slot, "check": "1" })
                        }
                        else {
                            ayy.push({ "is_avaliable": element.is_avaliable, "slot": element.slot, "check": "0" })
                        }

                    });

                    setselectedItem1(ayy)


                } else {
                    setselectedItem1(json.slot_list.data)

                }

            }
            else{
            }
            }).catch((error) => {
                console.log("errerrrr",error.response)
                setloader(false)
            }).catch((error) => {
                console.log("errerrrr",error)

                setloader(false)
            })
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          setselectedItem1([])
          setnumberPage([])
        });
        return unsubscribe;
      }, [navigation,selectedItem1,numberPage]);

    const _checkData = (id) => {
        if (firstState == -1 || secondState == -1) {
            if (firstState == -1) {
                setfirstState({ "is_avaliable": id.is_avaliable, "slot": id.slot })
                sItem.push({ "is_avaliable": id.is_avaliable, "slot": id.slot })
            }
            else {
                setsecondState({ "is_avaliable": id.is_avaliable, "slot": id.slot })
                let y = selectedItem1.findIndex(itm => itm.slot == sItem[0].slot)
                let y1 = selectedItem1.findIndex(itm => itm.slot == id.slot)


                let t = y
                sItem = []
                let arr = []
                for (let i = parseInt(t); i <= parseInt(y1); i++) {
                    arr.push({ "is_avaliable": selectedItem1[i].is_avaliable, "slot": selectedItem1[i].slot })

                }
                sItem = [...arr]
            }

        }
        else {
            sItem = []
            setfirstState({ "is_avaliable": id.is_avaliable, "slot": id.slot })
            sItem.push({ "is_avaliable": id.is_avaliable, "slot": id.slot })
            setsecondState(-1)


        }
        setsitemslot(sItem)

    }


    const _idchecker = (id) => {
        if (sItem.length > 0) {
            let y = sItem.findIndex((itm) => itm == id)
            if (y != -1) {
                return true
            }
            else {
                // console.log("else if-----------")
                return false
            }
        } else {
            // console.log("else-----------")
            return false
        }

    }


    const _AddProduct = () => {
        setloader(true)
        const userdata = new FormData();
        userdata.append("name", data.data.serviceName)
        userdata.append("price", data.data.Price)
        userdata.append("start_time", sTime.slot)
        userdata.append("discount_percent", data.data.Percentage_discount)
        userdata.append("description", data.data.Description)
        userdata.append("store", data.data.store)
        userdata.append("date", data.data.sDate)
        userdata.append("end_time", lTime.slot)
        userdata.append("final_price", discountedPrice)
        userdata.append("url", "")
        userdata.append("store_url", data.data.Link)
        userdata.append("type", data.data.type)
        userdata.append("product_id", data.data.id ? data.data.id : '')
        userdata.append("quantity", data.data.No_ofitems)
        data.data.id ? null : userdata.append('image', {
            uri: data.data.productImg,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
        })
        userdata.append("discount_price", data.data.Discount_price)
        userdata.append("phoneno", "123334343")
        console.log("manin Userdataaaaa---------", userdata)
        _addProduct({ userdata, userToken }).then((responce) => {

            setloader(false)
            if (responce.status === "success") {
                REmovedialdata(true)(dispatch)
                navigation.navigate("Home")
            }
        }).catch((err) => {
            console.log("errr", err.response)
            setloader(false)
        })




    }


    return (
        <View style={styles.container}>
            {loader && <Loader />}
            {/* {loader1 && <Loader2 />} */}
            <Text style={{
                fontSize: 16, textAlign: 'center',
                marginTop: 6,
                color: 'black', fontFamily: Styles.Medium
            }}>{data.sDate}</Text>
            <FlatList
                numColumns={4}
                contentContainerStyle={styles.fliststyle}
                data={selectedItem1}

                renderItem={({ item, index }) => {
                    console.log("itemmmmm",item)
                    return (
                        <View>
                            <View
                                style={[styles.slotView,
                                {
                                    backgroundColor: item.is_avaliable === false ? "grey" : item.check == "1" ? Styles.PrimaryColor : sItem.findIndex(ite => ite.slot == item.slot) != -1 ? Styles.PrimaryColor : 'white'
                                }]}
                            >
                                <Text style={[styles.timeTxt, { color: item.check == "1" ? '#fff' : sItem.findIndex(ite => ite.slot == item.slot) != -1 ? "#fff" : '#000' }]}>{item.slot}</Text>
                            </View>
                            <TouchableOpacity

                                style={[styles.slotView1,
                                {
                                    borderColor: item.check == "1" ? Styles.PrimaryColor :
                                        sItem.findIndex(ite => ite.slot == item.slot) != -1 ? Styles.PrimaryColor : "black"

                                    // backgroundColor: _idchecker(index) ? Styles.PrimaryColor : 'white'
                                }]}

                                disabled={item.is_avaliable === false ? true : false}
                                onPress={() => {
                                    _checkData(item),
                                        _idchecker(item)
                                    alert(JSON.stringify(item))
                                }}>

                            </TouchableOpacity>
                        </View>
                    )

                }}
            />

            <View style={{ paddingBottom: 12, paddingHorizontal: 24 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center', justifyContent: "space-around"
                }}>
                    <TouchableOpacity
                        onPress={() => { Page > 1 ? _Slots(Page - 1, sItem) : console.log("left arrow Presses") }}
                        style={{ height: 40, width: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Arrow name={"arrow-left"} size={20} color={Page == 1 ? "grey" : 'black'} />
                    </TouchableOpacity>

                    <Text style={{ color: 'black', fontFamily: Styles.SemiBold }}>{Page}...{numberPage.length}</Text>

                    <TouchableOpacity
                        onPress={() => { numberPage.length > Page ? _Slots(Page + 1, sItem) : console.log("right arrow Presses") }}
                        style={{ height: 40, width: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Arrow name={"arrow-right"} size={20} color={Page == 15 ? "grey" : "black"} />
                    </TouchableOpacity>
                </View>
                <Button title={"Next"} onPress={() => {
                   
                    setFItem(sItem)
                    navigation.navigate("Summary", { data: { 
                        data,
                        fItem: sItem 
                    } })


                }
                } />
            </View>
        </View>
    )
}

export default Slots

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.bgColor
    },
    fliststyle: {
        justifyContent: 'center',
        marginTop: 6,
        paddingBottom: 30,
        alignItems: 'center'
    },
    slotView: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Styles.PrimaryColor,
        borderRadius: 5,
        width: 80, margin: 4, backgroundColor: '#fff'
    },
    slotView1: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 10,
        width: 80, margin: 4, backgroundColor: 'tranpaarent'
    },
    timeTxt: {
        fontSize: 14,
        fontFamily: Styles.Regular
    }
})