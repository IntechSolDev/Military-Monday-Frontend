import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../../../Components/Input'
// import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../../../../Components/Button'
import Camera from 'react-native-vector-icons/AntDesign'
import Styles from '../../../../../Globalstyle/Index'
import { useSelector, useDispatch } from 'react-redux'
import { EditUserprofile } from '../../../../../Utils/Apis'
import Loader from '../../../../../Components/Loader'
import ImagePicker from 'react-native-image-crop-picker';
import { SAVE_USER } from '../../../../../redux/Actions/UsersActionFiles'

const EditProfilescreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );
    const userToken = user.token;
    const [data, setdata] = useState({
        user_name: user.userdata.username ? user.userdata.username : '',
        email: user.userdata.email ? user.userdata.email : '',
        phone_no: user.userdata.phoneno ? user.userdata.phoneno : '',
        image: user.userdata.image ? user.userdata.image : '',
        address: user.userdata.address ? user.userdata.address : '',
        editimge: '',
        bsnessType: user.userdata.business_type ? user.userdata.business_type : "",
        loader: false,
    });
    const [err, seterr] = useState({
        usernameErr: '',
        imageErr: '',
    });
    const updateProfilePic = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setdata({
                ...data,
                image: image.path,
                editimge: image.path
            });
        });

    };


    const _editProfile = () => {
        if (_validator()) {
            setdata({ ...data, loader: true });
            const userdata = new FormData();
            userdata.append("username", data.user_name)
            userdata.append("email", data.email)
            userdata.append("phoneno", data.phone_no)
            userdata.append("business_type", data.bsnessType)
            data.editimge &&
                userdata.append('image', {
                    uri: data.editimge,
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                });

            EditUserprofile({ userdata, userToken })
                .then(result => {
                    setdata({ ...data, loader: false });
                    if (result.status === 'success') {
                        SAVE_USER(result)(dispatch)
                        navigation.goBack();
                    }
                })
                .catch(err => {
                    console.log("err",err.response)
                    setdata({ ...data, loader: false });
                });
        }
    };
    const _validator = () => {
        if (!data.user_name && !data.image) {
            seterr({
                ...err,
                usernameErr: 'asd',
                imageErr: 'asd'

            });
            return false;
        }
        else if (!data.image) {
            seterr({ ...err, imageErr: 'asd' });
            return false;
        }
        else if (!data.user_name) {
            seterr({ ...err, usernameErr: 'asd' });
            return false;
        }
        return true;
    };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {data.loader && <Loader />}
            <View style={{ flex: 1, padding: 12 }}>
                <View style={{ flex: 4 }}>
                    <TouchableOpacity onPress={() => updateProfilePic()} style={styles.imagePress}>
                        {data.image ? <Image source={{ uri: data.image ? data.image : data.editimge }} style={styles.userImg} /> : <Image source={{ uri: "https://images.unsplash.com/photo-1599842057874-37393e9342df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" }} style={styles.userImg} />}

                        <View style={{
                            position: 'absolute',
                            alignSelf: 'center',

                        }}>
                            <View style={{
                                height: 100, width: 100,
                                borderRadius: 50,
                                opacity: .3,
                                backgroundColor: '#000'
                            }}>
                            </View>
                            <View style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: 30
                            }}>
                                <Camera name={"camera"} color={"white"} size={32} />

                            </View>
                        </View>

                    </TouchableOpacity>
                    <Input placeholder={"john"}
                    placeholderTextColor="grey"
                        value={data.user_name}
                        onChangeText={(txt) => {
                            setdata({ ...data, user_name: txt })
                        }}
                        placeholderTextColor={'grey'} editable={true} />


                    <Input placeholder={"hamid@gmail.com"}
                    placeholderTextColor="grey"
                        value={data.email}
                        onChangeText={(txt) => {
                            setdata({ ...data, email: txt })
                        }}
                        placeholderTextColor={'grey'} 
                        
                        editible={false} 
                        />
                    <Input
                        value={data.phone_no}
                        placeholderTextColor="grey"
                        onChangeText={(txt) => {
                            setdata({ ...data, phone_no: txt })
                        }}
                        placeholder={"01234 23456756"} placeholderTextColor={'grey'} />
                
                    <Input
                        value={data.bsnessType}
                        placeholderTextColor="grey"
                        onChangeText={(txt) => {
                            setdata({ ...data, bsnessType: txt })
                        }}
                        placeholder={"Business Type"} placeholderTextColor={'grey'} />

                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Button title={"Update"} onPress={() => _editProfile()} />
                </View>

            </View>
        </ScrollView>
    )
}

export default EditProfilescreen

const styles = StyleSheet.create({
    userImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    imagePress: {
        alignItems: 'center',
        width: 100,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center', marginVertical: 14
    }
})