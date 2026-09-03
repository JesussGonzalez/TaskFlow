import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from '../components/ProfileCard';
import { profileData } from '../data/base';
import { COLORS } from '../theme';

export default function ProfileScreen() {
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
                    <Text style={styles.informationTitle}>
                        Bienvenido a TaskFlow
                    </Text>
                    <Text style={styles.informationText}>
                        Desde esta aplicación podrás organizar tus tareas,
                        controlar tus actividades y mejorar tu productividad.
                    </Text>
                </View>
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
});
