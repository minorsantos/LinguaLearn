import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\leccion.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the static exercise body with a dynamic container
pattern = r'<!-- ILUSTRACIÓN CENTRAL CON HALO AMBIENTAL CÁLIDO -->[\s\S]*?<\/section>'
replacement = """
      <!-- CONTENEDOR DINÁMICO DE EJERCICIOS -->
      <div id="dynamic-exercise-container" class="anim-cascade stagger-4 w-100" style="min-height: 250px;">
        <!-- El contenido del ejercicio se inyectará aquí desde leccion.js -->
      </div>
"""

# The previous script may fail if there's an encoding issue with accents in regex, so let's use a simpler pattern
pattern2 = r'<div class="lesson-halo-card anim-pop-in stagger-4" id="lesson-halo-card">[\s\S]*?<div class="lesson-options-grid anim-cascade stagger-6" id="lesson-options-container">[\s\S]*?<\/div>\s*<\/section>'

html = re.sub(pattern2, replacement.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("leccion.html patched for dynamic exercises")

