import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/MaterialIcons";
import AppContainer from "./src/AppContainer";
import apiFetch from "./src/apiFetch";
/* ========= Import Your Screens ========= */

// Splash + Auth
import LogoSplashScreen from "./src/screens/splashScreens/logoSplashScreen";
import SplashScreen2 from "./src/screens/splashScreens/SplashScreen2";
import SplashScreen3 from "./src/screens/splashScreens/SplashScreen3";
import SplashScreen4 from "./src/screens/splashScreens/SplashScreen4";

import LoginScreen from "./src/screens/Auth/Login";
import SignupScreen from "./src/screens/Auth/Signup";

// Main POS Screen
import HomeScreen from "./src/screens/HomeScreen";
import DashboardScreen from "./src/screens/Dashboard";
import StockInScreen from "./src/screens/StockIn";
import StockOutScreen from "./src/screens/StockOut";
import CreateBillScreen from "./src/screens/CreateBill";
import RecordsScreen from "./src/screens/Records";

// Custom Drawer UI
import CustomDrawerContent from "./src/components/CustomDrawerContent";

/* ========= Navigation Setup ========= */

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

/* ========= Header Layout ========= */

const MainLayout = ({ navigation, children }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="more-vert" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </View>
  );
};

/* ========= Drawer Layout ========= */

const DrawerLayout = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerPosition: "left" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home">
        {(props) => (
          <MainLayout {...props}>
            <HomeScreen {...props} />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Dashboard">
        {(props) => (
          <MainLayout {...props}>
            <DashboardScreen {...props} />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="StockIn">
        {(props) => (
          <MainLayout {...props}>
            <StockInScreen {...props} />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="StockOut">
        {(props) => (
          <MainLayout {...props}>
            <StockOutScreen {...props} />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="CreateBill">
        {(props) => (
          <MainLayout {...props}>
            <CreateBillScreen {...props} />
          </MainLayout>
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Records">
        {(props) => (
          <MainLayout {...props}>
            <RecordsScreen {...props} />
          </MainLayout>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

/* ========= App Root ========= */

export default function App() {
  /* ================= State ================= */
  const [Token, setToken] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const firstTime = await AsyncStorage.getItem("isFirstTime");
        setIsFirstTime(firstTime === null);

        const token = await SecureStore.getItemAsync("refreshToken");
        setToken(token);
      } catch (e) {
        console.error("Error initializing app", e);
      } finally {
        setCheckingLogin(false);
      }
    };
    initializeApp();
  }, []);

  if (checkingLogin) return null;

  return (
    // <TourGuideProvider
    //   tooltipComponent={CustomTooltip}
    //   overlayColor="rgba(0,0,0,0.6)"
    //   androidStatusBarVisible={true}
    //   preventOutsideInteraction={true}
    //   backdropColor="rgba(0,0,0,0.7)"
    //   tooltipStyle={{ borderRadius: 12 }}
    // >
    <AppContainer>
      {/* <GenerationProvider> */}
      {/* <PaperProvider> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ThemeProvider> */}
        {/* <GlobalTouchListener> */}
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Splash1"
            screenOptions={{
              headerShadowVisible: false,
              gestureEnabled: true,
            }}
          >
            {/* Splash Screens */}
            <Stack.Screen
              name="Splash1"
              component={LogoSplashScreen}
              initialParams={{ isLoggedIn: !!Token, isFirstTime }}
              options={{ headerShown: false, animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Splash2"
              component={SplashScreen2}
              options={{ headerShown: false, animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Splash3"
              component={SplashScreen3}
              options={{ headerShown: false, animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Splash4"
              component={SplashScreen4}
              options={{ headerShown: false, animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false, animation: "slide_from_left" }}
            />
            <Stack.Screen
              name="Main"
              component={DrawerLayout}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false, animation: "slide_from_bottom" }} />
          </Stack.Navigator>
          <GlobalGenerationStatusBar />
        </NavigationContainer>
        {/* </GlobalTouchListener> */}
        {/* </ThemeProvider> */}
      </GestureHandlerRootView>
      {/* </PaperProvider> */}
      {/* </GenerationProvider> */}
    </AppContainer>
    // </TourGuideProvider>
  );
};

/* ========= Styles ========= */

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "#111",
    paddingTop: 25,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});