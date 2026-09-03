import { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { COLORS } from '../theme';
import type { NewTask } from '../types';

type TaskFormProps = {
    onAddTask: (task: NewTask) => void | Promise<void>;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            setError('Escribí un nombre para la tarea.');
            return;
        }

        try {
            setError('');
            setIsSubmitting(true);

            await onAddTask({
                title: trimmedTitle,
                description: description.trim() || 'Sin descripción',
                date: date.trim() || 'Sin fecha',
                category: category.trim() || 'General',
            });

            setTitle('');
            setDescription('');
            setDate('');
            setCategory('');
        } catch (submitError) {
            setError(
                typeof submitError === 'string'
                    ? submitError
                    : 'No se pudo guardar la tarea.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Nueva tarea</Text>

            <Text style={styles.label}>Nombre</Text>
            <TextInput
                value={title}
                onChangeText={(value) => {
                    setTitle(value);
                    if (error) setError('');
                }}
                placeholder="Ej: Entregar checkpoint"
                placeholderTextColor={COLORS.textSecondary}
                style={styles.input}
                accessibilityLabel="Nombre de la tarea"
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Agregá los detalles de la tarea"
                placeholderTextColor={COLORS.textSecondary}
                style={[styles.input, styles.multilineInput]}
                multiline
                textAlignVertical="top"
                accessibilityLabel="Descripción de la tarea"
            />

            <View style={styles.row}>
                <View style={styles.field}>
                    <Text style={styles.label}>Fecha</Text>
                    <TextInput
                        value={date}
                        onChangeText={setDate}
                        placeholder="Ej: 10/09/2026"
                        placeholderTextColor={COLORS.textSecondary}
                        style={styles.input}
                        accessibilityLabel="Fecha de la tarea"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Categoría</Text>
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="Ej: Estudio"
                        placeholderTextColor={COLORS.textSecondary}
                        style={styles.input}
                        accessibilityLabel="Categoría de la tarea"
                    />
                </View>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={({ pressed }) => [
                    styles.button,
                    (pressed || isSubmitting) && styles.buttonPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Agregar tarea"
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.buttonText}>Agregar tarea</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderRadius: 18,
        borderWidth: 1,
        marginBottom: 24,
        padding: 18,
    },
    title: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
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
        minHeight: 46,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    multilineInput: {
        minHeight: 88,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    field: {
        flex: 1,
    },
    error: {
        color: '#B91C1C',
        fontSize: 13,
        marginBottom: 12,
    },
    button: {
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        minHeight: 46,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    buttonPressed: {
        opacity: 0.75,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});
