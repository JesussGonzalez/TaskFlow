# TaskFlow - Clase 6

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript.

En esta entrega se incorporó Redux Toolkit para centralizar el estado de las tareas y mantener la información disponible entre las distintas pantallas de la aplicación.

## Funcionalidades

- Store global configurado con Redux Toolkit.
- Slice de tareas creado con `createSlice`.
- Uso de `configureStore` para centralizar el estado.
- Acciones para agregar, completar, eliminar y filtrar tareas.
- Lista de tareas conectada con `useSelector`.
- Formulario conectado con `useDispatch`.
- Detalle de tarea sincronizado con el Store.
- Filtros globales: Todas, Pendientes y Completadas.
- El filtro seleccionado se mantiene al navegar entre pantallas.
- Navegación con Bottom Tabs y Native Stack conservada de la entrega anterior.

## Estructura principal

```text
src/
├── components/
│   ├── EmptyState.tsx
│   ├── ProfileCard.tsx
│   ├── TaskForm.tsx
│   └── TaskItem.tsx
├── navigation/
│   ├── AppNavigator.tsx
│   └── types.ts
├── screens/
│   ├── ProfileScreen.tsx
│   ├── TaskDetailScreen.tsx
│   ├── TaskFormScreen.tsx
│   └── TaskListScreen.tsx
├── store/
│   ├── hooks.ts
│   ├── store.ts
│   └── taskSlice.ts
├── theme/
│   └── index.ts
└── types/
    └── index.ts
```

## Dependencias agregadas

- `@reduxjs/toolkit`
- `react-redux`

## Ejecutar el proyecto

```bash
npm install
npx expo start
```

## Prueba rápida

1. Abrir la pestaña Tareas.
2. Cambiar entre los filtros Todas, Pendientes y Completadas.
3. Crear una nueva tarea.
4. Abrir el detalle de una tarea y cambiar su estado.
5. Volver a la lista y comprobar que el cambio se mantiene.
6. Eliminar una tarea desde su detalle.
7. Ir a Perfil y regresar a Tareas para comprobar que el filtro seleccionado continúa activo.
