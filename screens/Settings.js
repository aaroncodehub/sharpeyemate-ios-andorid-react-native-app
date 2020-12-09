import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
    Slider,
    Dimensions
} from "react-native";
import firebase from 'firebase';
import 'firebase/firestore';
import { useSelector } from 'react-redux'
import {
    Ionicons,
    MaterialIcons,
    AntDesign
} from "@expo/vector-icons";
import { Text} from '../components';
import { theme } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';


const Settings = props => {
    LayoutAnimation.easeInEaseOut()
    const profile = useSelector(state => state.myReducer.userProfile)
    const orderNumber = parseInt(profile.limitedOrder)
    const [number, setNumber] = useState(orderNumber)
    let updateNumber = parseFloat(number).toFixed(0)

    signOutUser = () => {
        firebase.auth().signOut();
    }

    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .update({
                limitedOrder: updateNumber
            })
            .catch(err => {
                console.log(err)
            })
    }, [updateNumber])

    return (
        <View style={styles.container}>
            <Text h1 bold style={styles.header}>Settings</Text>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginHorizontal: 6 }}>
                        <MaterialIcons name='account-circle' size={48} color='#C5CCD6' />
                    </View>
                    <View>
                        <Text h4 semibold>{profile.name}</Text>
                        <Text h5 gray>{profile.company}</Text>
                    </View>
                </View>
                <View>
                    <AntDesign name="right" size={16} color="#C5CCD6" />
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <Ionicons name='ios-list-box' size={36} color='#C5CCD6' />
                    </View>
                    <View>
                        <Slider
                            style={{ width: 300, height: 30 }}
                            thumbStyle={styles.thumb}
                            trackStyle={{ height: 6, borderRadius: 6 }}
                            minimumValue={0}
                            maximumValue={500}
                            minimumTrackTintColor={theme.colors.secondary}
                            maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                            value={number}
                            onValueChange={value => setNumber(value)}
                        />
                        <Text caption gray>Number of orders you would like to load.  {number.toFixed(0)}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={signOutUser} >
                    <LinearGradient
                        colors={['#2980b9', '#01ab9d']}
                        style={styles.logoutButton}
                    >
                        <Text style={styles.textLogout}>Sign Out</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

Settings.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        marginTop: 64,
        marginBottom: 6,
        paddingHorizontal: theme.sizes.base * 2
    },
    profile: {
        zIndex: 10,
        marginTop: -40

    },
    card: {
        backgroundColor: "#FFF",
        padding: 6,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.gray2
    },

    details: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    text: {
        marginVertical: 6,
        alignSelf: "flex-end"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    logoutButton: {
        height: 45,
        width: Dimensions.get('window').width * 0.88,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: Dimensions.get('window').height * 0.1
        },
    textLogout: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Settings;