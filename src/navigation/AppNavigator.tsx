import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import TaskListScreen from '../screens/TaskListScreen';
import { COLORS } from '../theme';
import type { RootTabParamList, TaskStackParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<TaskStackParamList>();

function TaskStackNavigator() {
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
            <Stack.Screen
                name="TaskList"
                component={TaskListScreen}
                options={{ title: 'Mis tareas' }}
            />
            <Stack.Screen
                name="TaskDetail"
                component={TaskDetailScreen}
                options={{ title: 'Detalle de tarea' }}
            />
            <Stack.Screen
                name="TaskForm"
                component={TaskFormScreen}
                options={{ title: 'Nueva tarea' }}
            />
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
