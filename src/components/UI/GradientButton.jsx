import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../Theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';

const GradientButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    gradientColors,
    style,
    gradientStyle,
    textStyle,
    iconname,
    iconSize = 18,
    iconColor = colors.text,
    iconType = 'FontAwesome'
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading || disabled}
            activeOpacity={0.8}
            style={[styles.buttonWrapper, style]}
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gradient, gradientStyle]}
            >
                {loading ? (
                    <ActivityIndicator color={colors.text} size="small" />
                ) : (
                    <View style={styles.innerContainer}>
                        {iconname && (
                            iconType === 'MaterialIcons' ? (
                                <MaterialIcons name={iconname} size={iconSize} color={iconColor} style={styles.iconStyle} />
                            ) : (
                                <FontAwesome name={iconname} size={iconSize} color={iconColor} style={styles.iconStyle} />
                            )
                        )}
                        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconStyle: {
        marginRight: 8,
    },
    textStyle: {
        color: colors.text,
        fontSize: 14,
        letterSpacing: 0.2,
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: 22,
    },
});

export default GradientButton;