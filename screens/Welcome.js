import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const Welcome = (props) => {
  const bgImage = require('../assets/bg.jpg')
  const logoImage = require('../assets/logo-white.png')
  return (
    <View style={styles.container}>

      <ImageBackground source={bgImage} style={styles.bgImage}>
        <View style={styles.header}>
          <Animatable.View
            animation="bounceIn"
            style={{ ...styles.logoContainer }}>
            <Image
              animation="bounceIn"
              source={logoImage}
              style={styles.logo}
            />
          </Animatable.View>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={styles.footer}>
          <Text style={styles.title}>Stay Connected With You</Text>
          <Text style={styles.text}>sign in with account</Text>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <LinearGradient
                colors={['#2980b9', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons
                  name="navigate-next"
                  color="#fff"
                  size={20}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  )
}

Welcome.navigationOptions = {
  header: null
}
export default Welcome

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen")

const height_logo = height * 0.1;
const buttonWidth = width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9'
  },
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logo: {
    width: height_logo *1.2,
    height: height_logo *0.6,
    resizeMode: "cover",
  },
  title: {
    color: '#05375a',
    fontSize: 26,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: buttonWidth / 2
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    padding: 10
  },
  logoContainer: {
    backgroundColor: "#2980b9",
    height: height_logo *1.6,
    width: height_logo *1.6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: height_logo,
  }
});
