import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Input from '../../../../../Components/Input'
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../../../../Components/Button'
import Camera from 'react-native-vector-icons/AntDesign'
import Styles from '../../../../../Globalstyle/Index'
import { useSelector, useDispatch } from 'react-redux'
// import { REGISTERING_USER } from '../../redux/actions/useraction/Index'
import { editProfile } from "../../../../../Utils/Apis"
import { SAVE_USER } from '../../../../../redux/Actions/UsersActionFiles';
// import Loader from '../../Component/Loader'
import Loader from '../../../../../Components/Loader';
const EditProfilescreen = ({ navigation }) => {
    const { user } = useSelector(
        ({ AuthenticationReducer }) => AuthenticationReducer,
    );

    const dispatch = useDispatch();

    const userToken = user.token;
    const [data, setdata] = useState({
        username: user.userdata.username ? user.userdata.username : '',
        email: user.userdata.email ? user.userdata.email : '',
        image: user.userdata.image ? user.userdata.image : '',
        editimge: '',
        loader: false,
        address: user.userdata.address ? user.userdata.address : '',
        phoneno: user.userdata.phoneno ? user.userdata.phoneno : '',
        type: user.userdata.business_type ? user.userdata.business_type : ''
    });
    const [err, seterr] = useState({
        usernameErr: '',
        phoneErr: '',
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
        // if (_validator()) {
            setdata({ ...data, loader: true });
            const userdata = new FormData();
            userdata.append('username', data.username);
            userdata.append('phoneno', data.phoneno);
            userdata.append('email', data.email);
            // userdata.append('type', data.type);
            userdata.append('business_type', data.type);
            data.editimge &&
                userdata.append('image', {
                    uri: data.editimge,
                    type: 'image/jpeg',
                    name: 'image' + new Date() + '.jpg',
                });

            editProfile({ userdata, userToken })
                .then(result => {
                    setdata({ ...data, loader: false });
                    if (result.status === 'success') {
                        SAVE_USER(result)(dispatch)
                        navigation.goBack();
                    }
                })
                .catch(err => {
                    setdata({ ...data, loader: false });
                });
        // }
    };
    const _validator = () => {
        if (!data.username && !data.phoneno && !data.image) {
            seterr({
                ...err,
                usernameErr: 'asd',
                phoneErr: 'asd',
                imageErr: 'asd'

            });
            return false;
        }
        else if (!data.image) {
            seterr({ ...err, imageErr: 'asd' });
            return false;
        }
        else if (!data.username) {
            seterr({ ...err, usernameErr: 'asd' });
            return false;
        } else if (!data.phoneno) {
            seterr({ ...err, phoneErr: 'asd' });
            return false;
        }
        return true;
    };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {data.loader && <Loader />}
            <View style={{ flex: 1, padding: 12 }}>
                <View style={{ flex: 4 }}>
                    <TouchableOpacity
                        onPress={() => updateProfilePic()}
                        style={styles.imagePress}>
                        {data.image ? <Image source={{ uri: data.image ? data.image : data.editimge }} style={styles.userImg} /> : <Image source={{ uri: 'https://images.unsplash.com/photo-1599842057874-37393e9342df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' }} style={{
                            height: 100,
                            width: 100,
                            borderRadius: 90,
                            resizeMode: 'contain',
                        }} />}
                        <View style={{
                            position: 'absolute',
                            alignSelf: 'center',

                        }}>
                            <View style={{
                                height: 100, width: 100,
                                borderRadius: 50,
                                opacity: .6,
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

                        value={data.username}
                        onChangeText={(txt) => {
                            setdata({ ...data, username: txt })
                        }}
                        placeholderTextColor={'grey'} />


                    <Input placeholder={"hamid@gmail.com"}
                        value={data.email}
                        onChangeText={(txt) => {
                            setdata({ ...data, email: txt })
                        }}
                        placeholderTextColor={'black'}
                        editible={false}

                    />
                    <Input
                        value={data.phoneno}
                        placeholderTextColor="grey"
                        onChangeText={(txt) => setdata({ ...data, phoneno: txt })}
                        placeholder={"XXXXXXXX"} placeholderTextColor={'grey'} />
                    {/* <Input
                        value={data.address}
                        onChangeText={(txt) => setdata({ ...data, address: txt })}
                        placeholder={"Haward Street USA"} placeholderTextColor={'grey'} /> */}
                    {/* <Input
                        value={data.type}
                        onChangeText={(txt) => setdata({ ...data, type: txt })}
                        placeholder={"Business Type"} placeholderTextColor={'grey'} /> */}

                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Button title={"Update"} onPress={() => _editProfile()
                    } />
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