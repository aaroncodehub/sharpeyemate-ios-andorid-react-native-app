import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Platform,
    StatusBar,
    TextInput,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    LayoutAnimation,
    Alert,
    Dimensions,
    TouchableWithoutFeedback,
    Linking
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { Ionicons as Icon } from '@expo/vector-icons'
import { theme } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import * as myAuctions from '../store/actions'
import 'firebase/firestore'
import { Header } from 'react-navigation-stack';

const Login = (props) => {
    LayoutAnimation.easeInEaseOut()

    const bgImage = require('../assets/bg.jpg')

    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true

    })

    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.myReducer.errorMessage)
    const loading = useSelector(state => state.myReducer.loading)

    useEffect(() => {
        if (errorMessage) {
            Alert.alert('Oops !', errorMessage, [{ text: 'OK' }]);
        }
    }, [errorMessage]);

    useEffect(() => {
        dispatch(myAuctions.cleanError())
    }, [errorMessage])

    handleLogin = () => {
        Keyboard.dismiss()
        dispatch(myAuctions.login(data.email, data.password))
    }

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            })
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        // keyboardVerticalOffset={Platform.select({ ios: Header.HEIGHT})}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#2980b9" barStyle="light-content" />
                    <ImageBackground source={bgImage} style={styles.bgImage}>
                        <TouchableOpacity style={styles.forwardArrow} onPress={() => props.navigation.goBack()}>
                            <Icon name="md-arrow-back" size={24} color={'white'} />
                        </TouchableOpacity>

                        <View style={styles.header}>
                            <Text style={styles.text_header}>Enjoy Your Clear Vision</Text>
                        </View>

                        <Animatable.View
                            animation="fadeInUpBig"
                            style={styles.footer}>
                            <Text style={styles.text_footer}>Email</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="user-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Email"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    value={data.email}
                                    onChangeText={(val) => textInputChange(val)}
                                />
                                {data.check_textInputChange ?
                                    <Animatable.View
                                        animation="bounceIn"
                                    >
                                        <Feather
                                            name="check-circle"
                                            color="green"
                                            size={20}
                                        />
                                    </Animatable.View>
                                    : null
                                }
                            </View>
                            <Text style={{ ...styles.text_footer, marginTop: 10 }}>Password</Text>
                            <View style={styles.action}>
                                <Feather
                                    name="lock"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your Password"
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    value={data.password}
                                    autoCapitalize="none"
                                    onChangeText={(val) => handlePasswordChange(val)}
                                />
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
                                    {data.secureTextEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={handleLogin}>
                                    <LinearGradient
                                        colors={['#2980b9', '#01ab9d']}
                                        style={styles.signIn}
                                    >
                                        {loading ?
                                            <ActivityIndicator size="small" color="white" /> :
                                            <Text style={styles.textSign}>Sign In</Text>
                                        }
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.signIn} onPress={() => Linking.openURL('http://sharpeye.co.nz/about.php')}>
                                    <Text style={styles.textSignUp}>No Account ? Sign UP</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

Login.navigationOptions = {
    header: null
}

export default Login

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen")

const backArrowTop = height * 0.05;
const backArrowLeft = width * 0.05;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: theme.colors.primary
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28
    },
    text_footer: {
        color: '#05375a',
        fontSize: 12
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    textSignUp: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#05375a',
    },
    forwardArrow: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: backArrowTop,
        left: backArrowLeft,
        zIndex: 100,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40
    },
    text: {
        color: 'grey',
        marginTop: 10
    },
});
