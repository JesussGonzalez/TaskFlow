# TaskFlow - Clase 7

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript.

En esta entrega se incorporó Firebase Authentication y Cloud Firestore para trabajar con usuarios reales y guardar las tareas en la nube.

## Funcionalidades

- Registro de usuarios con correo y contraseña.
- Inicio y cierre de sesión con Firebase Authentication.
- Persistencia de sesión mediante AsyncStorage.
- Navegación protegida según el estado de autenticación.
- Tareas almacenadas en la colección `tasks` de Firestore.
- Cada tarea guarda el `userId` del usuario autenticado.
- Lectura en tiempo real de las tareas del usuario.
- Creación, cambio de estado y eliminación sincronizados con Firestore.
- Redux continúa manejando el estado utilizado por la interfaz.
- Mensajes de error para autenticación y problemas de conexión.
- Reglas de Firestore para separar los datos entre usuarios.

## Configuración de Firebase

El proyecto utiliza variables de entorno. Se debe crear un archivo `.env` tomando como referencia `.env.example`.

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

Los valores se obtienen al registrar una aplicación Web dentro del proyecto de Firebase.

En Firebase Authentication debe estar habilitado el proveedor **Correo electrónico/Contraseña**.

También se debe crear una base de datos de Cloud Firestore y publicar las reglas incluidas en `firestore.rules`.

## Dependencias agregadas

- `firebase`
- `@react-native-async-storage/async-storage`

## Ejecutar el proyecto

```bash
npm install
npx expo start
```

## Comprobación de los flujos

### Registro e inicio de sesión

1. Crear una cuenta nueva desde la pantalla de registro.
2. Verificar que Firebase Authentication muestre el usuario creado.
3. Cerrar la aplicación y volver a abrirla para comprobar que la sesión continúa activa.
4. Cerrar sesión desde Perfil.
5. Intentar ingresar con una contraseña incorrecta y comprobar que se muestre el mensaje de error.

### Guardado de tareas

1. Iniciar sesión y crear una tarea.
2. Verificar que aparezca un documento nuevo en la colección `tasks` de Firestore.
3. Confirmar que el documento tenga el campo `userId`.
4. Marcar la tarea como completada y comprobar el cambio en Firestore.
5. Eliminar la tarea y verificar que también se elimine de Firestore.
6. Crear una segunda cuenta y comprobar que no pueda ver las tareas de la primera.
