import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../theme';
import type { Task } from '../types';
import { formatTaskDate } from '../utils/formatTaskDate';

type TaskDetailScreenProps = {
    task: Task;
    onBack: () => void;
};

export default function TaskDetailScreen({ task, onBack }: TaskDetailScreenProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity
                    accessibilityLabel="Volver a la lista de tareas"
                    accessibilityRole="button"
                    activeOpacity={0.75}
                    onPress={onBack}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>‹ Volver</Text>
                </TouchableOpacity>

                <Text style={styles.eyebrow}>DETALLE DE TAREA</Text>
                <Text style={styles.title}>{task.title}</Text>

                <View
                    style={[
                        styles.statusBadge,
                        task.completed ? styles.completedBadge : styles.pendingBadge,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            task.completed ? styles.completedStatusText : styles.pendingStatusText,
                        ]}
                    >
                        {task.completed ? 'Completada' : 'Pendiente'}
                    </Text>
                </View>

                <View style={styles.detailCard}>
                    <View style={styles.metadataRow}>
                        <View style={styles.metadataItem}>
                            <Text style={styles.label}>Categoría</Text>
                            <Text style={styles.value}>{task.category}</Text>
                        </View>
                        <View style={styles.metadataItem}>
                            <Text style={styles.label}>Fecha</Text>
                            <Text style={styles.value}>{formatTaskDate(task.createdAt)}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.label}>Descripción</Text>
                    <Text style={styles.description}>{task.description}</Text>
                </View>

                <TouchableOpacity
                    accessibilityRole="button"
                    activeOpacity={0.85}
                    onPress={onBack}
                    style={styles.returnButton}
                >
                    <Text style={styles.returnButtonText}>Volver a mis tareas</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 28,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 28,
        paddingVertical: 8,
        paddingRight: 14,
    },
    backButtonText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: '700',
    },
    eyebrow: {
        marginBottom: 8,
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    title: {
        marginBottom: 14,
        color: COLORS.text,
        fontSize: 30,
        fontWeight: '800',
        lineHeight: 38,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        marginBottom: 24,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 999,
    },
    completedBadge: {
        backgroundColor: '#D1FAE5',
    },
    pendingBadge: {
        backgroundColor: COLORS.primarySoft,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '700',
    },
    completedStatusText: {
        color: '#047857',
    },
    pendingStatusText: {
        color: COLORS.primary,
    },
    detailCard: {
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
    },
    metadataRow: {
        flexDirection: 'row',
        gap: 20,
    },
    metadataItem: {
        flex: 1,
    },
    label: {
        marginBottom: 7,
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    value: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        marginVertical: 22,
        backgroundColor: COLORS.border,
    },
    description: {
        color: COLORS.text,
        fontSize: 16,
        lineHeight: 25,
    },
    returnButton: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        marginTop: 24,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
    returnButtonText: {
        color: COLORS.surface,
        fontSize: 16,
        fontWeight: '700',
    },
});
