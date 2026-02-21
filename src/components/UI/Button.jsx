import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../../Theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ title, onPress, iconname, loading = false, disabled = false, style, textStyle, containerstyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading || disabled}
            activeOpacity={0.8}
            style={[styles.buttonWrapper, style]}
        >
            <View style={[styles.contentContainer, containerstyle]}>
                {loading ? (
                    <ActivityIndicator color={colors.text} size="small" />
                ) : (
                    <View style={styles.innerContainer}>
                        {iconname && <Icon name={iconname} size={16} color={colors.text} style={styles.icon} />}
                        <Text style={[styles.text, textStyle]}>{title}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.secondary,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        color: colors.text,
        fontSize: 14,
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: 22,
    },
});

export default Button;