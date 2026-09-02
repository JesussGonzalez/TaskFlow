import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import TaskDetail from '../components/TaskDetail';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { COLORS } from '../theme';
import type { Task } from '../types';

export default function HomeScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
        const newTask: Task = {
            id: Date.now().toString(),
            ...taskData,
            completed: false,
        };

        setTasks((currentTasks) => [newTask, ...currentTasks]);
    };

    const toggleTaskCompleted = (taskId: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task,
            ),
        );
    };

    const renderHeader = () => (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>TaskFlow</Text>
                <Text style={styles.subtitle}>Organizá tus tareas de manera simple.</Text>
            </View>

            <TaskForm onAddTask={addTask} />

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Tus tareas</Text>
                <Text style={styles.counter}>{tasks.length}</Text>
            </View>
        </>
    );

    if (selectedTask) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <TaskDetail task={selectedTask} onBack={() => setSelectedTask(null)} />
            </SafeAreaView>
        );
    }

    if (tasks.length === 0) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderHeader()}
                    <EmptyState />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onPress={() => setSelectedTask(item)}
                        onToggleCompleted={() => toggleTaskCompleted(item.id)}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        color: COLORS.primary,
        fontSize: 34,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 16,
        lineHeight: 22,
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
        borderRadius: 999,
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
