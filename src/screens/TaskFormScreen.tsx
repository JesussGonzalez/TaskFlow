import { ScrollView, StyleSheet, Text, View } from 'react-native';

import TaskForm from '../components/TaskForm';
import { COLORS } from '../theme';

export default function TaskFormScreen() {
    return (
        <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <Text style={styles.title}>Crear tarea</Text>
                <Text style={styles.subtitle}>
                    La tarea se guardará en tu cuenta.
                </Text>
            </View>

            <TaskForm />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 6,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
    },
});
