import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import EmptyState from '../components/EmptyState';
import TaskItem from '../components/TaskItem';
import type { TaskStackParamList } from '../navigation/types';
import { COLORS } from '../theme';
import type { Task } from '../types';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'> & {
    tasks: Task[];
    onToggleCompleted: (taskId: string) => void;
};

export default function TaskListScreen({
    navigation,
    tasks,
    onToggleCompleted,
}: Props) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item: Task) => item.id}
            renderItem={({ item }: { item: Task }) => (
                <TaskItem
                    task={item}
                    onPress={() =>
                        navigation.navigate('TaskDetail', {
                            taskId: item.id,
                        })
                    }
                    onToggleCompleted={() => onToggleCompleted(item.id)}
                />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>TaskFlow</Text>
                        <Text style={styles.subtitle}>
                            Organizá tus tareas y accedé a cada detalle.
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
                        <Text style={styles.counter}>{tasks.length}</Text>
                    </View>
                </View>
            }
            ListEmptyComponent={<EmptyState />}
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
        marginBottom: 14,
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
        minWidth: 28,
        overflow: 'hidden',
        paddingHorizontal: 8,
        paddingVertical: 5,
        textAlign: 'center',
    },
    separator: {
        height: 12,
    },
});
