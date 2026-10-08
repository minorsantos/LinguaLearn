
(function() {
  const dictionary = {
    "Mi Perfil": "My Profile",
    "Racha": "Streak",
    "días": "days",
    "Nivel A2": "Level A2",
    "Nivel B1": "Level B1",
    "Unidad 2": "Unit 2",
    "Unidad 3": "Unit 3",
    "En el Restaurante y Viajes": "At the Restaurant and Travel",
    "Entrevistas de Trabajo y Negocios": "Job Interviews and Business",
    "En Progreso": "In Progress",
    "Completada": "Completed",
    "Lecciones": "Lessons",
    "Comenzar": "Start",
    "Iniciar": "Start",
    "Continuar": "Continue",
    "Cerrar Sesión": "Log Out",
    "Cerrar sesión": "Log Out",
    "Mis Tickets": "My Tickets",
    "Inicio": "Home",
    "Test Diagnóstico": "Placement Test",
    "Dashboard": "Dashboard",
    "Lección Activa": "Active Lesson",
    "Pronunciación": "Pronunciation",
    "Comunidad": "Community",
    "Suscripción": "Subscription",
    "Soporte": "Support",
    "Modo Oscuro": "Dark Mode",
    "Modo Claro": "Light Mode",
    "Aprender": "Learn",
    "Práctica Oral": "Speaking Practice",
    "Buzón de Tickets": "Ticket Inbox",
    "Vaciar buzón": "Clear inbox",
    "Tu buzón está vacío": "Your inbox is empty",
    "Crear Ticket": "Create Ticket",
    "Asistente IA": "AI Assistant",
    "Planes Pro": "Pro Plans",
    "Centro de Ayuda": "Help Center",
    "Siguiente Frase": "Next Phrase",
    "Grabar": "Record",
    "Muestra": "Sample",
    "¡Excelente!": "Excellent!",
    "¡Correcto!": "Correct!",
    "¡Incorrecto!": "Incorrect!",
    "Traducir": "Translate",
    "Selecciona la traducción correcta:": "Select the correct translation:",
    "Comprobante de Pago Electrónico SUNAT": "Electronic Payment Receipt",
    "Descargar Comprobante (PDF)": "Download Receipt (PDF)",
    "Plan Activado:": "Activated Plan:",
    "Monto Total Pagado:": "Total Amount Paid:",
    "Crear Nueva Sala": "Create New Room",
    "Unirse": "Join",
    "Salir de la sala": "Leave room",
    "Escribe un mensaje o usa el micro...": "Type a message or use the mic...",
    "Buscar dudas rápidas": "Search quick questions",
    "Abrir Ticket de Ayuda": "Open Help Ticket",
    "Iniciar Chat de Asistencia": "Start Support Chat",
    "Planes Claros": "Clear Plans",
    "Suscripciones de estudio": "Study Subscriptions",
    "Plan Básico": "Basic Plan",
    "Plan Pro Mensual": "Monthly Pro Plan",
    "Plan Anual Ahorro": "Yearly Savings Plan",
    "Gratis": "Free",
    "Confirmar y Pagar": "Confirm and Pay",
    "Términos y Privacidad": "Terms and Privacy",
    "Reglas de Convivencia": "Community Rules"
  };

  let currentLang = localStorage.getItem('lingua_lang') || 'es';
  
  // Create reverse dictionary
  const reverseDict = {};
  for (let key in dictionary) {
    reverseDict[dictionary[key]] = key;
  }

  function translateNode(node, dict) {
    if (node.nodeType === 3) { // Text node
      let text = node.nodeValue;
      let trimmed = text.trim();
      if (trimmed && dict[trimmed]) {
        node.nodeValue = text.replace(trimmed, dict[trimmed]);
      }
    } else if (node.nodeType === 1) { // Element node
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
      if (node.placeholder && dict[node.placeholder]) {
        node.placeholder = dict[node.placeholder];
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i], dict);
      }
    }
  }

  function applyLanguage(lang) {
    const dict = lang === 'en' ? dictionary : reverseDict;
    translateNode(document.body, dict);
    
    // Update language toggle button text
    const langBtnText = document.getElementById('lang-toggle-text');
    if (langBtnText) {
      langBtnText.textContent = lang === 'en' ? '🇪🇸 Español (ES)' : '🇬🇧 English (EN)';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Inject Language Toggle Button logic
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('lingua_lang', currentLang);
        applyLanguage(currentLang);
      });
    }

    if (currentLang === 'en') {
      applyLanguage('en');
    }
  });

})();
