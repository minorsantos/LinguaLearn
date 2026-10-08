import os

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\comunidad.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

ai_logic = """
      // --- LÓGICA DE VIDEOCONFERENCIA CON IA ---
      const aiChatHistory = document.getElementById('ai-chat-history');
      const aiChatInput = document.getElementById('ai-chat-input');
      const aiBtnSendChat = document.getElementById('ai-btn-send-chat');
      const aiBtnMic = document.getElementById('ai-btn-mic');
      const aiMicIcon = document.getElementById('ai-mic-icon');
      const aiSpeakingIndicator = document.getElementById('ai-speaking-indicator');
      const btnLeaveAiRoom = document.getElementById('btn-leave-ai-room');

      let aiMicActive = false;

      function addAiMessage(text, isHTML = false) {
        if (!aiChatHistory) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'd-flex align-items-start gap-2 mb-3';
        msgDiv.innerHTML = `
          <img src="https://ui-avatars.com/api/?name=IA&background=0D8ABC&color=fff" width="32" class="rounded-circle">
          <div class="bg-white p-2 px-3 rounded-3 shadow-sm text-dark small" style="border-top-left-radius: 0; width: 100%;">
            ${isHTML ? text : text.replace(/\\n/g, '<br>')}
          </div>
        `;
        aiChatHistory.appendChild(msgDiv);
        aiChatHistory.scrollTop = aiChatHistory.scrollHeight;

        aiSpeakingIndicator.classList.remove('d-none');
        setTimeout(() => {
          aiSpeakingIndicator.classList.add('d-none');
        }, 2000);
      }

      function addUserMessage(text) {
        if (!aiChatHistory) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'd-flex align-items-start gap-2 mb-3 flex-row-reverse';
        msgDiv.innerHTML = `
          <div class="bg-primary text-white p-2 px-3 rounded-3 shadow-sm small" style="border-top-right-radius: 0;">
            ${text}
          </div>
        `;
        aiChatHistory.appendChild(msgDiv);
        aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
      }

      function handleAiResponse(userText) {
        const lower = userText.toLowerCase();
        
        setTimeout(() => {
          if (lower.includes('aprender') || lower.includes('ingles') || lower.includes('inglés')) {
            addAiMessage("¡Claro que sí! Aprender inglés es una excelente decisión. Empecemos una sesión de aprendizaje ahora mismo. 🤗");
            
            setTimeout(() => {
              addAiMessage(`
                <strong>1. Vocabulario:</strong><br>
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

          } else {
            addAiMessage("¡Qué interesante! Me encanta charlar contigo. Cuéntame más sobre eso o dime si quieres practicar vocabulario, pronunciación o gramática.");
          }
        }, 800);
      }

      function sendChatMessage() {
        if (!aiChatInput) return;
        const text = aiChatInput.value.trim();
        if (!text) return;
        addUserMessage(text);
        aiChatInput.value = '';
        handleAiResponse(text);
      }

      if (aiBtnSendChat) aiBtnSendChat.addEventListener('click', sendChatMessage);
      if (aiChatInput) aiChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendChatMessage();
      });

      if (aiBtnMic) aiBtnMic.addEventListener('click', () => {
        aiMicActive = !aiMicActive;
        if (aiMicActive) {
          aiBtnMic.classList.replace('btn-primary', 'btn-danger');
          if (aiMicIcon) aiMicIcon.className = 'bi bi-stop-fill fs-4';
          if (aiChatInput) aiChatInput.placeholder = 'Escuchando...';
        } else {
          aiBtnMic.classList.replace('btn-danger', 'btn-primary');
          if (aiMicIcon) aiMicIcon.className = 'bi bi-mic-fill fs-4';
          if (aiChatInput) aiChatInput.placeholder = 'Escribe un mensaje o usa el micro...';
          
          const fakeText = "Quiero aprender inglés";
          addUserMessage(fakeText);
          handleAiResponse(fakeText);
        }
      });

      if (btnLeaveAiRoom) btnLeaveAiRoom.addEventListener('click', () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('modal-ai-videoroom'));
        if (modal) modal.hide();
        setTimeout(() => {
          if (window.LinguaApp && window.LinguaApp.showToast) {
            window.LinguaApp.showToast('Gracias por elegirnos. ¡Nos vemos en la próxima sesión! 🤗', 'success');
          } else {
            alert('Gracias por elegirnos. ¡Nos vemos en la próxima sesión! 🤗');
          }
          if (aiChatHistory) {
            aiChatHistory.innerHTML = `
              <div class="d-flex align-items-start gap-2 mb-3">
                <img src="https://ui-avatars.com/api/?name=IA&background=0D8ABC&color=fff" width="32" class="rounded-circle">
                <div class="bg-white p-2 px-3 rounded-3 shadow-sm text-dark small" style="border-top-left-radius: 0;">
                  ¡Hola! Soy LinguaBot. He creado esta sala para ti. ¿De qué te gustaría hablar o qué te gustaría aprender hoy?
                </div>
              </div>
            `;
          }
        }, 500);
      });
"""

html = html.replace('    })();\n  </script>', ai_logic + '\n    })();\n  </script>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
