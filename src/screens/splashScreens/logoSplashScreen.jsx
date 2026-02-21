import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { colors } from "../../Theme/colors";
// import { fonts } from "../../Themes/fonts";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;



const LogoSplashScreen = ({ navigation, route }) => {
    const { isLoggedIn, isFirstTime } = route.params || {};

    useEffect(() => {
        const timer = setTimeout(async () => {
            const token = await SecureStore.getItemAsync("refreshToken");

            if (token) {
                navigation.replace("Main");
            } else if (isFirstTime) {
                navigation.replace("Splash2");
            } else {
                navigation.replace("Login");
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation, isFirstTime]);
    return (
        <View style={styles.container}>
            {/* Animated Logo */}
            <Animatable.View
                animation="zoomIn"
                duration={1500}
                style={styles.imageWrapper}
            >
                <Image
                    source={require("../../../assets/logoo.png")}
                    style={styles.image}
                />
            </Animatable.View>

            {/* Bottom Credits - Animated Company Name */}
            <Animatable.View
                animation="fadeInUp"
                duration={1800}
                delay={500}
                style={styles.bottomTextContainer}
            >
                <Text style={styles.poweredByText}>
                    Powered By
                </Text>
                <Text style={styles.companyName}>CoderzPark</Text>
                {/* <View style={styles.underline} /> */}
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cardsbackground,
        justifyContent: "center",
        alignItems: "center",
    },
    imageWrapper: {
        width: 80,
        height: 80,
        // borderWidth: 2,
        // borderColor: colors.primary,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.border,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        backgroundColor: "transparent",

    },
    bottomTextContainer: {
        position: "absolute",
        bottom: 50,
        alignItems: "center",
    },
    poweredByText: {
        color: colors.mutedText,
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: '700',
        textAlign: "center",
        // opacity: 0.7,
        letterSpacing: .4,
        marginBottom: 2,
    },
    companyName: {
        color: colors.text,
        fontStyle: 'italic',
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: .4,
        // Multiple text shadows for gradient-like depth effect
        // textShadowColor: colors.primary,
        // textShadowOffset: { width: 0, height: 2 },
        // textShadowRadius: 10,
        // Additional styling for premium look
        // textTransform: "uppercase",
    },
    underline: {
        width: 60,
        height: 2,
        backgroundColor: colors.primary,
        marginTop: 8,
        borderRadius: 2,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
});

export default LogoSplashScreen;
