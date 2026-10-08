/**
 * ============================================================================
 * LINGUALEARN - MOTOR DE LECCIONES ACTIVAS ADAPTATIVAS (leccion.js)
 * Prototipo Globe Navigator con variedad de ejercicios y registro en localStorage
 * ============================================================================
 */

(function () {
  'use strict';
let LESSON_EXERCISES = [];

  const POOL_EXERCISES = [
    {
      id: 1, type: 'multiple_choice', wordDisplay: 'apple',
      instruction: 'Selecciona la traducción correcta para:',
      image: 'assets/apple_vector.png', imageAlt: 'Manzana roja',
      options: [{text:'casa',isCorrect:false}, {text:'manzana',isCorrect:true}, {text:'perro',isCorrect:false}],
      explanation: '¡Excelente! "Apple" significa manzana en español.', phraseSample: 'An apple a day keeps the doctor away.'
    },
    {
      id: 2, type: 'image_grid', wordDisplay: 'coffee',
      instruction: 'Selecciona la imagen que representa:',
      options: [
        {image:'assets/leccion_airplane.jpg', text:'airplane', isCorrect:false},
        {image:'assets/leccion_coffee.jpg', text:'coffee', isCorrect:true},
        {image:'assets/leccion_book.jpg', text:'book', isCorrect:false},
        {image:'assets/leccion_dog.jpg', text:'dog', isCorrect:false}
      ],
      explanation: '¡Muy bien! "Coffee" es café.', phraseSample: 'I need a cup of coffee.'
    },
    {
      id: 3, type: 'unscramble', wordDisplay: 'Frase desordenada',
      instruction: 'Ordena las palabras para formar la frase: "Yo leo un libro"',
      words: ['read', 'book', 'I', 'a'], correctOrder: ['I', 'read', 'a', 'book'],
      explanation: '¡Perfecto! El orden es Sujeto + Verbo + Artículo + Sustantivo.', phraseSample: 'I read a book.'
    },
    {
      id: 4, type: 'match_pairs', wordDisplay: 'Pares',
      instruction: 'Une la palabra en inglés con su traducción:',
      pairs: [{en:'dog', es:'perro'}, {en:'cat', es:'gato'}, {en:'bird', es:'pájaro'}, {en:'fish', es:'pez'}],
      explanation: '¡Brillante! Has unido todos los pares correctamente.', phraseSample: 'A loyal dog is a great friend.'
    },
    {
      id: 5, type: 'multiple_choice', wordDisplay: 'airplane',
      instruction: '¿Cuál es el medio de transporte mostrado?:',
      image: 'assets/leccion_airplane.jpg', imageAlt: 'Avión de pasajeros',
      options: [{text:'avión',isCorrect:true}, {text:'tren',isCorrect:false}, {text:'barco',isCorrect:false}],
      explanation: '¡Maravilloso! "Airplane" es avión.', phraseSample: 'The airplane departs at noon.'
    },
    {
      id: 6, type: 'unscramble', wordDisplay: 'Frase desordenada',
      instruction: 'Ordena las palabras para formar la frase: "El perro corre rápido"',
      words: ['fast', 'The', 'runs', 'dog'], correctOrder: ['The', 'dog', 'runs', 'fast'],
      explanation: '¡Excelente! Estructura básica completada.', phraseSample: 'The dog runs fast.'
    },
    {
      id: 7, type: 'image_grid', wordDisplay: 'dog',
      instruction: 'Selecciona la imagen correspondiente a:',
      options: [
        {image:'assets/leccion_dog.jpg', text:'dog', isCorrect:true},
        {image:'assets/leccion_book.jpg', text:'book', isCorrect:false},
        {image:'assets/apple_vector.png', text:'apple', isCorrect:false},
        {image:'assets/leccion_coffee.jpg', text:'coffee', isCorrect:false}
      ],
      explanation: '¡Muy bien! "Dog" es perro.', phraseSample: 'My dog is very playful.'
    },
    {
      id: 8, type: 'match_pairs', wordDisplay: 'Pares',
      instruction: 'Encuentra los opuestos:',
      pairs: [{en:'hot', es:'frío'}, {en:'big', es:'pequeño'}, {en:'fast', es:'lento'}], 
      // Wait, pairs should match meaning for consistency, not opposites unless we change instructions.
      // Let's do normal pairs.
      pairs: [{en:'apple', es:'manzana'}, {en:'book', es:'libro'}, {en:'coffee', es:'café'}, {en:'airplane', es:'avión'}],
      explanation: '¡Increíble memoria! Completaste todos los pares.', phraseSample: 'I drink coffee while reading a book.'
    }
  ];

  function initLesson() {
    // Escoger 5 ejercicios aleatorios
    const shuffled = [...POOL_EXERCISES].sort(() => Math.random() - 0.5);
    LESSON_EXERCISES = shuffled.slice(0, 5);
    
    loadUserDataFromStorage();
    renderCurrentExercise();
    setupGlobalEvents();
  }

  // Banco de 5 ejercicios variados con ilustraciones y vocabulario contextual
  

  // Estado reactivo de la lección
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
  
  let unscrambleSelected = [];
  let matchedPairs = [];
  let currentPairSelection = { en: null, es: null };

  function renderCurrentExercise() {
    const ex = LESSON_EXERCISES[currentExerciseIndex];
    selectedOptionIndex = -1;
    hasEvaluated = false;
    unscrambleSelected = [];
    matchedPairs = [];
    currentPairSelection = { en: null, es: null };

    const total = LESSON_EXERCISES.length;
    const currentNum = currentExerciseIndex + 1;
    const pct = (currentNum / total) * 100;

    const progressFill = document.getElementById('lesson-progress-fill');
    const progressCount = document.getElementById('lesson-progress-count');
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressCount) progressCount.textContent = `${currentNum}/${total}`;

    const instructionEl = document.getElementById('lesson-instruction-text');
    if (instructionEl) instructionEl.textContent = ex.instruction;

    const container = document.getElementById('dynamic-exercise-container');
    if (!container) return;
    container.innerHTML = '';

    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.disabled = true;
      btnResponder.querySelector('span').textContent = 'Responder';
      btnResponder.classList.remove('btn-success', 'btn-danger');
      btnResponder.classList.add('btn-primary-custom');
    }
    
    document.getElementById('lesson-feedback-sheet')?.classList.add('d-none');

    const wordHeader = document.createElement('div');
    wordHeader.className = 'lesson-word-text anim-cascade stagger-5 mb-4';
    wordHeader.innerHTML = `<span>${ex.wordDisplay}</span>`;
    if (ex.wordDisplay !== 'Frase desordenada' && ex.wordDisplay !== 'Pares') {
      wordHeader.innerHTML += `<button type="button" class="btn-speaker-mini ms-2" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${ex.wordDisplay}'))"><i class="bi bi-volume-up-fill"></i></button>`;
    }
    container.appendChild(wordHeader);

    if (ex.type === 'multiple_choice') {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'lesson-halo-card mb-4 mx-auto';
      imgContainer.innerHTML = `<img src="${ex.image}" alt="${ex.imageAlt}" class="lesson-drawing-img">`;
      container.appendChild(imgContainer);

      const grid = document.createElement('div');
      grid.className = 'lesson-options-grid';
      ex.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'card-option-choice lesson-option-button flex-column p-3';
        btn.innerHTML = `<span class="fw-bold">${opt.text}</span>`;
        btn.onclick = () => selectOption(idx, grid);
        grid.appendChild(btn);
      });
      container.appendChild(grid);
    } 
    else if (ex.type === 'image_grid') {
      const grid = document.createElement('div');
      grid.className = 'row g-3 justify-content-center';
      ex.options.forEach((opt, idx) => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-5';
        const btn = document.createElement('button');
        btn.className = 'card-option-choice lesson-option-button w-100 p-2 d-flex flex-column align-items-center h-100';
        btn.innerHTML = `<img src="${opt.image}" class="img-fluid rounded mb-2" style="max-height:100px; object-fit:cover;"><span>${opt.text}</span>`;
        btn.onclick = () => selectOption(idx, grid);
        col.appendChild(btn);
        grid.appendChild(col);
      });
      container.appendChild(grid);
    }
    else if (ex.type === 'unscramble') {
      const dropZone = document.createElement('div');
      dropZone.className = 'p-3 mb-4 rounded border dashed-border d-flex flex-wrap gap-2 align-items-center justify-content-center bg-light';
      dropZone.style.minHeight = '60px';
      dropZone.id = 'unscramble-dropzone';
      
      const wordBank = document.createElement('div');
      wordBank.className = 'd-flex flex-wrap gap-2 justify-content-center';
      wordBank.id = 'unscramble-wordbank';

      const shuffled = [...ex.words].sort(() => Math.random() - 0.5);
      shuffled.forEach(w => {
        const chip = document.createElement('button');
        chip.className = 'btn btn-outline-primary rounded-pill fw-bold';
        chip.textContent = w;
        chip.onclick = function() {
          if (this.parentElement.id === 'unscramble-wordbank') {
            dropZone.appendChild(this);
            unscrambleSelected.push(w);
          } else {
            wordBank.appendChild(this);
            unscrambleSelected = unscrambleSelected.filter(val => val !== w);
          }
          if (btnResponder) btnResponder.disabled = unscrambleSelected.length !== ex.words.length;
        };
        wordBank.appendChild(chip);
      });

      container.appendChild(dropZone);
      container.appendChild(wordBank);
    }
    else if (ex.type === 'match_pairs') {
      const grid = document.createElement('div');
      grid.className = 'row g-4';
      
      const colEn = document.createElement('div');
      colEn.className = 'col-6 d-flex flex-column gap-2';
      const colEs = document.createElement('div');
      colEs.className = 'col-6 d-flex flex-column gap-2';

      const enWords = [...ex.pairs].sort(() => Math.random() - 0.5);
      const esWords = [...ex.pairs].sort(() => Math.random() - 0.5);

      enWords.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary py-3 fw-bold';
        btn.textContent = p.en;
        btn.onclick = function() {
          if (matchedPairs.includes(p.en)) return;
          Array.from(colEn.children).forEach(c => c.classList.remove('active', 'btn-primary'));
          this.classList.add('active', 'btn-primary');
          currentPairSelection.en = p.en;
          checkMatchPair(grid);
        };
        colEn.appendChild(btn);
      });

      esWords.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-secondary py-3 fw-bold';
        btn.textContent = p.es;
        btn.onclick = function() {
          if (matchedPairs.includes(p.es)) return;
          Array.from(colEs.children).forEach(c => c.classList.remove('active', 'btn-secondary'));
          this.classList.add('active', 'btn-secondary');
          currentPairSelection.es = p.es;
          checkMatchPair(grid);
        };
        colEs.appendChild(btn);
      });

      grid.appendChild(colEn);
      grid.appendChild(colEs);
      container.appendChild(grid);
    }
  }

  function checkMatchPair(grid) {
    if (currentPairSelection.en && currentPairSelection.es) {
      const ex = LESSON_EXERCISES[currentExerciseIndex];
      const correctPair = ex.pairs.find(p => p.en === currentPairSelection.en);
      
      if (correctPair && correctPair.es === currentPairSelection.es) {
        matchedPairs.push(currentPairSelection.en);
        matchedPairs.push(currentPairSelection.es);
        
        const activeBtns = grid.querySelectorAll('.active');
        activeBtns.forEach(b => {
          b.classList.remove('active', 'btn-primary', 'btn-secondary');
          b.classList.add('btn-success', 'disabled');
          b.disabled = true;
        });
        
        if (matchedPairs.length === ex.pairs.length * 2) {
          const btnResponder = document.getElementById('btn-lesson-responder');
          if (btnResponder) btnResponder.disabled = false;
        }
      } else {
        const activeBtns = grid.querySelectorAll('.active');
        activeBtns.forEach(b => {
          b.classList.remove('active', 'btn-primary', 'btn-secondary');
          b.classList.add('btn-danger');
          setTimeout(() => {
            b.classList.remove('btn-danger');
          }, 500);
        });
      }
      currentPairSelection = { en: null, es: null };
    }
  }

  function selectOption(idx, grid) {
    if (hasEvaluated) return;
    selectedOptionIndex = idx;
    Array.from(grid.querySelectorAll('button')).forEach(b => b.classList.remove('selected', 'border-primary'));
    grid.children[idx].classList.add('selected', 'border-primary');
    
    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) btnResponder.disabled = false;
  }

  function evaluateAnswer() {
    if (hasEvaluated) return;

    const ex = LESSON_EXERCISES[currentExerciseIndex];
    let isCorrect = false;

    if (ex.type === 'multiple_choice' || ex.type === 'image_grid') {
      isCorrect = ex.options[selectedOptionIndex].isCorrect;
      const grid = document.querySelector('.lesson-options-grid') || document.querySelector('.row.g-3');
      const buttons = grid.querySelectorAll('button.lesson-option-button');
      
      if (isCorrect) {
        buttons[selectedOptionIndex].classList.add('bg-success-subtle', 'border-success', 'border-2');
      } else {
        buttons[selectedOptionIndex].classList.add('bg-danger-subtle', 'border-danger', 'border-2');
        const correctIdx = ex.options.findIndex(o => o.isCorrect);
        buttons[correctIdx].classList.add('bg-success-subtle', 'border-success', 'border-2');
      }
    } 
    else if (ex.type === 'unscramble') {
      isCorrect = unscrambleSelected.join(' ') === ex.correctOrder.join(' ');
      const dropzone = document.getElementById('unscramble-dropzone');
      if (isCorrect) dropzone.classList.add('border-success', 'bg-success-subtle');
      else dropzone.classList.add('border-danger', 'bg-danger-subtle');
    }
    else if (ex.type === 'match_pairs') {
      isCorrect = true;
    }

    hasEvaluated = true;

    const feedbackSheet = document.getElementById('lesson-feedback-sheet');
    const feedbackTitle = document.getElementById('lesson-feedback-title');
    const feedbackText = document.getElementById('lesson-feedback-text');
    const feedbackIcon = document.getElementById('lesson-feedback-icon');
    
    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.querySelector('span').textContent = 'Continuar';
      btnResponder.classList.remove('btn-primary-custom');
      btnResponder.classList.add(isCorrect ? 'btn-success' : 'btn-danger');
    }

    if (isCorrect) {
      playSound('correct');
      correctCount++;
      earnedXpTotal += 15;

      if (feedbackSheet) {
        feedbackSheet.className = 'lesson-feedback-sheet correct p-4 mb-4';
        feedbackSheet.classList.remove('d-none');
      }
      if (feedbackTitle) {
        feedbackTitle.className = 'h5 mb-1 text-success';
        feedbackTitle.textContent = '¡Correcto!';
      }
      if (feedbackIcon) feedbackIcon.innerHTML = '<div class="lesson-feedback-icon-circle bg-success-subtle text-success"><i class="bi bi-check-lg"></i></div>';
    } else {
      playSound('error');
      lives--;
      updateTopStats();

      if (feedbackSheet) {
        feedbackSheet.className = 'lesson-feedback-sheet incorrect p-4 mb-4';
        feedbackSheet.classList.remove('d-none');
      }
      if (feedbackTitle) {
        feedbackTitle.className = 'h5 mb-1 text-danger';
        feedbackTitle.textContent = 'Incorrecto';
      }
      if (feedbackIcon) feedbackIcon.innerHTML = '<div class="lesson-feedback-icon-circle bg-danger-subtle text-danger"><i class="bi bi-x-lg"></i></div>';
    }
    
    if (feedbackText) {
      feedbackText.innerHTML = `<strong>${ex.explanation}</strong><br><span class="text-muted mt-1 d-block">${ex.phraseSample}</span>`;
    }
  }

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
