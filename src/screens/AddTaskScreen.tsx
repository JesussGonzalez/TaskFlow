import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../theme';

const CATEGORIES = ['Personal', 'Trabajo', 'Estudio'] as const;

type Category = (typeof CATEGORIES)[number];

type FormErrors = {
    title?: string;
    description?: string;
    category?: string;
};

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>(CATEGORIES[0]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [focusedField, setFocusedField] = useState<'title' | 'description' | null>(null);

    const getInputStyle = (field: 'title' | 'description') => [
        styles.input,
        focusedField === field && styles.inputFocused,
        errors[field] && styles.inputError,
    ];

    const handleAddTask = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        const validationErrors: FormErrors = {};

        if (!trimmedTitle) {
            validationErrors.title = 'El título es obligatorio.';
        } else if (trimmedTitle.length < 5) {
            validationErrors.title = 'El título debe tener al menos 5 caracteres.';
        }

        if (!trimmedDescription) {
            validationErrors.description = 'La descripción es obligatoria.';
        } else if (trimmedDescription.length < 10) {
            validationErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        }

        if (!category) {
            validationErrors.category = 'Seleccioná una categoría.';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const task = {
            title: trimmedTitle,
            description: trimmedDescription,
            category,
        };

        Alert.alert('Éxito', 'Tarea capturada localmente');

        setTitle('');
        setDescription('');
        setCategory(CATEGORIES[0]);
        setErrors({});
        setFocusedField(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Nueva tarea</Text>
                        <Text style={styles.subtitle}>
                            Capturá los datos para organizar tu próxima actividad.
                        </Text>
                    </View>

                    <View style={styles.formCard}>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                accessibilityLabel="Título de la tarea"
                                autoCapitalize="sentences"
                                keyboardType="default"
                                maxLength={80}
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) => {
                                    setTitle(value);

                                    if (errors.title) {
                                        setErrors((currentErrors) => ({
                                        ...currentErrors,
                                        title: undefined,
                                        }));
                                    }
                                    }}
                                onFocus={() => setFocusedField('title')}
                                placeholder="Ej. Preparar presentación"
                                placeholderTextColor={COLORS.textSecondary}
                                returnKeyType="next"
                                style={getInputStyle('title')}
                                value={title}
                            />
                            {errors.title ? (
                                <Text style={styles.errorText}>{errors.title}</Text>
                            ) : null}
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Descripción</Text>
                            <TextInput
                                accessibilityLabel="Descripción de la tarea"
                                autoCapitalize="sentences"
                                keyboardType="default"
                                maxLength={300}
                                multiline
                                onBlur={() => setFocusedField(null)}
                                onChangeText={(value) => {
                                    setDescription(value);

                                    if (errors.description) {
                                        setErrors((currentErrors) => ({
                                        ...currentErrors,
                                        description: undefined,
                                        }));
                                    }
                                    }}
                                onFocus={() => setFocusedField('description')}
                                placeholder="Agregá los detalles de la tarea"
                                placeholderTextColor={COLORS.textSecondary}
                                style={[getInputStyle('description'), styles.descriptionInput]}
                                textAlignVertical="top"
                                value={description}
                            />
                            {errors.description ? (
                                <Text style={styles.errorText}>{errors.description}</Text>
                            ) : null}
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Categoría</Text>
                            <View style={styles.categoryContainer}>
                                {CATEGORIES.map((item) => {
                                    const isSelected = category === item;

                                    return (
                                        <TouchableOpacity
                                            accessibilityRole="button"
                                            accessibilityState={{ selected: isSelected }}
                                            activeOpacity={0.8}
                                            key={item}
                                            onPress={() => setCategory(item)}
                                            style={[
                                                styles.categoryButton,
                                                isSelected && styles.categoryButtonSelected,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.categoryText,
                                                    isSelected && styles.categoryTextSelected,
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            {errors.category ? (
                                <Text style={styles.errorText}>{errors.category}</Text>
                            ) : null}
                        </View>

                        <TouchableOpacity
                            accessibilityRole="button"
                            activeOpacity={0.85}
                            onPress={handleAddTask}
                            style={styles.saveButton}
                        >
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 24,
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
    formCard: {
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
    },
    fieldGroup: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '700',
    },
    input: {
        minHeight: 50,
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 10,
        color: COLORS.text,
        backgroundColor: COLORS.surface,
        fontSize: 16,
    },
    inputFocused: {
        borderColor: COLORS.primary,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    descriptionInput: {
        minHeight: 120,
        paddingTop: 14,
        paddingBottom: 14,
    },
    errorText: {
        marginTop: 6,
        color: COLORS.error,
        fontSize: 13,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 11,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 999,
        backgroundColor: COLORS.surface,
    },
    categoryButtonSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primarySoft,
    },
    categoryText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    categoryTextSelected: {
        color: COLORS.primary,
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
    saveButtonText: {
        color: COLORS.surface,
        fontSize: 16,
        fontWeight: '700',
    },
});
