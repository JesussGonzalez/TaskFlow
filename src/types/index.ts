import type { ImageSourcePropType } from 'react-native';

export type ProfileCardProps = {
    name: string;
    role: string;
    image: ImageSourcePropType;
};

export type Task = {
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
    completed: boolean;
};
