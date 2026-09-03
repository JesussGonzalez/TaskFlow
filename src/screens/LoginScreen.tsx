import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../navigation/types';
import { getAuthErrorMessage, signIn } from '../services/authService';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        const cleanEmail = email.trim();

        if (!cleanEmail || !password) {
            setError('Completá el correo y la contraseña.');
            return;
        }

        try {
            setError('');
            setIsSubmitting(true);
            await signIn(cleanEmail, password);
        } catch (loginError) {
            setError(getAuthErrorMessage(loginError));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>TaskFlow</Text>
                <Text style={styles.subtitle}>
                    Ingresá con tu cuenta para ver tus tareas.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            if (error) setError('');
                        }}
                        style={styles.input}
                        placeholder="correo@ejemplo.com"
                        placeholderTextColor={COLORS.textSecondary}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            if (error) setError('');
                        }}
                        style={styles.input}
                        placeholder="Tu contraseña"
                        placeholderTextColor={COLORS.textSecondary}
                        secureTextEntry
                    />

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <Pressable
                        onPress={handleLogin}
                        disabled={isSubmitting}
                        style={({ pressed }) => [
                            styles.primaryButton,
                            (pressed || isSubmitting) && styles.buttonPressed,
                        ]}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.primaryButtonText}>
                                Iniciar sesión
                            </Text>
                        )}
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Register')}
                        style={({ pressed }) => [
                            styles.secondaryButton,
                            pressed && styles.buttonPressed,
                        ]}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Crear una cuenta
                        </Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: COLORS.primary,
        fontSize: 36,
        fontWeight: '800',
        marginBottom: 6,
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 21,
        marginBottom: 24,
        textAlign: 'center',
    },
    card: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: 18,
        borderWidth: 1,
        padding: 20,
    },
    label: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        backgroundColor: COLORS.background,
        borderColor: COLORS.border,
        borderRadius: 12,
        borderWidth: 1,
        color: COLORS.text,
        fontSize: 15,
        marginBottom: 14,
        minHeight: 48,
        paddingHorizontal: 12,
    },
    error: {
        color: '#B91C1C',
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 14,
    },
    primaryButton: {
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        minHeight: 48,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 12,
    },
    secondaryButtonText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    buttonPressed: {
        opacity: 0.75,
    },
});
