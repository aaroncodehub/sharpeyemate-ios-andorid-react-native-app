import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Platform,
    ScrollView
} from 'react-native'
import { useSelector } from 'react-redux';
import axios from 'axios';
import BackgroundCurve from '../components/BackgroundCurve';
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../components';
import { Header } from 'react-navigation-stack';

const Search = props => {
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState(null)
    const profile = useSelector(state => state.myReducer.userProfile)


    searchOrder = () => {
        Keyboard.dismiss()
        setLoading(true)
        if (searchText) {
            axios({
                url: 'https://api.sharpeye.co.nz/api/v1/model/sale.order/?detailed=True&limit=1&domain=name,ilike,' + searchText,
                headers: {
                    'access_token': profile.accessToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                setLoading(false)
                //  do not check partner_id for sharpeye user
                if (profile.rank >= 2) {
                    if ((res.data[0] !== undefined)) {
                        props.navigation.navigate('SearchDetails', { searchedOrder: res.data[0] })
                    } else {
                        axios({
                            url: 'https://api.sharpeye.co.nz/api/v1/model/sale.order/?detailed=True&limit=1&domain=client_order_ref,ilike,' + searchText,
                            headers: {
                                'access_token': profile.accessToken,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                        }).then(res => {
                            if ((res.data[0] !== undefined)) {
                                props.navigation.navigate('SearchDetails', { searchedOrder: res.data[0] })
                            } else {
                                Alert.alert('Oops !', 'no order found. please make sure the order number is correct .', [{ text: 'OK' }]);
                                Keyboard.dismiss()

                            }

                        })

                    }
                    // check partner_id for customer avoiding searching other cusotmer's order by accident. 
                } else {
                    if ((res.data[0] !== undefined) && (profile.companyId == res.data[0].partner_id.id)) {
                        props.navigation.navigate('SearchDetails', { searchedOrder: res.data[0] })
                    } else {
                        Alert.alert('Oops !', 'no order found. please make sure the order number is correct .', [{ text: 'OK' }]);
                        Keyboard.dismiss()
                    }
                }
            }).catch(err => {
                setLoading(false)
                Alert.alert('Oops !', 'Something went wrong, Please try again later .', [{ text: 'OK' }]);
            })
        } else {
            setLoading(false)
            Alert.alert('Oops !', 'Please type the order number .', [{ text: 'OK' }]);
        }
    }

    cleanText = () => {
        setSearchText(null)
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.select({ ios: Header.HEIGHT, android: Header.HEIGHT * -0.5 })}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#2980b9" barStyle='light-content' />
                    <BackgroundCurve style={styles.svg} />

                    <ScrollView style={styles.headerContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name="search" color="white" size={30} />
                            <Text
                                style={styles.heading}>{`Find More Order`}</Text>
                        </View>
                    </ScrollView>
                    <View>
                        <View style={styles.inputSearchContainer}>
                            <TextInput
                                style={styles.inputSearch}
                                value={searchText}
                                onChangeText={txt => setSearchText(txt)}
                                
                            />
                            <TouchableOpacity onPress={cleanText}
                                style={styles.buttonSearch}
                            >
                                {searchText ? <Feather name="x" color="gray" size={16} /> : <Feather name="search" color="gray" size={16} />}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={searchOrder} >
                            <LinearGradient
                                colors={['#2980b9', '#01ab9d']}
                                style={styles.searchButton}
                            >
                                {loading ?
                                    <ActivityIndicator size="small" color="white" /> :
                                    <Text style={styles.textSearch}>Search</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },
    svg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
    },
    headerContainer: {
        marginTop: Dimensions.get('window').height / 10,
        padding: 16,
    },
    inputSearchContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 25,
        width: Dimensions.get('window').width * 0.88,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    inputSearch: {
        padding: 12,
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
        flex: 1,

    },
    buttonSearch: {
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        backgroundColor: '#fff',
        padding: 13,
        borderRadius: 30,
        aspectRatio: 1,
        elevation: 2
    },
    button: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    searchButton: {
        height: 45,
        width: Dimensions.get('window').width * 0.88,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: Dimensions.get('window').height * 0.1
    },
    textSearch: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default Search