import type { ImageSourcePropType } from 'react-native';

export type ProfileCardProps = {
    name: string;
    role: string;
    image: ImageSourcePropType;
};

export type TaskCategory = 'Personal' | 'Trabajo' | 'Estudio';

export type Task = {
    id: string;
    title: string;
    description: string;
    category: TaskCategory;
    createdAt: string;
    completed: boolean;
};
