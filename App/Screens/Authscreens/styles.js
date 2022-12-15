import { StyleSheet } from "react-native"
import Styles from "../../Globalstyle/Index"
export const authStyle = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Styles.bgColor,
        alignContent: 'center',
    },
    invalidUser:{
        fontSize:14,
        color:'red',
        textAlign:'center',
        fontFamily:Styles.Regular
    },
    txt: {
        // paddingHorizontal: 14,
         marginTop: 10,
        fontFamily: Styles.SemiBold,
        fontSize: 16,
        color:Styles.Black
    },
    endView: {
        flex: 1,
        justifyContent: 'center', paddingHorizontal: 10
    },
    img: {
        height: 100,
        marginBottom: 60,
        width: 100, resizeMode: 'contain'
    },
    logo: { 
        // flex: 1.8, 
        
        alignItems: 'center', 
        
        justifyContent: 'flex-end', paddingBottom: 30 },
    mCont: {
        // flex: 1,
        paddingHorizontal: 10,
    },
    Fcont: { justifyContent: 'center' }
})