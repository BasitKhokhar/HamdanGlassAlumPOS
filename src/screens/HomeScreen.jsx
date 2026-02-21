// src/screens/Home/HomeScreen.js

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "./../Theme/colors";

const HomeScreen = ({ navigation }) => {

  // Hide header if needed
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is HomeScreen/MainScreen
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bodybackground,
  },
  text: {
    fontSize: 18,
    color: colors.text,
  },
});

export default HomeScreen;