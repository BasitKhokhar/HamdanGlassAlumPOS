import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Animated,
} from "react-native";
import { colors } from "../../Theme/colors";

const AnimatedInputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    style,
    inputStyle,
    error,
    errorText,
    disabledTextColor,
    rightIcon,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
    const focusAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: (value || placeholder || isFocused) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value, placeholder, isFocused]);

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isFocused]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const labelStyle = {
        top: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [14, -10],
        }),
        fontSize: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [15, 12],
        }),
        color: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [
                colors.mutedText,
                error
                    ? colors.error
                    : (isFocused ? colors.primary : colors.mutedText)
            ],
        }),
        backgroundColor: colors.cardsbackground,
    };

    const containerBorderColor = error
        ? colors.error
        : (isFocused ? colors.primary : colors.border);

    return (
        <View style={[styles.outerContainer, style]}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        borderColor: containerBorderColor,
                        shadowOpacity: focusAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5]
                        }),
                        elevation: focusAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 8]
                        }),
                    },
                    error && styles.errorBorder
                ]}
            >
                <Animated.Text style={[styles.label, labelStyle]}>
                    {label}
                </Animated.Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={(isFocused || value) ? placeholder : ""}
                        placeholderTextColor={colors.mutedText + "60"}
                        secureTextEntry={secureTextEntry}
                        style={[
                            styles.input,
                            props.editable === false && { color: disabledTextColor },
                            inputStyle
                        ]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    />
                    {rightIcon && (
                        <View style={styles.rightIconContainer}>
                            {rightIcon}
                        </View>
                    )}
                </View>
            </Animated.View>

            {error && errorText ? (
                <Text style={styles.errorText}>{errorText}</Text>
            ) : null}
        </View>
    );
};

export default AnimatedInputField;

const styles = StyleSheet.create({
    outerContainer: {
        marginBottom: 15,
        width: "100%",
    },
    container: {
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: colors.cardsbackground,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
    },
    errorBorder: {
        borderColor: colors.error,
        shadowColor: colors.error,
    },
    label: {
        position: "absolute",
        left: 15,
        paddingHorizontal: 6,
        zIndex: 1,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: colors.text,
    },
    rightIconContainer: {
        marginLeft: 8,
    },
    errorText: {
        color: colors.error,
        fontSize: 11,
        marginTop: 4,
        marginLeft: 4,
    },
});