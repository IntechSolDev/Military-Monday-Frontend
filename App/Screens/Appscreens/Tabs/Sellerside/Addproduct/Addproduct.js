import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../../../../../Components/Input'
import Icon from 'react-native-vector-icons/Entypo'
// import { Calendar } from 'react-native-calendars';
import { REmovedialdata } from '../../../../../redux/Actions/removedataAction';
import SelectDropdown from 'react-native-select-dropdown';
import SumaryCard from '../../../../../Components/SumaryCard'
import Calendar from '../../../../../Components/Calender'
import moment from 'moment'
import Styles from '../../../../../Globalstyle/Index'
import ImagePicker from 'react-native-image-crop-picker';
import { RadioButton } from 'react-native-paper';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { useSelector, useDispatch } from 'react-redux'
const Addproduct = ({ navigation }) => {
  const { removedata } = useSelector(
    ({ removeData }) => removeData,
  );
  const dispatch = useDispatch()
  console.log("checkkk", removedata)
  const [date, setDate] = useState(new Date())
  const [serviceName, setserviceName] = useState("")
  const [Description, setDescription] = useState("")
  const [Price, setPrice] = useState("")
  const [productImg, setproductsImg] = useState("")
  const [Discount_price, setDiscount_price] = useState("")
  const [Percentage_discount, setPercentage_discount] = useState("")
  const [No_ofitems, setNo_ofitems] = useState("")
  const [Link, setLink] = useState("")
  const [colorchange1, setcolorchange1] = useState(false);
  const [check, setcheck] = useState("product")
  const storesList = ["Esty", "Amazon", "Shopify", "Ebay"]
  const [sProduct, setsProduct] = useState("")
  const [sDate, setSdate] = useState("")
  const [cColor, setcColor] = useState(false)

  const date1 = new Date()
  const curentDatee = moment(date1).format("YYYY-M-DD");

  // Error states.

  const [serviceNameErr, setserviceNameErr] = useState("")
  const [DescriptionErr, setDescriptionErr] = useState("")
  const [PriceErr, setPriceErr] = useState("")
  const [productImgErr, setproductsImgErr] = useState("")
  const [Discount_priceErr, setDiscount_priceErr] = useState("")
  const [Percentage_discountErr, setPercentage_discountErr] = useState("")
  const [No_ofitemsErr, setNo_ofitemsErr] = useState("")
  const [LinkErr, setLinkErr] = useState("")
  const [storeErr, setstoreErr] = useState("")
  const [sdateErr, setsdateErr] = useState("")
  const [myTime, setmyTime] = useState("")


  //............


  let sdate = ""
  let curentDay = ""

  const ProdImgage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setproductsImg(image.path)
      setproductsImgErr("")
    });
  }

  //Getting start and end time

  let timeStringLocal1 = moment(date).format("YYYY-DD-MM");
  // setmyTime(timeStringLocal1)

  //Getting curent day

  const d = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const x = new Date(d);
  const dayName = days[x.getDay()];
  curentDay = dayName



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (removedata == true) {
        _emptyStates("product");
      }
    });
    return unsubscribe;
  }, [navigation, removedata]);

  const _emptyStates = (check) => {
    setserviceName(""),
      setDescription(""),
      setPrice(""),
      setproductsImg(""),
      setDiscount_price(""),
      setPercentage_discount(""),
      setNo_ofitems(""),
      setLink(""),
      setcheck(check),
      setsProduct(""),
      setSdate(""),
      timeStringLocal1 = ""
  }

  // console.log("sdate", timeStringLocal1)

  const datesBlacklistFunc = date => {
    const d = new Date(date);
    const month = d.getMonth() + 1; // it returns 0 for January and 11 for December 
    const day = d.getDate();
    const year = d.getFullYear();
    const formattedTime = year + '-' + month + '-' + day;
    return date.isoWeekday() !== 1;
  }
  console.log("sDate", sDate)
  const _validator = () => {
    if (!productImg && !serviceName &&
      !sDate &&
      !Description && !Price && !Discount_price && !Percentage_discount && !No_ofitems && !Link && !sProduct) {
      setproductsImgErr("asd");
      setserviceNameErr("asd");
      setDescriptionErr("asd");
      setPriceErr("asd");
      setDiscount_priceErr("asd");
      setPercentage_discountErr("asd");
      setNo_ofitemsErr("asd");
      setsdateErr("asd");
      setLinkErr("asd");
      setstoreErr("asd")
      return false;
    }
    else if (!productImg) {
      setproductsImgErr("asd");
      return false;
    }
    else if (!sProduct) {
      setstoreErr("asd");
      return false;
    }
    else if (!sDate) {
      setsdateErr("asd");
      return false;
    }
    else if (!serviceName) {
      setserviceNameErr("asd");
      return false;
    }
    else if (!Description) {
      setDescriptionErr("asd");
      return false;
    }
    else if (!Price) {
      setPriceErr("asd")
      return false;
    }
    else if (!Discount_price) {
      setDiscount_priceErr("asd");
      return false;
    }
    else if (!Percentage_discount) {
      setPercentage_discountErr("asd");
      return false;
    }
    else if (!No_ofitems) {
      setNo_ofitemsErr("asd");
      return false;
    }
    else if (!Link) {
      setLinkErr("asd");
      return false;
    }
    return true;
  }

  // Marked dates callback




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

  useEffect(() => {
    if (Price != "" && Discount_price != "") {
      findPercentage()
    }
    else {
      if (Price == "") {
        setPercentage_discount("")
      }
      if (Discount_price == "") {
        setPercentage_discount("")
      }
    }

  }, [Price, Discount_price])


  const findPercentage = () => {
    let reslt = ((parseFloat(Price) - parseFloat(Discount_price)) / parseInt(Price)) * 100;
    let yu = reslt.toFixed(1).toString()
    setTimeout(() => {
      setPercentage_discount(yu)
    }, 2000);





  }


  useEffect(() => {
    _emptyStates(check)
  }, [check])

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 60, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={[styles.imgupload, {
            borderWidth: productImgErr ? 1 : 0,
            borderColor: productImgErr ? 'red' : null,
          }]}>
            {!productImg ? <Icon name={"image"} size={80} onPress={() => ProdImgage()} /> :
              <TouchableOpacity style={{
                height: 200,
                borderRadius: 5,
                width: '100%'
              }} onPress={() => ProdImgage()} >


                <Image
                  // resizeMode='contain'

                  source={{ uri: productImg }} style={{
                    height: 200,
                    borderRadius: 10,
                    width: '100%'
                  }} />
              </TouchableOpacity>
            }
          </View>
          <View style={styles.spacer} />
          <View style={styles.radBtnstyl}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value={check}
                color={'black'}
                status={check === 'product' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setcheck("product")

                }}
              />
              <Text style={{ fontSize: 16, fontFamily: Styles.Regular, color: 'black' }}>Product</Text>

            </View>

            <View style={styles.byerView}>
              <RadioButton
                value={check}
                color={'black'}
                status={check === 'service' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setcheck("service")

                }}
              />
              <Text style={{ fontSize: 16, fontFamily: Styles.Regular, color: 'black' }}>Service</Text>
            </View>
          </View>
          <View style={styles.spacer1} />
          <Input
            value={serviceName}
            placeholderTextColor="grey"
            onChangeText={(txt) => {
              setserviceName(txt)
              setserviceNameErr("")
            }}
            placeholder={check === "product" ? "Product Name" : "Service name"}
            style={{
              borderWidth: serviceNameErr ? 1 : 0,
              borderColor: serviceNameErr ? 'red' : null
            }}
          />
          <Input
            value={Description}
            placeholderTextColor="grey"

            onChangeText={(txt) => {
              setDescription(txt)
              setDescriptionErr("")
            }}
            multiline={true}
            placeholder={"Description"} style={{
              height: 100,
              borderWidth: DescriptionErr ? 1 : 0,
              borderColor: DescriptionErr ? 'red' : null,
              textAlignVertical: 'top'
            }}

          />
          <Input
            value={Price}
            placeholderTextColor="grey"

            onChangeText={(txt) => {
              setPrice(txt)
              setPriceErr("")
              // findPercentage()
              // const result = Discount_price / Price * 100
              // setDiscount_price(result)
            }}
            placeholder={"Price"}
            keyboardType={"number-pad"}
            style={{
              borderWidth: PriceErr ? 1 : 0,
              borderColor: PriceErr ? 'red' : null
            }}
          />
          <Input
            value={Discount_price}
            keyboardType={'number-pad'}
            placeholderTextColor="grey"

            onChangeText={(txt) => {
              setDiscount_price(txt)
              setDiscount_priceErr("")
              // findPercentage()
              // const result = Discount_price / Price * 100
              // setDiscount_price(result)
            }}
            placeholder={"Discounted Price"}
            style={{
              borderWidth: Discount_priceErr ? 1 : 0,
              borderColor: Discount_priceErr ? 'red' : null
            }}
          />
          <Input
            value={Percentage_discount}
            keyboardType={'number-pad'}
            placeholderTextColor="grey"

            //  editible={false}
            // onChangeText={(txt) => {
            //   setPercentage_discount(txt)
            //   setPercentage_discountErr("")
            // }}
            placeholder={"Percent Discount"}
            style={{
              borderWidth: Percentage_discountErr ? 1 : 0,
              borderColor: Percentage_discountErr ? 'red' : null
            }}
          />
          <Input
            value={No_ofitems}
            keyboardType={'number-pad'}
            placeholderTextColor="grey"

            onChangeText={(txt) => {

              setNo_ofitems(txt)
              setNo_ofitemsErr("")
            }}
            placeholder={"No of Items"}
            style={{
              borderWidth: No_ofitemsErr ? 1 : 0,
              borderColor: No_ofitemsErr ? 'red' : null
            }}
          />
          <Input
            value={Link}
            placeholderTextColor="grey"
            onChangeText={(txt) => {
              setLink(txt)
              setLinkErr("")
            }}
            placeholder={"Store Link"}
            style={{
              borderWidth: LinkErr ? 1 : 0,
              borderColor: LinkErr ? 'red' : null
            }}
          />
          <View style={styles.spacer} />
          <View style={{
            backgroundColor: '#fff',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: .5
            },

            shadowRadius: 1,
            shadowOpacity: 0.5,
            borderRadius: 5,
            marginBottom: 6
          }}>
            <SelectDropdown
              data={storesList}
              defaultButtonText={
                "Add store"
              }

              buttonTextStyle={{
                color: colorchange1 === false ? 'grey' : 'black',
                textAlign: 'left',
                fontSize: 14,
                fontFamily: Styles.Regular
              }}

              buttonStyle={{
                width: '100%',
                borderColor: storeErr ? 'red' : null,
                borderWidth: storeErr ? 1 : 0,
                // alignSelf: 'center',
                elevation: 2,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: .5
                },
                shadowRadius: 1,
                shadowOpacity: 0.5,
                backgroundColor: '#fff',
                // alignItems:'flex-start',
                borderRadius: 6,
              }}
              onSelect={(selectedItem, index) => {
                // showSubcat(selectedItem.id);
                setcolorchange1(true);
                setsProduct(selectedItem)
                setstoreErr("")

              }}
              buttonTextAfterSelection={(selectedItem, index) => {

                return sProduct != "" ? selectedItem : <Text style={{color:'lightgrey'}}>Add Store</Text>;
              }}
              rowTextForSelection={(item, index) => {

                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <View>
                    {isOpened ? <EvilIcon
                      name={'chevron-up'}
                      color="grey"
                      size={30}
                    /> : <EvilIcon
                      name={'chevron-up'}
                      color="grey"
                      size={30}
                      style={{
                        transform: [{
                          rotate: '180deg'
                        }]
                      }}
                    />}
                  </View>
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}


            />


          </View>
          <View>
            <Calendar
              selectdate={sDate}
              check={cColor}
              func={() => setDate()}
              onclickDate={(mydate) => {
                dateReturn(mydate)


              }}
              datesBlacklistFunc={datesBlacklistFunc}

            />
            {sdateErr ? <Text style={{ fontSize: 12, textAlign: 'center', color: 'red', fontFamily: Styles.Regular }}>Select the date</Text> : null}
            <View>
              <SumaryCard
                title={"Select Slot"}
                item={null}
                onClick={() => {
                  if (_validator()) {
                    REmovedialdata(false)(dispatch)
                    navigation.navigate("Slots", {
                      data: {
                        serviceName,
                        Description,
                        Price,
                        productImg,
                        Discount_price,
                        Percentage_discount,
                        No_ofitems,
                        Link,
                        type: check,
                        store: sProduct,
                        sDate,
                        timeStringLocal1
                      }

                    },


                    )
                  }


                }}

              />
            </View>
            {/* <Calendar

              onDayPress={day => {
                var date = new Date(day.dateString);
                if (date.getDay() != 6 && date.getDay() != 5 && date.getDay() != 2 && date.getDay() != 3 && date.getDay() != 4 && date.getDay() != 0)
                  getSelectedDayEvents(day.dateString);
              }}
              hideExtraDays={true}

              markedDates={markDate}
              theme={{
                "header": {
                  height: 0
                },
                'container': {
                  innerWidth: 100,
                  innerHeight: 100,

                },
                'stylesheet': {

                  'calendar': {
                    'main': {
                      monthView: {
                        flex: 1,
                        height: '100%',
                        justifyContent: 'space-around',
                      },
                      week: {
                        flex: 1,
                        marginVertical: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                      },
                      dayContainer: {
                        borderColor: '#f5f5f5',
                        borderWidth: 1,
                        flex: 1,
                      },
                    },
                  }
                },
              }} /> */}

          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Addproduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red"
  },
  spacer: {
    height: 15
  },
  spacer1: {
    height: 10
  },
  imgupload: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#DCDCDC'
  },
  byerView: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center'
  },
  timeTxt: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Styles.Regular
  },
  slotTxt: {
    fontSize: 16,
    fontFamily: Styles.SemiBold
  },
  subcontainer: {
    padding: 12
  },
  radBtnstyl: {
    flexDirection: 'row',
    // paddingVertical: 20,
    alignItems: 'center', justifyContent: "flex-start"
  },
  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: 'lightgrey',

    fontSize: 14,
    textAlign: 'left',

    fontFamily: Styles.Regular,
  },
  textstyle: {
    fontFamily: Styles.SemiBold,
    color: "blue"
  },
  dropdown2DropdownStyle: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#444',
    borderRadius: 4,

  },
  dropdown2RowStyle: {
    backgroundColor: '#fff',
    borderBottomColor: "grey",

  },
  dropdown2RowTxtStyle: {
    color: '#000',
    textAlign: 'center',
    fontFamily: Styles.Regular,
  },
  timControl: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
})