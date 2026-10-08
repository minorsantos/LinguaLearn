import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\soporte.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

bot_logic_old = """      // 4. Chat Asistente LinguaBot
      const btnSendChat = document.getElementById('btn-send-chat');
      const chatInput = document.getElementById('chat-user-input');
      const chatContainer = document.getElementById('chat-messages-container');

      function sendMessage() {
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        // Mensaje de Sofia
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble-user';
        userBubble.textContent = userMsg;
        chatContainer.appendChild(userBubble);
        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Respuesta simulada inteligente de LinguaBot
        setTimeout(() => {
          const botBubble = document.createElement('div');
          botBubble.className = 'chat-bubble-bot';

          const lower = userMsg.toLowerCase();
          if (lower.includes('yape') || lower.includes('plin') || lower.includes('pago')) {
            botBubble.textContent = 'Puedes pagar en soles con Yape o Plin desde la pestaña Suscripción. Una vez transferido, ingresa tu código de 6 dígitos para activación instantánea.';
          } else if (lower.includes('micrófono') || lower.includes('audio') || lower.includes('voz')) {
            botBubble.textContent = 'Para activar el micrófono, haz clic en el candado junto a la URL del navegador y asegúrate de permitir el acceso. ¡Puedes probarlo ahora en la vista de Pronunciación!';
          } else if (lower.includes('reembolso') || lower.includes('devolución')) {
            botBubble.textContent = 'Cuentas con 7 días de garantía incondicional. Puedes abrir un ticket y te devolveremos el 100% de tu dinero sin preguntas.';
          } else {
            botBubble.textContent = '¡Entendido! He registrado tu consulta. También puedes consultar nuestro acordeón de preguntas frecuentes o abrir un ticket de soporte para asistencia humana.';
          }

          chatContainer.appendChild(botBubble);
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 800);
      }

      btnSendChat.addEventListener('click', sendMessage);
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      });"""

bot_logic_new = """      // 4. Chat Asistente LinguaBot Avanzado (Simulación Conversacional)
      const btnSendChat = document.getElementById('btn-send-chat');
      const chatInput = document.getElementById('chat-user-input');
      const chatContainer = document.getElementById('chat-messages-container');
      
      let conversationHistory = [];
      let context = 'general';

      function generateNaturalResponse(msg) {
        const lower = msg.toLowerCase();
        
        // Detección de intenciones y cambio de contexto
        if (lower.match(/hola|buenos d|buenas t|buenas n/)) {
            return "¿Hola! Qué gusto saludarte. Cuéntame, ¿en qué te puedo ayudar hoy con tu aprendizaje de inglés?";
        }
        
        if (lower.includes('problema') || lower.includes('error') || lower.includes('no funciona')) {
            context = 'support';
            return "Lamento mucho escuchar que estás teniendo inconvenientes. ¿Podrías darme más detalles sobre lo que está fallando exactamente? Estoy aquí para solucionarlo paso a paso.";
        }
        
        if (lower.includes('yape') || lower.includes('plin') || lower.includes('pago') || lower.includes('suscripcion') || lower.includes('suscripción')) {
            context = 'billing';
            return "¡Excelente! Los temas de pagos son súper fáciles de resolver. Aceptamos pagos locales con Yape y Plin, y también tarjetas. ¿Tienes alguna duda específica sobre los planes o ya estás intentando hacer un pago?";
        }
        
        if (lower.includes('micrófono') || lower.includes('audio') || lower.includes('pronunciacion') || lower.includes('pronunciación')) {
            context = 'technical';
            return "El micrófono es clave para que evaluemos tu pronunciación real. A veces el navegador bloquea el acceso. Revisa si hay un ícono de candado o cámara en la barra de direcciones de tu navegador y asegúrate de permitir el micrófono. ¿Te aparece algún error específico al intentarlo?";
        }
        
        if (lower.match(/como|cómo|que|qué|cuando|cuándo/)) {
            return "Esa es una gran pregunta. Para darte la mejor respuesta posible, ¿podrías darme un poquito más de contexto sobre lo que estás intentando lograr?";
        }
        
        if (lower.includes('gracias')) {
            context = 'general';
            return "¡De nada! Es un placer enorme poder ayudarte. Si tienes alguna otra duda o quieres conversar, aquí estaré. ¡Mucho éxito en tus lecciones!";
        }
        
        if (lower.includes('aprender') || lower.includes('ingles') || lower.includes('inglés')) {
            return "¡Me encanta esa motivación! Aprender inglés abre muchas puertas. Te recomiendo que empieces con las lecciones interactivas de tu ruta de aprendizaje en el Dashboard. ¿Hay alguna unidad en particular en la que sientas que necesitas más refuerzo?";
        }

        // Si hay un contexto previo, responder con base en ese contexto
        if (context === 'support') {
            return "Entiendo. Ese detalle es importante. He registrado esta información. ¿Has intentado refrescar la página o usar otro navegador para ver si el problema persiste?";
        }
        if (context === 'billing') {
            return "Comprendo. En cuanto al pago, todo es automático. Una vez confirmes la transacción con el código, tu plan se activará de inmediato y podrás descargar tu boleta electrónica. ¿Te puedo ayudar con algo más sobre esto?";
        }
        
        // Reflexión genérica (estilo ELIZA) para continuar conversación natural
        const genericResponses = [
            "Te entiendo perfectamente. ¿Puedes contarme un poco más sobre eso?",
            "Eso tiene mucho sentido. Y dime, ¿cómo te sientes con el progreso que llevas hasta ahora en LinguaLearn?",
            "Interesante... ¿Me podrías dar un ejemplo específico para asegurarme de entenderte al 100%?",
            "¡Claro, veo a lo que te refieres! Si necesitas que abordemos esto más a fondo, también puedo crear un ticket automático para que un especialista humano lo revise. ¿Seguimos conversando por aquí?",
            "Me parece una excelente observación. Tomaré nota de eso. ¿Hay algo adicional en lo que te pueda orientar hoy?"
        ];
        
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
      }

      function sendMessage() {
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        const userBubble = document.createElement('div');
        userBubble.className = 'chat-bubble-user';
        userBubble.textContent = userMsg;
        chatContainer.appendChild(userBubble);
        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        conversationHistory.push({role: 'user', content: userMsg});

        // Simulador de tipado natural (retraso variable según largo del mensaje)
        const isTypingDiv = document.createElement('div');
        isTypingDiv.className = 'chat-bubble-bot text-muted small fst-italic';
        isTypingDiv.innerHTML = '<span class="spinner-grow spinner-grow-sm me-2"></span>Escribiendo...';
        chatContainer.appendChild(isTypingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        const responseText = generateNaturalResponse(userMsg);
        const typingDelay = Math.min(Math.max(responseText.length * 15, 800), 3000);

        setTimeout(() => {
          chatContainer.removeChild(isTypingDiv);
          const botBubble = document.createElement('div');
          botBubble.className = 'chat-bubble-bot';
          botBubble.textContent = responseText;
          chatContainer.appendChild(botBubble);
          chatContainer.scrollTop = chatContainer.scrollHeight;
          
          conversationHistory.push({role: 'bot', content: responseText});
        }, typingDelay);
      }

      btnSendChat.addEventListener('click', sendMessage);
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      });"""

pattern = r'\/\/\s*4\.\s*Chat Asistente LinguaBot[\s\S]*?sendMessage\(\);\s*\}\s*\}\);'
html = re.sub(pattern, bot_logic_new.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("soporte.html successfully patched")
