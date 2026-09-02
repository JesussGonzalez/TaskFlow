import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
import type { Task } from '../types';

type TaskDetailProps = {
    task: Task;
    onBack: () => void;
};

export default function TaskDetail({ task, onBack }: TaskDetailProps) {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onBack}
                style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Volver a la lista de tareas"
            >
                <Text style={styles.backButtonText}>‹ Volver</Text>
            </Pressable>

            <Text style={styles.eyebrow}>Detalle de tarea</Text>
            <Text style={styles.title}>{task.title}</Text>

            <View style={[styles.statusBadge, task.completed && styles.statusBadgeCompleted]}>
                <Text style={[styles.statusText, task.completed && styles.statusTextCompleted]}>
                    {task.completed ? 'Completada' : 'Pendiente'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.value}>{task.description}</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Fecha</Text>
                <Text style={styles.value}>{task.date}</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Categoría</Text>
                <Text style={styles.value}>{task.category}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 18,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 28,
        paddingVertical: 8,
    },
    pressed: {
        opacity: 0.65,
    },
    backButtonText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: '700',
    },
    eyebrow: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.6,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    title: {
        color: COLORS.text,
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 14,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.primarySoft,
        borderRadius: 999,
        marginBottom: 24,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    statusBadgeCompleted: {
        backgroundColor: '#ECFDF5',
    },
    statusText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    statusTextCompleted: {
        color: COLORS.success,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: 18,
        borderWidth: 1,
        padding: 20,
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
    },
    value: {
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 23,
    },
    divider: {
        backgroundColor: COLORS.border,
        height: 1,
        marginVertical: 18,
    },
});
