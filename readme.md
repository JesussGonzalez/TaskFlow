# TaskFlow

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript
para capturar y organizar tareas desde un estado local.

## Funcionalidades

- Formulario controlado para título, descripción y categoría.
- Validaciones con mensajes y estilos de foco o error.
- Creación local de tareas con fecha y estado de finalización.
- Lista de tareas renderizada con `FlatList`.
- Estado vacío que invita a crear la primera tarea.
- Marcado de tareas como pendientes o completadas.
- Vista de detalle con título, descripción, categoría, fecha y estado.
- Navegación simulada entre lista y detalle mediante `selectedTask`.
- Componentes reutilizables y props tipadas con TypeScript.

## Estructura principal

```text
src/
├── assets/
├── components/
│   ├── EmptyState.tsx
│   ├── ProfileCard.tsx
│   └── TaskCard.tsx
├── data/
│   └── base.ts
├── screens/
│   ├── AddTaskScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── TaskDetailScreen.tsx
├── theme/
│   └── index.ts
├── types/
│   └── index.ts
└── utils/
    └── formatTaskDate.ts
```

## Ejecutar el proyecto

```bash
npm install
npm start
```
