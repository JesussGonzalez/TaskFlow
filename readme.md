# TaskFlow - Lista de tareas con detalle

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript.

Este checkpoint amplía la pre-entrega anterior incorporando manejo de tareas con estado local, estado vacío, lista interactiva y vista de detalle sin usar todavía React Navigation.

## Funcionalidades realizadas

- Estructura organizada dentro de `src`.
- Formulario controlado con `useState` para crear tareas.
- Campos de nombre, descripción, fecha y categoría.
- Lista de tareas renderizada con `FlatList`.
- Estado `completed` para marcar tareas como completadas o pendientes.
- Estado vacío cuando no existen tareas.
- Estado `selectedTask` para seleccionar una tarea.
- Renderizado condicional entre estado vacío, lista y detalle.
- Vista `TaskDetail` con información completa de la tarea.
- Botón `Volver` para regresar desde el detalle a la lista.
- `onPress` sobre cada tarea para abrir su detalle.
- Estilos centralizados y coherentes con la entrega anterior.
- `App.tsx` conectado a `HomeScreen`.

## Estructura principal

```text
src/
├── assets/
│   ├── images.jpg
│   └── perfil2.jpg
├── components/
│   ├── EmptyState.tsx
│   ├── ProfileCard.tsx
│   ├── TaskDetail.tsx
│   ├── TaskForm.tsx
│   └── TaskItem.tsx
├── data/
│   └── base.ts
├── screens/
│   ├── HomeScreen.tsx
│   └── ProfileScreen.tsx
├── theme/
│   └── index.ts
└── types/
    └── index.ts
```

## Cómo probarlo

1. Ejecutar `npm install` si todavía no están instaladas las dependencias.
2. Ejecutar `npm start`.
3. Al iniciar, comprobar que aparece el mensaje de lista vacía.
4. Crear una tarea desde el formulario.
5. Verificar que la nueva tarea aparece en la lista.
6. Presionar la tarea para abrir su detalle.
7. Presionar `Volver` para regresar a la lista.
8. Marcar la tarea como completada y comprobar el cambio visual.
