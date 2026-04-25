# Orientacion ICI - React Native

Migracion inicial desde la version web (Vite/React) a una app movil con Expo y React Native.

## Requisitos

- Node.js 18+
- npm

## Ejecutar

```bash
npm install
npm run start
```

Luego abre en:

- Android: `a`
- iOS: `i` (en macOS)
- Web: `w`

## Configuracion de Supabase

1. Crea tu archivo `.env` copiando `.env.example`.
2. Completa estas variables:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

3. Reinicia Expo despues de cambiar variables de entorno.

### Tabla usada ahora (WhatsApp)

La pantalla de mentorias lee dinamicamente el enlace desde la tabla `whatsapp_link`.
Debe existir al menos un registro con la columna `link`.

Ejemplo:

```sql
insert into whatsapp_link (link)
values ('https://chat.whatsapp.com/tu-codigo-real');
```

## Estructura

- `App.tsx`: enrutamiento interno entre secciones.
- `src/screens/HomeScreen.tsx`
- `src/screens/UniversidadScreen.tsx`
- `src/screens/CarreraScreen.tsx`
- `src/screens/TestVocacionalScreen.tsx`
- `src/screens/MentoriasScreen.tsx`

## Nota

El enlace de WhatsApp de mentorias ahora se obtiene desde Supabase.

## Retomar mas tarde

Consulta `RETOMAR.md` para estado actual, builds recientes y pasos de continuidad.
