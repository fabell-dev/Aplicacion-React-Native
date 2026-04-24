# Handoff de continuidad (retomar mas tarde)

Fecha: 2026-04-02

## 1) Estado actual del proyecto

- App migrada a React Native con Expo (SDK 55).
- Pantallas principales listas: inicio, universidad, carrera, test vocacional, mentorias.
- APK funcional generado por EAS Build (cloud).
- Ajustes UX aplicados:
  - Boton "Volver" separado de la barra superior (status bar) en Android.
  - Boton fisico de Android: vuelve al inicio antes de cerrar; doble toque para salir en home.
- Identidad actual:
  - Nombre visible app: "Orientacion ICI".
  - Slug EAS: "orientacion-profesional-uci" (debe mantenerse para no romper vinculo EAS).
  - Android package: com.alessandra.app
  - iOS bundleIdentifier: com.alessandra.app

## 2) APKs recientes (EAS)

- Build ID: 45e2feb3-10b6-46e6-a18c-b7ec2dac7401
- Estado: finished
- URL APK: https://expo.dev/artifacts/eas/9Cx1vYuupKxM1cGUps94tX.apk
- Logs: https://expo.dev/accounts/fabell/projects/orientacion-profesional-uci/builds/45e2feb3-10b6-46e6-a18c-b7ec2dac7401

Build anterior estable:

- Build ID: 025f58f6-86a5-44c5-970e-5ac6e43ad395
- URL APK: https://expo.dev/artifacts/eas/hZw669XEpLn5o9wPdX6XT.apk

## 3) Archivos clave tocados

- app.json
- App.tsx
- src/screens/HomeScreen.tsx
- src/screens/UniversidadScreen.tsx
- src/screens/CarreraScreen.tsx
- src/screens/TestVocacionalScreen.tsx
- src/screens/MentoriasScreen.tsx
- tsconfig.json
- .gitignore

## 4) Comandos utiles

Instalar y correr:

```bash
npm install
npm run start
```

Build Android cloud (recomendado):

```bash
eas build -p android --profile preview --non-interactive
```

Ver estado del ultimo build:

```bash
eas build:list --platform android --limit 1
```

Ver detalle de un build:

```bash
eas build:view <build-id>
```

## 5) Decisiones importantes para no romper

- NO cambiar el campo "slug" en app.json mientras se use el mismo projectId de EAS.
- Mantener un solo gestor de paquetes para evitar inconsistencias de lockfiles.
- Preferir EAS cloud build sobre --local (hubo fallos de Gradle/JVM local).

## 6) Pendientes al retomar

- Reemplazar enlace real de WhatsApp en mentorias.
- Mejorar icono/splash con arte final propio (actualmente base).
- Revisar limpieza de repo Git:
  - En algun punto se inicializo repo con rastreo de muchos archivos de node_modules.
  - Conviene normalizar .gitignore y limpiar el indice cuando se haga una pasada de mantenimiento Git.
- Opcional: migrar navegacion manual a React Navigation.

## 7) Incidente de seguridad

- Se recibio alerta de una Google API Key detectada en dependencias instaladas dentro de node_modules.
- La clave no aparece en el codigo fuente de la app; esta embebida en archivos de terceros que vinieron con la instalacion.
- Accion recomendada ya: revocar o rotar la key en Google Cloud si sigue activa.
- Si hace falta retomar este punto, revisar uso real de la key y reemplazarla solo si la app dependiera de ese servicio.

## 8) Checklist rapido de regreso

1. npm install
2. npm run start y prueba en dispositivo
3. validar navegacion + boton fisico Android
4. cambiar enlace WhatsApp
5. lanzar nuevo eas build preview
