import os

js_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\leccion.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

start_str = "function renderCurrentExercise() {"
end_str = "function nextStep() {"

start_idx = js.find(start_str)
end_idx = js.find(end_str)

if start_idx != -1 and end_idx != -1:
    new_logic = """
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

  """
    js = js[:start_idx] + new_logic + js[end_idx:]
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print("Logic injected successfully.")
else:
    print("Could not find start or end strings.")
