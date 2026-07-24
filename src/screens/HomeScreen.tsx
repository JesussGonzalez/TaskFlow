import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/index';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    TaskFlow
                </Text>

                <Text style={styles.subtitle}>
                    Organizá tus tareas de manera simple.
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>
                        Tus tareas
                    </Text>

                    <Text style={styles.cardText}>
                        Todavía no hay tareas registradas.
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
        paddingHorizontal: 20,
        paddingTop: 30,
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
        marginBottom: 24,
    },

    card: {
        backgroundColor: COLORS.surface,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    cardTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },

    cardText: {
        color: COLORS.textSecondary,
        fontSize: 15,
    },
});