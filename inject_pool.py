import os
import re

js_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\leccion.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

pool_exercises = """
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
"""

js = re.sub(r'const LESSON_EXERCISES = \[[\s\S]*?\];', '', js)
js = re.sub(r'function initLesson\(\) \{[\s\S]*?setupGlobalEvents\(\);\s*\}', '', js)

# Inject after 'use strict';
js = js.replace("'use strict';", "'use strict';\n" + pool_exercises.strip())

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("Pool logic injected")
