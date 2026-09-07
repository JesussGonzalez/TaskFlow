import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import ProfileCard from '../components/ProfileCard';
import { profileData } from '../data/base';
import { getAuthErrorMessage, signOutUser } from '../services/authService';
import { getStoredAvatar, saveStoredAvatar } from '../services/profileService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    clearProfile,
    setAvatarUri,
    setProfileError,
    setProfileLoading,
} from '../store/profileSlice';
import { COLORS } from '../theme';

export default function ProfileScreen() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const { avatarUri, isLoading, error } = useAppSelector(
        (state) => state.profile,
    );
    const [signOutError, setSignOutError] = useState('');

    useEffect(() => {
        if (!user?.uid) {
            dispatch(clearProfile());
            return;
        }

        let isMounted = true;
        dispatch(setProfileLoading(true));

        getStoredAvatar(user.uid)
            .then((uri) => {
                if (isMounted) {
                    dispatch(setAvatarUri(uri));
                }
            })
            .catch(() => {
                if (isMounted) {
                    dispatch(
                        setProfileError(
                            'No se pudo recuperar la imagen de perfil.',
                        ),
                    );
                }
            })
            .finally(() => {
                if (isMounted) {
                    dispatch(setProfileLoading(false));
                }
            });

        return () => {
            isMounted = false;
        };
    }, [dispatch, user?.uid]);

    const handlePickImage = async () => {
        if (!user?.uid) return;

        dispatch(setProfileError(null));

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            dispatch(
                setProfileError(
                    'Necesitás permitir el acceso a tus fotos para elegir una imagen.',
                ),
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (result.canceled) {
            return;
        }

        const uri = result.assets[0]?.uri;

        if (!uri) {
            dispatch(setProfileError('No se pudo leer la imagen seleccionada.'));
            return;
        }

        try {
            dispatch(setAvatarUri(uri));
            await saveStoredAvatar(user.uid, uri);
        } catch {
            dispatch(
                setProfileError(
                    'La imagen se mostró, pero no se pudo guardar en el dispositivo.',
                ),
            );
        }
    };

    const handleSignOut = async () => {
        try {
            setSignOutError('');
            await signOutUser();
            dispatch(clearProfile());
        } catch (signOutFailure) {
            setSignOutError(getAuthErrorMessage(signOutFailure));
        }
    };

    const displayName =
        user?.email?.split('@')[0] || profileData.name || 'Usuario TaskFlow';

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

                <ProfileCard
                    name={displayName}
                    role="Usuario de TaskFlow"
                    image={avatarUri ? { uri: avatarUri } : profileData.image}
                />

                <Pressable
                    onPress={handlePickImage}
                    style={({ pressed }) => [
                        styles.photoButton,
                        pressed && styles.buttonPressed,
                    ]}
                    accessibilityRole="button"
                >
                    {isLoading ? (
                        <ActivityIndicator color={COLORS.primary} />
                    ) : (
                        <Text style={styles.photoButtonText}>
                            Elegir foto de perfil
                        </Text>
                    )}
                </Pressable>

                <View style={styles.informationCard}>
                    <Text style={styles.informationTitle}>Sesión activa</Text>
                    <Text style={styles.informationText}>
                        {user?.email ?? 'Usuario autenticado'}
                    </Text>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {signOutError ? (
                    <Text style={styles.errorText}>{signOutError}</Text>
                ) : null}

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
    photoButton: {
        alignItems: 'center',
        backgroundColor: COLORS.primarySoft,
        borderRadius: 12,
        marginTop: 14,
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 11,
    },
    photoButtonText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
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
