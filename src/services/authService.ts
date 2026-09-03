import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';

export function createAccount(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
    return signOut(auth);
}

export function getAuthErrorMessage(error: unknown) {
    const code =
        typeof error === 'object' && error !== null && 'code' in error
            ? String((error as { code?: unknown }).code)
            : '';

    switch (code) {
        case 'auth/email-already-in-use':
            return 'Ese correo ya está registrado.';
        case 'auth/invalid-email':
            return 'Ingresá un correo electrónico válido.';
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            return 'Correo o contraseña incorrectos.';
        case 'auth/weak-password':
            return 'La contraseña debe tener al menos 6 caracteres.';
        case 'auth/network-request-failed':
            return 'No se pudo conectar. Revisá tu conexión a internet.';
        case 'auth/too-many-requests':
            return 'Hubo demasiados intentos. Probá nuevamente más tarde.';
        default:
            return 'No se pudo completar la operación. Intentá nuevamente.';
    }
}
