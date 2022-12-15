import { FlatList, StyleSheet, Image, View } from 'react-native'
import React from 'react'
import SumaryCard from '../../../../../Components/SumaryCard'
import Styles from '../../../../../Globalstyle/Index'
const About = ({ navigation }) => {
    const data = [
        {
            title: "App ratings",
            onPress: () => navigation.navigate("Rate")
        },
        {
            title: "Privacy Policy",
            onPress: () => navigation.navigate("PrivacyPolicy")

        },
        {
            title: "Terms Of Services",
            onPress: () => navigation.navigate("Terms")

        },
    ]
    return (
        <View style={styles.container}>
            <View>
                <View style={{ padding: 12 }}>
                    <Image source={require("../../../../../Assets/about.png")} style={{ height: 200, resizeMode: 'contain' }} />
                </View>
                <View style={{ height: 30 }} />
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ paddingHorizontal: 12 }}>
                                <SumaryCard
                                    item={item}
                                    onClick={() => item.onPress()}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.bgColor
    }
})