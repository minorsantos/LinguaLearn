/**
 * ============================================================================
 * LINGUALEARN - MOTOR DE LUCIÉRNAGAS ORGÁNICAS VIVAS EN SEGUNDO PLANO (fireflies.js)
 * ============================================================================
 * Genera luciérnagas bioluminiscentes con movimiento orgánico fluido y continuo
 * tanto en Modo Claro (tonos ámbar y miel dorado brillante con contraste visible)
 * como en Modo Oscuro (oro luminoso, ámbar cálido y destellos bioluminiscentes).
 * Pasan estrictamente por detrás de las tarjetas, textos y controles esmerilados.
 */

(function () {
  'use strict';

  let canvas, ctx;
  let width = 0, height = 0;
  let fireflies = [];
  let animFrameId = null;
  let isRunning = false;
  let mouse = { x: -1000, y: -1000, active: false };

  // Parámetros de animación y visualización
  const CONFIG = {
    countDesktop: 52,
    countMobile: 26,
    minRadius: 2.2,
    maxRadius: 4.5,
    speedMin: 0.75,
    speedMax: 1.55,
    glowMultiplier: 5.2
  };

  class Firefly {
    constructor(initRandom = true) {
      this.reset(initRandom);
    }

    reset(initRandom = true) {
      this.x = initRandom ? Math.random() * width : (Math.random() < 0.5 ? -15 : width + 15);
      this.y = initRandom ? Math.random() * height : (Math.random() < 0.5 ? -15 : height + 15);
      this.radius = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
      this.baseAlpha = 0.55 + Math.random() * 0.42;
      this.alpha = this.baseAlpha;

      // Velocidad de movimiento orgánico (perceptible y elegante)
      const angle = Math.random() * Math.PI * 2;
      const speed = CONFIG.speedMin + Math.random() * (CONFIG.speedMax - CONFIG.speedMin);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 0.2; // Ligera tendencia ascendente térmica natural
      this.angle = angle;
      this.angularSpeed = (Math.random() - 0.5) * 0.035;

      // Oscilación sinusoidal de vuelo (aleteo / brisa suave)
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.03 + Math.random() * 0.04;
      this.swayAmp = 0.45 + Math.random() * 0.55;

      // Pulso / respiración de luminosidad (twinkle)
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.035 + Math.random() * 0.045;

      // Variantes cromáticas de luciérnaga
      this.paletteType = Math.random();
    }

    update() {
      // 1. Movimiento orgánico ondulante
      this.angle += this.angularSpeed;
      this.swayPhase += this.swaySpeed;

      const swayX = Math.sin(this.swayPhase) * this.swayAmp;
      const swayY = Math.cos(this.swayPhase * 0.8) * (this.swayAmp * 0.7);

      this.x += this.vx + swayX;
      this.y += this.vy + swayY;

      // 2. Interacción sutil con el puntero del ratón (desvío suave al acercarse)
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90 && dist > 0) {
          const force = (90 - dist) / 90 * 0.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      // 3. Respiración de luz (twinkle activo)
      this.pulsePhase += this.pulseSpeed;
      const pulseFactor = 0.5 + 0.5 * Math.sin(this.pulsePhase);
      this.alpha = this.baseAlpha * (0.48 + 0.52 * pulseFactor);

      // 4. Ciclo continuo en los bordes de la pantalla (wrap around fluido)
      const margin = 30;
      if (this.x < -margin) this.x = width + margin;
      else if (this.x > width + margin) this.x = -margin;
      if (this.y < -margin) this.y = height + margin;
      else if (this.y > height + margin) this.y = -margin;
    }

    draw(isDark) {
      if (this.alpha <= 0.05) return;

      const glowR = this.radius * (isDark ? CONFIG.glowMultiplier * 1.15 : CONFIG.glowMultiplier);

      let coreColor, haloColor, ambientColor, sparkColor;

      if (isDark) {
        // MODO OSCURO: Destellos nocturnos dorados bioluminiscentes de alto brillo
        if (this.paletteType < 0.6) {
          // Oro luminoso celestial
          coreColor = '255, 245, 160';
          haloColor = '250, 195, 45';
          ambientColor = '235, 155, 20';
        } else if (this.paletteType < 0.85) {
          // Ámbar miel cálido
          coreColor = '255, 225, 140';
          haloColor = '245, 160, 35';
          ambientColor = '220, 110, 15';
        } else {
          // Verde chartreuse bio-lumínico
          coreColor = '225, 255, 180';
          haloColor = '175, 235, 65';
          ambientColor = '125, 195, 40';
        }
        sparkColor = `rgba(255, 255, 255, ${Math.min(1, this.alpha * 1.1)})`;
      } else {
        // MODO CLARO: Ámbar rico, oro miel y bronce radiante que resalta sobre fondo crema/pergamino
        if (this.paletteType < 0.6) {
          // Ámbar sol dorado (máxima visibilidad en fondo claro)
          coreColor = '220, 125, 20';
          haloColor = '240, 165, 30';
          ambientColor = '250, 195, 55';
        } else if (this.paletteType < 0.85) {
          // Oro miel profundo
          coreColor = '195, 100, 15';
          haloColor = '225, 140, 25';
          ambientColor = '245, 180, 50';
        } else {
          // Topacio cálido radiante
          coreColor = '205, 135, 15';
          haloColor = '235, 175, 35';
          ambientColor = '250, 205, 65';
        }
        sparkColor = `rgba(255, 245, 195, ${Math.min(1, this.alpha * 1.15)})`;
      }

      // En Modo Claro, dibujar un sutil halo de contraste exterior para máxima nitidez
      if (!isDark) {
        const shadowGrad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.8, this.x, this.y, glowR * 1.25);
        shadowGrad.addColorStop(0, `rgba(160, 85, 15, ${this.alpha * 0.22})`);
        shadowGrad.addColorStop(0.5, `rgba(190, 110, 20, ${this.alpha * 0.12})`);
        shadowGrad.addColorStop(1, 'rgba(190, 110, 20, 0)');
        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowR * 1.25, 0, Math.PI * 2);
        ctx.fill();
      }

      // 1. Halo difuso bioluminiscente
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowR);
      grad.addColorStop(0, `rgba(${coreColor}, ${this.alpha * 0.95})`);
      grad.addColorStop(0.35, `rgba(${haloColor}, ${this.alpha * 0.65})`);
      grad.addColorStop(0.75, `rgba(${ambientColor}, ${this.alpha * 0.22})`);
      grad.addColorStop(1, `rgba(${ambientColor}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Núcleo central brillante
      ctx.fillStyle = sparkColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.65, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initCanvas() {
    canvas = document.getElementById('fireflies-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'fireflies-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '2'; // Detrás del contenido (z-index >= 3), pero visible sobre el fondo
      document.body.prepend(canvas);
    }
    ctx = canvas.getContext('2d');
    resize();
    createFireflies();
  }

  function resize() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Si el canvas está dentro de un contenedor relativo como .hero-canvas
    // Si el canvas está dentro de un contenedor relativo como .hero-canvas
    const parent = canvas.parentElement;
    if (parent && (parent.classList.contains('hero-canvas') || parent.id === 'hero-canvas')) {
      width = parent.offsetWidth || window.innerWidth || 1200;
      height = parent.offsetHeight || window.innerHeight || 800;
    } else {
      width = window.innerWidth || document.documentElement.clientWidth || 1200;
      height = window.innerHeight || document.documentElement.clientHeight || 800;
    }
    width = Math.max(width, 320);
    height = Math.max(height, 320);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createFireflies() {
    const isMobile = width < 768;
    const targetCount = isMobile ? CONFIG.countMobile : CONFIG.countDesktop;
    fireflies = [];
    for (let i = 0; i < targetCount; i++) {
      fireflies.push(new Firefly(true));
    }
  }

  function loop() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    const isDark = document.body.classList.contains('dark-mode') || 
                   document.documentElement.getAttribute('data-theme') === 'dark';

    // Movimiento orgánico y continuo ininterrumpido
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update();
      fireflies[i].draw(isDark);
    }

    animFrameId = requestAnimationFrame(loop);
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    animFrameId = requestAnimationFrame(loop);
  }

  function stop() {
    isRunning = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  // Escuchar posición del ratón para interacción orgánica
  window.addEventListener('mousemove', (e) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Reajustar dimensiones dinámicamente
  window.addEventListener('resize', () => {
    resize();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCanvas();
      start();
    });
  } else {
    initCanvas();
    start();
  }

  // API pública
  window.LinguaFireflies = {
    start,
    stop,
    refresh: () => {
      resize();
      createFireflies();
    }
  };
})();
