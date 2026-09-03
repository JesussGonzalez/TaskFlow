import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { TaskStackParamList } from '../navigation/types';
import { COLORS } from '../theme';
import type { Task } from '../types';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'> & {
    tasks: Task[];
};

export default function TaskDetailScreen({ route, tasks }: Props) {
    const { taskId } = route.params;
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Tarea no encontrada</Text>
                    <Text style={styles.description}>
                        No pudimos encontrar la tarea seleccionada.
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eyebrow}>ID: {taskId}</Text>
            <Text style={styles.title}>{task.title}</Text>

            <View
                style={[
                    styles.statusBadge,
                    task.completed && styles.statusBadgeCompleted,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        task.completed && styles.statusTextCompleted,
                    ]}
                >
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
        paddingTop: 24,
    },
    eyebrow: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 8,
    },
    title: {
        color: COLORS.text,
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 14,
    },
    description: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
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
