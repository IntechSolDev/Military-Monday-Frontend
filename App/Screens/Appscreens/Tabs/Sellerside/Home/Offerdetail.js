import {
    StyleSheet, Text, Image, View, ScrollView,
    Modal,
    Linking
} from 'react-native'
import React, { useEffect, useState } from 'react'
import TextCard from '../../../../../Components/TextCard';
import Styles from '../../../../../Globalstyle/Index';
import Button from '../../../../../Components/Button';
import Input from '../../../../../Components/Input';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { useSelector } from "react-redux"
import { _addProduct } from '../../../../../Utils/Apis'
import Loader from '../../../../../Components/Loader';
import CalenderComp from '../../../../../Components/Calender';
import SumaryCard from '../../../../../Components/SumaryCard';
const Offerdetail = ({ route, navigation }) => {
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );
    const { item, dis } = route.params;
    const [date, setDate] = useState(new Date())
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const current_Time = new Date();
    const Today = moment(current_Time).format('dddd');
    const userToken = user.token
    const [data, setdata] = useState({
        name: item.name ? item.name : '',
        price: item.price ? item.price : '',
        des_price: item.discount_price ? item.discount_price : '',
        dis_percentage: item.discount_percent ? item.discount_percent : '',
        no_items: item.quantity ? item.quantity : '',
        store: item.store ? item.store : '',
        storeUrl: item.store_url ? item.store_url : '',
        quantity: item.quantity ? item.quantity : '',
        description: item.description ? item.description : '',
        finalPrice: item.final_price ? item.final_price : '',
        type: item.type ? item.type : '',
        image: item.image ? item.image : "",
        edit: false,
        loader: false,
        calender: false,
    })
    const [sDate, setSdate] = useState("")
    const [sdateErr, setsdateErr] = useState("")
    const [cColor, setcColor] = useState(false)


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const LocalDate = moment(date).toDate()
        const LocalTime = moment(date).format("HH:mm"); // "10:00"
        hideDatePicker();
    };

    useEffect(() => {
        navigation.setOptions({
            title: 'Offer Detail',
            headerBackTitle:'',
            // title: data.edit === true ? "Edit Offer Detail" : 'Offer Detail',
            headerRight: () => (
                <View>
                    {item.type == "buyer"? <Text
                        onPress={() => navigation.navigate("Offerdetail2", { item: item, dis: true })}
                        style={[styles.headline,
                        { fontFamily: Styles.Regular, color: Styles.PrimaryColor }]}>Edit</Text>:null}

                </View>
            )
        })
    }, [data.edit])

  

    const dateReturn = (mydate) => {
        const d = new Date(mydate);
        const month = d.getMonth() + 1; // it returns 0 for January and 11 for December 
        const day = d.getDate();
        const year = d.getFullYear();
        const formatteddate = year + '-' + month + '-' + day;
        if (formatteddate) {
            setSdate(formatteddate)
            setcColor(true)
        } else {
        }
        setsdateErr("")


    }
    const datesBlacklistFunc = date => {
        const d = new Date(date);
        const month = d.getMonth() + 1; // it returns 0 for January and 11 for December 
        const day = d.getDate();
        const year = d.getFullYear();
        const formattedTime = year + '-' + month + '-' + day;
        return date.isoWeekday() !== 1;
    }
    const timeStringLocal1 = moment(date).format("YYYY-DD-MM");


    return (
        <View style={styles.container}>
            {data.loader && <Loader />}
            <View style={styles.backgroundContainer}>
                <Image source={{ uri: item.image }} style={styles.backdrop} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.overlay}>
                    {!data.edit ? dis ? <View style={[styles.live_othr, { backgroundColor: item.current_product === "live" ? Styles.PrimaryColor : item.current_product === "pending" ? "#fffaed" : item.current_product === "expired" ? "#ffe5e5" : item.current_product === "approved" ? "#ffe5e5" : null }]}>
                        <Text style={[styles.statusTxt, {
                            color: item.current_product === "live" ? "white" : item.current_product === "pending" ? "#ffcb4e" : item.current_product === "expired" ? "#fa5418" : item.current_product === "approved" ? "#ffcb4e" : null
                        }]}>{item.current_product}</Text>
                    </View> : null : null}
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                        <TextCard title={"Name"} subtitle={item.name} />
                        <Text style={styles.headline}>Description</Text>
                        <Text style={[styles.headline, { fontFamily: Styles.Regular, fontSize: 12 }]}>{item.description}</Text>
                        <View style={styles.spacer} />
                        <TextCard title={"Price"} subtitle={`$` + item.price} />
                        <View style={styles.spacer} />
                        {dis ? <View>
                            <TextCard title={"Discounted Price"} subtitle={`$` + item.discount_price} />
                            <View style={styles.spacer} />
                            <TextCard title={"Percentage Discount"} subtitle={`$` + item.discount_percent} />
                        </View> : null}

                        <View style={styles.spacer} />
                        <TextCard title={"Number Of Items"} subtitle={item.quantity} />
                        <View style={styles.spacer} />
                        <Text style={styles.headline}>Purchase Link</Text>
                        <Text
                            onPress={() => Linking.openURL(item.store_url)}
                            style={[styles.headline, {
                                fontFamily: Styles.Regular,
                                bottom: 10,
                                color: Styles.PrimaryColor
                            }]}> {item.store_url}</Text>
                        <View style={styles.spacer} />
                        {user.userdata.type != "buyer" && item.current_product === "expired" ? <Button title={"Re-activate"}
                            onPress={() => setdata({ ...data, calender: true })} /> : null}
                    </ScrollView>

                </View>
                <Modal
                            transparent={true}

                            onResponderStart={() => setdata({ ...data, calender: false })}
                            // onTouchCancel={()=>setdata({...data,calender:false})}
                            onRequestClose={() => setdata({ ...data, calender: false })}
                            onDismiss={() => setdata({ ...data, calender: false })}
                            visible={data.calender}>
                            <View
                                style={{
                                    flex: 1,
                                    //backgroundColor: 'transparent',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    alignItems: 'center',
                                    padding: 10,
                                    justifyContent: 'center',
                                }}>
                                <View style={{
                                    height: 170,
                                    borderRadius: 5,
                                    padding: 6,
                                    backgroundColor: Styles.bgColor, width: '100%'
                                }}>
                                    <CalenderComp
                                        selectdate={sDate}
                                        check={cColor}
                                        func={() => setDate()}
                                        onclickDate={(mydate) => {
                                            dateReturn(mydate)


                                        }}
                                        datesBlacklistFunc={datesBlacklistFunc}

                                    />
                                    {sdateErr ? <Text style={{ fontSize: 12, textAlign: 'center', color: 'red', fontFamily: Styles.Regular }}>Select the date</Text> : null}
                                    <SumaryCard

                                        onClick={() => {
                                            setdata({ ...data, calender: false })
                                            // if (_validator()) {
                                            navigation.navigate("Slots",
                                                {
                                                    data: {
                                                        serviceName: data.name,
                                                        Description: data.description,
                                                        Price: data.price,
                                                        productImg: data.image,
                                                        Discount_price: data.des_price,
                                                        Percentage_discount: data.dis_percentage,
                                                        No_ofitems: data.no_items,
                                                        Link: data.store,
                                                        id: item.id,
                                                        type: data.type,
                                                        // store: sProduct,
                                                        sDate: sDate,
                                                        // // sdate,
                                                        // timeStringLocal1
                                                    }
                                                }
                                            )
                                        }
                                        }
                                        // }
                                        title={"Select Slot"}
                                    />

                                </View>

                            </View>
                        </Modal>

            </View>
           

        </View>
    )
}

export default Offerdetail

const styles = StyleSheet.create({
    backgroundContainer: {

        position: 'absolute',
        backgroundColor: 'green',
        top: 0,
        height: 250,
        bottom: 0,
        left: 0,
        // alignItems:'center',
        justifyContent: 'center',
        right: 0,
    },
    editableView: {


        justifyContent: 'center'
    },
    live_othr: {
        backgroundColor: Styles.PrimaryColor, height: 30,
        position: 'absolute',
        alignSelf: 'flex-end',
        // width: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        paddingHorizontal: 6,
        top: -15,
        right: 10
    },
    spacer: {
        height: 10,
    },
    spacer1: {
        height: 50,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        marginTop: "60%",
        width: 360,
        flex: 1,
        // margin: 12,
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: Styles.bgColor,
        elevation: 3,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },

    backdrop: {
        // borderBottomRightRadius: 0,
        resizeMode: 'cover',
        height: 250,
        width: "100%",
        backgroundColor: 'red'
        // flexDirection: 'column'
    },
    headline: {
        fontSize: 14,
        marginTop: 12,
        color: 'black',
        fontFamily: Styles.SemiBold
    },
    statusTxt: {
        fontSize: 14,
        color: '#fff',
        fontFamily: Styles.SemiBold
    }
})