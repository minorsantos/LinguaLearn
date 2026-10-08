/**
 * ============================================================================
 * LINGUALEARN - MOTOR DE LECCIONES ACTIVAS ADAPTATIVAS (leccion.js)
 * Prototipo Globe Navigator con variedad de ejercicios y registro en localStorage
 * ============================================================================
 */

(function () {
  'use strict';

  // Banco de 5 ejercicios variados con ilustraciones y vocabulario contextual
  let ACTIVE_EXERCISES = [
    {
      id: 1,
      word: 'apple',
      wordDisplay: 'apple',
      ipa: "/'æp.əl/",
      category: 'Alimentos y Frutas · Vocabulario Esencial',
      instruction: 'Selecciona la palabra correcta:',
      image: 'assets/apple_vector.png',
      imageAlt: 'Ilustración vectorial de una manzana roja fresca con hoja verde',
      options: [
        { text: 'casa', iconLeft: 'sphinx', iconRight: 'pagoda', isCorrect: false },
        { text: 'manzana', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: true },
        { text: 'perro', iconLeft: 'taco', iconRight: 'taco', isCorrect: false }
      ],
      explanation: '¡Excelente! "Apple" /\'æp.əl/ significa manzana en español. Sustantivo contable fundamental.',
      phraseSample: 'An apple a day keeps the doctor away.'
    },
    {
      id: 2,
      word: 'coffee',
      wordDisplay: 'coffee',
      ipa: "/'kɒf.i/",
      category: 'Cafetería & Encuentros Urbanos',
      instruction: 'Selecciona la palabra correcta para la bebida:',
      image: 'assets/leccion_coffee.jpg',
      imageAlt: 'Taza de café humeante en tono terracota y crema',
      options: [
        { text: 'té', iconLeft: 'pagoda', iconRight: 'sphinx', isCorrect: false },
        { text: 'café', iconLeft: 'taco', iconRight: 'apple', isCorrect: true },
        { text: 'jugo', iconLeft: 'sphinx', iconRight: 'pagoda', isCorrect: false }
      ],
      explanation: '¡Muy bien! "Coffee" /\'kɒf.i/ es la infusión aromática más popular en cafeterías europeas.',
      phraseSample: 'Could I please order a fresh cup of coffee?'
    },
    {
      id: 3,
      word: 'airplane',
      wordDisplay: 'airplane',
      ipa: "/'eə.pleɪn/",
      category: 'Viajes, Rutas & Globe Navigator',
      instruction: '¿Cuál es el medio de transporte mostrado?:',
      image: 'assets/leccion_airplane.jpg',
      imageAlt: 'Avión de pasajeros surcando el cielo en estilo de viaje',
      options: [
        { text: 'avión', iconLeft: 'sphinx', iconRight: 'pagoda', isCorrect: true },
        { text: 'tren', iconLeft: 'taco', iconRight: 'taco', isCorrect: false },
        { text: 'barco', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: false }
      ],
      explanation: '¡Perfecto! "Airplane" /\'eə.pleɪn/ es el transporte aéreo para conectar destinos en Globe Navigator.',
      phraseSample: 'The airplane will depart directly for Rome at noon.'
    },
    {
      id: 4,
      word: 'book',
      wordDisplay: 'book',
      ipa: "/bʊk/",
      category: 'Educación & Hábitos de Estudio',
      instruction: 'Selecciona la palabra correcta para el objeto:',
      image: 'assets/leccion_book.jpg',
      imageAlt: 'Libro abierto encuadernado con marcapáginas',
      options: [
        { text: 'mesa', iconLeft: 'taco', iconRight: 'pagoda', isCorrect: false },
        { text: 'pluma', iconLeft: 'sphinx', iconRight: 'taco', isCorrect: false },
        { text: 'libro', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: true }
      ],
      explanation: '¡Brillante! "Book" /bʊk/ representa la lectura y el hábito de inmersión diaria de 5 minutos.',
      phraseSample: 'I love reading an English book every evening.'
    },
    {
      id: 5,
      word: 'dog',
      wordDisplay: 'dog',
      ipa: "/dɒɡ/",
      category: 'Compañía & Vida Diaria',
      instruction: '¿Qué animal de compañía es el que ves?:',
      image: 'assets/leccion_dog.jpg',
      imageAlt: 'Cachorro amigable y sonriente en tonos terracota',
      options: [
        { text: 'gato', iconLeft: 'sphinx', iconRight: 'taco', isCorrect: false },
        { text: 'perro', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: true },
        { text: 'pájaro', iconLeft: 'taco', iconRight: 'pagoda', isCorrect: false }
      ],
      explanation: '¡Maravilloso! "Dog" /dɒɡ/ es el sustantivo correcto para perro. ¡Has completado los 5 retos!',
      phraseSample: 'A loyal dog makes the best companion on any adventure.'
    }
  ];

  // Estado reactivo de la lección
  const LESSON_EXERCISES_U3 = [
    {
      id: 1,
      word: 'interview',
      wordDisplay: 'interview',
      ipa: "/'ɪn.tə.vjuː/",
      category: 'Entrevistas de Trabajo y Negocios',
      instruction: 'Selecciona la traducción correcta:',
      image: 'assets/leccion_coffee.jpg', 
      imageAlt: 'Entrevista de trabajo',
      options: [
        { text: 'reunión', iconLeft: 'sphinx', iconRight: 'pagoda', isCorrect: false },
        { text: 'entrevista', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: true },
        { text: 'llamada', iconLeft: 'taco', iconRight: 'taco', isCorrect: false }
      ],
      explanation: '¡Excelente! "Interview" es clave en procesos de selección.',
      phraseSample: 'I have a job interview tomorrow morning.'
    },
    {
      id: 2,
      word: 'resume',
      wordDisplay: 'resume / CV',
      ipa: "/'rez.juː.meɪ/",
      category: 'Entrevistas de Trabajo y Negocios',
      instruction: '¿Qué documento necesitas para aplicar a un trabajo?:',
      image: 'assets/leccion_book.jpg',
      imageAlt: 'Currículum vitae',
      options: [
        { text: 'pasaporte', iconLeft: 'pagoda', iconRight: 'sphinx', isCorrect: false },
        { text: 'currículum', iconLeft: 'taco', iconRight: 'apple', isCorrect: true },
        { text: 'recibo', iconLeft: 'sphinx', iconRight: 'pagoda', isCorrect: false }
      ],
      explanation: '¡Muy bien! "Resume" o CV es tu carta de presentación profesional.',
      phraseSample: 'Please attach your resume to the application.'
    },
    {
      id: 3,
      word: 'salary',
      wordDisplay: 'salary',
      ipa: "/'sæl.ər.i/",
      category: 'Entrevistas de Trabajo y Negocios',
      instruction: '¿A qué se refiere esta palabra?:',
      image: 'assets/leccion_airplane.jpg',
      imageAlt: 'Dinero o compensación',
      options: [
        { text: 'salario', iconLeft: 'sphinx', iconRight: 'pagoda', isCorrect: true },
        { text: 'vacaciones', iconLeft: 'taco', iconRight: 'taco', isCorrect: false },
        { text: 'horario', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: false }
      ],
      explanation: '¡Perfecto! "Salary" es la compensación económica por tu trabajo.',
      phraseSample: 'The starting salary is very competitive.'
    },
    {
      id: 4,
      word: 'skills',
      wordDisplay: 'skills',
      ipa: "/skɪlz/",
      category: 'Entrevistas de Trabajo y Negocios',
      instruction: 'Selecciona la palabra correcta:',
      image: 'assets/leccion_dog.jpg',
      imageAlt: 'Habilidades',
      options: [
        { text: 'debilidades', iconLeft: 'taco', iconRight: 'pagoda', isCorrect: false },
        { text: 'herramientas', iconLeft: 'sphinx', iconRight: 'taco', isCorrect: false },
        { text: 'habilidades', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: true }
      ],
      explanation: '¡Brillante! "Skills" representa tus competencias y talentos.',
      phraseSample: 'She has excellent communication skills.'
    },
    {
      id: 5,
      word: 'hire',
      wordDisplay: 'hire',
      ipa: "/haɪər/",
      category: 'Entrevistas de Trabajo y Negocios',
      instruction: '¿Cuál es el significado del verbo "to hire"?:',
      image: 'assets/apple_vector.png',
      imageAlt: 'Contratar',
      options: [
        { text: 'despedir', iconLeft: 'sphinx', iconRight: 'taco', isCorrect: false },
        { text: 'contratar', iconLeft: 'pagoda', iconRight: 'apple', isCorrect: true },
        { text: 'renunciar', iconLeft: 'taco', iconRight: 'pagoda', isCorrect: false }
      ],
      explanation: '¡Maravilloso! "Hire" significa contratar a alguien para un puesto.',
      phraseSample: 'We are looking to hire a new software engineer.'
    }
  ];

  let currentExerciseIndex = 0;
  let selectedOptionIndex = -1;
  let hasEvaluated = false;
  let correctCount = 0;
  let earnedXpTotal = 0;
  let lives = 5;
  let streak = 10;

  // Generador de Iconos SVG para los botones laterales
  function getCultureIconSvg(iconName) {
    switch (iconName) {
      case 'sphinx':
        return `
          <svg class="btn-culture-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M10 26V20C10 17 12 15 16 15C20 15 22 17 22 20V26" />
            <path d="M12 12C12 9.8 13.8 8 16 8C18.2 8 20 9.8 20 12V15H12V12Z" />
            <path d="M9 13L6 17V26H10" />
            <path d="M23 13L26 17V26H22" />
            <path d="M14 18H18" />
            <path d="M5 26H27" />
          </svg>`;
      case 'pagoda':
        return `
          <svg class="btn-culture-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 3V6" />
            <path d="M12 6L16 4L20 6" />
            <path d="M10 9L16 6L22 9H10Z" />
            <path d="M7 16L16 11L25 16H7Z" />
            <path d="M5 23L16 17L27 23H5Z" />
            <rect x="11" y="23" width="10" height="5" />
            <path d="M4 28H28" />
          </svg>`;
      case 'apple':
        return `
          <svg class="btn-culture-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 4C17.5 4 19 5.5 19 7C17 7 16 5.5 16 4Z" />
            <path d="M16 6C15 9 13.5 10 11 10.5C8 11.1 6 13.6 6 17C6 22 10.5 27 16 27C21.5 27 26 22 26 17C26 13.6 24 11.1 21 10.5C18.5 10 17 9 16 6Z" />
          </svg>`;
      case 'taco':
      default:
        return `
          <svg class="btn-culture-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 22C6 14 11 8 18 8C23 8 26 11 26 15C26 21 21 24 14 24H6Z" />
            <path d="M10 13C12 12 15 13 16 15" />
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
            <circle cx="17" cy="19" r="1.5" fill="currentColor" />
            <circle cx="21" cy="17" r="1.5" fill="currentColor" />
          </svg>`;
    }
  }

  // Sintetizador de audio Web Audio API para micro-interacciones hápticas y auditivas
  function playSound(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.25); // G5
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      // Audio no bloqueante en navegadores con autoplay restringido
    }
  }

  // Pronunciación de voz nativa (Web Speech API)
  function speak(text, rate = 1.0) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;

    const speakerBtn = document.getElementById('btn-speaker-active');
    if (speakerBtn) {
      speakerBtn.classList.add('text-success');
      utterance.onend = () => speakerBtn.classList.remove('text-success');
    }
    window.speechSynthesis.speak(utterance);
  }

  // Carga e inicialización de la lección
  function initLesson() {
    loadUserDataFromStorage();
    let userData = (window.LinguaApp && window.LinguaApp.getUser) ? window.LinguaApp.getUser() : {};
    if (userData.completedLessons && userData.completedLessons.includes('L-04')) {
      ACTIVE_EXERCISES = LESSON_EXERCISES_U3;
      
      const topBarText = document.querySelector('.accessibility-topbar span');
      if (topBarText) topBarText.innerHTML = '<i class="bi bi-briefcase text-primary"></i> Unidad 3 · Nivel B1';
      
      const headerTitle = document.querySelector('.lesson-complete-modal .badge');
      if (headerTitle) headerTitle.textContent = '¡Unidad 3 Completada con Éxito!';
    }
    renderCurrentExercise();
    setupGlobalEvents();
  }

  function loadUserDataFromStorage() {
    if (window.LinguaApp && window.LinguaApp.getUser) {
      const u = window.LinguaApp.getUser();
      if (u.streak) streak = u.streak;
    }
    updateTopStats();
  }

  function updateTopStats() {
    const streakEl = document.getElementById('lesson-streak-val');
    const livesEl = document.getElementById('lesson-lives-val');
    if (streakEl) streakEl.textContent = streak;
    if (livesEl) livesEl.textContent = lives;
  }

  // Renderiza el ejercicio actual en pantalla
  function renderCurrentExercise() {
    const ex = LESSON_EXERCISES[currentExerciseIndex];
    selectedOptionIndex = -1;
    hasEvaluated = false;

    // Progreso
    const total = LESSON_EXERCISES.length;
    const currentNum = currentExerciseIndex + 1;
    const pct = (currentNum / total) * 100;

    const progressFill = document.getElementById('lesson-progress-fill');
    const progressCount = document.getElementById('lesson-progress-count');
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressCount) progressCount.textContent = `${currentNum}/${total}`;

    // Título de instrucción
    const instructionEl = document.getElementById('lesson-instruction-text');
    if (instructionEl) instructionEl.textContent = ex.instruction;

    // Dibujo central y palabra
    const drawingImg = document.getElementById('lesson-drawing-img');
    if (drawingImg) {
      drawingImg.src = ex.image;
      drawingImg.alt = ex.imageAlt;
    }

    const wordEl = document.getElementById('lesson-word-text');
    if (wordEl) {
      wordEl.innerHTML = `
        <span>${ex.wordDisplay}</span>
        <button type="button" class="btn-speaker-mini ms-1" id="btn-speaker-active" aria-label="Escuchar pronunciación de ${ex.wordDisplay}">
          <i class="bi bi-volume-up-fill"></i>
        </button>
      `;
      const btnSpeaker = document.getElementById('btn-speaker-active');
      if (btnSpeaker) {
        btnSpeaker.addEventListener('click', () => speak(ex.word, 0.95));
      }
    }

    // Grid de 3 opciones del prototipo
    const optionsContainer = document.getElementById('lesson-options-container');
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      ex.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `lesson-option-button anim-cascade stagger-${idx + 1}`;
        btn.setAttribute('data-option-idx', idx);
        btn.setAttribute('aria-pressed', 'false');

        btn.innerHTML = `
          ${getCultureIconSvg(opt.iconLeft)}
          <span class="opt-text">${opt.text}</span>
          ${getCultureIconSvg(opt.iconRight)}
        `;

        btn.addEventListener('click', function (e) {
          handleOptionSelection(idx, btn, e);
        });

        optionsContainer.appendChild(btn);
      });
    }

    // Botón de Responder
    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.disabled = true;
      btnResponder.innerHTML = `<span>Responder</span>`;
      btnResponder.className = 'btn-lesson-responder';
    }

    // Ocultar feedback drawer si estaba activo
    const feedbackSheet = document.getElementById('lesson-feedback-sheet');
    if (feedbackSheet) feedbackSheet.classList.add('d-none');
  }

  // Manejo de la selección de opción con animación del puntero
  function handleOptionSelection(idx, buttonEl, event) {
    if (hasEvaluated) return;

    selectedOptionIndex = idx;
    playSound('click');

    // Quitar selección previa de todos los botones
    const allButtons = document.querySelectorAll('.lesson-option-button');
    allButtons.forEach((btn) => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-pressed', 'false');
      const badge = btn.querySelector('.pointer-selection-badge');
      if (badge) badge.remove();
    });

    // Activar botón seleccionado
    buttonEl.classList.add('selected');
    buttonEl.setAttribute('aria-pressed', 'true');

    // =========================================================================
    // ANIMACIÓN DEL PUNTERO AL SELECCIONAR CUALQUIERA DE LAS OPCIONES
    // =========================================================================
    // 1. Efecto onda expansiva desde el punto exacto de clic del usuario
    const rect = buttonEl.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'pointer-click-ripple';

    const clickX = event ? (event.clientX - rect.left) : (rect.width / 2);
    const clickY = event ? (event.clientY - rect.top) : (rect.height / 2);
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${clickX - size / 2}px`;
    ripple.style.top = `${clickY - size / 2}px`;
    buttonEl.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 600);

    // 2. Indicador flotante animado de puntero sobre la opción
    const pointerBadge = document.createElement('span');
    pointerBadge.className = 'pointer-selection-badge';
    pointerBadge.innerHTML = `<i class="bi bi-check2"></i>`;
    pointerBadge.title = 'Opción seleccionada';
    buttonEl.appendChild(pointerBadge);

    // Habilitar botón de responder
    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.disabled = false;
    }
  }

  // Evaluación de la respuesta seleccionada
  function evaluateAnswer() {
    if (selectedOptionIndex < 0) return;
    const ex = LESSON_EXERCISES[currentExerciseIndex];
    const isCorrect = ex.options[selectedOptionIndex].isCorrect;
    hasEvaluated = true;

    const feedbackSheet = document.getElementById('lesson-feedback-sheet');
    const feedbackTitle = document.getElementById('lesson-feedback-title');
    const feedbackText = document.getElementById('lesson-feedback-text');
    const feedbackIcon = document.getElementById('lesson-feedback-icon');
    const btnResponder = document.getElementById('btn-lesson-responder');

    if (isCorrect) {
      playSound('correct');
      correctCount++;
      earnedXpTotal += 15;

      if (feedbackSheet) {
        feedbackSheet.className = 'lesson-feedback-sheet correct p-4 mb-4';
        feedbackSheet.classList.remove('d-none');
      }
      if (feedbackIcon) feedbackIcon.innerHTML = `<i class="bi bi-check-circle-fill text-success fs-3"></i>`;
      if (feedbackTitle) feedbackTitle.innerHTML = `<span class="text-success fw-bold">¡Excelente respuesta! +15 XP</span>`;
      if (feedbackText) {
        feedbackText.innerHTML = `
          <div>${ex.explanation}</div>
          <div class="small text-secondary mt-1"><em>"${ex.phraseSample}"</em></div>
        `;
      }
    } else {
      playSound('error');
      lives = Math.max(1, lives - 1);
      updateTopStats();

      const correctOpt = ex.options.find(o => o.isCorrect);
      if (feedbackSheet) {
        feedbackSheet.className = 'lesson-feedback-sheet error p-4 mb-4';
        feedbackSheet.classList.remove('d-none');
      }
      if (feedbackIcon) feedbackIcon.innerHTML = `<i class="bi bi-x-circle-fill text-danger fs-3"></i>`;
      if (feedbackTitle) feedbackTitle.innerHTML = `<span class="text-danger fw-bold">Solución correcta: "${correctOpt ? correctOpt.text : ''}"</span>`;
      if (feedbackText) {
        feedbackText.innerHTML = `
          <div>${ex.explanation}</div>
          <div class="small text-secondary mt-1">No te preocupes, el aprendizaje adaptativo afianza la memoria a través del error.</div>
        `;
      }
    }

    // Botón cambia a "Continuar"
    if (btnResponder) {
      btnResponder.innerHTML = `<span>Continuar</span> <i class="bi bi-arrow-right"></i>`;
      btnResponder.className = 'btn-lesson-responder';
    }
  }

  // Avanza al siguiente ejercicio o finaliza la lección
  function nextStep() {
    if (currentExerciseIndex < LESSON_EXERCISES.length - 1) {
      currentExerciseIndex++;
      renderCurrentExercise();
    } else {
      finishLessonAndSaveProgress();
    }
  }

  // Finalización y Registro en localStorage (RF-05, RF-08)
  function finishLessonAndSaveProgress() {
    playSound('correct');
    earnedXpTotal = Math.max(75, earnedXpTotal); // 75 XP por completar la lección

    let userData = (window.LinguaApp && window.LinguaApp.getUser) ? window.LinguaApp.getUser() : {};
    userData.xp = (userData.xp || 120) + earnedXpTotal;
    userData.todayXp = Math.min((userData.todayXp || 80) + earnedXpTotal, 100);
    userData.streak = Math.max(streak, (userData.streak || 5) + 1);
    userData.weeklyLessons = (userData.weeklyLessons || 28) + 1;
    userData.weeklyGoalPct = Math.min(100, (userData.weeklyGoalPct || 65) + 15);
    userData.completedLessons = userData.completedLessons || [];
    if (!userData.completedLessons.includes('L-04')) {
      userData.completedLessons.push('L-04');
    }

    // Actualizar progreso de la Unidad 2 en Dashboard
    if (userData.units && userData.units[1]) {
      userData.units[1].lessons = '4/5';
      userData.units[1].progress = 80;
    }

    // Añadir al historial
    userData.history = userData.history || [];
    userData.history.unshift({
      title: 'Lección 4: Vocabulario de la Vida Diaria (Alimentos & Cafetería)',
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      score: `${correctCount} de ${LESSON_EXERCISES.length} aciertos (${Math.round((correctCount / LESSON_EXERCISES.length) * 100)}%)`,
      xpEarned: `+${earnedXpTotal} XP`
    });

        if (window.LinguaApp && window.LinguaApp.saveUser) {
      window.LinguaApp.saveUser(userData);
    } else {
      localStorage.setItem('lingua_current_user', JSON.stringify(userData));
    }
    
    // Update Dashboard HTML specifically for Unidad 3 if we just did U3
    if (userData.completedLessons && userData.completedLessons.includes('L-04')) {
        let dashboardHtml = localStorage.getItem('lingua_dashboard_html') || '';
        if (!dashboardHtml) {
            // We set a flag to update dashboard on load
            localStorage.setItem('lingua_u3_completed', 'true');
        }
    }
      window.LinguaApp.saveUser(userData);
    } else {
      localStorage.setItem('lingua_current_user', JSON.stringify(userData));
    }

    // Mostrar modal de celebración final
    const modalEl = document.getElementById('lesson-complete-modal');
    if (modalEl && window.bootstrap) {
      const modal = new bootstrap.Modal(modalEl);
      const scoreText = document.getElementById('modal-score-summary');
      const xpBadge = document.getElementById('modal-xp-earned');
      const streakBadge = document.getElementById('modal-streak-updated');

      if (scoreText) scoreText.textContent = `${correctCount} de ${LESSON_EXERCISES.length} ejercicios correctos (${Math.round((correctCount / LESSON_EXERCISES.length) * 100)}%)`;
      if (xpBadge) xpBadge.textContent = `+${earnedXpTotal} XP ganados`;
      if (streakBadge) streakBadge.textContent = `${userData.streak} días seguidos`;

      modal.show();
    } else {
      alert(`¡Felicitaciones! Has completado los 5 ejercicios de la Lección 4.\n+${earnedXpTotal} XP ganados.`);
      window.location.href = 'dashboard.html';
    }
  }

  // Eventos globales (Click en responder, atajos de teclado)
  function setupGlobalEvents() {
    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.addEventListener('click', function () {
        if (!hasEvaluated) {
          evaluateAnswer();
        } else {
          nextStep();
        }
      });
    }

    // Atajos de teclado 1, 2, 3 para las 3 opciones y Enter para responder/continuar
    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === '1' || e.key === '2' || e.key === '3') {
        const idx = parseInt(e.key, 10) - 1;
        const allButtons = document.querySelectorAll('.lesson-option-button');
        if (allButtons[idx]) {
          handleOptionSelection(idx, allButtons[idx], null);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const btn = document.getElementById('btn-lesson-responder');
        if (btn && !btn.disabled) {
          btn.click();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        const ex = LESSON_EXERCISES[currentExerciseIndex];
        if (ex) speak(ex.word, 0.95);
      }
    });
  }

  // Exponer a nivel de ventana para integración
  window.LinguaLesson = {
    init: initLesson,
    speak: speak,
    next: nextStep
  };

  // Inicializar al cargar el DOM
  document.addEventListener('DOMContentLoaded', initLesson);
})();
