import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import TaskForm from '../components/TaskForm';
import type { TaskStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask } from '../store/taskSlice';
import { COLORS } from '../theme';
import type { NewTask } from '../types';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

export default function TaskFormScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const handleSave = async (task: NewTask) => {
        if (!user) {
            throw 'La sesión no está disponible.';
        }

        await dispatch(
            addTask({
                task,
                userId: user.uid,
            }),
        ).unwrap();

        navigation.navigate('TaskList');
    };

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

            <TaskForm onAddTask={handleSave} />
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
