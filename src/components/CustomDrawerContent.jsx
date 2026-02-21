import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import {
    LayoutDashboard,
    PackageSearch,
    ShoppingCart,
    FileText,
    History,
    ChevronRight,
    X,
} from "lucide-react-native";
// import { colors } from "../Theme/color";

const CustomDrawerContent = (props) => {
    const { navigation } = props;

    const navItems = [
        { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "StockIn", icon: PackageSearch, label: "Inventory" },
        { id: "StockOut", icon: ShoppingCart, label: "Point of Sale" },
        { id: "CreateBill", icon: FileText, label: "Create Bill" },
        { id: "Records", icon: History, label: "Records" },
    ];

    return (
        <View style={styles.container}>
            {/* Header / Top Section */}
            <View style={styles.drawerHeader}>
                <Text style={styles.title}>Aluminum Hub</Text>
                <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                    <X size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Navigation Items */}
            <ScrollView style={styles.drawerContent}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // You can check state here if you want to highlight active items
                    // const isActive = props.state.routeNames[props.state.index] === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.navItem}
                            onPress={() => {
                                navigation.navigate(item.id);
                            }}
                        >
                            <View style={styles.navLeft}>
                                <Icon size={20} color="#94a3b8" />
                                <Text style={styles.navText}>{item.label}</Text>
                            </View>
                            <ChevronRight size={16} color="#475569" />
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Bottom Section (Optional) */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>v1.0.0</Text>
            </View>
        </View>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1c1e",
        paddingTop: 50,
    },
    drawerHeader: {
        paddingHorizontal: 20,
        paddingBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#1e293b",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
    },
    drawerContent: {
        padding: 16,
    },
    navItem: {
        padding: 15,
        borderRadius: 12,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    navLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    navText: {
        color: "#cbd5e1",
        fontSize: 16,
        fontWeight: "500",
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#1e293b",
        alignItems: "center",
    },
    footerText: {
        color: "#64748b",
        fontSize: 12,
    },
});
