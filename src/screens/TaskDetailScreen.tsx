import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { TaskStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeTask, saveTaskStatus } from '../store/taskSlice';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ navigation, route }: Props) {
    const dispatch = useAppDispatch();
    const [actionError, setActionError] = useState('');
    const { taskId } = route.params;
    const task = useAppSelector((state) =>
        state.tasks.items.find((item) => item.id === taskId),
    );

    if (!task) {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Tarea no encontrada</Text>
                    <Text style={styles.description}>
                        La tarea ya no está disponible.
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('TaskList')}
                        style={({ pressed }) => [
                            styles.primaryButton,
                            pressed && styles.buttonPressed,
                        ]}
                    >
                        <Text style={styles.primaryButtonText}>
                            Volver a la lista
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    const handleToggle = async () => {
        try {
            setActionError('');
            await dispatch(
                saveTaskStatus({
                    taskId: task.id,
                    completed: !task.completed,
                }),
            ).unwrap();
        } catch (error) {
            setActionError(
                typeof error === 'string'
                    ? error
                    : 'No se pudo actualizar la tarea.',
            );
        }
    };

    const handleDelete = async () => {
        try {
            setActionError('');
            await dispatch(removeTask(task.id)).unwrap();
            navigation.navigate('TaskList');
        } catch (error) {
            setActionError(
                typeof error === 'string'
                    ? error
                    : 'No se pudo eliminar la tarea.',
            );
        }
    };

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

            {actionError ? (
                <Text style={styles.errorText}>{actionError}</Text>
            ) : null}

            <Pressable
                onPress={handleToggle}
                style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={styles.primaryButtonText}>
                    {task.completed
                        ? 'Marcar como pendiente'
                        : 'Marcar como completada'}
                </Text>
            </Pressable>

            <Pressable
                onPress={handleDelete}
                style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={styles.deleteButtonText}>Eliminar tarea</Text>
            </Pressable>
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
        marginBottom: 18,
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
        marginBottom: 18,
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
    errorText: {
        color: '#B91C1C',
        fontSize: 13,
        marginBottom: 12,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        marginBottom: 10,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    deleteButton: {
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        borderColor: '#FECACA',
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    deleteButtonText: {
        color: '#B91C1C',
        fontSize: 14,
        fontWeight: '700',
    },
    buttonPressed: {
        opacity: 0.78,
    },
});
