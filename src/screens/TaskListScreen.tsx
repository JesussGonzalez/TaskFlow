import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import EmptyState from '../components/EmptyState';
import TaskItem from '../components/TaskItem';
import type { TaskStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter, toggleTaskStatus, type TaskFilter } from '../store/taskSlice';
import { COLORS } from '../theme';
import type { Task } from '../types';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

const filters: { value: TaskFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'completed', label: 'Completadas' },
];

export default function TaskListScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const { items, filter } = useAppSelector((state) => state.tasks);

    const filteredTasks = items.filter((task: Task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const emptyMessage =
        filter === 'all'
            ? {
                  title: 'No hay tareas cargadas',
                  text: 'Creá una nueva tarea para empezar.',
              }
            : {
                  title: 'No hay tareas para este filtro',
                  text: 'Probá seleccionando otro estado.',
              };

    return (
        <FlatList
            data={filteredTasks}
            keyExtractor={(item: Task) => item.id}
            renderItem={({ item }: { item: Task }) => (
                <TaskItem
                    task={item}
                    onPress={() =>
                        navigation.navigate('TaskDetail', {
                            taskId: item.id,
                        })
                    }
                    onToggleCompleted={() => dispatch(toggleTaskStatus(item.id))}
                />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>TaskFlow</Text>
                        <Text style={styles.subtitle}>
                            Tus tareas ahora se administran desde Redux.
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate('TaskForm')}
                        style={({ pressed }: { pressed: boolean }) => [
                            styles.addButton,
                            pressed && styles.addButtonPressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Crear una nueva tarea"
                    >
                        <Text style={styles.addButtonText}>+ Nueva tarea</Text>
                    </Pressable>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Tus tareas</Text>
                        <Text style={styles.counter}>
                            {filteredTasks.length}/{items.length}
                        </Text>
                    </View>

                    <View style={styles.filters}>
                        {filters.map((item) => {
                            const isActive = filter === item.value;

                            return (
                                <Pressable
                                    key={item.value}
                                    onPress={() => dispatch(setFilter(item.value))}
                                    style={({ pressed }: { pressed: boolean }) => [
                                        styles.filterButton,
                                        isActive && styles.filterButtonActive,
                                        pressed && styles.filterButtonPressed,
                                    ]}
                                    accessibilityRole="button"
                                    accessibilityState={{ selected: isActive }}
                                >
                                    <Text
                                        style={[
                                            styles.filterText,
                                            isActive && styles.filterTextActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            }
            ListEmptyComponent={
                <EmptyState title={emptyMessage.title} text={emptyMessage.text} />
            }
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        flexGrow: 1,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        color: COLORS.primary,
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 16,
        lineHeight: 22,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        marginBottom: 24,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    addButtonPressed: {
        opacity: 0.85,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    sectionHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
    },
    counter: {
        backgroundColor: COLORS.primarySoft,
        borderRadius: 12,
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
        overflow: 'hidden',
        paddingHorizontal: 8,
        paddingVertical: 5,
        textAlign: 'center',
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: 999,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    filterButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterButtonPressed: {
        opacity: 0.75,
    },
    filterText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '700',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    separator: {
        height: 12,
    },
});
