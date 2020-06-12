import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '../constants'

import Home from '../screens/Home'
import Loading from '../screens/Loading'
import Search from '../screens/Search'
import SearchDetails from '../screens/SearchDetails'
import OrderCompleted from '../screens/OrderCompleted'
import Settings from '../screens/Settings'
import OrderDetails from '../screens/OrderDetails'
import Login from '../screens/Login'
import Welcome from '../screens/Welcome'

const HomeStack = createStackNavigator(
    {
        Home,
        OrderDetails
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)

const CompletedStack = createStackNavigator(
    {
        OrderCompleted,
        OrderDetails
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)

const SearchStack = createStackNavigator(
    {
        Search,
        SearchDetails
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)

const NavContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: HomeStack,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={24} color={tintColor} />
                    }
                },
                Completed: {
                    screen: CompletedStack,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons
                            name='ios-subway' size={24} color={tintColor} />
                    }
                },
                Search: {
                    screen: SearchStack,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons
                            name='ios-search' size={24} color={tintColor} />
                    }
                },
                Settings: {
                    screen: Settings,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons
                            name='ios-settings' size={24} color={tintColor} />
                    }
                }
            },
            {
                tabBarOptions: {
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: '#B8BBC4'
                }
            }
        )
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
)

const AuthNav = createStackNavigator(
    {
        Welcome,
        Login
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                height: theme.sizes.base * 4,
                backgroundColor: theme.colors.white, // or 'white
                borderBottomColor: "transparent",
                elevation: 0, // for android
            },
            headerBackImage: <Image source={require('../assets/back.png')} />,
            headerBackTitle: null,
            headerLeftContainerStyle: {
                alignItems: 'center',
                marginLeft: theme.sizes.base * 2,
                paddingRight: theme.sizes.base,
            },
            headerRightContainerStyle: {
                alignItems: 'center',
                paddingRight: theme.sizes.base,
            },
        }
    }
)

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading,
            App: NavContainer,
            Auth: AuthNav
        },
        {
            initialRouteName: 'Loading'
        }
    )
)