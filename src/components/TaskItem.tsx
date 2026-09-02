import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
import type { Task } from '../types';

type TaskItemProps = {
    task: Task;
    onPress: () => void;
    onToggleCompleted: () => void;
};

export default function TaskItem({ task, onPress, onToggleCompleted }: TaskItemProps) {
    return (
        <View style={styles.card}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [styles.content, pressed && styles.contentPressed]}
                accessibilityRole="button"
                accessibilityLabel={`Ver detalle de ${task.title}`}
            >
                <View style={styles.titleRow}>
                    <Text style={[styles.title, task.completed && styles.completedTitle]} numberOfLines={1}>
                        {task.title}
                    </Text>
                    <Text style={styles.arrow}>›</Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                    {task.description}
                </Text>
                <View style={styles.metaRow}>
                    <Text style={styles.meta}>{task.category}</Text>
                    <Text style={styles.meta}>{task.date}</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={onToggleCompleted}
                style={({ pressed }) => [
                    styles.statusButton,
                    task.completed && styles.statusButtonCompleted,
                    pressed && styles.statusButtonPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={task.completed ? `Marcar ${task.title} como pendiente` : `Marcar ${task.title} como completada`}
            >
                <Text style={[styles.statusText, task.completed && styles.statusTextCompleted]}>
                    {task.completed ? 'Completada' : 'Marcar como hecha'}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
    },
    content: {
        padding: 16,
    },
    contentPressed: {
        opacity: 0.72,
    },
    titleRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    title: {
        color: COLORS.text,
        flex: 1,
        fontSize: 17,
        fontWeight: '700',
        marginRight: 12,
    },
    completedTitle: {
        color: COLORS.textSecondary,
        textDecorationLine: 'line-through',
    },
    arrow: {
        color: COLORS.primary,
        fontSize: 26,
        lineHeight: 26,
    },
    description: {
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    metaRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    meta: {
        backgroundColor: COLORS.primarySoft,
        borderRadius: 10,
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600',
        overflow: 'hidden',
        paddingHorizontal: 9,
        paddingVertical: 5,
    },
    statusButton: {
        alignItems: 'center',
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 11,
    },
    statusButtonCompleted: {
        backgroundColor: '#ECFDF5',
    },
    statusButtonPressed: {
        opacity: 0.75,
    },
    statusText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    statusTextCompleted: {
        color: COLORS.success,
    },
});
