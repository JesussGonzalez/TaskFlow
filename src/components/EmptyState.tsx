import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../theme';

export default function EmptyState() {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>＋</Text>
            </View>
            <Text style={styles.title}>Todavía no hay tareas</Text>
            <Text style={styles.message}>
                ¡No tienes tareas pendientes! Empieza por crear una arriba.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 42,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        borderStyle: 'dashed',
        backgroundColor: COLORS.surface,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        height: 54,
        marginBottom: 16,
        borderRadius: 27,
        backgroundColor: COLORS.primarySoft,
    },
    icon: {
        color: COLORS.primary,
        fontSize: 30,
        fontWeight: '500',
        lineHeight: 34,
    },
    title: {
        marginBottom: 8,
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    message: {
        maxWidth: 320,
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
    },
});
