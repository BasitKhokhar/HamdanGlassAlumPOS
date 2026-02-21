import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { stats, lowStockItems } from "../data/mockData";

const Dashboard = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>this is Dashboardscreen</Text>
            {/* Stats Grid */}
            {/* <View style={styles.statsGrid}>
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;

                    return (
                        <View key={idx} style={styles.statCard}>
                            <View
                                style={[
                                    styles.statIcon,
                                    { backgroundColor: stat.color },
                                ]}
                            >
                                <Icon size={20} color="#fff" />
                            </View>

                            <Text style={styles.statLabel}>
                                {stat.label}
                            </Text>

                            <Text style={styles.statValue}>
                                {stat.value}
                            </Text>
                        </View>
                    );
                })}
            </View> */}

            {/* Low Stock Card */}


        </ScrollView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },

    /* Stats Grid */
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    statCard: {
        width: "48%",
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },

    statLabel: {
        fontSize: 12,
        color: "#64748b",
    },

    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 4,
    },

    /* Low Stock Card */
    lowStockCard: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 20,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    lowStockTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 16,
    },

    lowStockRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    itemName: {
        fontSize: 14,
        color: "#1a1c1e",
    },

    lowStockValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#ef4444",
    },
});
