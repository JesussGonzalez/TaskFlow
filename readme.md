# TaskFlow - Clase 5

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript.

En este checkpoint se reemplaza la navegación simulada con estado local por una estructura real de React Navigation, usando pestañas inferiores y un Native Stack para el flujo de tareas.

## Navegación implementada

```text
NavigationContainer
└── BottomTabNavigator
    ├── Home
    │   └── NativeStackNavigator
    │       ├── TaskList
    │       ├── TaskDetail
    │       └── TaskForm
    └── Profile
```

### Bottom Tabs

La navegación principal tiene dos pestañas:

- `Home`: contiene todo el flujo relacionado con las tareas.
- `Profile`: muestra la información del usuario.

### Stack de tareas

Dentro de `Home` se utiliza un `NativeStackNavigator` con tres pantallas:

- `TaskList`: muestra la colección de tareas y el estado vacío.
- `TaskDetail`: recibe `taskId` por `route.params` y muestra la tarea seleccionada.
- `TaskForm`: permite crear una nueva tarea.

Al tocar una tarea se ejecuta:

```ts
navigation.navigate('TaskDetail', { taskId: item.id });
```

Después de guardar una tarea, el formulario ejecuta:

```ts
navigation.navigate('TaskList');
```

De esta forma se vuelve programáticamente a la lista principal.

## Estructura principal

```text
src/
├── components/
│   ├── EmptyState.tsx
│   ├── ProfileCard.tsx
│   ├── TaskDetail.tsx
│   ├── TaskForm.tsx
│   └── TaskItem.tsx
├── navigation/
│   ├── AppNavigator.tsx
│   └── types.ts
├── screens/
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── TaskDetailScreen.tsx
│   ├── TaskFormScreen.tsx
│   └── TaskListScreen.tsx
├── theme/
│   └── index.ts
└── types/
    └── index.ts
```

## Dependencias de navegación

El proyecto utiliza:

- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `react-native-screens`
- `react-native-safe-area-context`

## Cómo probarlo

1. Instalar las dependencias:

```bash
npm install
```

2. Iniciar Expo:

```bash
npx expo start -c
```

3. Probar el siguiente flujo:

- Abrir la pestaña `Tareas`.
- Comprobar el estado vacío.
- Presionar `Nueva tarea`.
- Completar el formulario y guardar.
- Verificar que la app vuelve automáticamente a `TaskList`.
- Presionar una tarea.
- Confirmar que se abre `TaskDetail`.
- Usar la flecha nativa del header para volver.
- Cambiar a la pestaña `Perfil` y regresar a `Tareas`.

## Nota

Las tareas continúan almacenadas en estado local con `useState`. La persistencia global y en la nube se incorporará en los próximos módulos con Redux Toolkit y Firebase.
