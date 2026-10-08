/**
 * ============================================================================
 * LINGUALEARN - CONTROLADOR DE ACCESIBILIDAD UNIVERSAL (WCAG 2.2 AAA / IHC)
 * ============================================================================
 */

(function () {
  'use strict';

  // Asegurar que el modo claro cálido sea el predeterminado inicial
  if (localStorage.getItem('lingua_theme_reset_warm') !== 'true') {
    localStorage.setItem('lingua_theme', 'light');
    localStorage.setItem('lingua_theme_reset_warm', 'true');
  }

  // Configuración y Estado de Accesibilidad y Tema (Modo Claro Cálido por defecto)
  const AccessibilityState = {
    darkMode: localStorage.getItem('lingua_theme') === 'dark',
    fontScale: parseFloat(localStorage.getItem('lingua_font_scale')) || 1.0,
    reduceMotion: localStorage.getItem('lingua_reduce_motion') === 'true',
    screenReaderActive: false
  };

  // Inicializar estado en el DOM al cargar
  function initAccessibility() {
    // Asegurar que no quede clase residual de alto contraste
    document.body.classList.remove('high-contrast');
    localStorage.removeItem('lingua_contrast');

    applyDarkMode(AccessibilityState.darkMode);
    applyFontScale(AccessibilityState.fontScale);
    applyReduceMotion(AccessibilityState.reduceMotion);
    setupAriaAnnouncer();
    bindGlobalShortcuts();
    bindHeaderControls();
  }

  // 0. Modo Oscuro / Claro
  function applyDarkMode(isDark) {
    AccessibilityState.darkMode = isDark;
    localStorage.setItem('lingua_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const btns = document.querySelectorAll('.btn-toggle-darkmode');
    btns.forEach(btn => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill';
      }
      const textSpan = btn.querySelector('.darkmode-text');
      if (textSpan) {
        textSpan.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
      }
    });

    if (window.LinguaFireflies && window.LinguaFireflies.refresh) {
      window.LinguaFireflies.refresh();
    }
  }

  window.toggleDarkMode = function () {
    const isDark = document.body.classList.contains('dark-mode');
    applyDarkMode(!isDark);
    announceAccessibilityChange(!isDark ? 'Modo oscuro activado. Fondo nocturno aplicado.' : 'Modo claro activado. Fondo cálido aplicado.');
  };

  // 2. Tamaño de Fuente Dinámico
  function applyFontScale(scale) {
    // Límites de seguridad: 0.8x a 1.4x
    const safeScale = Math.min(Math.max(scale, 0.8), 1.4);
    AccessibilityState.fontScale = safeScale;
    localStorage.setItem('lingua_font_scale', safeScale.toFixed(2));
    document.documentElement.style.setProperty('--font-scale', safeScale.toFixed(2));

    // Actualizar indicador de porcentaje si existe
    const indicators = document.querySelectorAll('.font-scale-indicator');
    indicators.forEach(ind => {
      ind.textContent = Math.round(safeScale * 100) + '%';
    });
  }

  window.increaseFontSize = function () {
    applyFontScale(AccessibilityState.fontScale + 0.1);
    announceAccessibilityChange('Tamaño de fuente aumentado a ' + Math.round(AccessibilityState.fontScale * 100) + ' por ciento');
  };

  window.decreaseFontSize = function () {
    applyFontScale(AccessibilityState.fontScale - 0.1);
    announceAccessibilityChange('Tamaño de fuente disminuido a ' + Math.round(AccessibilityState.fontScale * 100) + ' por ciento');
  };

  window.resetFontSize = function () {
    applyFontScale(1.0);
    announceAccessibilityChange('Tamaño de fuente restablecido al 100 por ciento');
  };

  // 3. Reducción de Animaciones
  function applyReduceMotion(reduce) {
    AccessibilityState.reduceMotion = reduce;
    localStorage.setItem('lingua_reduce_motion', reduce);
    if (reduce) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }

  window.toggleReduceMotion = function (reduce) {
    applyReduceMotion(reduce);
    announceAccessibilityChange(reduce ? 'Efectos de animación reducidos' : 'Animaciones normales activadas');
  };

  // 4. Lectura en Voz Alta Asistida (Screen reader síntesis de página)
  window.leerPaginaEnVozAlta = function () {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta la API de síntesis de voz.');
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      announceAccessibilityChange('Lectura en voz alta detenida');
      return;
    }

    // Extraer texto principal legible
    const mainHeading = document.querySelector('h1, h2');
    const pageTitle = mainHeading ? mainHeading.innerText : document.title;
    const mainContent = document.querySelector('main') || document.body;
    const textSnippet = pageTitle + '. ' + (mainContent.innerText.slice(0, 300) || '');

    const utterance = new SpeechSynthesisUtterance(textSnippet);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.onstart = () => {
      announceAccessibilityChange('Iniciando lectura en voz alta');
    };
    window.speechSynthesis.speak(utterance);
  };

  // 5. Canal de Anuncios ARIA Live Region
  function setupAriaAnnouncer() {
    let announcer = document.getElementById('aria-live-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer = document.createElement('div');
      announcer.id = 'aria-live-announcer';
      announcer.className = 'visually-hidden';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
  }

  function announceAccessibilityChange(message) {
    const announcer = document.getElementById('aria-live-announcer');
    if (announcer) {
      announcer.textContent = '';
      setTimeout(() => {
        announcer.textContent = message;
      }, 50);
    }
  }

  // 6. Atajos de Teclado Globales (Alt + 1 al 5)
  function bindGlobalShortcuts() {
    window.addEventListener('keydown', function (e) {
      // Ignorar si el usuario está tipeando en un input o textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            window.location.href = 'index.html';
            break;
          case '2':
            e.preventDefault();
            window.location.href = 'test-diagnostico.html';
            break;
          case '3':
            e.preventDefault();
            window.location.href = 'dashboard.html';
            break;
          case '4':
            e.preventDefault();
            window.location.href = 'leccion.html';
            break;
          case '5':
            e.preventDefault();
            window.location.href = 'perfil.html';
            break;
        }
      }
    });
  }

  // 7. Enlazar eventos de botones del Header
  function bindHeaderControls() {
    document.querySelectorAll('.btn-toggle-darkmode').forEach(btn => {
      btn.addEventListener('click', () => window.toggleDarkMode());
    });

    document.querySelectorAll('.btn-font-decrease').forEach(btn => {
      btn.addEventListener('click', () => window.decreaseFontSize());
    });

    document.querySelectorAll('.btn-font-increase').forEach(btn => {
      btn.addEventListener('click', () => window.increaseFontSize());
    });

    document.querySelectorAll('.btn-font-reset').forEach(btn => {
      btn.addEventListener('click', () => window.resetFontSize());
    });

    document.querySelectorAll('.btn-read-aloud').forEach(btn => {
      btn.addEventListener('click', () => window.leerPaginaEnVozAlta());
    });
  }

  // Exponer al objeto global
  window.LinguaAccessibility = {
    state: AccessibilityState,
    toggleDarkMode: window.toggleDarkMode,
    increaseFontSize: window.increaseFontSize,
    decreaseFontSize: window.decreaseFontSize,
    resetFontSize: window.resetFontSize,
    toggleReduceMotion: window.toggleReduceMotion,
    announce: announceAccessibilityChange
  };

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
  } else {
    initAccessibility();
  }
})();
