import os
import re

js_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\leccion.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

new_exercises = """
  const LESSON_EXERCISES = [
    {
      id: 1,
      type: 'multiple_choice',
      wordDisplay: 'apple',
      instruction: 'Selecciona la traducción correcta para:',
      image: 'assets/apple_vector.png',
      imageAlt: 'Ilustración vectorial de manzana roja fresca',
      options: [
        { text: 'casa', isCorrect: false },
        { text: 'manzana', isCorrect: true },
        { text: 'perro', isCorrect: false }
      ],
      explanation: '¡Excelente! "Apple" significa manzana en español.',
      phraseSample: 'An apple a day keeps the doctor away.'
    },
    {
      id: 2,
      type: 'image_grid',
      wordDisplay: 'coffee',
      instruction: 'Selecciona la imagen que representa:',
      options: [
        { image: 'assets/leccion_airplane.jpg', text: 'airplane', isCorrect: false },
        { image: 'assets/leccion_coffee.jpg', text: 'coffee', isCorrect: true },
        { image: 'assets/leccion_book.jpg', text: 'book', isCorrect: false },
        { image: 'assets/leccion_dog.jpg', text: 'dog', isCorrect: false }
      ],
      explanation: '¡Muy bien! "Coffee" es café.',
      phraseSample: 'I need a cup of coffee.'
    },
    {
      id: 3,
      type: 'unscramble',
      wordDisplay: 'Frase desordenada',
      instruction: 'Ordena las palabras para formar la frase: "Yo leo un libro"',
      words: ['read', 'book', 'I', 'a'],
      correctOrder: ['I', 'read', 'a', 'book'],
      explanation: '¡Perfecto! El orden correcto en inglés es Sujeto + Verbo + Artículo + Sustantivo.',
      phraseSample: 'I read a book.'
    },
    {
      id: 4,
      type: 'match_pairs',
      wordDisplay: 'Pares',
      instruction: 'Une la palabra en inglés con su traducción:',
      pairs: [
        { en: 'dog', es: 'perro' },
        { en: 'cat', es: 'gato' },
        { en: 'bird', es: 'pájaro' },
        { en: 'fish', es: 'pez' }
      ],
      explanation: '¡Brillante! Has unido todos los pares correctamente.',
      phraseSample: 'A loyal dog is a great friend.'
    },
    {
      id: 5,
      type: 'multiple_choice',
      wordDisplay: 'airplane',
      instruction: '¿Cuál es el medio de transporte mostrado?:',
      image: 'assets/leccion_airplane.jpg',
      imageAlt: 'Avión de pasajeros surcando el cielo',
      options: [
        { text: 'avión', isCorrect: true },
        { text: 'tren', isCorrect: false },
        { text: 'barco', isCorrect: false }
      ],
      explanation: '¡Maravilloso! "Airplane" es avión. ¡Has completado los 5 retos!',
      phraseSample: 'The airplane departs at noon.'
    }
  ];
"""

# Replace LESSON_EXERCISES array
pattern_exercises = r'const LESSON_EXERCISES = \[[\s\S]*?\];'
js = re.sub(pattern_exercises, new_exercises.strip(), js)


# Rewrite renderCurrentExercise and checking logic
new_render_logic = """
  // Variables adicionales de estado para ejercicios interactivos
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

    const container = document.getElementById('dynamic-exercise-container');
    if (!container) return;
    container.innerHTML = '';

    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.disabled = true;
      btnResponder.querySelector('span').textContent = 'Responder';
      btnResponder.classList.replace('btn-success', 'btn-primary-custom');
      btnResponder.classList.replace('btn-danger', 'btn-primary-custom');
    }
    
    document.getElementById('lesson-feedback-sheet').classList.add('d-none');

    // Header Word
    const wordHeader = document.createElement('div');
    wordHeader.className = 'lesson-word-text anim-cascade stagger-5 mb-4';
    wordHeader.innerHTML = `<span>${ex.wordDisplay}</span>`;
    if (ex.wordDisplay !== 'Frase desordenada' && ex.wordDisplay !== 'Pares') {
      wordHeader.innerHTML += `<button type="button" class="btn-speaker-mini ms-2" onclick="window.speechSynthesis.speak(new SpeechSynthesisUtterance('${ex.wordDisplay}'))"><i class="bi bi-volume-up-fill"></i></button>`;
    }
    container.appendChild(wordHeader);

    // Render by type
    if (ex.type === 'multiple_choice') {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'lesson-halo-card mb-4 mx-auto';
      imgContainer.innerHTML = `<img src="${ex.image}" alt="${ex.imageAlt}" class="lesson-drawing-img">`;
      container.appendChild(imgContainer);

      const grid = document.createElement('div');
      grid.className = 'lesson-options-grid';
      ex.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'card-option-choice flex-column p-3';
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
        col.className = 'col-6 col-md-3';
        const btn = document.createElement('button');
        btn.className = 'card-option-choice w-100 p-2 d-flex flex-column align-items-center h-100';
        btn.innerHTML = `<img src="${opt.image}" class="img-fluid rounded mb-2" style="max-height:100px; object-fit:cover;"><span>${opt.text}</span>`;
        btn.onclick = () => selectOption(idx, grid);
        col.appendChild(btn);
        grid.appendChild(col);
      });
      container.appendChild(grid);
    }
    else if (ex.type === 'unscramble') {
      const dropZone = document.createElement('div');
      dropZone.className = 'p-3 mb-4 rounded border dashed-border d-flex flex-wrap gap-2 min-h-50 align-items-center justify-content-center bg-light';
      dropZone.style.minHeight = '60px';
      dropZone.id = 'unscramble-dropzone';
      
      const wordBank = document.createElement('div');
      wordBank.className = 'd-flex flex-wrap gap-2 justify-content-center';
      wordBank.id = 'unscramble-wordbank';

      // Sort words randomly
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
          Array.from(colEn.children).forEach(c => c.classList.remove('active'));
          this.classList.add('active');
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
          Array.from(colEs.children).forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          currentPairSelection.es = p.es;
          checkMatchPair(grid);
        };
        colEs.appendChild(btn);
      });

      grid.appendChild(colEn);
      grid.appendChild(colEs);
      container.appendChild(grid);
      
      // Auto-enable responder if 4 pairs matched
      btnResponder.disabled = true;
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
          b.classList.remove('active', 'btn-outline-primary', 'btn-outline-secondary');
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
          b.classList.remove('active');
          b.classList.add('btn-danger');
          setTimeout(() => b.classList.remove('btn-danger'), 500);
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

  // Handle Responder / Continuar click
  function evaluateAnswer() {
    if (hasEvaluated) {
      nextStep();
      return;
    }

    const ex = LESSON_EXERCISES[currentExerciseIndex];
    let isCorrect = false;

    if (ex.type === 'multiple_choice' || ex.type === 'image_grid') {
      isCorrect = ex.options[selectedOptionIndex].isCorrect;
      
      const grid = document.querySelector('.lesson-options-grid') || document.querySelector('.row.g-3');
      const buttons = grid.querySelectorAll('button');
      
      if (isCorrect) {
        buttons[selectedOptionIndex].classList.add('btn-success-soft');
      } else {
        buttons[selectedOptionIndex].classList.add('btn-danger-soft');
        const correctIdx = ex.options.findIndex(o => o.isCorrect);
        buttons[correctIdx].classList.add('btn-success-soft');
      }
    } 
    else if (ex.type === 'unscramble') {
      isCorrect = unscrambleSelected.join(' ') === ex.correctOrder.join(' ');
      const dropzone = document.getElementById('unscramble-dropzone');
      if (isCorrect) dropzone.classList.add('border-success', 'bg-success-subtle');
      else dropzone.classList.add('border-danger', 'bg-danger-subtle');
    }
    else if (ex.type === 'match_pairs') {
      // Button is only enabled if all pairs are matched correctly
      isCorrect = true;
    }

    showFeedback(isCorrect, ex);
    hasEvaluated = true;

    const btnResponder = document.getElementById('btn-lesson-responder');
    if (btnResponder) {
      btnResponder.querySelector('span').textContent = 'Continuar';
      btnResponder.classList.replace('btn-primary-custom', isCorrect ? 'btn-success' : 'btn-danger');
    }

    if (isCorrect) {
      playSound('correct');
      earnedXpTotal += 15;
    } else {
      playSound('error');
      lives--;
      updateTopStats();
    }
  }
"""

pattern_render = r'function renderCurrentExercise\(\) \{[\s\S]*?\} \/\/ Fin evaluateAnswer'

# Let's use a safer replacement block by block
js = re.sub(r'function renderCurrentExercise\(\) \{[\s\S]*?function evaluateAnswer\(\) \{[\s\S]*?\}[\s\n]*function nextStep\(\)', new_render_logic.strip() + '\n\n  function nextStep()', js)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("leccion.js logic patched")
