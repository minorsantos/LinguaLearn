import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\comunidad.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the scrolling in ai-chat-history
html = html.replace('id="ai-chat-history" style="background: rgba(255,255,255,0.5);"', 'id="ai-chat-history" style="background: rgba(255,255,255,0.5); overflow-y: auto; max-height: calc(100vh - 200px);"')


# Enhance AI NLP for Comunidad (Teacher simulation)
advanced_ai_logic = """
      let teacherContext = 'greeting';
      const teacherResponses = [
        "¡Excelente punto! Siguiendo con eso, ¿puedes intentar formular una oración completa usando esa misma idea?",
        "Me gusta cómo lo planteaste. En inglés, a veces usamos una estructura un poco diferente. ¿Sabes cuál sería?",
        "¡Muy bien! Estás progresando bastante rápido. Cuéntame, ¿qué vocabulario te gustaría que revisemos ahora?",
        "Esa es una pregunta muy interesante. La respuesta corta es sí, pero depende del contexto. ¿Te doy un ejemplo?",
        "¡Perfecto! Para asegurarme de que quedó claro, ¿podrías darme tú un ejemplo de cómo lo usarías en una conversación real?"
      ];
      let teacherResponseIndex = 0;

      function handleAiResponse(userText) {
        const lower = userText.toLowerCase();
        
        setTimeout(() => {
          if (lower.includes('aprender') || lower.includes('ingles') || lower.includes('inglés')) {
            teacherContext = 'lesson';
            addAiMessage("¡Claro que sí! Empecemos nuestra clase personalizada. 🤗");
            
            setTimeout(() => {
              addAiMessage(`
                <strong>1. Vocabulario del día:</strong><br>
                - Apple (Manzana)<br>
                - Coffee (Café)<br>
                - Book (Libro)<br>
                <br>
                <strong>2. Pronunciación:</strong><br>
                Intenta decir: <em>"I would like a coffee, please"</em>.
                <button class="btn btn-sm btn-outline-primary mt-2 d-block" onclick="alert('¡Escuchando tu pronunciación... Excelente!')"><i class="bi bi-mic"></i> Practicar pronunciación</button>
              `, true);
            }, 1500);

            setTimeout(() => {
              addAiMessage(`
                <strong>3. Ejercicio Rápido:</strong><br>
                ¿Cómo se dice "Manzana" en inglés?<br>
                <button class="btn btn-sm btn-light border w-100 text-start mt-2" onclick="alert('¡Incorrecto! Vuelve a intentar.')">A) Banana</button>
                <button class="btn btn-sm btn-light border w-100 text-start mt-1" onclick="alert('¡Correcto! ¡Muy bien hecho!')">B) Apple</button>
                <button class="btn btn-sm btn-light border w-100 text-start mt-1" onclick="alert('¡Incorrecto! Vuelve a intentar.')">C) Orange</button>
              `, true);
            }, 3000);

          } else if (lower.includes('hola') || lower.includes('buenos')) {
            addAiMessage("¡Hola! Qué gusto verte en clase hoy. ¿En qué tema quieres que nos enfoquemos?");
          } else if (lower.includes('gracias')) {
            addAiMessage("¡De nada! Es mi trabajo como tu profesor. ¿Continuamos con otro tema?");
          } else {
            // Rotating teacher responses
            addAiMessage(teacherResponses[teacherResponseIndex]);
            teacherResponseIndex = (teacherResponseIndex + 1) % teacherResponses.length;
          }
        }, 800);
      }
"""

pattern = r'function handleAiResponse[\s\S]*?\}, 800\);\s*\}'
html = re.sub(pattern, advanced_ai_logic.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('patched')
