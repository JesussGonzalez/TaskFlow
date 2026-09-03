import { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import TaskListScreen from '../screens/TaskListScreen';
import { COLORS } from '../theme';
import type { Task } from '../types';
import type { RootTabParamList, TaskStackParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<TaskStackParamList>();

type TaskListNavigationProps = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;
type TaskDetailNavigationProps = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;
type TaskFormNavigationProps = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

function TaskStackNavigator() {
    const [tasks, setTasks] = useState<Task[]>([]);

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
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task,
            ),
        );
    };

    return (
        <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
                headerTintColor: COLORS.primary,
                headerTitleStyle: {
                    fontWeight: '700',
                },
                contentStyle: {
                    backgroundColor: COLORS.background,
                },
            }}
        >
            <Stack.Screen name="TaskList" options={{ title: 'Mis tareas' }}>
                {(props: TaskListNavigationProps) => (
                    <TaskListScreen
                        {...props}
                        tasks={tasks}
                        onToggleCompleted={toggleTaskCompleted}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="TaskDetail" options={{ title: 'Detalle de tarea' }}>
                {(props: TaskDetailNavigationProps) => <TaskDetailScreen {...props} tasks={tasks} />}
            </Stack.Screen>

            <Stack.Screen name="TaskForm" options={{ title: 'Nueva tarea' }}>
                {(props: TaskFormNavigationProps) => <TaskFormScreen {...props} onAddTask={addTask} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerTitleStyle: {
                        fontWeight: '700',
                    },
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.textSecondary,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={TaskStackNavigator}
                    options={{
                        title: 'Inicio',
                        headerShown: false,
                        tabBarLabel: 'Tareas',
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Text style={{ color, fontSize: 20, fontWeight: '700' }}>✓</Text>
                        ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        title: 'Perfil',
                        tabBarLabel: 'Perfil',
                        tabBarIcon: ({ color }: { color: string }) => (
                            <Text style={{ color, fontSize: 18 }}>●</Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
