import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskFormScreen from '../screens/TaskFormScreen';
import TaskListScreen from '../screens/TaskListScreen';
import { getAuthErrorMessage } from '../services/authService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAuthError, setAuthLoading, setUser } from '../store/authSlice';
import { clearTasks } from '../store/taskSlice';
import { COLORS } from '../theme';
import type {
    AuthStackParamList,
    RootTabParamList,
    TaskStackParamList,
} from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<TaskStackParamList>();

function AuthStackNavigator() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerTintColor: COLORS.primary,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Iniciar sesión' }}
            />
            <AuthStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Crear cuenta' }}
            />
        </AuthStack.Navigator>
    );
}

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

function PrivateNavigator() {
    return (
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
                        <Text style={{ color, fontSize: 20, fontWeight: '700' }}>
                            ✓
                        </Text>
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
    );
}

export default function AppNavigator() {
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (firebaseUser) => {
                if (firebaseUser) {
                    dispatch(
                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                        }),
                    );
                } else {
                    dispatch(setUser(null));
                    dispatch(clearTasks());
                }

                dispatch(setAuthLoading(false));
            },
            (error) => {
                dispatch(setAuthError(getAuthErrorMessage(error)));
                dispatch(setAuthLoading(false));
            },
        );

        return unsubscribe;
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Cargando sesión...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <PrivateNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
    loadingText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 12,
    },
});
