import 'dotenv/config';

export default () => ({
    expo: {
        name: "Hamdan Glass POS",
        slug: "hamdanglasspos2",
        owner: "talhabasit7016",
        version: "1.0.0",
        orientation: "portrait",

        icon: "./assets/icon.png",

        userInterfaceStyle: "light",

        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#1a1a1a"
        },

        android: {
            package: "com.talhabasit.hamdanglasspos",
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            permissions: [
                "BLUETOOTH",
                "BLUETOOTH_CONNECT",
                "BLUETOOTH_SCAN",
                "ACCESS_FINE_LOCATION",
                "INTERNET",
                "POST_NOTIFICATIONS"
            ],
            edgeToEdgeEnabled: true
        },

        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.basitkhokhar.hamdanglasspos"
        },

        notification: {
            icon: "./assets/icon.png",
            color: "#1a1a1a"
        },

        web: {
            favicon: "./assets/favicon.png"
        },

        plugins: [
            "expo-secure-store",
            "expo-font",
            "expo-linear-gradient",
            "expo-image-picker",
            "expo-web-browser",
            "expo-notifications",
            "expo-file-system",
            "expo-print",
        ],

        extra: {
            API_BASE_URL: process.env.API_BASE_URL,
            EXPO_PROJECT_ID: process.env.EXPO_PROJECT_ID,
            eas: {
                projectId: process.env.EXPO_PROJECT_ID
            }
        }
    }
});