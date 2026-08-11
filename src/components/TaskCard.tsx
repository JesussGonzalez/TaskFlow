import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../theme';
import type { Task } from '../types';
import { formatTaskDate } from '../utils/formatTaskDate';

type TaskCardProps = {
    task: Task;
    onPress: (task: Task) => void;
    onToggleCompleted: (taskId: string) => void;
};

export default function TaskCard({ task, onPress, onToggleCompleted }: TaskCardProps) {
    return (
        <View style={[styles.card, task.completed && styles.cardCompleted]}>
            <TouchableOpacity
                accessibilityHint="Abre la información completa de la tarea"
                accessibilityLabel={`Ver detalle de ${task.title}`}
                activeOpacity={0.75}
                onPress={() => onPress(task)}
                style={styles.content}
            >
                <Text
                    numberOfLines={1}
                    style={[styles.title, task.completed && styles.completedText]}
                >
                    {task.title}
                </Text>
                <Text
                    numberOfLines={2}
                    style={[styles.description, task.completed && styles.completedText]}
                >
                    {task.description}
                </Text>
                <View style={styles.metadata}>
                    <Text style={styles.category}>{task.category}</Text>
                    <Text style={styles.date}>{formatTaskDate(task.createdAt)}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                accessibilityLabel={
                    task.completed ? 'Marcar tarea como pendiente' : 'Marcar tarea como completada'
                }
                accessibilityRole="checkbox"
                accessibilityState={{ checked: task.completed }}
                activeOpacity={0.75}
                onPress={() => onToggleCompleted(task.id)}
                style={styles.statusButton}
            >
                <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
                    {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
                </View>
                <Text style={styles.statusText}>{task.completed ? 'Lista' : 'Pendiente'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
    },
    cardCompleted: {
        backgroundColor: '#F9FAFB',
    },
    content: {
        flex: 1,
        padding: 18,
    },
    title: {
        marginBottom: 6,
        color: COLORS.text,
        fontSize: 17,
        fontWeight: '700',
    },
    description: {
        marginBottom: 14,
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    },
    completedText: {
        opacity: 0.65,
        textDecorationLine: 'line-through',
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    category: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    date: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    statusButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 76,
        paddingHorizontal: 8,
        borderLeftWidth: 1,
        borderLeftColor: COLORS.border,
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        marginBottom: 6,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 14,
        backgroundColor: COLORS.surface,
    },
    checkboxCompleted: {
        borderColor: COLORS.success,
        backgroundColor: COLORS.success,
    },
    checkmark: {
        color: COLORS.surface,
        fontSize: 16,
        fontWeight: '800',
    },
    statusText: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
    },
});
