import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Menu } from "lucide-react-native"; // use lucide-react-native for RN

const Header = ({ title, subtitle, openDrawer }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>

                <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
                    <Menu size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1c1e",
        padding: 24,
        paddingBottom: 48,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        elevation: 8, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ffffff",
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 14,
        color: "#94a3b8", // slate-400 equivalent
        marginTop: 4,
    },
    menuButton: {
        height: 48,
        width: 48,
        backgroundColor: "#1e293b", // slate-800 equivalent
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
});
