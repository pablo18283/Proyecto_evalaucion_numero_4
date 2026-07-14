# ⚡ GymTracker — Evaluación N.º 4

> SPA para gestión de rutinas de entrenamiento desarrollada con React 18 y Vite.

---

## 🏢 Cliente y contexto
**Cliente ficticio:** FitLife, un centro de entrenamiento personal.

**Contexto:** FitLife gestiona rutinas en hojas de cálculo, lo que dificulta el seguimiento y la actualización de ejercicios.

**Problemática:** Falta una herramienta digital para administrar ejercicios, consultar rutinas y monitorear progreso.

**Objetivo:** Crear una aplicación que permita registrar, editar, eliminar y controlar ejercicios de forma ágil.

---

## 📌 Descripción de la aplicación
GymTracker es una SPA que permite:
- ver un dashboard con estadísticas de ejercicios y progreso
- filtrar ejercicios por grupo muscular y dificultad
- buscar ejercicios por nombre
- agregar, editar y eliminar ejercicios
- marcar ejercicios como completados
- explorar datos desde una API externa con fallback mock

---

## ✅ Funcionalidades implementadas
- Dashboard con resumen de ejercicios y recomendaciones
- Listado de ejercicios con tarjetas reutilizables
- Búsqueda y filtros dinámicos
- Formulario de alta/edición con validación
- Eliminación con confirmación
- Marcar y desmarcar ejercicios completados
- Estadísticas de volumen y series calculadas automáticamente
- Explorador de API externa con datos reales (wger.de)

---

## 🚀 Complementos para Evaluación 4
A partir del feedback de la Evaluación 3 ("*se pueden incorporar validaciones más
completas y seguir fortaleciendo la experiencia de usuario*"), se agregaron los
requerimientos que exige la Evaluación 4 Final:

- **Persistencia de datos**: los ejercicios ahora se guardan en `localStorage`
  (`hooks/useExercises.js`), no solo el perfil/idioma. Si el navegador no
  permite guardar (modo privado, cuota excedida), la app no se rompe: sigue
  funcionando en memoria y avisa al usuario con un banner.
- **CRUD completo**: crear, listar, editar y eliminar ejercicios, con estado
  persistente entre sesiones.
- **Integración con información externa (HTTP real)**: `pages/ApiExplorer.jsx`
  ahora consulta en vivo la API pública y gratuita de **wger.de** (sin
  necesidad de API key) usando `fetch`, con `AbortController` para timeout.
  Si la API falla o no hay resultados, se muestran datos de ejemplo (fallback)
  para que la sección nunca quede vacía o rota.
- **Validaciones reforzadas**: `components/ExerciseForm.jsx` ahora valida
  longitud mínima/máxima del nombre, límite máximo de peso (500 kg), largo
  máximo de notas (200 caracteres), además de las validaciones de series y
  repeticiones ya existentes.
- **Manejo de errores general**: se agregó `components/ErrorBoundary.jsx`
  que envuelve toda la aplicación (`main.jsx`). Si algún componente falla al
  renderizar, se muestra una pantalla de error clara con opción de recargar,
  en vez de una pantalla en blanco.

---

## 🔮 Funcionalidades futuras
- Persistencia con backend real (Node/Express + base de datos) en vez de `localStorage`
- Autenticación de usuarios
- Navegación con React Router
- Página de rutinas semanales y seguimiento histórico
- Paginación e infinite scroll en el explorador de API

---

## 🗂️ Estructura del proyecto
```
PROYECTO_N3/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.module.css
    ├── styles/
    │   └── global.css
    ├── data/
    │   └── exercises.js
    ├── hooks/
    │   └── useExercises.js
    ├── components/
    │   ├── Header.jsx
    │   ├── Header.module.css
    │   ├── StatsBar.jsx
    │   ├── StatsBar.module.css
    │   ├── FilterBar.jsx
    │   ├── FilterBar.module.css
    │   ├── ExerciseCard.jsx
    │   ├── ExerciseCard.module.css
    │   ├── ExerciseForm.jsx
    │   └── ExerciseForm.module.css
    └── pages/
        ├── Dashboard.jsx
        ├── Dashboard.module.css
        ├── Exercises.jsx
        ├── Exercises.module.css
        ├── ApiExplorer.jsx
        └── ApiExplorer.module.css
```

---

## 🛠️ Tecnologías utilizadas
- React 18
- Vite
- CSS Modules
- JavaScript moderno

---

## 🚀 Instalación
```bash
npm install
npm run dev
```

---

## 📌 Configuración para GitHub Pages
El proyecto usa `vite.config.js` con `base: '/PROYECTO_N3/'` para desplegar en GitHub Pages.

---

## 🤖 Uso de Inteligencia Artificial
Se utilizó IA para:
- definir la estructura de componentes
- proponer la organización de hooks
- diseñar validaciones de formulario
- planificar fallback de API externa

### Evidencia de uso en la Evaluación 4
**Prompt utilizado:** "Complementa el proyecto de la Evaluación 3 para que cumpla
con los requerimientos de la Evaluación 4: persistencia de datos, CRUD, integración
con una fuente externa por HTTP, validaciones y manejo de errores."

**Recomendaciones obtenidas por la IA:**
- Agregar persistencia de los ejercicios en `localStorage` (antes solo se
  guardaba el perfil/idioma), leyendo y escribiendo con manejo de errores
  (`try/catch`) para no romper la app si el almacenamiento falla.
- Reemplazar la integración con ExerciseDB (que requería una API key de pago
  y nunca llegaba a ejecutar el fetch real) por la API pública y gratuita de
  **wger.de**, que no requiere autenticación.
- Incorporar `AbortController` para controlar tiempos de espera en las
  solicitudes HTTP y así evitar que la interfaz quede "colgada".
- Sumar validaciones adicionales al formulario (longitud del nombre, límite
  máximo de peso, largo de notas).
- Crear un `ErrorBoundary` general para capturar errores de renderizado no
  previstos y mostrar un mensaje amigable en vez de una pantalla en blanco.

**Ajustes realizados por el estudiante:**
- Se revisó que el fallback a datos de ejemplo se mantuviera coherente con
  el diseño visual ya existente (mismas tarjetas, mismos estilos).
- Se verificó que el build (`npm run build`) siguiera funcionando después de
  cada cambio.
- Se decidió mantener `localStorage` (en vez de un backend) porque el
  alcance de esta evaluación es frontend; la conexión a un backend real
  queda planificada para una etapa posterior.

---

## 📎 Repositorio GitHub
https://github.com/pablo18283/PROYECTO_N3.git

---

## 📈 Avance realizado
- Estructura modular de componentes
- Estado y filtros con React Hooks
- Formulario validado y CRUD local
- Vista de dashboard y explorador de API
- Estilos ordenados con CSS Modules

---

## 📌 Notas finales
- El proyecto se mantiene como GymTracker.
- No se modificó el sentido del proyecto.
- `.gitignore` cubre `node_modules`, `dist`, `.env`, `.env.local` y `.DS_Store`.
- `npm run build` funciona correctamente.
