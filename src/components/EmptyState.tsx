import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';

type EmptyStateProps = {
    title?: string;
    text?: string;
};

export default function EmptyState({
    title = '¡No tienes tareas pendientes!',
    text = 'Empieza por crear una nueva tarea.',
}: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon} accessibilityElementsHidden>
                ✓
            </Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
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
