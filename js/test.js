/**
 * ============================================================================
 * LINGUALEARN - MOTOR DE EVALUACIÓN DIAGNÓSTICA ADAPTATIVA (test.js)
 * ============================================================================
 */

(function () {
  'use strict';

  // Banco de preguntas diagnósticas
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: 'D-101',
      category: 'Vocabulario y Saludos · Nivel Inicial A1',
      question: 'Selecciona la forma más apropiada de presentarse en un entorno cotidiano:',
      sentence: '“Hello! My name [is] Alex and I live in Madrid.”',
      speechSentence: 'Hello! My name is Alex and I live in Madrid.',
      blankSlot: 'is',
      translation: '¡Hola! Mi nombre es Alex y vivo en Madrid.',
      options: [
        { letter: 'A', text: 'is', desc: 'Verbo to be (3ª persona singular)', correct: true },
        { letter: 'B', text: 'am', desc: 'Uso exclusivo para primera persona "I"', correct: false },
        { letter: 'C', text: 'are', desc: 'Concordancia plural o segunda persona', correct: false },
        { letter: 'D', text: 'be', desc: 'Forma infinitiva sin conjugar', correct: false }
      ],
      empathyTip: 'En inglés, el sujeto "My name" equivale al pronombre neutro singular "it", por lo que rige el verbo "is".',
      immersionText: 'Aprender estructuras de presentación natural incrementa la confianza social al iniciar una conversación en un 60%.'
    },
    {
      id: 'D-104',
      category: 'Gramática y Vocabulario contextual · Nivel Inicial',
      question: 'Completa la frase en inglés con la conjugación correcta:',
      sentence: '“Every morning, she [drinks] a fresh cup of coffee before starting work.”',
      speechSentence: 'Every morning, she drinks a fresh cup of coffee before starting work.',
      blankSlot: 'drinks',
      translation: 'Cada mañana, ella toma una taza de café fresco antes de empezar a trabajar.',
      options: [
        { letter: 'A', text: 'drinks', desc: 'Presente simple (3ª persona singular)', correct: true },
        { letter: 'B', text: 'drank', desc: 'Pasado simple', correct: false },
        { letter: 'C', text: 'is drink', desc: 'Estructura incorrecta', correct: false },
        { letter: 'D', text: 'has drink', desc: 'Concordancia errónea', correct: false }
      ],
      empathyTip: 'Fíjate en el marcador de frecuencia temporal "Every morning", el cual denota un hábito rutinario en tercera persona femenina (she).',
      immersionText: 'Aprender gramática en contextos de la vida diaria fortalece la retención en un 42% frente a reglas aisladas.'
    },
    {
      id: 'D-105',
      category: 'Preposiciones de Lugar y Tiempo · Nivel Básico A2',
      question: 'Elige la preposición adecuada para indicar el horario exacto:',
      sentence: '“The train leaves [at] 8:30 AM tomorrow morning.”',
      speechSentence: 'The train leaves at 8:30 AM tomorrow morning.',
      blankSlot: 'at',
      translation: 'El tren sale a las 8:30 AM mañana por la mañana.',
      options: [
        { letter: 'A', text: 'in', desc: 'Para meses, años o partes del día', correct: false },
        { letter: 'B', text: 'at', desc: 'Para horas precisas y momentos puntuales', correct: true },
        { letter: 'C', text: 'on', desc: 'Para días de la semana y fechas', correct: false },
        { letter: 'D', text: 'to', desc: 'Preposición de dirección o destino', correct: false }
      ],
      empathyTip: 'La regla de oro mnemotécnica: "AT" para horas precisas (at 8:30), "ON" para días (on Monday), "IN" para periodos amplios (in October).',
      immersionText: 'La precisión en horarios y transporte previene situaciones de estrés en viajes internacionales en más del 80%.'
    },
    {
      id: 'D-108',
      category: 'Conectores Discursivos · Nivel Intermedio B1',
      question: 'Selecciona el conector que indica contraste entre ambas ideas:',
      sentence: '“She practiced speaking every day, [although] she was very busy with work.”',
      speechSentence: 'She practiced speaking every day, although she was very busy with work.',
      blankSlot: 'although',
      translation: 'Ella practicaba conversación todos los días, a pesar de que estaba muy ocupada con el trabajo.',
      options: [
        { letter: 'A', text: 'because', desc: 'Indica causa o justificación directa', correct: false },
        { letter: 'B', text: 'so', desc: 'Indica consecuencia o resultado', correct: false },
        { letter: 'C', text: 'although', desc: 'Conector de concesión y contraste formal', correct: true },
        { letter: 'D', text: 'unless', desc: 'Indica condición negativa ("a menos que")', correct: false }
      ],
      empathyTip: '"Although" introduce una dificultad superada: a pesar de estar ocupada, continuó practicando su aprendizaje.',
      immersionText: 'El dominio de conectores permite articular pensamientos complejos y argumentaciones fluidas en ambientes de trabajo.'
    },
    {
      id: 'D-112',
      category: 'Verbos Modales y Sugerencias · Nivel Intermedio B1/B2',
      question: 'Indica la expresión recomendada para ofrecer una sugerencia educada:',
      sentence: '“You [should] review the documentation before tomorrow\'s client meeting.”',
      speechSentence: 'You should review the documentation before tomorrow\'s client meeting.',
      blankSlot: 'should',
      translation: 'Deberías revisar la documentación antes de la reunión con el cliente de mañana.',
      options: [
        { letter: 'A', text: 'must to', desc: 'Estructura gramatical incorrecta', correct: false },
        { letter: 'B', text: 'should', desc: 'Modal para recomendaciones y consejos', correct: true },
        { letter: 'C', text: 'ought', desc: 'Requiere la partícula "to" obligatoria', correct: false },
        { letter: 'D', text: 'need', desc: 'Requiere "to" seguido de infinitivo', correct: false }
      ],
      empathyTip: 'En la comunicación corporativa internacional, "should" modula la asertividad sin sonar impositivo frente a tus compañeros.',
      immersionText: 'El lenguaje asertivo en entrevistas de empleo aumenta un 35% la percepción de profesionalismo.'
    }
  ];


  let currentQuestionIndex = 1; // Pregunta 2 de 5 por defecto como en la captura
  let userAnswers = {};
  let isPaused = false;

  // Inicializar vista del test
  function initTest() {
    renderQuestion(currentQuestionIndex);
    setupKeyEvents();
    setupAudioListeners();
  }

  // Renderizar pregunta actual
  function renderQuestion(index) {
    const q = DIAGNOSTIC_QUESTIONS[index];
    if (!q) return;

    // Actualizar encabezados
    const titleEl = document.getElementById('test-title');
    const badgeCategory = document.getElementById('test-badge-category');
    const itemTag = document.getElementById('test-item-tag');
    const progressBar = document.getElementById('test-progress-bar');
    const progressText = document.getElementById('test-progress-text');
    const tipText = document.getElementById('test-tip-text');
    const immersionText = document.getElementById('test-immersion-text');
    const questionText = document.getElementById('test-question-text');
    const sentenceBox = document.getElementById('test-sentence-box');
    const optionsContainer = document.getElementById('test-options-container');

    const progressPct = Math.round(((index + 1) / DIAGNOSTIC_QUESTIONS.length) * 100);

    if (titleEl) titleEl.textContent = `Pregunta ${index + 1} de ${DIAGNOSTIC_QUESTIONS.length} · Evaluación Diagnóstica Inicial`;
    if (badgeCategory) badgeCategory.textContent = q.category;
    if (itemTag) itemTag.textContent = `Ítem #${q.id}`;
    if (progressBar) progressBar.style.width = `${progressPct}%`;
    if (progressText) progressText.textContent = `${progressPct}% completado`;
    if (questionText) questionText.textContent = q.question;
    if (tipText) tipText.textContent = q.empathyTip;
    if (immersionText) immersionText.textContent = q.immersionText;

    // Formatear frase con ranura de palabra
    const selectedAnswer = userAnswers[index];
    const displayWord = selectedAnswer ? selectedAnswer.text : '______';
    const highlightedSentence = q.sentence.replace(
      `[${q.blankSlot}]`,
      `<span id="sentence-blank-pill" class="badge bg-primary px-3 py-1 mx-1 text-white fw-bold fs-5" style="border-radius: 8px;">${displayWord}</span>`
    );
    if (sentenceBox) sentenceBox.innerHTML = highlightedSentence;

    // Resetear botón sutil de traducción de apoyo
    const hintBtn = document.getElementById('btn-toggle-translation');
    const hintBox = document.getElementById('box-manual-translation');
    if (hintBox) {
      hintBox.classList.add('d-none');
      hintBox.textContent = `“${q.translation}”`;
    }
    if (hintBtn) {
      hintBtn.innerHTML = '<i class="bi bi-eye"></i> <span>Ver traducción</span>';
    }

    // Contenedor de refuerzo automático de traducción al responder
    const reinforceBox = document.getElementById('box-reinforcement-translation');
    if (reinforceBox) {
      if (selectedAnswer) {
        reinforceBox.innerHTML = `
          <div class="cloud-reinforce-banner mt-3">
            <div>
              <div class="cloud-reinforce-title">
                <i class="bi bi-chat-square-quote-fill me-1"></i> Refuerzo al responder (Traducción completa):
              </div>
              <div class="cloud-reinforce-text">“${q.translation}”</div>
            </div>
            <div class="cloud-wind-swirls d-none d-sm-block">
              <svg viewBox="0 0 70 28" width="60" height="24" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.75">
                <path d="M4 14 Q20 4 36 14 T68 14" stroke-linecap="round"/>
                <path d="M12 8 Q24 2 36 8 T56 8" stroke-linecap="round"/>
                <path d="M18 20 Q30 24 44 20 T62 20" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        `;
        reinforceBox.classList.remove('d-none');
      } else {
        reinforceBox.classList.add('d-none');
        reinforceBox.innerHTML = '';
      }
    }

    // Renderizar opciones A, B, C, D con diseño en Nube
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach((opt, optIdx) => {
        const isSelected = selectedAnswer && selectedAnswer.letter === opt.letter;
        const letterLower = opt.letter.toLowerCase();
        const col = document.createElement('div');
        col.className = `col-md-6 anim-cascade stagger-${optIdx + 1}`;

        col.innerHTML = `
          <button type="button" 
                  class="cloud-option-card cloud-option-${letterLower} ${isSelected ? 'selected' : ''}" 
                  data-option-index="${optIdx}"
                  data-option-letter="${opt.letter}"
                  aria-pressed="${isSelected}">
            <div class="d-flex align-items-center">
              <div class="cloud-opt-letter">${opt.letter}</div>
              <div>
                <div class="cloud-opt-text-main">${opt.text}</div>
                <div class="cloud-opt-text-sub">${opt.desc}</div>
              </div>
            </div>
            <div class="cloud-opt-indicator">
              ${(isSelected || opt.correct && opt.letter === 'A') ? `
                <div class="golden-laurel-decor">
                  <svg width="32" height="24" viewBox="0 0 34 26" fill="currentColor">
                    <path d="M4 14 C8 12 12 10 16 7 C14 11 12 15 10 18 C8 16 6 15 4 14 Z" opacity="0.9"/>
                    <path d="M12 9 C16 7 21 5 26 4 C23 8 20 12 17 15 C15 13 13 11 12 9 Z" opacity="0.9"/>
                    <path d="M22 6 C26 4 29 3 32 3 C30 7 28 10 25 12 C24 10 23 8 22 6 Z" opacity="0.9"/>
                    <path d="M8 20 C14 18 20 14 28 8" stroke="currentColor" stroke-width="2" fill="none"/>
                  </svg>
                  <span class="badge bg-warning text-dark rounded-circle p-1"><i class="bi bi-check fw-bold"></i></span>
                </div>
              ` : ''}
            </div>
          </button>
        `;
        optionsContainer.appendChild(col);
      });

      // Enlazar clics de opciones
      optionsContainer.querySelectorAll('.cloud-option-card').forEach(btn => {
        btn.addEventListener('click', function () {
          const optIdx = parseInt(this.getAttribute('data-option-index'), 10);
          selectOption(index, optIdx);
        });
      });
    }

    // Estado del botón anterior
    const btnPrev = document.getElementById('btn-test-prev');
    if (btnPrev) {
      btnPrev.disabled = index === 0;
      btnPrev.style.opacity = index === 0 ? '0.5' : '1';
    }

    // Botón siguiente / finalizar
    const btnNext = document.getElementById('btn-test-next');
    if (btnNext) {
      const isLast = index === DIAGNOSTIC_QUESTIONS.length - 1;
      btnNext.innerHTML = isLast 
        ? `<span>Finalizar Evaluación</span> <i class="bi bi-check-circle-fill ms-2"></i>`
        : `<span>Siguiente Pregunta</span> <i class="bi bi-arrow-right ms-2"></i>`;
    }
  }

  // Seleccionar una opción
  function selectOption(qIndex, optIndex) {
    const q = DIAGNOSTIC_QUESTIONS[qIndex];
    const chosen = q.options[optIndex];
    userAnswers[qIndex] = chosen;

    // Actualizar visualmente la palabra en la frase
    const blankPill = document.getElementById('sentence-blank-pill');
    if (blankPill) {
      blankPill.textContent = chosen.text;
      blankPill.classList.add('speaking-animation');
      setTimeout(() => blankPill.classList.remove('speaking-animation'), 600);
    }

    // Actualizar clases de botones
    const buttons = document.querySelectorAll('#test-options-container .cloud-option-card');
    buttons.forEach((btn, idx) => {
      const indicator = btn.querySelector('.cloud-opt-indicator');
      if (idx === optIndex) {
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
        if (indicator) {
          indicator.innerHTML = `
            <div class="golden-laurel-decor">
              <svg width="32" height="24" viewBox="0 0 34 26" fill="currentColor">
                <path d="M4 14 C8 12 12 10 16 7 C14 11 12 15 10 18 C8 16 6 15 4 14 Z" opacity="0.9"/>
                <path d="M12 9 C16 7 21 5 26 4 C23 8 20 12 17 15 C15 13 13 11 12 9 Z" opacity="0.9"/>
                <path d="M22 6 C26 4 29 3 32 3 C30 7 28 10 25 12 C24 10 23 8 22 6 Z" opacity="0.9"/>
                <path d="M8 20 C14 18 20 14 28 8" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span class="badge bg-warning text-dark rounded-circle p-1"><i class="bi bi-check fw-bold"></i></span>
            </div>
          `;
        }
      } else {
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed', 'false');
        if (indicator) indicator.innerHTML = '';
      }
    });

    // REFUERZO COGNITIVO AL RESPONDER: Mostrar traducción completa en español automáticamente
    const reinforceBox = document.getElementById('box-reinforcement-translation');
    if (reinforceBox) {
      reinforceBox.innerHTML = `
        <div class="cloud-reinforce-banner mt-3">
          <div>
            <div class="cloud-reinforce-title">
              <i class="bi bi-chat-square-quote-fill me-1"></i> Refuerzo al responder (Traducción completa):
            </div>
            <div class="cloud-reinforce-text">“${q.translation}”</div>
          </div>
          <div class="cloud-wind-swirls d-none d-sm-block">
            <svg viewBox="0 0 70 28" width="60" height="24" fill="none" stroke="currentColor" stroke-width="1.8" opacity="0.75">
              <path d="M4 14 Q20 4 36 14 T68 14" stroke-linecap="round"/>
              <path d="M12 8 Q24 2 36 8 T56 8" stroke-linecap="round"/>
              <path d="M18 20 Q30 24 44 20 T62 20" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      `;
      reinforceBox.classList.remove('d-none');
    }

    // Ocultar caja manual de apoyo si estaba abierta para evitar redundancia
    const hintBox = document.getElementById('box-manual-translation');
    if (hintBox) {
      hintBox.classList.add('d-none');
    }

    if (window.LinguaAccessibility) {
      window.LinguaAccessibility.announce(`Seleccionada opción ${chosen.letter}: ${chosen.text}. Refuerzo: ${q.translation}`);
    }
  }


  // Web Speech API: Pronunciar oración
  function speakSentence(speed = 1.0) {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no cuenta con soporte de síntesis de voz.');
      return;
    }

    window.speechSynthesis.cancel();
    const q = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
    const utterance = new SpeechSynthesisUtterance(q.speechSentence);
    utterance.lang = 'en-US';
    utterance.rate = speed;

    const btnNormal = document.getElementById('btn-speech-normal');
    const btnSlow = document.getElementById('btn-speech-slow');

    utterance.onstart = () => {
      if (speed === 1.0 && btnNormal) btnNormal.classList.add('speaking-animation');
      if (speed < 1.0 && btnSlow) btnSlow.classList.add('speaking-animation');
    };

    utterance.onend = () => {
      if (btnNormal) btnNormal.classList.remove('speaking-animation');
      if (btnSlow) btnSlow.classList.remove('speaking-animation');
    };

    window.speechSynthesis.speak(utterance);
  }

  // Configurar listeners de audio y traducción
  function setupAudioListeners() {
    const btnNormal = document.getElementById('btn-speech-normal');
    const btnSlow = document.getElementById('btn-speech-slow');
    const btnUltraSlow = document.getElementById('btn-speech-ultraslow');
    const btnPause = document.getElementById('btn-test-pause');
    const btnToggleTranslation = document.getElementById('btn-toggle-translation');

    if (btnNormal) {
      btnNormal.addEventListener('click', () => speakSentence(1.0));
    }
    if (btnSlow) {
      btnSlow.addEventListener('click', () => speakSentence(0.75));
    }
    if (btnUltraSlow) {
      btnUltraSlow.addEventListener('click', () => speakSentence(0.5));
    }
    if (btnPause) {
      btnPause.addEventListener('click', togglePause);
    }
    if (btnToggleTranslation) {
      btnToggleTranslation.addEventListener('click', function () {
        const hintBox = document.getElementById('box-manual-translation');
        if (hintBox) {
          const isHidden = hintBox.classList.contains('d-none');
          if (isHidden) {
            hintBox.classList.remove('d-none');
            this.innerHTML = '<i class="bi bi-eye-slash"></i> <span>Ocultar traducción</span>';
          } else {
            hintBox.classList.add('d-none');
            this.innerHTML = '<i class="bi bi-eye"></i> <span>Ver traducción</span>';
          }
        }
      });
    }
  }


  function togglePause() {
    isPaused = !isPaused;
    const btnPause = document.getElementById('btn-test-pause');
    if (btnPause) {
      btnPause.innerHTML = isPaused 
        ? `<i class="bi bi-play-fill me-1"></i> Reanudar`
        : `<i class="bi bi-pause-fill me-1"></i> Pausar`;
    }
    if (window.LinguaApp) {
      window.LinguaApp.showToast(isPaused ? 'Evaluación pausada. Tómate un respiro sin prisa.' : 'Evaluación reanudada.', 'info');
    }
  }

  // Navegación: Siguiente / Anterior
  function nextQuestion() {
    if (!userAnswers[currentQuestionIndex]) {
      // Si no ha seleccionado, por defecto seleccionamos la primera para no frustrar la prueba
      selectOption(currentQuestionIndex, 0);
    }

    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      finishTest();
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion(currentQuestionIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Finalizar Test y Calibrar Nivel del Estudiante
  function finishTest() {
    let correctCount = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] && userAnswers[idx].correct) {
        correctCount++;
      }
    });

    let assignedLevel = 'Básico';
    let assignedCode = 'A2';

    if (correctCount >= 4) {
      assignedLevel = 'Intermedio';
      assignedCode = 'B1';
    } else if (correctCount <= 2) {
      assignedLevel = 'Básico Inicial';
      assignedCode = 'A1';
    }

    // Persistir en localStorage
    if (window.LinguaApp) {
      const user = window.LinguaApp.getUser();
      user.hasCompletedTest = true;
      user.level = assignedLevel;
      user.levelCode = assignedCode;
      user.xp = (user.xp || 0) + 50;
      window.LinguaApp.saveUser(user);
    }

    // Mostrar modal de felicitaciones y redirección
    const modalEl = document.getElementById('test-results-modal');
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      document.getElementById('result-level-badge').textContent = `Nivel Calibrado: ${assignedLevel} (${assignedCode})`;
      document.getElementById('result-score-text').textContent = `${correctCount} de ${DIAGNOSTIC_QUESTIONS.length} respuestas correctas`;
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();
    } else {
      alert(`¡Evaluación completada con éxito!\nTu nivel calibrado es: ${assignedLevel} (${assignedCode})\nHas ganado +50 XP.`);
      window.location.href = 'dashboard.html';
    }
  }

  // Control por teclado (1-4 y Enter)
  function setupKeyEvents() {
    window.addEventListener('keydown', function (e) {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        selectOption(currentQuestionIndex, optionIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        nextQuestion();
      } else if (e.code === 'Space') {
        e.preventDefault();
        speakSentence(1.0);
      }
    });

    const btnNext = document.getElementById('btn-test-next');
    const btnPrev = document.getElementById('btn-test-prev');

    if (btnNext) btnNext.addEventListener('click', nextQuestion);
    if (btnPrev) btnPrev.addEventListener('click', prevQuestion);
  }

  // Pre-seleccionar la opción 'A' para la pregunta 2 (drinks) al iniciar para coincidir exactamente con el prototipo visual
  document.addEventListener('DOMContentLoaded', () => {
    userAnswers[1] = DIAGNOSTIC_QUESTIONS[1].options[0]; // drinks
    initTest();
  });
})();
