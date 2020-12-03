import React, { useState, useEffect } from "react";

import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    ActivityIndicator,
    Alert,
    TextInput,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import Modal, {
    ModalTitle,
    ModalContent,
} from 'react-native-modals';

import * as myActions from '../store/actions'
import firebase from 'firebase';
import 'firebase/firestore';
import { Feather } from "@expo/vector-icons";
import moment from "moment";


import { Block, Text } from '../components';
import { theme } from '../constants';
import BackgroundCurve from './../components/BackgroundCurve';



const Home = props => {
    LayoutAnimation.easeInEaseOut()
    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.myReducer.errorMessage)
    const loading = useSelector(state => state.myReducer.loading)
    const myOrders = useSelector(state => state.myReducer.orders)
    const [orders, setOrders] = useState(null)
    const [searchString, setSearchString] = useState(null)
    const [showFilter, setShowFilter] = useState(false)


    useEffect(() => {
        setOrders(myOrders)
    }, [myOrders])

    useEffect(() => {
        if (myOrders && searchString !== null) {
            if (searchString == 'ongoing' || searchString == 'done') {
                filteredOrders = myOrders.filter(order => {
                    return order.manufacturing_status_of_sales_order.match(searchString)
                })

                setOrders(filteredOrders)
            } else if (searchString == 'draft' || searchString == 'confirmed') {
                filteredOrders = myOrders.filter(order => {
                    return order.sales_order_status.match(searchString)
                })
                setOrders(filteredOrders)
            } else {
                filteredOrders = myOrders.filter(order => {
                    if (order.name.toLowerCase().match(searchString.toLowerCase())) {
                        return order.name.toLowerCase().match(searchString.toLowerCase())
                    } else if (order.client_order_ref) {
                        return order.client_order_ref.toLowerCase().match(searchString.toLowerCase())
                    } else {
                        return false
                    }
                })
                setOrders(filteredOrders)
            }
        } else {
            setOrders(myOrders)
        }
    }, [myOrders, searchString])


    useEffect(() => {
        if (errorMessage) {
            Alert.alert('Oops !', 'Something went wrong, please try again later .', [{ text: 'OK' }]);
        }
    }, [errorMessage]);

    useEffect(() => {
        dispatch(myActions.fetchProfile(firebase.auth().currentUser.uid))
    }, [dispatch])

    HandleDone = () => {
        setSearchString('done')
        setShowFilter(false)
    }

    HandleOngoing = () => {
        setSearchString('ongoing')
        setShowFilter(false)
    }

    HandleConfirmed = () => {
        setSearchString('confirmed')
        setShowFilter(false)
    }

    HandleDraft = () => {
        setSearchString('draft')
        setShowFilter(false)
    }

    // HandleClose = () => {
    //     setShowFilter(false)
    // }

    HandleShowFilter = () => {
        return (
            <Modal.BottomModal
                visible={showFilter}
                onTouchOutside={() => setShowFilter(false)}
                height={190}
                width={1}
                modalTitle={
                    <ModalTitle
                        title="Filter by its status"
                        hasTitleBar
                    />
                }
            >
                <ModalContent
                    style={{
                        flex: 1,
                        backgroundColor: 'fff',
                    }}
                >
                    <Block middle >
                        <TouchableOpacity onPress={HandleDraft}>
                            <Text h3 primary style={{ marginTop: theme.sizes.base * 0.6, marginHorizontal: '30%' }}>
                                Draft
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={HandleConfirmed}>
                            <Text h3 primary style={{ marginTop: theme.sizes.base * 0.3, marginHorizontal: '30%' }}>
                                Confirmed
                             </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={HandleOngoing}>
                            <Text h3 primary style={{ marginTop: theme.sizes.base * 0.3, marginHorizontal: '30%' }}>
                                Ongoing
                             </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={HandleDone}>
                            <Text h3 primary style={{ marginTop: theme.sizes.base * 0.3, marginHorizontal: '30%' }}>
                                Completed
                            </Text>
                        </TouchableOpacity>
                    </Block>
                </ModalContent>
            </Modal.BottomModal>
        )
    }

    renderOrder = ({ item }) => {
        return (
            <TouchableOpacity key={item.name} onPress={() => {
                props.navigation.navigate('OrderDetails', { item })
            }}>
                <View style={styles.feedItem}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                        <View style={{ flex: 4 }}>
                            <Text h4 bold>{item.name}</Text>
                        </View>
                        <View style={{ flex: 8 }}>
                            <View>
                                {/* <Text gray2 caption>{moment(item.date_order).fromNow()}</Text> */}
                                <Text caption style={styles.title}>{item.client_order_ref}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text gray2 caption style={styles.title}>
                                    Status:
                                </Text>
                                <Text gray caption style={styles.title}>
                                    {item.sales_order_status}
                                </Text>
                                <Text gray caption style={styles.title}>
                                    {item.manufacturing_status_of_sales_order}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Feather name="more-horizontal" size={24} color="#73788B" />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    signOutUser = () => {
        firebase.auth().signOut();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar backgroundColor="#2980b9" barStyle='light-content' />
                <BackgroundCurve style={styles.svg} />
                <View style={styles.headerContainer}>
                    <View style={styles.headerGroupIndicator}>
                        <TouchableOpacity
                            style={styles.headerGroupIndicatorLeft}
                            onPress={() => {
                                setShowFilter(true)
                            }}>
                            <Feather name="sliders" color="#fff" size={16} />
                            <Text style={styles.headerGroupIndicatorText}>
                                Order Status
                             </Text>
                            <Feather name="chevron-down" color="#fff" size={16} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signOutUser}>
                            <Feather name="log-out" color="#fff" size={28} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.groupInputContainer}>
                        <View style={styles.inputSearchContainer}>
                            <TextInput
                                style={styles.inputSearch}
                                onChangeText={text => setSearchString(text)}
                                value={searchString}
                                // keyboardType='numeric'
                            />
                            <TouchableOpacity onPress={() => setSearchString(null)}
                                style={styles.buttonSearch}
                            >
                                {searchString ? <Feather name="x" color="gray" size={16} /> : <Feather name="search" color="gray" size={16} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View>
                    {HandleShowFilter()}
                </View>

                {loading ?
                    <View style={styles.loading}>
                        <Text center caption gray style={{ marginBottom: 20 }}>
                            Getting your orders ...
                    </Text>
                        <ActivityIndicator size='large' color={theme.colors.primary} />
                    </View>
                    :
                    <FlatList
                        style={styles.feed}
                        data={orders}
                        renderItem={renderOrder}
                        initialNumToRender={6}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                    ></FlatList>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 18,
        flexDirection: "row",
        marginTop: 2,
    },
    title: {
        marginHorizontal: 6
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    svg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
    },
    headerContainer: {
        marginTop: 48,
        padding: 16,
    },
    headerGroupIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerGroupIndicatorLeft: {
        flexDirection: 'row',
    },
    headerGroupIndicatorText: {
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 5,
    },
    groupInputContainer: {
        marginTop: 10,
        padding: 10,
    },
    inputSearchContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 25,
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

    }
});

export default Home;