import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Styles from '../../../../../Globalstyle/Index'
// import StarRating from 'react-native-star-rating';
import { Rating } from 'react-native-ratings';
import Input from '../../../../../Components/Input';
import Button from '../../../../../Components/Button';

const Ratings = ({ navigation }) => {
    const [starCount, setstarCount] = useState(3.5)

    const ratingCompleted = (rating) => {
        setstarCount(rating)
    }
    return (
        <View style={styles.container}>
            <View style={styles.ratParent}>
                <Image source={require("../../../../../Assets/rate.png")} style={styles.img} />
            </View>
            <View style={styles.endView}>
                <View style={styles.ratViewstyle}>
                    <View>
                        <Text style={styles.txt}>Rating</Text>
                        <Rating
                            type='custom'
                            startingValue={starCount}
                            ratingColor={"#ECCF28"}
                            ratingBackgroundColor='#c8c7c8'
                            ratingCount={5}
                            imageSize={30}
                            onFinishRating={(rate) => ratingCompleted(rate)}
                            style={styles.starStyle}
                        />

                        <Text style={[styles.txt, { marginTop: 15 }]}>Feedback</Text>
                        <Input placeholder={"Give Your Feedback"} />
                        <View style={{ height: 20 }} />

                        <Button title={"Rate Us"} onPress={() => navigation.goBack()} />
                    </View>
                </View>


            </View>
        </View>
    )
}

export default Ratings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.bgColor
    },
    img: {
        height: 300,
        marginTop: 10,
        width: '100%',
        resizeMode: "contain"
    },
    starStyle: {
        justifyContent: 'flex-start',
        marginTop: 10,
        alignItems: 'center', flexDirection: "row"
    },
    ratViewstyle: {
        backgroundColor: 'white', flex: 2.5, margin: 10,
        padding: 10,
        borderRadius: 10
    },
    ratParent: { flex: 2.5 },
    endView: { flex: 2.5 },
    txt: {
        fontSize: 16,
        color: 'black',
        fontFamily: Styles.SemiBold
    }
})