import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from '../components/ProfileCard';
import { profileData } from '../data/base';
import { getAuthErrorMessage, signOutUser } from '../services/authService';
import { useAppSelector } from '../store/hooks';
import { COLORS } from '../theme';

export default function ProfileScreen() {
    const user = useAppSelector((state) => state.auth.user);
    const [error, setError] = useState('');

    const handleSignOut = async () => {
        try {
            setError('');
            await signOutUser();
        } catch (signOutError) {
            setError(getAuthErrorMessage(signOutError));
        }
    };

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={['left', 'right', 'bottom']}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Mi perfil</Text>
                    <Text style={styles.subtitle}>
                        Información del usuario de TaskFlow
                    </Text>
                </View>

                <ProfileCard {...profileData} />

                <View style={styles.informationCard}>
                    <Text style={styles.informationTitle}>Sesión activa</Text>
                    <Text style={styles.informationText}>
                        {user?.email ?? 'Usuario autenticado'}
                    </Text>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Pressable
                    onPress={handleSignOut}
                    style={({ pressed }) => [
                        styles.signOutButton,
                        pressed && styles.buttonPressed,
                    ]}
                >
                    <Text style={styles.signOutText}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        color: COLORS.text,
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 16,
        lineHeight: 22,
    },
    informationCard: {
        backgroundColor: COLORS.surface,
        marginTop: 24,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    informationTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    informationText: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
    },
    errorText: {
        color: '#B91C1C',
        fontSize: 13,
        marginTop: 14,
    },
    signOutButton: {
        alignItems: 'center',
        backgroundColor: '#FEF2F2',
        borderColor: '#FECACA',
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 18,
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    signOutText: {
        color: '#B91C1C',
        fontSize: 14,
        fontWeight: '700',
    },
    buttonPressed: {
        opacity: 0.75,
    },
});
