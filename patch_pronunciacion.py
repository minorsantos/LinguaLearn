import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\pronunciacion.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

next_phrase_logic = """
      // 8. SIGUIENTE FRASE (+15 XP)
      const btnNextPhrase = document.getElementById('btn-next-phrase');
      btnNextPhrase?.addEventListener('click', function () {
        if (currentIndex < PHRASES.length - 1) {
            currentIndex++;
            loadCurrentPhrase(currentIndex);
            if (window.LinguaApp) {
              window.LinguaApp.addXP(15);
              window.LinguaApp.showToast('¡+15 XP sumados por tu práctica oral!', 'success');
            }
        } else {
            const progressPctEl = document.getElementById('exercise-progress-pct');
            const progressBarEl = document.getElementById('exercise-progress-bar');
            if (progressPctEl) progressPctEl.textContent = `100% completado`;
            if (progressBarEl) progressBarEl.style.width = `100%`;
            
            const stepLabel = document.getElementById('exercise-step-label');
            if (stepLabel) stepLabel.textContent = `Ejercicio 5 de 5 · Completado`;
            
            if (window.LinguaApp) {
              window.LinguaApp.addXP(15);
              window.LinguaApp.showToast('¡Lección de pronunciación completada!', 'success');
            }
            
            setTimeout(() => {
                alert('¡Impresionante! Has completado los 5 ejercicios de pronunciación. ¡+75 XP en total!');
                window.location.href = 'dashboard.html';
            }, 300);
        }
      });
"""

pattern = r'\/\/\s*8\.\s*SIGUIENTE FRASE[\s\S]*?\}\);'
html = re.sub(pattern, next_phrase_logic.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('patched')
