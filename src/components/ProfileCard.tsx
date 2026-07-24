import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/index';
import type { ProfileCardProps } from '../types/index';

export default function ProfileCard({
    name,
    role,
    image,
}: ProfileCardProps) {
    return (
        <View style={styles.card}>
            <Image
            source={image}
            style={styles.avatar}
            accessibilityLabel={`Foto de perfil de ${name}`}
        />

        <View style={styles.information}>
            <Text style={styles.name}>{name}</Text>

            <Text style={styles.role}>{role}</Text>

            <View style={styles.statusContainer}>
                <View style={styles.statusDot} />

                    <Text style={styles.statusText}>
                        Perfil activo
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
            },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: COLORS.primary,
        marginRight: 18,
    },

    information: {
        flex: 1,
    },

    name: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 5,
    },

    role: {
        color: COLORS.textSecondary,
        fontSize: 15,
        marginBottom: 12,
    },

    statusContainer: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primarySoft,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.success,
        marginRight: 6,
    },

    statusText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600',
    },
}); 