import { StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import SumaryCard from '../../../../../Components/SumaryCard';
import Styles from '../../../../../Globalstyle/Index';
import Button from '../../../../../Components/Button';
import moment from 'moment';
import { _addProduct } from '../../../../../Utils/Apis'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../../../Components/Loader';
import { REmovedialdata } from '../../../../../redux/Actions/removedataAction';
const Sumary = ({ route, navigation }) => {
    const { data } = route.params;
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );
    const dispatch = useDispatch()
    const userToken = user.token
    const [loader, setloader] = useState(false)
    const sTime = data.fItem[0]
    let lTime = data.fItem[data.fItem.length - 1];
    function getTimeDiff(start, end) {
        return moment.duration(moment(end, "HH:mm:ss a").diff(moment(start, "HH:mm:ss a")));
    }




    const diff = getTimeDiff(sTime.slot, lTime.slot)
    const result = `${diff.minutes()} min`



    let y
    // const _currentDiscount = () => {
    const result1 = data.curentDay == "Saturday" ? `100` : data.curentDay == "Sunday" ? "100" : "10"
    if (result1 === "10") {

        y = parseInt(result1) * parseInt(result + 1)

    }
    // }

    const discountedPrice = data.data.Percentage_discount / 100 * data.data.Discount_price
useEffect(() => {
    _AddProduct()
}, [navigation])


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
    return(
        <View>
            {loader && <Loader />}
        </View>
    )



    // return (
    //     <View style={{ flex: 1 }}>
    //         {loader && <Loader />}
    //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
    //             <View>
    //                 <Text style={styles.timeTxt}>Start Time</Text>
    //                 <Text style={[styles.start_endtime, { marginLeft: 3 }]}>{sTime.slot}</Text>
    //             </View>
    //             <View>
    //                 <Text style={styles.timeTxt}>End Time</Text>
    //                 <Text style={[styles.start_endtime, { textAlign: "right", marginRight: 3 }]}>{lTime.slot}</Text>
    //             </View>
    //         </View>
    //         <SumaryCard
    //             title={"Total minutes"}
    //             subtitle={result}
    //         />
    //         <SumaryCard
    //             title={"Per minute charges"}
    //             subtitle={data.curentDay == "Saturday" ? `$100` : data.curentDay == "Sunday" ? "$100" : "$10"}
    //         />
    //         <SumaryCard
    //             title={"Total Price"}
    //             subtitle={`$` + `${y}`}
    //         />
    //         <View style={styles.space} />
    //         <Button
    //             title={"Done"}
    //             onPress={() => _AddProduct()}
    //         />
    //     </View>
    // )
}

export default Sumary

const styles = StyleSheet.create({
    timeTxt: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        fontFamily: Styles.SemiBold
    },
    start_endtime: {
        fontSize: 16,
        textAlign: "left",
        color: 'black',
        // marginLeft:2,
        fontFamily: Styles.Regular
    },
    space: {
        height: 40
    }
})
