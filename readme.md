# TaskFlow

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript para organizar tareas personales por usuario.

## Funcionalidades

- Registro e inicio de sesión con Firebase Authentication.
- Sesión persistente con `onAuthStateChanged`.
- Rutas públicas y privadas con React Navigation.
- Bottom Tabs para Tareas y Perfil.
- Native Stack para lista, formulario y detalle.
- Tareas guardadas en Firestore y separadas por `userId`.
- Sincronización en tiempo real con Firestore.
- Filtros globales: Todas, Pendientes y Completadas.
- Estado global con Redux Toolkit.
- Selección de avatar desde la galería con `expo-image-picker`.
- Avatar guardado localmente por usuario con AsyncStorage.
- Cierre de sesión seguro.
- Estados de carga y mensajes de error.

## Redux Toolkit

El store principal está en:

```text
src/store/store.ts
```

La aplicación se encuentra envuelta con `Provider` desde `App.tsx`.

El slice de tareas utiliza `createSlice` e incluye los reducers:

```text
addTask
toggleTaskStatus
deleteTask
setFilter
```

La comunicación con Firestore se realiza con acciones asíncronas y el listener en tiempo real mantiene Redux sincronizado con la base de datos.

Los componentes de tareas utilizan el store directamente mediante `useAppSelector` y `useAppDispatch`.

## Estructura principal

```text
src/
├── components/
├── firebase/
├── navigation/
├── screens/
├── services/
├── store/
│   ├── authSlice.ts
│   ├── hooks.ts
│   ├── profileSlice.ts
│   ├── store.ts
│   └── taskSlice.ts
├── theme/
└── types/
```

## Configuración de Firebase

Crear un archivo `.env` en la raíz del proyecto utilizando `.env.example` como referencia:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

En Firebase deben estar habilitados:

- Authentication con Email/Password.
- Cloud Firestore.
- Las reglas incluidas en `firestore.rules`.

El archivo `.env` no se sube al repositorio.

## Ejecutar el proyecto

```bash
npm install
npx expo start
```

## Verificación funcional

El flujo de autenticación y persistencia se comprobó con registro, inicio de sesión, cierre de sesión y recuperación de sesión.

Para las tareas se verificó creación, lectura, cambio de estado y eliminación en Firestore, además de la separación de datos entre usuarios.

La prueba completa de la versión final incluye:

1. Registrarse o iniciar sesión.
2. Crear una tarea.
3. Cambiar su estado.
4. Filtrar tareas.
5. Abrir el detalle.
6. Cambiar a la pestaña Perfil.
7. Elegir una imagen de la galería.
8. Cancelar el selector y comprobar que la app continúa funcionando.
9. Cerrar sesión y volver a ingresar.
10. Confirmar que las tareas continúan sincronizadas.

## Build Android

El proyecto incluye `eas.json` con un perfil `preview` para generar un APK:

```bash
npx eas-cli@latest build -p android --profile preview
```
