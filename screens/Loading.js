import React, {useEffect} from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import {Text} from '../components'
import { theme } from '../constants';
import firebase from 'firebase'


const Loading = props => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            props.navigation.navigate(user ? 'App' : 'Auth');
        })
    },[])

    return (
        <View style={styles.container}>
            <Text center caption gray style={{marginBottom: 20}}>
                Loading ...
            </Text>
            <ActivityIndicator size='large' color={theme.colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default Loading