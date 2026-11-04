/**
 * ============================================================================
 * LINGUALEARN - MOTOR DE EVALUACIÓN DIAGNÓSTICA ADAPTATIVA (test.js)
 * ============================================================================
 */

(function () {
  'use strict';

  // Banco de preguntas diagnósticas renovado (Inicia siempre en Pregunta 1)
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: 'D-201',
      category: 'Saludos e Identidad · Nivel Inicial (A1)',
      question: 'Selecciona la opción correcta para completar la pregunta de presentación:',
      sentence: '“Nice to meet you! Where [are] you from?”',
      speechSentence: 'Nice to meet you! Where are you from?',
      blankSlot: 'are',
      translation: '¡Mucho gusto en conocerte! ¿De dónde eres?',
      options: [
        { letter: 'A', text: 'is', desc: 'Concordancia para tercera persona singular', correct: false },
        { letter: 'B', text: 'am', desc: 'Uso exclusivo para primera persona "I"', correct: false },
        { letter: 'C', text: 'are', desc: 'Forma correcta del verbo to be para el pronombre "you"', correct: true },
        { letter: 'D', text: 'be', desc: 'Forma infinitiva sin conjugar', correct: false }
      ],
      empathyTip: 'En las preguntas con "you", el verbo "to be" siempre se conjuga como "are". Esta estructura es fundamental para entablar tus primeras amistades.',
      immersionText: 'Las preguntas de origen e identidad son el punto de partida del 85% de las conversaciones cotidianas e interculturales.'
    },
    {
      id: 'D-202',
      category: 'Presente Continuo y Clima · Nivel A1 / A2',
      question: 'Elige la forma verbal que describe una acción que ocurre en este mismo momento:',
      sentence: '“Look at the sky! It [is raining], so take your raincoat.”',
      speechSentence: 'Look at the sky! It is raining, so take your raincoat.',
      blankSlot: 'is raining',
      translation: '¡Mira el cielo! Está lloviendo, así que lleva tu impermeable.',
      options: [
        { letter: 'A', text: 'is raining', desc: 'Presente continuo para acción en desarrollo ahora mismo', correct: true },
        { letter: 'B', text: 'rains', desc: 'Presente simple para hábitos o hechos permanentes', correct: false },
        { letter: 'C', text: 'rained', desc: 'Tiempo pasado simple', correct: false },
        { letter: 'D', text: 'will rain', desc: 'Tiempo futuro simple', correct: false }
      ],
      empathyTip: 'El llamado de atención "Look!" señala un acontecimiento que está ocurriendo justo frente a tus ojos en el presente continuo.',
      immersionText: 'Reconocer acciones en progreso te ayuda a describir tu entorno con naturalidad y precisión inmediata.'
    },
    {
      id: 'D-203',
      category: 'Preposiciones de Tiempo y Hábitos · Nivel A2',
      question: 'Selecciona la preposición adecuada para los días de la semana y citas habituales:',
      sentence: '“We usually meet our study group [on] Friday afternoons.”',
      speechSentence: 'We usually meet our study group on Friday afternoons.',
      blankSlot: 'on',
      translation: 'Usualmente nos reunimos con nuestro grupo de estudio los viernes por la tarde.',
      options: [
        { letter: 'A', text: 'in', desc: 'Usado para meses, años o estaciones', correct: false },
        { letter: 'B', text: 'at', desc: 'Usado para horas específicas y festividades breves', correct: false },
        { letter: 'C', text: 'on', desc: 'Preposición adecuada para días específicos de la semana', correct: true },
        { letter: 'D', text: 'for', desc: 'Preposición para periodos de duración', correct: false }
      ],
      empathyTip: 'Regla de oro nemotécnica: Usa "ON" para días y fechas (on Friday, on my birthday), "AT" para horas (at 5:00) e "IN" para periodos amplios (in summer).',
      immersionText: 'Coordinar horarios y reuniones en inglés con preposiciones correctas aporta fluidez y profesionalismo a tu comunicación.'
    },
    {
      id: 'D-204',
      category: 'Experiencias Pasadas y Verbos Irregulares · Nivel A2 / B1',
      question: 'Completa la oración con la forma en pasado del verbo irregular:',
      sentence: '“Last summer, we [bought] train tickets to explore the countryside.”',
      speechSentence: 'Last summer, we bought train tickets to explore the countryside.',
      blankSlot: 'bought',
      translation: 'El verano pasado compramos billetes de tren para explorar el campo.',
      options: [
        { letter: 'A', text: 'buy', desc: 'Forma en presente simple', correct: false },
        { letter: 'B', text: 'buyed', desc: 'Forma regular inexistente (verbo irregular)', correct: false },
        { letter: 'C', text: 'buying', desc: 'Gerundio sin verbo auxiliar', correct: false },
        { letter: 'D', text: 'bought', desc: 'Pasado simple correcto del verbo irregular "buy"', correct: true }
      ],
      empathyTip: 'El marcador temporal "Last summer" sitúa el evento en el pasado. El verbo "buy" es irregular y su pasado es "bought".',
      immersionText: 'Compartir vivencias y anécdotas de viajes utilizando verbos en pasado enriquece enormemente tus intercambios culturales.'
    },
    {
      id: 'D-205',
      category: 'Recomendaciones y Verbos Modales · Nivel B1',
      question: 'Elige el verbo modal más adecuado para brindar una recomendación constructiva:',
      sentence: '“To speak more naturally, you [should] practice fifteen minutes every day.”',
      speechSentence: 'To speak more naturally, you should practice fifteen minutes every day.',
      blankSlot: 'should',
      translation: 'Para hablar con más naturalidad, deberías practicar quince minutos todos los días.',
      options: [
        { letter: 'A', text: 'need', desc: 'Requiere la partícula "to" antes del siguiente verbo', correct: false },
        { letter: 'B', text: 'should', desc: 'Modal estándar para dar consejos, recomendaciones y sugerencias', correct: true },
        { letter: 'C', text: 'ought', desc: 'Requiere obligatoriamente "to" (ought to)', correct: false },
        { letter: 'D', text: 'must not', desc: 'Expresa prohibición estricta en lugar de consejo', correct: false }
      ],
      empathyTip: 'El modal "should" te permite ofrecer sugerencias amables y motivadoras sin sonar impositivo, ideal para el trabajo colaborativo.',
      immersionText: 'El uso hábil de los verbos modales es una de las marcas más claras de transición hacia el nivel intermedio B1.'
    }
  ];

  // Estado del test - SIEMPRE inicia desde cero (Pregunta 1)
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let isPaused = false;

  // Inicializar vista del test
  function initTest() {
    currentQuestionIndex = 0;
    userAnswers = {};
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
      hintBtn.innerHTML = '<i class="bi bi-eye"></i> <span>Ver traducción</span> <span class="ms-1">🍃</span>';
    }

    // Contenedor de refuerzo automático de traducción al responder
    const reinforceBox = document.getElementById('box-reinforcement-translation');
    if (reinforceBox) {
      if (selectedAnswer) {
        reinforceBox.innerHTML = `
          <div class="cloud-reinforce-banner mt-3 anim-pop-in">
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

    // Renderizar opciones A, B, C, D con diseño en Nube dinámico
    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      q.options.forEach((opt, optIdx) => {
        const isSelected = selectedAnswer && selectedAnswer.letter === opt.letter;
        const col = document.createElement('div');
        col.className = `col-md-6 anim-cascade stagger-${optIdx + 1}`;

        col.innerHTML = `
          <button type="button" 
                  class="cloud-option-card ${isSelected ? 'selected' : ''}" 
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
              ${isSelected ? `
                <div class="golden-laurel-decor">
                  <svg width="32" height="24" viewBox="0 0 34 26" fill="currentColor">
                    <path d="M4 14 C8 12 10 10 16 7 C14 11 12 15 10 18 C8 16 6 15 4 14 Z" opacity="0.9"/>
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

  // Seleccionar una opción con indicador dinámico que se mueve a la opción marcada
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

    // Actualizar clases de botones para que el círculo azul y la selección se trasladen dinámicamente
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
                <path d="M4 14 C8 12 10 10 16 7 C14 11 12 15 10 18 C8 16 6 15 4 14 Z" opacity="0.9"/>
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
        <div class="cloud-reinforce-banner mt-3 anim-pop-in">
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
  }

  // Reproductor de Audio Sintético TTS
  function speakSentence(rate = 1.0) {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz Web Speech API.');
      return;
    }

    window.speechSynthesis.cancel();
    const q = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];
    if (!q) return;

    const textToSpeak = q.speechSentence;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const sentenceBox = document.getElementById('test-sentence-box');
    const audioWaves = document.getElementById('audio-waves-indicator');

    utterance.onstart = () => {
      if (sentenceBox) sentenceBox.classList.add('speaking-animation');
      if (audioWaves) audioWaves.classList.remove('d-none');
    };

    utterance.onend = () => {
      if (sentenceBox) sentenceBox.classList.remove('speaking-animation');
      if (audioWaves) audioWaves.classList.add('d-none');
    };

    utterance.onerror = () => {
      if (sentenceBox) sentenceBox.classList.remove('speaking-animation');
      if (audioWaves) audioWaves.classList.add('d-none');
    };

    window.speechSynthesis.speak(utterance);
  }

  // Configuración de listeners de audio
  function setupAudioListeners() {
    const btnPlay = document.getElementById('btn-speech-play');
    const btnSlow = document.getElementById('btn-speech-slow');
    const btnUltra = document.getElementById('btn-speech-ultraslow');
    const btnPause = document.getElementById('btn-test-pause');
    const btnHint = document.getElementById('btn-toggle-translation');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => speakSentence(1.0));
    }
    if (btnSlow) {
      btnSlow.addEventListener('click', () => speakSentence(0.75));
    }
    if (btnUltra) {
      btnUltra.addEventListener('click', () => speakSentence(0.5));
    }
    if (btnPause) {
      btnPause.addEventListener('click', togglePause);
    }
    if (btnHint) {
      btnHint.addEventListener('click', () => {
        const hintBox = document.getElementById('box-manual-translation');
        if (hintBox) {
          const isHidden = hintBox.classList.contains('d-none');
          if (isHidden) {
            hintBox.classList.remove('d-none');
            btnHint.innerHTML = '<i class="bi bi-eye-slash"></i> <span>Ocultar traducción</span> <span class="ms-1">🍃</span>';
          } else {
            hintBox.classList.add('d-none');
            btnHint.innerHTML = '<i class="bi bi-eye"></i> <span>Ver traducción</span> <span class="ms-1">🍃</span>';
          }
        }
      });
    }
  }

  // Pausar / Reanudar Test
  function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('btn-test-pause');
    if (btn) {
      if (isPaused) {
        btn.innerHTML = '<i class="bi bi-play-circle text-success"></i> <span>Reanudar Test</span>';
        if (window.LinguaApp) window.LinguaApp.showToast('Evaluación en pausa.', 'info');
      } else {
        btn.innerHTML = '<i class="bi bi-pause-circle text-warning"></i> <span>Pausar Test</span>';
        if (window.LinguaApp) window.LinguaApp.showToast('Evaluación reanudada.', 'info');
      }
    }
  }

  // Siguiente Pregunta
  function nextQuestion() {
    if (!userAnswers[currentQuestionIndex]) {
      selectOption(currentQuestionIndex, 0);
    }

    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      currentQuestionIndex++;
      renderQuestion(currentQuestionIndex);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      finishTest();
    }
  }

  // Pregunta Anterior
  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuestion(currentQuestionIndex);
      window.scrollTo({ top: 120, behavior: 'smooth' });
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
      }
    });

    const btnNext = document.getElementById('btn-test-next');
    const btnPrev = document.getElementById('btn-test-prev');

    if (btnNext) btnNext.addEventListener('click', nextQuestion);
    if (btnPrev) btnPrev.addEventListener('click', prevQuestion);
  }

  // Iniciar siempre desde la Pregunta 1 limpia al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    initTest();
  });
})();
