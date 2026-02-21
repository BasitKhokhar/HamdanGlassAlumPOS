import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
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

const SideDrawer = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
    const navItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "stock-in", icon: PackageSearch, label: "Inventory" },
        { id: "stock-out", icon: ShoppingCart, label: "Point of Sale" },
        { id: "create-bill", icon: FileText, label: "Create Bill" },
        { id: "records", icon: History, label: "Records" },
    ];

    return (
        <Modal visible={isOpen} transparent animationType="fade">
            <View style={styles.overlayContainer}>

                {/* Overlay */}
                <Pressable style={styles.overlay} onPress={() => setIsOpen(false)} />

                {/* Drawer */}
                <View style={styles.drawer}>
                    <View style={styles.drawerHeader}>
                        <Text style={styles.title}>Aluminum Hub</Text>

                        <TouchableOpacity onPress={() => setIsOpen(false)}>
                            <X size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.drawerContent}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.navItem,
                                        isActive && styles.activeNavItem,
                                    ]}
                                    onPress={() => {
                                        setActiveTab(item.id);
                                        setIsOpen(false);
                                    }}
                                >
                                    <View style={styles.navLeft}>
                                        <Icon
                                            size={18}
                                            color={isActive ? "#fff" : "#94a3b8"}
                                        />
                                        <Text
                                            style={[
                                                styles.navText,
                                                isActive && styles.activeNavText,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                    </View>

                                    <ChevronRight
                                        size={14}
                                        color={isActive ? "#fff" : "#94a3b8"}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SideDrawer;

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        flexDirection: "row",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
    },

    drawer: {
        width: "80%",
        maxWidth: 320,
        backgroundColor: "#1a1c1e",
        paddingTop: 40,
    },

    drawerHeader: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#1e293b",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },

    drawerContent: {
        padding: 16,
    },

    navItem: {
        padding: 14,
        borderRadius: 14,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    activeNavItem: {
        backgroundColor: "#2563eb",
    },

    navLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    navText: {
        color: "#94a3b8",
        fontSize: 14,
    },

    activeNavText: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
