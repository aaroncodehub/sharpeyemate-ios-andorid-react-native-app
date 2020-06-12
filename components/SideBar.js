import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

export default SideBar = props => (
    <ScrollView>
        <ImageBackground
            source={{uri:'https://images.unsplash.com/photo-1489376646075-cd00ac377106?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}}
            style={{ width: undefined, padding: 16, paddingTop: 48 }}
        >
            <Image source={require("../assets/images/avatar.png")} style={styles.profile} />
            <Text style={styles.name}>Sophie Stewart</Text>
        </ImageBackground>

        <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500",
        marginVertical: 8
    }
});
