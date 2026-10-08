# LinguaLearn 🌿
> Plataforma empática y accesible para el aprendizaje de idiomas, diseñada bajo los estándares **WCAG 2.2 AAA**.

---

## 📖 Descripción General

**LinguaLearn** es una plataforma educativa web diseñada para ofrecer una experiencia inmersiva, armónica y completamente accesible en el aprendizaje de idiomas. Combina una cuidada estética cálida inspirada en tonos pergamino, terracota y oro, con capacidades interactivas avanzadas como síntesis y reconocimiento de voz, autoevaluación diagnóstica, comunidad de aprendizaje con asistente de IA y gamificación mediante rachas y puntos de experiencia (XP).

---

## ✨ Características Principales

### ♿ Accesibilidad Universal (WCAG 2.2 AAA)
- **Modo Claro Cálido y Modo Oscuro**: Paletas cromáticas balanceadas con fondos atmosféricos de alta resolución.
- **Motor de Luciérnagas Orgánicas**: Partículas bioluminiscentes vivas en segundo plano que reaccionan al tema activo y se mueven de forma suave y continua detrás de las tarjetas translúcidas.
- **Ajuste de Tipografía**: Control dinámico de escala de fuentes (A- / A+) para facilitar la lectura.
- **Atajos de Teclado**: Navegación rápida mediante combinaciones de teclas (`Alt + 1` al `Alt + 5`).
- **Lector de Pantalla y ARIA**: Etiquetas semánticas y regiones dinámicas para tecnologías de asistencia.

### 🔐 Autenticación y Perfil de Usuario
- **Inicio de sesión y Registro**: Formulario estilizado con toggle de visibilidad para contraseñas.
- **Recuperación de Contraseña**: Flujo guiado paso a paso con validación de correo y restablecimiento seguro.
- **Persistencia en LocalStorage**: Gestión multi-usuario de progreso, unidades completadas, XP y preferencias.
- **Menú de Perfil Desplegable**: Barra de estado con racha activa, nivel y acceso rápido a cerrar sesión.

### 📚 Módulos y Pantallas del Sistema

| Módulo | Archivo | Descripción |
|---|---|---|
| **Inicio** | [`index.html`](index.html) | Hero con tarjeta ornamental de login, selector de escenarios de conversación en tiempo real (TTS) y banner ilustrado. |
| **Test Diagnóstico** | [`test-diagnostico.html`](test-diagnostico.html) | Evaluación interactiva por niveles (A1-B2) para calibrar el punto de partida del estudiante. |
| **Dashboard** | [`dashboard.html`](dashboard.html) | Panel integral con métricas semanales, mapa de ruta de aprendizaje y consejos motivacionales. |
| **Lección Activa** | [`leccion.html`](leccion.html) | Ejercicios interactivos con retroalimentación instantánea, pronunciación y refuerzo de vocabulario. |
| **Pronunciación y Voz** | [`pronunciacion.html`](pronunciacion.html) | Práctica oral con evaluación fonética palabra por palabra, calibrador de velocidad y puntuación porcentual. |
| **Comunidad y Práctica** | [`comunidad.html`](comunidad.html) | Salas de conversación temáticas, ranking semanal de usuarios y muro de dudas con respuestas automáticas del tutor IA. |
| **Suscripciones de Estudio** | [`suscripcion.html`](suscripcion.html) | Planes en Soles peruanos (S/.) con métodos de pago locales (Yape, Plin con QR, PagoEfectivo CIP y tarjetas). |
| **Centro de Ayuda** | [`soporte.html`](soporte.html) | Buscador predictivo de dudas, acordeón de preguntas frecuentes y formulario para tickets de asistencia. |
| **Mi Perfil** | [`perfil.html`](perfil.html) | Estadísticas avanzadas, vitrina de insignias desbloqueadas, intereses y configuración de accesibilidad. |

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**: Estructura limpia y accesible.
- **CSS3 Personalizado**: Efectos glassmorphism (vidrio esmerilado translúcido), gradientes metálicos y animaciones suaves.
- **Bootstrap 5.3.3**: Sistema de rejilla responsivo y utilidades de interfaz.
- **Bootstrap Icons 1.11.3**: Iconografía vectorial nítida.
- **JavaScript Moderno (ES6+)**:
  - Motor de partículas en HTML5 Canvas (`fireflies.js`).
  - Web Speech API (`SpeechSynthesis` y `SpeechRecognition`).
  - Gestor de sesión y persistencia (`app.js`).
  - Control de accesibilidad y temas (`accesibilidad.js`).

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Minor-Estrada/LinguaLearn-.git
   cd LinguaLearn-
   ```

2. **Abrir en el navegador**:
   - Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
   - O utilizar una extensión de servidor local como **Live Server** en Visual Studio Code para una experiencia de desarrollo óptima.

---

## 👤 Autor

Desarrollado por **Minor Estrada**  
Repositorio: [https://github.com/Minor-Estrada/LinguaLearn-](https://github.com/Minor-Estrada/LinguaLearn-)
