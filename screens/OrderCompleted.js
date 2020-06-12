import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    TextInput,
    ActivityIndicator
} from "react-native";
import { useSelector } from 'react-redux'
import 'firebase/firestore';
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import BackgroundCurve from '../components/BackgroundCurve';
import { Feather } from "@expo/vector-icons";


import { Text } from '../components';
import { theme } from '../constants';

const { width } = Dimensions.get('window');


const OrderCompleted = props => {
    LayoutAnimation.easeInEaseOut()

    const orders = useSelector(state => state.myReducer.orders)
    let completedOrders = orders.filter(el => el.manufacturing_status_of_sales_order == 'done')
    const [searchString, setSearchString] = useState(null)
    let filteredOrders = []

    if (completedOrders) {
        filteredOrders = orders.filter(order => {
            return order.name.match(searchString)
        })
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
                                <Text gray2 caption>{moment(item.date_order).fromNow()}</Text>
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
                            <Ionicons name="ios-arrow-dropright" size={24} color="#73788B" />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (searchString) {
        completedOrders = filteredOrders
    }

    renderList = () => {
        if (completedOrders) {
            return (
                <FlatList
                        style={styles.feed}
                        data={completedOrders}
                        renderItem={renderOrder}
                        initialNumToRender={6}
                        maxToRenderPerBatch={10}
                        windowSize={10}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                    ></FlatList>
            )
        } else {
            return (
                <View style={styles.loading}>
                <Text center caption gray style={{ marginBottom: 20 }}>
                    Oops ! no completed order found or it is still loading...
                </Text>
            </View>
            )
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar backgroundColor="#2980b9" barStyle='light-content' />
                <BackgroundCurve style={styles.svg} />
                <View style={styles.headerContainer}>
                    <View style={styles.headerGroupIndicator}>
                        <TouchableOpacity
                            style={styles.headerGroupIndicatorLeft}>
                            <Feather name="map-pin" color="#fff" size={16} />
                            <Text style={styles.headerGroupIndicatorText}>
                                Ready to go
                             </Text>
                            <Feather name="chevron-down" color="#fff" size={16} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.groupInputContainer}>
                        <View style={styles.inputSearchContainer}>
                            <TextInput
                                style={styles.inputSearch}
                                onChangeText={text => setSearchString(text)}
                                value={searchString}
                                keyboardType='numeric'
                            />
                            <TouchableOpacity onPress={() => setSearchString(null)}
                                style={styles.buttonSearch}
                            >
                                {searchString ? <Feather name="x" color="gray" size={16} /> : <Feather name="search" color="gray" size={16} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {renderList()}

            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.sizes.base * 2
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
    search: {
        height: theme.sizes.base * 2,
        width: width - theme.sizes.base * 2,
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2,
        backgroundColor: 'rgba(142, 142, 147, 0.06)',
        borderColor: 'rgba(142, 142, 147, 0.06)',
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: 'transparent'
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6,
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

    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default OrderCompleted;