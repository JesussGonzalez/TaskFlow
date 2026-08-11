import { useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../components/EmptyState';
import TaskCard from '../components/TaskCard';
import { COLORS } from '../theme';
import type { Task, TaskCategory } from '../types';
import TaskDetailScreen from './TaskDetailScreen';

const CATEGORIES = ['Personal', 'Trabajo', 'Estudio'] as const satisfies readonly TaskCategory[];

type FormErrors = {
    title?: string;
    description?: string;
    category?: string;
};

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<TaskCategory>(CATEGORIES[0]);
    const [errors, setErrors] = useState<FormErrors>({});
    const [focusedField, setFocusedField] = useState<'title' | 'description' | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const getInputStyle = (field: 'title' | 'description') => [
        styles.input,
        focusedField === field && styles.inputFocused,
        errors[field] && styles.inputError,
    ];

    const clearFieldError = (field: keyof FormErrors) => {
        if (!errors[field]) {
            return;
        }

        setErrors((currentErrors) => {
            const nextErrors = { ...currentErrors };
            delete nextErrors[field];
            return nextErrors;
        });
    };

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

        const task: Task = {
            id: Date.now().toString(),
            title: trimmedTitle,
            description: trimmedDescription,
            category,
            createdAt: new Date().toISOString(),
            completed: false,
        };

        setTasks((currentTasks) => [task, ...currentTasks]);
        console.log('Tarea capturada:', task);
        Alert.alert('Éxito', 'Tarea capturada localmente');
        Keyboard.dismiss();

        setTitle('');
        setDescription('');
        setCategory(CATEGORIES[0]);
        setErrors({});
        setFocusedField(null);
    };

    const handleToggleCompleted = (taskId: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task,
            ),
        );
    };

    if (selectedTask) {
        return <TaskDetailScreen onBack={() => setSelectedTask(null)} task={selectedTask} />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
            >
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.listContent}
                        data={tasks}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<EmptyState />}
                        ListHeaderComponent={
                            <>
                                <View style={styles.header}>
                                    <Text style={styles.title}>TaskFlow</Text>
                                    <Text style={styles.subtitle}>
                                        Organizá tus tareas y consultá todos sus detalles.
                                    </Text>
                                </View>

                                <View style={styles.formCard}>
                                    <Text style={styles.formTitle}>Nueva tarea</Text>

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
                                                clearFieldError('title');
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
                                                clearFieldError('description');
                                            }}
                                            onFocus={() => setFocusedField('description')}
                                            placeholder="Agregá los detalles de la tarea"
                                            placeholderTextColor={COLORS.textSecondary}
                                            style={[
                                                getInputStyle('description'),
                                                styles.descriptionInput,
                                            ]}
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
                                                        onPress={() => {
                                                            setCategory(item);
                                                            clearFieldError('category');
                                                        }}
                                                        style={[
                                                            styles.categoryButton,
                                                            isSelected &&
                                                                styles.categoryButtonSelected,
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.categoryText,
                                                                isSelected &&
                                                                    styles.categoryTextSelected,
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

                                <View style={styles.listHeader}>
                                    <Text style={styles.listTitle}>Mis tareas</Text>
                                    <Text style={styles.taskCount}>
                                        {tasks.length === 1
                                            ? '1 tarea'
                                            : `${tasks.length} tareas`}
                                    </Text>
                                </View>
                            </>
                        }
                        renderItem={({ item }) => (
                            <TaskCard
                                onPress={setSelectedTask}
                                onToggleCompleted={handleToggleCompleted}
                                task={item}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
    },
    listContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 24,
    },
    header: {
        marginBottom: 24,
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
        lineHeight: 22,
    },
    formCard: {
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
    },
    formTitle: {
        marginBottom: 20,
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '800',
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
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 14,
    },
    listTitle: {
        color: COLORS.text,
        fontSize: 21,
        fontWeight: '800',
    },
    taskCount: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    separator: {
        height: 12,
    },
});
