
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../Theme/colors";
import Constants from "expo-constants";
import GradientButton from "../../components/UI/GradientButton";

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SplashScreen4 = ({ navigation }) => {
    const NextScreen = async () => {
        try {
            await AsyncStorage.setItem("isFirstTime", "false");
        } catch (e) {
            console.error("Error saving isFirstTime", e);
        }
        navigation.replace("Login");
    }


    return (
        <View style={styles.container}>
            {/* Top Image with Gradient Overlay */}
            <View style={styles.topContainer}>
                <Image
                    source={require("../../../assets/splash33.jpg")}
                    style={styles.image}
                />
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)", colors.bodybackground]}
                    style={styles.overlay}
                >
                    <Text style={styles.title}>💫 Get Ready for a Smart Experience</Text>
                </LinearGradient>
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                <Text style={styles.description}>
                    Personalized tools and lightning-fast AI features that help you create amazing visuals — let’s dive in!
                </Text>

                <GradientButton
                    title="Lets Get Started"
                    onPress={NextScreen}
                    gradientColors={colors.gradients.ocean}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bodybackground,
        alignItems: "center",
    },
    topContainer: {
        width: "100%",
        height: "70%",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingVertical: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.text,
        textAlign: "center",
        textShadowColor: colors.primary,
        // textShadowOffset: { width: 0, height: 0 },
        // textShadowRadius: 10,
        paddingHorizontal: 20,
    },
    contentContainer: {
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        color: colors.mutedText,
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 22,
    },
    buttonWrapper: {
        width: "100%",
        borderRadius: 40,
        shadowColor: colors.accent,
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 8,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 40,
        alignItems: "center",
    },
    buttonText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});

export default SplashScreen4;
