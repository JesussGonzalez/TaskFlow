import AsyncStorage from '@react-native-async-storage/async-storage';

const avatarKey = (userId: string) => `taskflow:avatar:${userId}`;

export async function getStoredAvatar(userId: string) {
    return AsyncStorage.getItem(avatarKey(userId));
}

export async function saveStoredAvatar(userId: string, uri: string) {
    await AsyncStorage.setItem(avatarKey(userId), uri);
}
