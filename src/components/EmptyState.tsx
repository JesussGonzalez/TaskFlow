import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

export default function EmptyState() {
    return (
        <View style={styles.container}>
            <Text style={styles.icon} accessibilityElementsHidden>
                ✓
            </Text>
            <Text style={styles.title}>¡No tienes tareas pendientes!</Text>
            <Text style={styles.text}>Empieza por crear una arriba.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: 18,
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    icon: {
        color: COLORS.success,
        fontSize: 36,
        fontWeight: '800',
        marginBottom: 12,
    },
    title: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
        textAlign: 'center',
    },
    text: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'center',
    },
});
