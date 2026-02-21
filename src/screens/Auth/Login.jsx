import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform, Dimensions,
  ActivityIndicator, ScrollView,
  Image,
} from "react-native";
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { colors } from "../../Theme/colors";
import logoImage from "../../../assets/logoo.png";
// import { useGeneration } from "../../Context/ImageGenerationContext";

import AnimatedInputField from "../../components/UI/InputField";
import GradientButton from "../../components/UI/GradientButton";
import Button from "../../components/UI/Button";

const { height } = Dimensions.get("window");

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const LoginScreen = ({ navigation }) => {
  const { refreshContextData } = useGeneration();
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    passwordVisible: false,
    loading: false,
    toastVisible: false,
    toastMessage: "",
    isAgreed: false,
  });

  const updateState = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const showToast = (msg) => {
    updateState("toastMessage", msg);
    updateState("toastVisible", true);
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateInputs = () => {
    const emailError = !isValidEmail(state.email);
    const passwordError = state.password.length < 8;

    setState((prev) => ({
      ...prev,
      emailError,
      passwordError,
    }));

    return !emailError && !passwordError;
  };

  const handleLogin = async () => {
    if (!state.isAgreed) {
      showToast("Please agree to the Terms and Privacy Policy");
      return;
    }
    if (!validateInputs()) return;

    updateState("loading", true);
    updateState("toastVisible", false);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          termsStatus: true,
        }),
      });

      const data = await res.json();

      if (res.ok && data.accessToken && data.refreshToken) {
        await SecureStore.setItemAsync("accessToken", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        await AsyncStorage.setItem("userId", String(data.userId));

        // 🔄 Refresh context data after tokens are saved
        await refreshContextData();

        navigation.reset({
          index: 0,
          routes: [{ name: "SplashScreen" }],
        });
      } else {
        showToast(data.message || "Invalid email or password");
      }
    } catch {
      showToast("Unable to login. Please try again later.");
    } finally {
      updateState("loading", false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("🟢 Google Login started");
    if (!state.isAgreed) {
      showToast("Please agree to the Terms and Privacy Policy");
      return;
    }
    try {
      updateState("loading", true);
      // console.log("🔍 Checking Google Play Services...");
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // console.log("✅ Google Play Services available");

      // console.log("🟦 Opening Google Sign-In UI...");
      const response = await GoogleSignin.signIn();
      // console.log("📦 Google Sign-In raw response:", response);
      if (response.type !== "success") {
        return;
      }

      const { idToken } = response.data;

      if (!idToken) {
        throw new Error("Google ID token not found");
      }
      // Send token to backend
      const res = await fetch(`${API_BASE_URL}/auth/users/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, termsStatus: true }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Google login failed");
      }

      // Store tokens (same as normal login)
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      await AsyncStorage.setItem("userId", String(data.userId));

      // 🔄 Refresh context data after tokens are saved
      await refreshContextData();
      navigation.replace("SplashScreen")
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "SplashScreen" }],
      // });
    } catch (error) {
      console.log("Google Login Error:", error);
      showToast(error.message || "Google sign-in failed");
    } finally {
      updateState("loading", false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Gradient Header */}
        <LinearGradient
          colors={colors.gradients.ocean}
          style={styles.header}
        >
          <Image source={logoImage} style={styles.headerLogo} />
        </LinearGradient>

        {/* Floating Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.hello}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Login to your account to continue
            </Text>

            {/* Email */}
            <AnimatedInputField
              label="Email"
              value={state.email}
              onChangeText={(v) => updateState("email", v)}
              error={state.emailError}
              errorText="Invalid email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password */}
            <AnimatedInputField
              label="Password"
              value={state.password}
              onChangeText={(v) => updateState("password", v)}
              secureTextEntry={!state.passwordVisible}
              error={state.passwordError}
              errorText="Minimum 8 characters"
              rightIcon={
                <TouchableOpacity
                  onPress={() =>
                    updateState("passwordVisible", !state.passwordVisible)
                  }
                >
                  <Icon
                    name={state.passwordVisible ? "eye-slash" : "eye"}
                    size={18}
                    color={colors.mutedText}
                  />
                </TouchableOpacity>
              }
            />

            {/* Privacy & Ads Disclosure */}
            <View style={styles.disclosureContainer}>
              <TouchableOpacity
                onPress={() => updateState("isAgreed", !state.isAgreed)}
                style={styles.checkboxRow}
              >
                <Ionicons
                  name={state.isAgreed ? "checkbox" : "square-outline"}
                  size={20}
                  color={state.isAgreed ? colors.primary : colors.mutedText}
                />
                <Text style={styles.disclosureText}>
                  I agree to the <Text style={styles.boldText}>Terms & Conditions</Text> and <Text style={styles.boldText}>Privacy Policy</Text>. I understand that my data is collected for AI generation and showing ads.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <GradientButton
              title="Login"
              onPress={handleLogin}
              loading={state.loading}
              disabled={!state.isAgreed}
              gradientColors={colors.gradients.ocean}
              style={{ marginTop: 20, opacity: state.isAgreed ? 1 : 0.5 }}
            />

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            {/* Google */}
            <Button
              title="Continue with Google"
              onPress={handleGoogleLogin}
              loading={state.loading}
              disabled={!state.isAgreed}
              iconname="google"
              style={{ opacity: state.isAgreed ? 1 : 0.5 }}
            // style={styles.googleBtn}
            />

            {/* Signup */}
            <View style={styles.signupRow}>
              <Text style={styles.normalText}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.link}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Error Modal (unchanged) */}

      {/* Error Modal (unchanged) */}
      <ToastModel
        isVisible={state.toastVisible}
        message={state.toastMessage}
        type="error"
        showButton={true}
        onClose={() => updateState("toastVisible", false)}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bodybackground,
  },

  header: {
    height: height * .35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  headerLogo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardWrapper: {
    flex: 1,
    marginTop: -80,
    paddingHorizontal: 25,
  },

  card: {
    backgroundColor: colors.cardsbackground,
    borderRadius: 26,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
  },

  hello: {
    fontSize: 20,
    color: colors.text,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: colors.mutedText,
    textAlign: "center",
    marginBottom: 20,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  orText: {
    marginHorizontal: 12,
    color: colors.mutedText,
    fontSize: 12,
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  normalText: {
    color: colors.mutedText,
    fontSize: 14,
  },

  link: {
    color: colors.primary,
    fontSize: 14,
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  googleText: {
    color: colors.text,
    fontSize: 14,
  },

  disclosureContainer: {
    marginTop: 5,
    marginBottom: 5,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },

  disclosureText: {
    flex: 1,
    fontSize: 12,
    color: colors.mutedText,
    lineHeight: 18,
  },

  boldText: {
    color: colors.text,
  },
});