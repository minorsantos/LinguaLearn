import os
import re

js_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\leccion.js'

with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

# We will dynamically replace LESSON_EXERCISES assignment or just intercept initLesson.
# Better to define LESSON_EXERCISES_U3 and change LESSON_EXERCISES based on localStorage.

new_logic = """  const LESSON_EXERCISES_U3 = [
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

  let ACTIVE_EXERCISES = LESSON_EXERCISES;
"""

# Let's replace 'const LESSON_EXERCISES = [' with 'let LESSON_EXERCISES = [' so we can override it if needed, or just use ACTIVE_EXERCISES.
js = js.replace("const LESSON_EXERCISES =", "let LESSON_EXERCISES =")
js = js.replace("let currentExerciseIndex", new_logic + "\n  let currentExerciseIndex")
js = js.replace("LESSON_EXERCISES", "ACTIVE_EXERCISES")
# Wait, I just replaced all LESSON_EXERCISES with ACTIVE_EXERCISES, meaning the initial declaration is now `let ACTIVE_EXERCISES = [`! Let's be careful with regex.

with open(js_path, 'r', encoding='utf-8') as f:
    js_raw = f.read()

js_raw = js_raw.replace("const LESSON_EXERCISES =", "let ACTIVE_EXERCISES =")

# Insert U3 exercises right after ACTIVE_EXERCISES array ends.
insert_idx = js_raw.find("  let currentExerciseIndex = 0;")
js_new = js_raw[:insert_idx] + new_logic.replace("  let ACTIVE_EXERCISES = LESSON_EXERCISES;\n", "") + js_raw[insert_idx:]

init_lesson_logic = """  function initLesson() {
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
  }"""

js_new = re.sub(r'function initLesson\(\) \{[\s\S]*?setupGlobalEvents\(\);\s*\}', init_lesson_logic.strip(), js_new)

finish_logic = """    if (window.LinguaApp && window.LinguaApp.saveUser) {
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
    }"""

js_new = js_new.replace("if (window.LinguaApp && window.LinguaApp.saveUser) {", finish_logic)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_new)
print("js patched")
