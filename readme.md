# TaskFlow - Pre-entrega

TaskFlow es una aplicación móvil desarrollada con React Native, Expo y TypeScript.

El objetivo de esta pre-entrega es implementar una estructura de carpetas profesional, crear componentes reutilizables y utilizar props tipadas con TypeScript.

## Funcionalidades realizadas

- Creación de una arquitectura organizada dentro de `src`.
- Separación de componentes y pantallas.
- Creación del componente reutilizable `ProfileCard`.
- Uso de props para mostrar nombre, rol e imagen.
- Tipado de props con TypeScript.
- Uso del componente `Image` de React Native.
- Creación de `HomeScreen` y `ProfileScreen`.
- Centralización de colores.
- Separación de datos de prueba.
- Uso de `StyleSheet.create`.
- Implementación de `SafeAreaView`.

## Estructura del proyecto

```text
src/
├── assets/
|   └──images.jpg
|   └──perfil2.jpg
├── components/
│   └── ProfileCard.tsx
├── theme/
│   └── index.ts
├── data/
│   └── base.ts
├── screens/
│   ├── HomeScreen.tsx
│   └── ProfileScreen.tsx
└── types/
    └── index.ts
    