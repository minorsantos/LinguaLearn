import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\comunidad.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

modal_html = """
  <!-- MODAL DE VIDEOCONFERENCIA CON IA (NUEVA SALA) -->
  <div class="modal fade" id="modal-ai-videoroom" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content card-custom test-card-glass border-0" style="background: rgba(246, 240, 228, 0.95) !important;">
        <div class="modal-header border-0 pb-2 px-4 mt-3">
          <div class="d-flex align-items-center gap-3">
            <span class="badge bg-primary px-3 py-2 rounded-pill small fw-bold">
              <span class="pulse-live-dot" style="background-color: white;"></span> SALA DE APRENDIZAJE IA
            </span>
            <h2 class="h5 modal-title fw-bold text-dark" id="ai-videoroom-title">Conversación Abierta</h2>
          </div>
          <button type="button" class="btn btn-outline-danger rounded-pill fw-bold px-4" id="btn-leave-ai-room">
            <i class="bi bi-box-arrow-right me-1"></i> Salir de la sala
          </button>
        </div>

        <div class="modal-body p-4 d-flex flex-column" style="overflow-y: hidden;">
          <div class="row h-100 g-4">
            <!-- Columna Izquierda: Videoconferencia (Avatar grande) -->
            <div class="col-lg-8 h-100 d-flex flex-column">
              <div class="flex-grow-1 position-relative rounded-4 overflow-hidden shadow-sm d-flex justify-content-center align-items-center" style="background: linear-gradient(135deg, #1a2a3a, #101924);">
                <!-- Avatar de IA -->
                <div class="text-center">
                  <div class="position-relative d-inline-block mb-3">
                    <img src="https://ui-avatars.com/api/?name=IA&background=0D8ABC&color=fff&size=128" alt="LinguaBot" class="rounded-circle border border-4 border-primary shadow-lg" width="160" height="160" style="object-fit: cover;">
                    <div id="ai-speaking-indicator" class="position-absolute bottom-0 end-0 bg-primary rounded-circle d-none" style="width: 32px; height: 32px; padding: 6px;">
                      <div class="audio-waves-container w-100 h-100" style="min-height: auto; align-items: center;">
                        <span class="audio-wave-bar bg-white mx-1" style="width: 2px; height: 100%;"></span>
                        <span class="audio-wave-bar bg-white mx-1" style="width: 2px; height: 60%;"></span>
                        <span class="audio-wave-bar bg-white mx-1" style="width: 2px; height: 80%;"></span>
                      </div>
                    </div>
                  </div>
                  <h3 class="h4 text-white fw-bold mb-1">LinguaBot IA</h3>
                  <div class="text-white-50 small"><i class="bi bi-robot"></i> Asistente de Aprendizaje</div>
                </div>
                
                <!-- Tu cámara (simulada) -->
                <div class="position-absolute bottom-0 end-0 m-4 rounded-3 overflow-hidden shadow" style="width: 200px; height: 150px; background: #000; border: 2px solid rgba(255,255,255,0.2);">
                  <div class="w-100 h-100 d-flex justify-content-center align-items-center bg-secondary">
                    <i class="bi bi-person-video2 text-white fs-1 opacity-50"></i>
                    <div class="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75">Tú</div>
                  </div>
                </div>
              </div>
              
              <!-- Controles de videoconferencia -->
              <div class="d-flex justify-content-center gap-3 mt-4">
                <button class="btn btn-secondary rounded-circle p-3 shadow" style="width: 64px; height: 64px;" id="ai-btn-camera">
                  <i class="bi bi-camera-video-off fs-4"></i>
                </button>
                <button class="btn btn-primary rounded-circle p-3 shadow" style="width: 64px; height: 64px;" id="ai-btn-mic" title="Presiona para hablar">
                  <i class="bi bi-mic-fill fs-4" id="ai-mic-icon"></i>
                </button>
              </div>
            </div>

            <!-- Columna Derecha: Chat y Ejercicios -->
            <div class="col-lg-4 h-100 d-flex flex-column">
              <div class="card-custom dashboard-card-glass flex-grow-1 d-flex flex-column overflow-hidden h-100 border-0 shadow-sm">
                <!-- Chat History -->
                <div class="flex-grow-1 p-3 overflow-auto" id="ai-chat-history" style="background: rgba(255,255,255,0.5);">
                  <!-- Mensaje inicial -->
                  <div class="d-flex align-items-start gap-2 mb-3">
                    <img src="https://ui-avatars.com/api/?name=IA&background=0D8ABC&color=fff" width="32" class="rounded-circle">
                    <div class="bg-white p-2 px-3 rounded-3 shadow-sm text-dark small" style="border-top-left-radius: 0;">
                      ¡Hola! Soy LinguaBot. He creado esta sala para ti. ¿De qué te gustaría hablar o qué te gustaría aprender hoy?
                    </div>
                  </div>
                </div>
                
                <!-- Input de chat -->
                <div class="p-3 bg-white border-top">
                  <div class="input-group">
                    <input type="text" class="form-control" id="ai-chat-input" placeholder="Escribe un mensaje o usa el micro...">
                    <button class="btn btn-primary" id="ai-btn-send-chat">
                      <i class="bi bi-send-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
"""

html = html.replace('<!-- PIE DE PÁGINA ACCESIBLE -->', modal_html + '\n  <!-- PIE DE PÁGINA ACCESIBLE -->')

create_room_logic = """
      // 7. Crear sala
      const btnConfirmCreateRoom = document.getElementById('btn-confirm-create-room');
      btnConfirmCreateRoom.addEventListener('click', function () {
        const title = document.getElementById('room-title-input').value.trim() || 'Conversación Abierta';
        const modalCreateEl = bootstrap.Modal.getInstance(document.getElementById('modal-create-room'));
        if (modalCreateEl) modalCreateEl.hide();

        document.getElementById('ai-videoroom-title').textContent = title;
        const aiModal = new bootstrap.Modal(document.getElementById('modal-ai-videoroom'));
        aiModal.show();
      });
"""

pattern = r'\/\/\s*7\.\s*Crear sala[\s\S]*?modalAudioEl\.show\(\);\s*\}\);'
html = re.sub(pattern, create_room_logic.strip(), html)


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

html = html.replace('// 8. Tooltips y extras', ai_logic + '\n\n      // 8. Tooltips y extras')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("comunidad.html successfully patched")
