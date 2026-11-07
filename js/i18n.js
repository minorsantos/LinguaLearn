/**
 * ============================================================================
 * LINGUALEARN - MOTOR DE INTERNACIONALIZACIÓN GLOBAL (i18n.js)
 * Traducción universal para toda la plataforma: Inglés, Francés y Portugués
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY_LANG = 'lingua_target_language';
  const TRANSLATIONS = {
  "Test Diagnóstico": {
    "en": "Placement Test",
    "fr": "Test diagnostique",
    "pt": "Teste Diagnóstico"
  },
  "Dashboard": {
    "en": "Dashboard",
    "fr": "Tableau de bord",
    "pt": "Painel de Controle"
  },
  "Lección Activa": {
    "en": "Active Lesson",
    "fr": "Leçon active",
    "pt": "Lição Ativa"
  },
  "Pronunciación": {
    "en": "Pronunciation",
    "fr": "Prononciation",
    "pt": "Pronúncia"
  },
  "Comunidad": {
    "en": "Community",
    "fr": "Communauté",
    "pt": "Comunidade"
  },
  "Suscripción": {
    "en": "Subscription",
    "fr": "Abonnement",
    "pt": "Assinatura"
  },
  "Soporte": {
    "en": "Support",
    "fr": "Support",
    "pt": "Suporte"
  },
  "Mi Perfil": {
    "en": "My Profile",
    "fr": "Mon profil",
    "pt": "Meu Perfil"
  },
  "Mi Perfil y Logros": {
    "en": "My Profile & Achievements",
    "fr": "Mon profil et réussites",
    "pt": "Meu Perfil e Conquistas"
  },
  "Mi Dashboard": {
    "en": "My Dashboard",
    "fr": "Mon tableau de bord",
    "pt": "Meu Painel"
  },
  "Suscripciones de estudio": {
    "en": "Study Subscriptions",
    "fr": "Abonnements d'étude",
    "pt": "Assinaturas de estudo"
  },
  "Mis Tickets": {
    "en": "My Tickets",
    "fr": "Mes tickets",
    "pt": "Meus Chamados"
  },
  "Cerrar Sesión": {
    "en": "Log Out",
    "fr": "Déconnexion",
    "pt": "Sair da Conta"
  },
  "Cerrar sesión": {
    "en": "Log Out",
    "fr": "Déconnexion",
    "pt": "Sair da Conta"
  },
  "Iniciar Sesión": {
    "en": "Log In",
    "fr": "Connexion",
    "pt": "Entrar"
  },
  "Iniciar sesión": {
    "en": "Log In",
    "fr": "Connexion",
    "pt": "Entrar"
  },
  "Registrarse": {
    "en": "Sign Up",
    "fr": "S'inscrire",
    "pt": "Cadastrar-se"
  },
  "Registro": {
    "en": "Sign Up",
    "fr": "Inscription",
    "pt": "Cadastro"
  },
  "Inicio": {
    "en": "Home",
    "fr": "Accueil",
    "pt": "Início"
  },
  "Accesibilidad": {
    "en": "Accessibility",
    "fr": "Accessibilité",
    "pt": "Acessibilidade"
  },
  "Herramientas de accesibilidad": {
    "en": "Accessibility tools",
    "fr": "Outils d'accessibilité",
    "pt": "Ferramentas de acessibilidade"
  },
  "Modo Oscuro": {
    "en": "Dark Mode",
    "fr": "Mode sombre",
    "pt": "Modo Escuro"
  },
  "Modo Claro": {
    "en": "Light Mode",
    "fr": "Mode clair",
    "pt": "Modo Claro"
  },
  "Alternar modo oscuro o claro": {
    "en": "Toggle dark or light mode",
    "fr": "Basculer mode sombre ou clair",
    "pt": "Alternar modo escuro ou claro"
  },
  "Disminuir tamaño": {
    "en": "Decrease font size",
    "fr": "Diminuer la taille",
    "pt": "Diminuir fonte"
  },
  "Aumentar tamaño": {
    "en": "Increase font size",
    "fr": "Augmenter la taille",
    "pt": "Aumentar fonte"
  },
  "Atajos": {
    "en": "Shortcuts",
    "fr": "Raccourcis",
    "pt": "Atalhos"
  },
  "Atajos [Alt + 1-5]": {
    "en": "Shortcuts [Alt + 1-5]",
    "fr": "Raccourcis [Alt + 1-5]",
    "pt": "Atalhos [Alt + 1-5]"
  },
  "Atajos [Espacio, R, Enter]": {
    "en": "Shortcuts [Space, R, Enter]",
    "fr": "Raccourcis [Espace, R, Entrée]",
    "pt": "Atalhos [Espaço, R, Enter]"
  },
  "Atajos de Teclado": {
    "en": "Keyboard Shortcuts",
    "fr": "Raccourcis clavier",
    "pt": "Atalhos do Teclado"
  },
  "Guía de Atajos": {
    "en": "Shortcuts Guide",
    "fr": "Guide des raccourcis",
    "pt": "Guia de Atalhos"
  },
  "Estudiante Certificado": {
    "en": "Certified Student",
    "fr": "Étudiant certifié",
    "pt": "Estudante Certificado"
  },
  "Estudiante verificado": {
    "en": "Verified student",
    "fr": "Étudiant vérifié",
    "pt": "Estudante verificado"
  },
  "Nivel B1 — Intermedio Activo": {
    "en": "Level B1 — Active Intermediate",
    "fr": "Niveau B1 — Intermédiaire actif",
    "pt": "Nível B1 — Intermediário Ativo"
  },
  "Nivel A2 — Básico Activo": {
    "en": "Level A2 — Active Basic",
    "fr": "Niveau A2 — Élémentaire actif",
    "pt": "Nível A2 — Básico Ativo"
  },
  "Nivel A2 - Básico Activo": {
    "en": "Level A2 - Active Basic",
    "fr": "Niveau A2 - Élémentaire actif",
    "pt": "Nível A2 - Básico Ativo"
  },
  "Miembro desde Octubre 2024": {
    "en": "Member since October 2024",
    "fr": "Membre depuis octobre 2024",
    "pt": "Membro desde Outubro 2024"
  },
  "Meta: Inglés Profesional (B2)": {
    "en": "Goal: Professional English (B2)",
    "fr": "Objectif : Anglais professionnel (B2)",
    "pt": "Meta: Inglês Profissional (B2)"
  },
  "Editar Perfil": {
    "en": "Edit Profile",
    "fr": "Modifier le profil",
    "pt": "Editar Perfil"
  },
  "Compartir Logros": {
    "en": "Share Achievements",
    "fr": "Partager les réussites",
    "pt": "Compartilhar Conquistas"
  },
  "Idioma de Aprendizaje y Práctica": {
    "en": "Learning & Practice Language",
    "fr": "Langue d'apprentissage et de pratique",
    "pt": "Idioma de Aprendizado e Prática"
  },
  "Selecciona el idioma que deseas practicar. La interfaz de la plataforma se mantendrá en Español y serás redirigido al Test Diagnóstico para iniciar tu ruta adaptativa.": {
    "en": "Select your preferred language. The entire platform interface and exercises will adapt to the chosen language, and you will be redirected to the Placement Test.",
    "fr": "Sélectionnez votre langue préférée. Toute l'interface de la plateforme et vos exercices s'adapteront à la langue choisie, et vous serez redirigé vers le Test diagnostique.",
    "pt": "Selecione seu idioma de preferência. Toda a interface da plataforma e seus exercícios se adaptarão ao idioma escolhido, e você será redirecionado para o Teste Diagnóstico."
  },
  "Selecciona tu idioma de preferencia. Toda la interfaz de la plataforma y tus ejercicios se adaptarán al idioma elegido, y serás redirigido al Test Diagnóstico para comenzar de forma ordenada.": {
    "en": "Select your preferred language. The entire platform interface and exercises will adapt to the chosen language, and you will be redirected to the Placement Test to start in an orderly fashion.",
    "fr": "Sélectionnez votre langue préférée. Toute l'interface de la plateforme et vos exercices s'adapteront à la langue choisie, et vous serez redirigé vers le Test diagnostique pour commencer de manière ordonnée.",
    "pt": "Selecione seu idioma de preferência. Toda a interface da plataforma e seus exercícios se adaptarão ao idioma escolhido, e você será redirecionado para o Teste Diagnóstico para começar de forma organizada."
  },
  "Inglés": {
    "en": "English",
    "fr": "Anglais",
    "pt": "Inglês"
  },
  "Francés": {
    "en": "French",
    "fr": "Français",
    "pt": "Francês"
  },
  "Portugués": {
    "en": "Portuguese",
    "fr": "Portugais",
    "pt": "Português"
  },
  "Inglés (Activo)": {
    "en": "English (Active)",
    "fr": "Anglais (Actif)",
    "pt": "Inglês (Ativo)"
  },
  "Francés (Activo)": {
    "en": "French (Active)",
    "fr": "Français (Actif)",
    "pt": "Francês (Ativo)"
  },
  "Portugués (Activo)": {
    "en": "Portuguese (Active)",
    "fr": "Portugais (Actif)",
    "pt": "Português (Ativo)"
  },
  "Principal": {
    "en": "Primary",
    "fr": "Principale",
    "pt": "Principal"
  },
  "Disponible": {
    "en": "Available",
    "fr": "Disponible",
    "pt": "Disponível"
  },
  "Idioma estándar": {
    "en": "Standard language",
    "fr": "Langue standard",
    "pt": "Idioma padrão"
  },
  "Al hacer clic en un idioma, se activará en tu perfil y entrarás automáticamente al Test Diagnóstico correspondiente.": {
    "en": "Clicking a language will activate it in your profile and automatically take you to the corresponding Placement Test.",
    "fr": "Cliquer sur une langue l'activera sur votre profil et vous redirigera vers le Test diagnostique correspondant.",
    "pt": "Ao clicar em um idioma, ele será ativado no seu perfil e você entrará automaticamente no Teste Diagnóstico correspondente."
  },
  "Nivel de Dificultad del Algoritmo Adaptativo": {
    "en": "Adaptive Algorithm Difficulty Level",
    "fr": "Niveau de difficulté de l'algorithme adaptatif",
    "pt": "Nível de Dificuldade do Algoritmo Adaptativo"
  },
  "Cambiar tu nivel ajustará el vocabulario y la velocidad del audio en tus próximas lecciones.": {
    "en": "Changing your level will adjust vocabulary and audio speed in your upcoming lessons.",
    "fr": "Changer votre niveau ajustera le vocabulaire et la vitesse audio de vos prochaines leçons.",
    "pt": "Alterar seu nível ajustará o vocabulário e a velocidade do áudio nas suas próximas lições."
  },
  "Básico": {
    "en": "Basic",
    "fr": "Élémentaire",
    "pt": "Básico"
  },
  "Intermedio": {
    "en": "Intermediate",
    "fr": "Intermédiaire",
    "pt": "Intermediário"
  },
  "Avanzado": {
    "en": "Advanced",
    "fr": "Avancé",
    "pt": "Avançado"
  },
  "Actualmente recibiendo ejercicios adaptados para consolidar tiempos pasados simples y preguntas de rutina.": {
    "en": "Currently receiving adapted exercises to consolidate simple past tenses and routine questions.",
    "fr": "Actuellement en train de recevoir des exercices adaptés pour consolider le passé composé et les questions de routine.",
    "pt": "Atualmente recebendo exercícios adaptados para consolidar tempos passados simples e perguntas de rotina."
  },
  "Recibiendo textos con cláusulas subordinadas complejas, modales condicionales y debates profesionales.": {
    "en": "Receiving texts with complex subordinate clauses, conditional modals, and professional discussions.",
    "fr": "Textes avec propositions subordonnées complexes, modaux conditionnels et débats professionnels.",
    "pt": "Recebendo textos com orações subordinadas complexas, modais condicionais e debates profissionais."
  },
  "Entrenamiento de alta precisión fonética, modismos idiomáticos nativos y redacción ejecutiva C1-C2.": {
    "en": "High phonetic precision training, native idioms, and executive writing C1-C2.",
    "fr": "Entraînement de haute précision phonétique, expressions idiomatiques et rédaction exécutive C1-C2.",
    "pt": "Treinamento de alta precisão fonética, expressões idiomáticas nativas e redação executiva C1-C2."
  },
  "¿Cuáles son tus áreas de interés principales?": {
    "en": "What are your main areas of interest?",
    "fr": "Quels sont vos principaux centres d'intérêt ?",
    "pt": "Quais são suas principais áreas de interesse?"
  },
  "Personalizamos los ejemplos de diálogo y textos de lectura según los temas que más te motivan.": {
    "en": "We customize dialogue examples and reading passages based on topics that motivate you most.",
    "fr": "Nous personnalisons les dialogues et lectures selon vos thèmes de motivation.",
    "pt": "Personalizamos exemplos de diálogo e textos de leitura de acordo com os temas que mais te motivam."
  },
  "3 seleccionadas": {
    "en": "3 selected",
    "fr": "3 sélectionnés",
    "pt": "3 selecionadas"
  },
  "Viajes y Turismo": {
    "en": "Travel & Tourism",
    "fr": "Voyages et tourisme",
    "pt": "Viagens e Turismo"
  },
  "Aeropuertos, reservas y mapas": {
    "en": "Airports, bookings and maps",
    "fr": "Aéroports, réservations et cartes",
    "pt": "Aeroportos, reservas e mapas"
  },
  "Gastronomía y Comida": {
    "en": "Gastronomy & Food",
    "fr": "Gastronomie et Cuisine",
    "pt": "Gastronomia e Culinária"
  },
  "Restaurantes y recetas": {
    "en": "Restaurants and recipes",
    "fr": "Restaurants et recettes",
    "pt": "Restaurantes e receitas"
  },
  "Ciencias y Tecnología": {
    "en": "Science & Technology",
    "fr": "Sciences et Technologie",
    "pt": "Ciências e Tecnologia"
  },
  "Innovación y software": {
    "en": "Innovation and software",
    "fr": "Innovation et logiciels",
    "pt": "Inovação e software"
  },
  "Música y Cultura Pop": {
    "en": "Music & Pop Culture",
    "fr": "Musique et Culture Pop",
    "pt": "Música e Cultura Pop"
  },
  "Letras, series y cine": {
    "en": "Lyrics, shows and cinema",
    "fr": "Paroles, séries et cinéma",
    "pt": "Letras, séries e cinema"
  },
  "Negocios y Entrevistas": {
    "en": "Business & Interviews",
    "fr": "Affaires et Entretiens",
    "pt": "Negócios e Entrevistas"
  },
  "Emails formales y reuniones": {
    "en": "Formal emails and meetings",
    "fr": "Courriels formels et réunions",
    "pt": "E-mails formais e reuniões"
  },
  "Conversación Cotidiana": {
    "en": "Everyday Conversation",
    "fr": "Conversation quotidienne",
    "pt": "Conversação Cotidiana"
  },
  "Progreso Semanal": {
    "en": "Weekly Progress",
    "fr": "Progrès hebdomadaire",
    "pt": "Progresso Semanal"
  },
  "Lecciones": {
    "en": "Lessons",
    "fr": "Leçons",
    "pt": "Lições"
  },
  "Precisión audio": {
    "en": "Audio accuracy",
    "fr": "Précision audio",
    "pt": "Precisão de áudio"
  },
  "Dedicación (horas/día)": {
    "en": "Dedication (hours/day)",
    "fr": "Dévouement (heures/jour)",
    "pt": "Dedicação (horas/dia)"
  },
  "● Objetivo cumplido": {
    "en": "● Goal achieved",
    "fr": "● Objectif atteint",
    "pt": "● Meta alcançada"
  },
  "Total semanal:": {
    "en": "Weekly total:",
    "fr": "Total hebdomadaire :",
    "pt": "Total semanal:"
  },
  "7.7 horas": {
    "en": "7.7 hours",
    "fr": "7,7 heures",
    "pt": "7,7 horas"
  },
  "Preferencias de Accesibilidad": {
    "en": "Accessibility Preferences",
    "fr": "Préférences d'accessibilité",
    "pt": "Preferências de Acessibilidade"
  },
  "Configura ayudas sensoriales para adaptar la experiencia cognitiva a tus necesidades.": {
    "en": "Configure sensory aids to adapt the cognitive experience to your needs.",
    "fr": "Configurez des aides sensorielles pour adapter l'expérience cognitive à vos besoins.",
    "pt": "Configure auxílios sensoriais para adaptar a experiência cognitiva às suas necessidades."
  },
  "Subtítulos automáticos": {
    "en": "Automatic subtitles",
    "fr": "Sous-titres automatiques",
    "pt": "Legendas automáticas"
  },
  "Transcripción en tiempo real en audios": {
    "en": "Real-time audio transcription",
    "fr": "Transcription en temps réel des audios",
    "pt": "Transcrição em tempo real nos áudios"
  },
  "Lectura asistida": {
    "en": "Assisted reading",
    "fr": "Lecture assistée",
    "pt": "Leitura assistida"
  },
  "Optimización para lectores de pantalla": {
    "en": "Screen reader optimization",
    "fr": "Optimisation pour lecteurs d'écran",
    "pt": "Otimização para leitores de tela"
  },
  "Reducir animaciones": {
    "en": "Reduce motion",
    "fr": "Réduire les animations",
    "pt": "Reduzir animações"
  },
  "Minimiza efectos de movimiento y rebote": {
    "en": "Minimizes motion and bounce effects",
    "fr": "Minimise les mouvements et rebonds",
    "pt": "Minimiza efeitos de movimento e rebote"
  },
  "Guardar Preferencias": {
    "en": "Save Preferences",
    "fr": "Enregistrer les préférences",
    "pt": "Salvar Preferências"
  },
  "Guardar preferencias del perfil": {
    "en": "Save profile preferences",
    "fr": "Enregistrer les préférences du profil",
    "pt": "Salvar preferências do perfil"
  },
  "Editar Datos de Perfil": {
    "en": "Edit Profile Details",
    "fr": "Modifier les coordonnées",
    "pt": "Editar Dados do Perfil"
  },
  "Nombre Completo": {
    "en": "Full Name",
    "fr": "Nom complet",
    "pt": "Nome Completo"
  },
  "Correo Electrónico": {
    "en": "Email Address",
    "fr": "Adresse e-mail",
    "pt": "E-mail"
  },
  "Meta de Aprendizaje": {
    "en": "Learning Goal",
    "fr": "Objectif d'apprentissage",
    "pt": "Meta de Aprendizado"
  },
  "Guardar Cambios": {
    "en": "Save Changes",
    "fr": "Enregistrer les modifications",
    "pt": "Salvar Alterações"
  },
  "Cancelar": {
    "en": "Cancel",
    "fr": "Annuler",
    "pt": "Cancelar"
  },
  "TEST DE NIVEL": {
    "en": "PLACEMENT TEST",
    "fr": "TEST DE NIVEAU",
    "pt": "TESTE DE NÍVEL"
  },
  "En progreso": {
    "en": "In progress",
    "fr": "En cours",
    "pt": "Em andamento"
  },
  "Evaluación Diagnóstica Inicial": {
    "en": "Initial Placement Test",
    "fr": "Évaluation diagnostique initiale",
    "pt": "Avaliação Diagnóstica Inicial"
  },
  "Tiempo est.:": {
    "en": "Est. time:",
    "fr": "Temps estimé :",
    "pt": "Tempo est.:"
  },
  "Pausar": {
    "en": "Pause",
    "fr": "Pause",
    "pt": "Pausar"
  },
  "Reanudar": {
    "en": "Resume",
    "fr": "Reprendre",
    "pt": "Continuar"
  },
  "completado": {
    "en": "completed",
    "fr": "complété",
    "pt": "concluído"
  },
  "Selecciona la opción correcta para completar la pregunta de presentación:": {
    "en": "Select the correct option to complete the introduction question:",
    "fr": "Sélectionnez la bonne option pour compléter la question de présentation :",
    "pt": "Selecione a opção correta para completar a pergunta de apresentação:"
  },
  "Ver traducción": {
    "en": "Show translation",
    "fr": "Voir la traduction",
    "pt": "Ver tradução"
  },
  "Ocultar traducción": {
    "en": "Hide translation",
    "fr": "Masquer la traduction",
    "pt": "Ocultar tradução"
  },
  "Intenta pensar en inglés antes de ver la traducción": {
    "en": "Try to think in the target language before checking the translation",
    "fr": "Essayez de penser dans la langue cible avant de vérifier la traduction",
    "pt": "Tente pensar no idioma de destino antes de ver a tradução"
  },
  "Refuerzo al responder (Traducción completa):": {
    "en": "Answer reinforcement (Full translation):",
    "fr": "Renforcement de réponse (Traduction complète) :",
    "pt": "Reforço ao responder (Tradução completa):"
  },
  "Escuchar oración": {
    "en": "Listen to sentence",
    "fr": "Écouter la phrase",
    "pt": "Ouvir frase"
  },
  "Lenta": {
    "en": "Slow",
    "fr": "Lente",
    "pt": "Lenta"
  },
  "Ultra lenta": {
    "en": "Ultra slow",
    "fr": "Ultra-lente",
    "pt": "Ultra lenta"
  },
  "Audio nativo verificado": {
    "en": "Verified native audio",
    "fr": "Audio natif vérifié",
    "pt": "Áudio nativo verificado"
  },
  "SELECCIONA LA OPCIÓN CORRECTA:": {
    "en": "SELECT THE CORRECT OPTION:",
    "fr": "SÉLECTIONNEZ LA BONNE OPTION :",
    "pt": "SELECIONE A OPÇÃO CORRETA:"
  },
  "Usa teclas [1, 2, 3, 4]": {
    "en": "Use keys [1, 2, 3, 4]",
    "fr": "Utilisez les touches [1, 2, 3, 4]",
    "pt": "Use as teclas [1, 2, 3, 4]"
  },
  "Anterior": {
    "en": "Previous",
    "fr": "Précédent",
    "pt": "Anterior"
  },
  "Pulsa 1 - 4 o Enter para avanzar": {
    "en": "Press 1 - 4 or Enter to proceed",
    "fr": "Appuyez sur 1 - 4 ou Entrée pour continuer",
    "pt": "Pressione 1 - 4 ou Enter para avançar"
  },
  "Siguiente Pregunta": {
    "en": "Next Question",
    "fr": "Question suivante",
    "pt": "Próxima Pergunta"
  },
  "Finalizar Evaluación": {
    "en": "Finish Assessment",
    "fr": "Terminer l'évaluation",
    "pt": "Finalizar Avaliação"
  },
  "Tu resultado calibrará automáticamente tus lecciones en el Dashboard. No hay respuestas punitivas.": {
    "en": "Your result will automatically calibrate your lessons on the Dashboard. No punitive grading.",
    "fr": "Votre résultat calibrera automatiquement vos leçons sur le tableau de bord. Aucune notation punitive.",
    "pt": "Seu resultado calibrará automaticamente suas lições no Painel. Não há respostas punitivas."
  },
  "¡Evaluación Completada!": {
    "en": "Assessment Completed!",
    "fr": "Évaluation terminée !",
    "pt": "Avaliação Concluída!"
  },
  "Hemos analizado tu precisión sintáctica, vocabulario contextual y comprensión para crear tu ruta adaptativa.": {
    "en": "We analyzed your syntactic accuracy, contextual vocabulary, and comprehension to craft your adaptive path.",
    "fr": "Nous avons analysé votre précision syntaxique, vocabulaire et compréhension pour créer votre parcours.",
    "pt": "Analisamos sua precisão sintática, vocabulário contextual e compreensão para criar sua trilha adaptativa."
  },
  "Nivel Calibrado: Básico (A2)": {
    "en": "Calibrated Level: Basic (A2)",
    "fr": "Niveau calibré : Élémentaire (A2)",
    "pt": "Nível Calibrado: Básico (A2)"
  },
  "Ir a Mi Dashboard": {
    "en": "Go to My Dashboard",
    "fr": "Aller à mon tableau de bord",
    "pt": "Ir para Meu Painel"
  },
  "+50 XP otorgados a tu cuenta": {
    "en": "+50 XP awarded to your account",
    "fr": "+50 XP crédités sur votre compte",
    "pt": "+50 XP concedidos à sua conta"
  },
  "Ajustes Rápidos de Accesibilidad": {
    "en": "Quick Accessibility Settings",
    "fr": "Réglages rapides d'accessibilité",
    "pt": "Ajustes Rápidos de Acessibilidade"
  },
  "Personaliza tu entorno visual y auditivo para una lectura sin fatiga cognitiva.": {
    "en": "Customize your visual and auditory environment for fatigue-free cognitive reading.",
    "fr": "Personnalisez votre environnement visuel et sonore pour une lecture confortable.",
    "pt": "Personalize seu ambiente visual e auditivo para uma leitura sem fadiga cognitiva."
  },
  "Alto Contraste": {
    "en": "High Contrast",
    "fr": "Contraste élevé",
    "pt": "Alto Contraste"
  },
  "Lectura en Voz Alta": {
    "en": "Read Aloud",
    "fr": "Lecture à voix haute",
    "pt": "Leitura em Voz Alta"
  },
  "NIVEL CALIBRADO: BÁSICO (A2)": {
    "en": "CALIBRATED LEVEL: BASIC (A2)",
    "fr": "NIVEAU CALIBRÉ : ÉLÉMENTAIRE (A2)",
    "pt": "NÍVEL CALIBRADO: BÁSICO (A2)"
  },
  "Marco Común Europeo (MCER)": {
    "en": "Common European Framework (CEFR)",
    "fr": "Cadre européen commun (CECRL)",
    "pt": "Quadro Europeu Comum (QECR)"
  },
  "Ruta de Aprendizaje Personalizada": {
    "en": "Personalized Learning Track",
    "fr": "Parcours d'apprentissage personnalisé",
    "pt": "Trilha de Aprendizado Personalizada"
  },
  "Progreso semanal hacia B1": {
    "en": "Weekly progress towards B1",
    "fr": "Progrès hebdomadaire vers B1",
    "pt": "Progresso semanal rumo a B1"
  },
  "Próximo Hito": {
    "en": "Next Milestone",
    "fr": "Prochaine étape",
    "pt": "Próximo Marco"
  },
  "Examen A2 → B1": {
    "en": "Exam A2 → B1",
    "fr": "Examen A2 → B1",
    "pt": "Exame A2 → B1"
  },
  "Faltan 4 días": {
    "en": "4 days left",
    "fr": "Il reste 4 jours",
    "pt": "Faltam 4 dias"
  },
  "Racha Activa": {
    "en": "Active Streak",
    "fr": "Série active",
    "pt": "Sequência Ativa"
  },
  "días seguidos": {
    "en": "days in a row",
    "fr": "jours d'affilée",
    "pt": "dias seguidos"
  },
  "Experiencia Total": {
    "en": "Total Experience",
    "fr": "Expérience totale",
    "pt": "Experiência Total"
  },
  "Meta Diaria": {
    "en": "Daily Goal",
    "fr": "Objectif quotidien",
    "pt": "Meta Diária"
  },
  "Ruta de Aprendizaje por Niveles": {
    "en": "Learning Path by Levels",
    "fr": "Parcours d'apprentissage par niveaux",
    "pt": "Trilha de Aprendizado por Níveis"
  },
  "Nivel A1 • Unidad 1": {
    "en": "Level A1 • Unit 1",
    "fr": "Niveau A1 • Unité 1",
    "pt": "Nível A1 • Unidade 1"
  },
  "Fundamentos y Presentación": {
    "en": "Foundations & Introductions",
    "fr": "Fondations et Présentation",
    "pt": "Fundamentos e Apresentação"
  },
  "Saludos, presentaciones, alfabeto fonético, números del 1 al 100 y vocabulario familiar.": {
    "en": "Greetings, introductions, phonetic alphabet, numbers 1-100, and family vocabulary.",
    "fr": "Salutations, présentations, alphabet phonétique, nombres de 1 à 100 et vocabulaire familial.",
    "pt": "Saudações, apresentações, alfabeto fonético, números de 1 a 100 e vocabulário familiar."
  },
  "Completada": {
    "en": "Completed",
    "fr": "Terminée",
    "pt": "Concluída"
  },
  "Repasar Unidad": {
    "en": "Review Unit",
    "fr": "Réviser l'unité",
    "pt": "Revisar Unidade"
  },
  "Nivel A2 • Unidad 2": {
    "en": "Level A2 • Unit 2",
    "fr": "Niveau A2 • Unité 2",
    "pt": "Nível A2 • Unidade 2"
  },
  "En el Restaurante y Viajes": {
    "en": "At the Restaurant & Traveling",
    "fr": "Au restaurant et voyages",
    "pt": "No Restaurante e Viagens"
  },
  "Pedir comida, preguntar direcciones en la ciudad, transporte público y reservas de hotel.": {
    "en": "Ordering food, asking for city directions, public transit, and hotel reservations.",
    "fr": "Commander des repas, demander son chemin, transports en commun et réservations d'hôtel.",
    "pt": "Pedir comida, pedir informações na cidade, transporte público e reservas de hotel."
  },
  "En Progreso": {
    "en": "In Progress",
    "fr": "En cours",
    "pt": "Em Andamento"
  },
  "Continuar Lección": {
    "en": "Continue Lesson",
    "fr": "Continuer la leçon",
    "pt": "Continuar Lição"
  },
  "Glosario Rápido": {
    "en": "Quick Glossary",
    "fr": "Glossaire rapide",
    "pt": "Glossário Rápido"
  },
  "Nivel B1 • Unidad 3": {
    "en": "Level B1 • Unit 3",
    "fr": "Niveau B1 • Unité 3",
    "pt": "Nível B1 • Unidade 3"
  },
  "Entrevistas de Trabajo y Negocios": {
    "en": "Job Interviews & Business",
    "fr": "Entretiens d'embauche et affaires",
    "pt": "Entrevistas de Emprego e Negócios"
  },
  "Negociación básica, redacción de correos formales, respuestas a preguntas complejas de reclutadores.": {
    "en": "Basic negotiation, formal email writing, and responding to recruiter questions.",
    "fr": "Négociation de base, rédaction de courriels formels et réponses aux recruteurs.",
    "pt": "Negociação básica, redação de e-mails formais e respostas a recrutadores."
  },
  "Completa Unidad 2 para desbloquear": {
    "en": "Complete Unit 2 to unlock",
    "fr": "Complétez l'unité 2 pour débloquer",
    "pt": "Complete a Unidade 2 para desbloquear"
  },
  "¿Tienes 3 minutos libres?": {
    "en": "Got 3 minutes to spare?",
    "fr": "Avez-vous 3 minutes libres ?",
    "pt": "Tem 3 minutos livres?"
  },
  "Prueba nuestro club de pronunciación exprés con feedback háptico y auditivo inmediato.": {
    "en": "Try our express pronunciation club with immediate haptic and auditory feedback.",
    "fr": "Essayez notre club de prononciation express avec retour auditif immédiat.",
    "pt": "Experimente nosso clube de pronúncia expressa com feedback auditivo imediato."
  },
  "Práctica Rápida de Voz": {
    "en": "Quick Voice Practice",
    "fr": "Pratique vocale express",
    "pt": "Prática Rápida de Voz"
  },
  "Glosario: Cafetería & Restaurante": {
    "en": "Glossary: Café & Restaurant",
    "fr": "Glossaire : Café & Restaurant",
    "pt": "Glossário: Cafeteria & Restaurante"
  },
  "La cuenta": {
    "en": "The bill / check",
    "fr": "L'addition",
    "pt": "A conta"
  },
  "Ordenar / Pedir": {
    "en": "Order / Request",
    "fr": "Commander",
    "pt": "Pedir"
  },
  "Cerrar lección y volver al Dashboard": {
    "en": "Close lesson and return to Dashboard",
    "fr": "Fermer la leçon et retourner au tableau de bord",
    "pt": "Fechar lição e voltar ao Painel"
  },
  "Volver al Dashboard": {
    "en": "Return to Dashboard",
    "fr": "Retourner au tableau de bord",
    "pt": "Voltar ao Painel"
  },
  "Selecciona la palabra correcta:": {
    "en": "Select the correct word:",
    "fr": "Sélectionnez le mot correct :",
    "pt": "Selecione a palavra correta:"
  },
  "Selecciona la traducción correcta para:": {
    "en": "Select the correct translation for:",
    "fr": "Sélectionnez la bonne traduction pour :",
    "pt": "Selecione a tradução correta para:"
  },
  "Selecciona la imagen que representa:": {
    "en": "Select the image representing:",
    "fr": "Sélectionnez l'image représentant :",
    "pt": "Selecione a imagem que representa:"
  },
  "Selecciona la imagen correspondiente a:": {
    "en": "Select the image corresponding to:",
    "fr": "Sélectionnez l'image correspondant à :",
    "pt": "Selecione a imagem correspondente a:"
  },
  "¿Cuál es el medio de transporte mostrado?:": {
    "en": "Which transportation mode is shown?:",
    "fr": "Quel est le moyen de transport affiché ? :",
    "pt": "Qual é o meio de transporte mostrado?:"
  },
  "Frase desordenada": {
    "en": "Unscramble sentence",
    "fr": "Phrase désordonnée",
    "pt": "Frase desordenada"
  },
  "Pares": {
    "en": "Matching Pairs",
    "fr": "Paires correspondantes",
    "pt": "Pares Correspondentes"
  },
  "Responder": {
    "en": "Reply",
    "fr": "Répondre",
    "pt": "Responder"
  },
  "Continuar": {
    "en": "Continue",
    "fr": "Continuer",
    "pt": "Continuar"
  },
  "¡Correcto!": {
    "en": "Correct!",
    "fr": "Correct !",
    "pt": "Correto!"
  },
  "Incorrecto": {
    "en": "Incorrect",
    "fr": "Incorrect",
    "pt": "Incorreto"
  },
  "Pulsa 1 - 3 para elegir · Espacio audio · Enter avanzar": {
    "en": "Press 1 - 3 to choose · Space for audio · Enter to proceed",
    "fr": "Appuyez sur 1 - 3 pour choisir · Espace pour audio · Entrée pour avancer",
    "pt": "Pressione 1 - 3 para escolher · Espaço áudio · Enter avançar"
  },
  "¡Lección Completada!": {
    "en": "Lesson Completed!",
    "fr": "Leçon terminée !",
    "pt": "Lição Concluída!"
  },
  "Continuar al Dashboard": {
    "en": "Continue to Dashboard",
    "fr": "Continuer vers le tableau de bord",
    "pt": "Continuar para o Painel"
  },
  "Voz y Habla": {
    "en": "Voice & Speech",
    "fr": "Voix et Parole",
    "pt": "Voz e Fala"
  },
  "+15 XP al completar": {
    "en": "+15 XP upon completion",
    "fr": "+15 XP à la fin",
    "pt": "+15 XP ao concluir"
  },
  "Reconocimiento de Voz Asistido por IA": {
    "en": "AI-Assisted Speech Recognition",
    "fr": "Reconnaissance vocale assistée par IA",
    "pt": "Reconhecimento de Voz Assistido por IA"
  },
  "Modo seguro sin penalización": {
    "en": "Safe mode without penalty",
    "fr": "Mode sécurisé sans pénalité",
    "pt": "Modo seguro sem penalidade"
  },
  "Pronuncia en voz alta la siguiente oración:": {
    "en": "Pronounce the following sentence out loud:",
    "fr": "Prononcez la phrase suivante à voix haute :",
    "pt": "Pronuncie a seguinte frase em voz alta:"
  },
  "Escuchar Frase": {
    "en": "Listen to Phrase",
    "fr": "Écouter la phrase",
    "pt": "Ouvir Frase"
  },
  "Presiona para hablar": {
    "en": "Press to speak",
    "fr": "Appuyez pour parler",
    "pt": "Pressione para falar"
  },
  "Escuchando tu voz... (Pronuncia la frase)": {
    "en": "Listening to your voice... (Pronounce the sentence)",
    "fr": "Écoute de votre voix... (Prononcez la phrase)",
    "pt": "Ouvindo sua voz... (Pronuncie a frase)"
  },
  "Presiona el botón de nuevo o pulsa Espacio para finalizar": {
    "en": "Press the button again or press Space to finish",
    "fr": "Appuyez à nouveau ou sur Espace pour terminer",
    "pt": "Pressione o botão novamente ou Espaço para finalizar"
  },
  "¡Grabación completada!": {
    "en": "Recording completed!",
    "fr": "Enregistrement terminé !",
    "pt": "Gravação concluída!"
  },
  "Calculando porcentaje de precisión real...": {
    "en": "Calculating real accuracy score...",
    "fr": "Calcul du score de précision réel...",
    "pt": "Calculando pontuação de precisão real..."
  },
  "Siguiente Frase": {
    "en": "Next Phrase",
    "fr": "Phrase suivante",
    "pt": "Próxima Frase"
  },
  "Repetir Grabación": {
    "en": "Try Again",
    "fr": "Réessayer",
    "pt": "Repetir Gravação"
  },
  "Escuchar palabra": {
    "en": "Listen to word",
    "fr": "Écouter le mot",
    "pt": "Ouvir palavra"
  },
  "Muro de Práctica e Intercambio": {
    "en": "Practice & Exchange Wall",
    "fr": "Mur de pratique et d'échange",
    "pt": "Mural de Prática e Intercâmbio"
  },
  "Salas de Conversación en Vivo": {
    "en": "Live Conversation Rooms",
    "fr": "Salons de conversation en direct",
    "pt": "Salas de Conversação ao Vivo"
  },
  "Crear Nueva Sala": {
    "en": "Create New Room",
    "fr": "Créer un nouveau salon",
    "pt": "Criar Nova Sala"
  },
  "Unirse a Sala": {
    "en": "Join Room",
    "fr": "Rejoindre le salon",
    "pt": "Entrar na Sala"
  },
  "Publicar en el Muro": {
    "en": "Post on Wall",
    "fr": "Publier sur le mur",
    "pt": "Publicar no Mural"
  },
  "Planes de Estudio y Membresía Pro": {
    "en": "Study Plans & Pro Membership",
    "fr": "Formules d'étude et Abonnement Pro",
    "pt": "Planos de Estudo e Assinatura Pro"
  },
  "Comprobante de Pago Electrónico": {
    "en": "Electronic Payment Receipt",
    "fr": "Reçu de paiement électronique",
    "pt": "Comprovante de Pagamento Eletrônico"
  },
  "Descargar Comprobante (PDF)": {
    "en": "Download Receipt (PDF)",
    "fr": "Télécharger le reçu (PDF)",
    "pt": "Baixar Comprovante (PDF)"
  },
  "Confirmar Suscripción": {
    "en": "Confirm Subscription",
    "fr": "Confirmer l'abonnement",
    "pt": "Confirmar Assinatura"
  },
  "Centro de Ayuda y Soporte Técnico": {
    "en": "Help Center & Tech Support",
    "fr": "Centre d'aide et Support technique",
    "pt": "Central de Ajuda e Suporte Técnico"
  },
  "¿En qué podemos ayudarte hoy?": {
    "en": "How can we help you today?",
    "fr": "Comment pouvons-nous vous aider aujourd'hui ?",
    "pt": "Como podemos te ajudar hoje?"
  },
  "Buzón de Tickets": {
    "en": "Ticket Inbox",
    "fr": "Boîte de tickets",
    "pt": "Caixa de Chamados"
  },
  "Crear Nuevo Ticket": {
    "en": "Create New Ticket",
    "fr": "Créer un nouveau ticket",
    "pt": "Abrir Novo Chamado"
  },
  "Crear Ticket": {
    "en": "Create Ticket",
    "fr": "Créer un ticket",
    "pt": "Criar Chamado"
  },
  "Centro de Ayuda": {
    "en": "Help Center",
    "fr": "Centre d'aide",
    "pt": "Central de Ajuda"
  },
  "Declaración de Accesibilidad": {
    "en": "Accessibility Statement",
    "fr": "Déclaration d'accessibilité",
    "pt": "Declaração de Acessibilidade"
  },
  "Privacidad": {
    "en": "Privacy Policy",
    "fr": "Confidentialité",
    "pt": "Privacidade"
  },
  "Plataforma empática y accesible para el aprendizaje de idiomas.": {
    "en": "Empathetic and accessible platform for language learning.",
    "fr": "Plateforme empathique et accessible pour l'apprentissage des langues.",
    "pt": "Plataforma empática e acessível para o aprendizado de idiomas."
  },
  "© 2024 LinguaLearn. Diseñado bajo estándares WCAG 2.2 AAA.": {
    "en": "© 2024 LinguaLearn. Designed under WCAG 2.2 AAA standards.",
    "fr": "© 2024 LinguaLearn. Conçu selon les normes WCAG 2.2 AAA.",
    "pt": "© 2024 LinguaLearn. Projetado sob os padrões WCAG 2.2 AAA."
  },
  "LinguaLearn - Mi Perfil y Preferencias": {
    "en": "LinguaLearn - My Profile & Preferences",
    "fr": "LinguaLearn - Mon profil et préférences",
    "pt": "LinguaLearn - Meu Perfil e Preferências"
  },
  "Selecciona el idioma que deseas practicar. Toda la plataforma (incluyendo el Perfil) se adaptará al idioma seleccionado y serás redirigido al": {
    "en": "Select the language you want to practice. The entire platform (including Profile) will adapt to the selected language and you will be redirected to the",
    "fr": "Sélectionnez la langue que vous souhaitez pratiquer. Toute la plateforme (y compris le Profil) s'adaptera à la langue sélectionnée et vous serez redirigé vers le",
    "pt": "Selecione o idioma que deseja praticar. Toda a plataforma (incluindo o Perfil) se adaptará ao idioma selecionado e você será redirecionado para o"
  },
  "para iniciar tu ruta adaptativa.": {
    "en": "to start your adaptive track.",
    "fr": "pour commencer votre parcours adaptatif.",
    "pt": "para iniciar sua rota adaptativa."
  },
  "Al hacer clic en un idioma, se activará en tu perfil y entrarás automáticamente al": {
    "en": "Clicking a language activates it on your profile and automatically takes you to the",
    "fr": "Cliquer sur une langue l'active sur votre profil et vous emmène automatiquement vers le",
    "pt": "Ao clicar em um idioma, ele será ativado no seu perfil e você entrará automaticamente no"
  },
  "correspondiente.": {
    "en": "accordingly.",
    "fr": "correspondant.",
    "pt": "correspondente."
  },
  "Français parlé": {
    "en": "Spoken French",
    "fr": "Français parlé",
    "pt": "Francês falado"
  },
  "Português diário": {
    "en": "Daily Portuguese",
    "fr": "Portugais quotidien",
    "pt": "Português diário"
  },
  "Dificultad adaptativa": {
    "en": "Adaptive difficulty",
    "fr": "Difficulté adaptative",
    "pt": "Dificuldade adaptativa"
  },
  "Áreas de interés": {
    "en": "Areas of interest",
    "fr": "Centres d'intérêt",
    "pt": "Áreas de interesse"
  },
  "Negocios y Trabajo": {
    "en": "Business & Work",
    "fr": "Affaires et travail",
    "pt": "Negócios e Trabalho"
  },
  "Cultura y Literatura": {
    "en": "Culture & Literature",
    "fr": "Culture et littérature",
    "pt": "Cultura e Literatura"
  },
  "Ciencia y Tecnología": {
    "en": "Science & Technology",
    "fr": "Science et technologie",
    "pt": "Ciência e Tecnologia"
  },
  "Mis Logros y Medallas": {
    "en": "My Achievements & Badges",
    "fr": "Mes réussites et badges",
    "pt": "Minhas Conquistas e Medalhas"
  },
  "Compartir logros": {
    "en": "Share achievements",
    "fr": "Partager les réussites",
    "pt": "Compartilhar conquistas"
  },
  "Inglés Básico (A2)": {
    "en": "Basic English (A2)",
    "fr": "Anglais basique (A2)",
    "pt": "Inglês Básico (A2)"
  },
  "Inglés Profesional (B2)": {
    "en": "Professional English (B2)",
    "fr": "Anglais professionnel (B2)",
    "pt": "Inglês Profissional (B2)"
  },
  "Fluidez Avanzada (C1)": {
    "en": "Advanced Fluency (C1)",
    "fr": "Aisance avancée (C1)",
    "pt": "Fluência Avançada (C1)"
  },
  "Lun": {
    "en": "Mon",
    "fr": "Lun",
    "pt": "Seg"
  },
  "Mar": {
    "en": "Tue",
    "fr": "Mar",
    "pt": "Ter"
  },
  "Mié": {
    "en": "Wed",
    "fr": "Mer",
    "pt": "Qua"
  },
  "Jue": {
    "en": "Thu",
    "fr": "Jeu",
    "pt": "Qui"
  },
  "Vie": {
    "en": "Fri",
    "fr": "Ven",
    "pt": "Sex"
  },
  "Sáb": {
    "en": "Sat",
    "fr": "Sam",
    "pt": "Sáb"
  },
  "Dom": {
    "en": "Sun",
    "fr": "Dim",
    "pt": "Dom"
  },
  "Días de racha": {
    "en": "Day streak",
    "fr": "Jours consécutifs",
    "pt": "Dias seguidos"
  },
  "Horas de práctica": {
    "en": "Practice hours",
    "fr": "Heures de pratique",
    "pt": "Horas de prática"
  },
  "Ejercicios completados": {
    "en": "Completed exercises",
    "fr": "Exercices terminés",
    "pt": "Exercícios concluídos"
  },
  "Nivel actual": {
    "en": "Current level",
    "fr": "Niveau actuel",
    "pt": "Nível atual"
  },
  "Cambiar Foto": {
    "en": "Change Photo",
    "fr": "Changer la photo",
    "pt": "Alterar Foto"
  },
  "Biografía": {
    "en": "Biography",
    "fr": "Biographie",
    "pt": "Biografia"
  },
  "Notificaciones": {
    "en": "Notifications",
    "fr": "Notifications",
    "pt": "Notificações"
  },
  "LinguaLearn - Evaluación Diagnóstica Inicial": {
    "en": "LinguaLearn - Initial Placement Test",
    "fr": "LinguaLearn - Évaluation diagnostique initiale",
    "pt": "LinguaLearn - Avaliação Diagnóstica Inicial"
  },
  "Determina tu nivel con precisión adaptativa": {
    "en": "Determine your level with adaptive precision",
    "fr": "Déterminez votre niveau avec une précision adaptative",
    "pt": "Determine seu nível com precisão adaptativa"
  },
  "Saludos e Identidad – Nivel Inicial (A1)": {
    "en": "Greetings & Identity – Initial Level (A1)",
    "fr": "Salutations et identité – Niveau initial (A1)",
    "pt": "Saudações e Identidade – Nível Inicial (A1)"
  },
  "Forma correcta del verbo to be para el pronombre \"you\"": {
    "en": "Correct form of verb to be for pronoun 'you'",
    "fr": "Forme correcte du verbe to be pour le pronom 'you'",
    "pt": "Forma correta do verbo to be para o pronome 'you'"
  },
  "Forma infinitiva sin conjugar": {
    "en": "Unconjugated infinitive form",
    "fr": "Forme infinitive non conjuguée",
    "pt": "Forma infinitiva sem conjugar"
  },
  "Concordancia para tercera persona singular": {
    "en": "Agreement for third person singular",
    "fr": "Accord pour la troisième personne du singulier",
    "pt": "Concordância para terceira pessoa do singular"
  },
  "Uso exclusivo para primera persona \"I\"": {
    "en": "Exclusive usage for first person 'I'",
    "fr": "Usage exclusif pour la première personne 'I'",
    "pt": "Uso exclusivo para primeira pessoa 'I'"
  },
  "4 de 5 respuestas correctas": {
    "en": "4 of 5 correct answers",
    "fr": "4 réponses correctes sur 5",
    "pt": "4 de 5 respostas corretas"
  },
  "Ir a Dashboard": {
    "en": "Go to Dashboard",
    "fr": "Aller au tableau de bord",
    "pt": "Ir para o Painel"
  },
  "Escuchar pronunciación": {
    "en": "Listen to pronunciation",
    "fr": "Écouter la prononciation",
    "pt": "Ouvir pronúncia"
  },
  "Elegir opciones": {
    "en": "Choose options",
    "fr": "Choisir les options",
    "pt": "Escolher opções"
  },
  "para avanzar": {
    "en": "to continue",
    "fr": "pour continuer",
    "pt": "para avançar"
  },
  "Pulsa": {
    "en": "Press",
    "fr": "Appuyez sur",
    "pt": "Pressione"
  },
  "LinguaLearn - Ruta de Aprendizaje Personalizada": {
    "en": "LinguaLearn - Personalized Learning Track",
    "fr": "LinguaLearn - Parcours d'apprentissage personnalisé",
    "pt": "LinguaLearn - Trilha de Aprendizado Personalizada"
  },
  "Tu Hoja de Ruta": {
    "en": "Your Roadmap",
    "fr": "Votre feuille de route",
    "pt": "Seu Roteiro de Estudos"
  },
  "Siguiente Paso Recomendado": {
    "en": "Recommended Next Step",
    "fr": "Étape suivante recommandée",
    "pt": "Próximo Passo Recomendado"
  },
  "Continuar Lección 4: Vocabulario de la Vida Diaria y Cafetería": {
    "en": "Continue Lesson 4: Daily Life & Café Vocabulary",
    "fr": "Continuer Leçon 4 : Vocabulaire quotidien et café",
    "pt": "Continuar Lição 4: Vocabulário Diário e Cafeteria"
  },
  "Ir a Lección Activa": {
    "en": "Go to Active Lesson",
    "fr": "Aller à la leçon active",
    "pt": "Ir para Lição Ativa"
  },
  "Ir a Mi Perfil": {
    "en": "Go to My Profile",
    "fr": "Aller à mon profil",
    "pt": "Ir para Meu Perfil"
  },
  "Repasar Glosario": {
    "en": "Review Glossary",
    "fr": "Réviser le glossaire",
    "pt": "Revisar Glossário"
  },
  "Frases de práctica rápida": {
    "en": "Quick practice phrases",
    "fr": "Phrases de pratique rapide",
    "pt": "Frases de prática rápida"
  },
  "Progreso de la Unidad 2": {
    "en": "Unit 2 Progress",
    "fr": "Progression de l'Unité 2",
    "pt": "Progresso da Unidade 2"
  },
  "Insignias & Logros": {
    "en": "Badges & Achievements",
    "fr": "Badges et réussites",
    "pt": "Medalhas e Conquistas"
  },
  "Políglota Veloz": {
    "en": "Swift Polyglot",
    "fr": "Polyglotte agile",
    "pt": "Poliglota Veloz"
  },
  "Puntualidad de Hierro": {
    "en": "Iron Discipline",
    "fr": "Discipline de fer",
    "pt": "Disciplina de Ferro"
  },
  "Oído de Oro": {
    "en": "Golden Ear",
    "fr": "Oreille d'or",
    "pt": "Ouvido de Ouro"
  },
  "Cafetería & Encuentros Urbanos": {
    "en": "Café & City Encounters",
    "fr": "Café et rencontres urbaines",
    "pt": "Cafeteria e Encontros Urbanos"
  },
  "Aprende a ordenar bebidas, consultar precios y comunicarte con amabilidad y soltura en cafeterías y restaurantes locales europeos.": {
    "en": "Learn to order drinks, ask about prices, and communicate politely and smoothly in local European cafes and restaurants.",
    "fr": "Apprenez à commander des boissons, demander les prix et communiquer courtoisement dans les cafés et restaurants européens.",
    "pt": "Aprenda a pedir bebidas, consultar preços e se comunicar com educação e fluidez em cafeterias e restaurantes europeus."
  },
  "Orientación en aeropuertos, transporte público, reservas en hoteles y pedidos culinarios completos.": {
    "en": "Airport navigation, public transit, hotel reservations, and complete culinary orders.",
    "fr": "Orientation dans les aéroports, transports publics, réservations d'hôtel et commandes au restaurant.",
    "pt": "Orientação em aeroportos, transporte público, reservas de hotel e pedidos em restaurantes."
  },
  "Construcción de frases iniciales, alfabeto fonético, números y presentación formal e informal.": {
    "en": "Building first phrases, phonetic alphabet, numbers, and formal and informal introductions.",
    "fr": "Construction des premières phrases, alphabet phonétique, nombres et présentations formelles et informelles.",
    "pt": "Construção de frases iniciais, alfabeto fonético, números e apresentação formal e informal."
  },
  "Diseñado paso a paso para consolidar gramática funcional, comprensión auditiva natural y soltura verbal.": {
    "en": "Step-by-step design to consolidate functional grammar, natural listening comprehension, and verbal ease.",
    "fr": "Conçu pas à pas pour consolider la grammaire fonctionnelle, l'écoute naturelle et l'aisance orale.",
    "pt": "Projetado passo a passo para consolidar gramática funcional, compreensão auditiva natural e fluência verbal."
  },
  "¡Unidad superada! Has desbloqueado el siguiente nivel.": {
    "en": "Unit completed! You've unlocked the next level.",
    "fr": "Unité terminée ! Vous avez débloqué le niveau suivant.",
    "pt": "Unidade concluída! Você desbloqueou o próximo nível."
  },
  "¡No pierdas tu racha hoy! Completa 1 ejercicio antes de las 23:59.": {
    "en": "Don't lose your streak today! Complete 1 exercise before 23:59.",
    "fr": "Ne perdez pas votre série aujourd'hui ! Terminez 1 exercice avant 23:59.",
    "pt": "Não perca sua sequência hoje! Complete 1 exercício antes das 23:59."
  },
  "Meta diaria:": {
    "en": "Daily goal:",
    "fr": "Objectif quotidien :",
    "pt": "Meta diária:"
  },
  "Faltan 20 XP para el bono diario": {
    "en": "20 XP left for daily bonus",
    "fr": "Plus que 20 XP pour le bonus du jour",
    "pt": "Faltam 20 XP para o bônus diário"
  },
  "65% de tu meta semanal": {
    "en": "65% of your weekly goal",
    "fr": "65% de votre objectif hebdomadaire",
    "pt": "65% da sua meta semanal"
  },
  "Experiencia Acumulada": {
    "en": "Accumulated XP",
    "fr": "Expérience accumulée",
    "pt": "Experiência Acumulada"
  },
  "5 días seguidos": {
    "en": "5 days in a row",
    "fr": "5 jours consécutifs",
    "pt": "5 dias seguidos"
  },
  "8 minutos": {
    "en": "8 minutes",
    "fr": "8 minutes",
    "pt": "8 minutos"
  },
  "15 nuevos términos": {
    "en": "15 new terms",
    "fr": "15 nouveaux termes",
    "pt": "15 novos termos"
  },
  "2 lecciones": {
    "en": "2 lessons",
    "fr": "2 leçons",
    "pt": "2 lições"
  },
  "BLOQUEADO": {
    "en": "LOCKED",
    "fr": "VERROUILLÉ",
    "pt": "BLOQUEADO"
  },
  "Bloqueada": {
    "en": "Locked",
    "fr": "Verrouillée",
    "pt": "Bloqueada"
  },
  "ORO": {
    "en": "GOLD",
    "fr": "OR",
    "pt": "OURO"
  },
  "PLATA": {
    "en": "SILVER",
    "fr": "ARGENT",
    "pt": "PRATA"
  },
  "Nivel 4 Learner": {
    "en": "Level 4 Learner",
    "fr": "Apprenant Niveau 4",
    "pt": "Aprendiz Nível 4"
  },
  "Nota: 98%": {
    "en": "Score: 98%",
    "fr": "Note : 98%",
    "pt": "Nota: 98%"
  },
  "LinguaLearn - Lección Activa: Globe Navigator": {
    "en": "LinguaLearn - Active Lesson: Globe Navigator",
    "fr": "LinguaLearn - Leçon active : Globe Navigator",
    "pt": "LinguaLearn - Lição Ativa: Globe Navigator"
  },
  "Lección Activa: Globe Navigator": {
    "en": "Active Lesson: Globe Navigator",
    "fr": "Leçon active : Globe Navigator",
    "pt": "Lição Ativa: Globe Navigator"
  },
  "¡Lección 4 Completada con éxito!": {
    "en": "Lesson 4 successfully completed!",
    "fr": "Leçon 4 terminée avec succès !",
    "pt": "Lição 4 concluída com sucesso!"
  },
  "Has completado los 5 ejercicios interactivos de la unidad.": {
    "en": "You have completed all 5 interactive exercises of the unit.",
    "fr": "Vous avez terminé les 5 exercices interactifs de l'unité.",
    "pt": "Você concluiu todos os 5 exercícios interativos da unidade."
  },
  "Progreso guardado automáticamente en tu perfil y hoja de ruta.": {
    "en": "Progress automatically saved to your profile and roadmap.",
    "fr": "Progression enregistrée automatiquement sur votre profil et feuille de route.",
    "pt": "Progresso salvo automaticamente no seu perfil e roteiro."
  },
  "Unidad 2 – Nivel A2": {
    "en": "Unit 2 – Level A2",
    "fr": "Unité 2 – Niveau A2",
    "pt": "Unidade 2 – Nível A2"
  },
  "Racha Actual": {
    "en": "Current Streak",
    "fr": "Série actuelle",
    "pt": "Sequência Atual"
  },
  "6 días seguidos": {
    "en": "6 days in a row",
    "fr": "6 jours consécutifs",
    "pt": "6 dias seguidos"
  },
  "Experiencia": {
    "en": "Experience",
    "fr": "Expérience",
    "pt": "Experiência"
  },
  "para elegir –": {
    "en": "to choose –",
    "fr": "pour choisir –",
    "pt": "para escolher –"
  },
  "avanzar": {
    "en": "continue",
    "fr": "continuer",
    "pt": "avançar"
  },
  "LinguaLearn - Laboratorio de Pronunciación": {
    "en": "LinguaLearn - Pronunciation Lab",
    "fr": "LinguaLearn - Laboratoire de prononciation",
    "pt": "LinguaLearn - Laboratório de Pronúncia"
  },
  "Laboratorio de Pronunciación": {
    "en": "Pronunciation Lab",
    "fr": "Laboratoire de prononciation",
    "pt": "Laboratório de Pronúncia"
  },
  "Entrenamiento Fonético con IA": {
    "en": "AI Phonetic Coaching",
    "fr": "Entraînement phonétique par IA",
    "pt": "Treinamento Fonético com IA"
  },
  "Ejercicio 1 de 5 – Práctica de Fonética": {
    "en": "Exercise 1 of 5 – Phonetics Practice",
    "fr": "Exercice 1 sur 5 – Pratique de phonétique",
    "pt": "Exercício 1 de 5 – Prática de Fonética"
  },
  "Casi Nativo (88%)": {
    "en": "Near Native (88%)",
    "fr": "Quasi natif (88%)",
    "pt": "Quase Nativo (88%)"
  },
  "Desglose fonético palabra por palabra:": {
    "en": "Word-by-word phonetic breakdown:",
    "fr": "Analyse phonétique mot par mot :",
    "pt": "Detalhamento fonético palavra por palavra:"
  },
  "Entonación: 86%": {
    "en": "Intonation: 86%",
    "fr": "Intonation : 86%",
    "pt": "Entonação: 86%"
  },
  "0.5x (Ultra lenta)": {
    "en": "0.5x (Ultra slow)",
    "fr": "0.5x (Très lent)",
    "pt": "0.5x (Muito lenta)"
  },
  "0.75x (Lenta)": {
    "en": "0.75x (Slow)",
    "fr": "0.75x (Lent)",
    "pt": "0.75x (Lenta)"
  },
  "1.0x (Normal)": {
    "en": "1.0x (Normal)",
    "fr": "1.0x (Normal)",
    "pt": "1.0x (Normal)"
  },
  "1.25x (Fluida)": {
    "en": "1.25x (Fluid)",
    "fr": "1.25x (Fluide)",
    "pt": "1.25x (Fluida)"
  },
  "LinguaLearn - Muro de Práctica e Intercambio": {
    "en": "LinguaLearn - Practice & Exchange Wall",
    "fr": "LinguaLearn - Mur de pratique et d'échange",
    "pt": "LinguaLearn - Mural de Prática e Intercâmbio"
  },
  "Comparte dudas, graba audios breves y recibe retroalimentación de hablantes nativos y compañeros de estudio.": {
    "en": "Share doubts, record short audios, and receive feedback from native speakers and study peers.",
    "fr": "Partagez vos doutes, enregistrez des audios courts et recevez des retours de locuteurs natifs et camarades.",
    "pt": "Compartilhe dúvidas, grave áudios curtos e receba feedback de falantes nativos e colegas de estudo."
  },
  "Publicar en la comunidad": {
    "en": "Post to Community",
    "fr": "Publier dans la communauté",
    "pt": "Publicar na comunidade"
  },
  "¿Qué te gustaría practicar o preguntar hoy?": {
    "en": "What would you like to practice or ask today?",
    "fr": "Qu'aimeriez-vous pratiquer ou demander aujourd'hui ?",
    "pt": "O que você gostaria de praticar ou perguntar hoje?"
  },
  "Publicar": {
    "en": "Post",
    "fr": "Publier",
    "pt": "Publicar"
  },
  "Filtros": {
    "en": "Filters",
    "fr": "Filtres",
    "pt": "Filtros"
  },
  "Todos": {
    "en": "All",
    "fr": "Tous",
    "pt": "Todos"
  },
  "Preguntas": {
    "en": "Questions",
    "fr": "Questions",
    "pt": "Perguntas"
  },
  "Audios": {
    "en": "Audios",
    "fr": "Audios",
    "pt": "Áudios"
  },
  "Reto del Día": {
    "en": "Daily Challenge",
    "fr": "Défi du jour",
    "pt": "Desafio do Dia"
  },
  "Me gusta": {
    "en": "Like",
    "fr": "J'aime",
    "pt": "Curtir"
  },
  "Comentarios": {
    "en": "Comments",
    "fr": "Commentaires",
    "pt": "Comentários"
  },
  "LinguaLearn - Planes de Suscripción": {
    "en": "LinguaLearn - Subscription Plans",
    "fr": "LinguaLearn - Formules d'abonnement",
    "pt": "LinguaLearn - Planos de Assinatura"
  },
  "Planes de Suscripción y Membresía": {
    "en": "Subscription & Membership Plans",
    "fr": "Plans d'abonnement et d'adhésion",
    "pt": "Planos de Assinatura e Membresia"
  },
  "Elige el plan que mejor se adapte a tu ritmo de aprendizaje y accede a todas las funciones sin límites.": {
    "en": "Choose the plan that best fits your learning pace and get unlimited access to all features.",
    "fr": "Choisissez la formule adaptée à votre rythme et accédez à toutes les fonctionnalités sans limites.",
    "pt": "Escolha o plano que melhor se adapta ao seu ritmo e acesse todas as funcionalidades sem limites."
  },
  "Plan Mensual": {
    "en": "Monthly Plan",
    "fr": "Plan mensuel",
    "pt": "Plano Mensal"
  },
  "Plan Trimestral": {
    "en": "Quarterly Plan",
    "fr": "Plan trimestriel",
    "pt": "Plano Trimestral"
  },
  "Plan Anual": {
    "en": "Annual Plan",
    "fr": "Plan annuel",
    "pt": "Plano Anual"
  },
  "Plan Vitalicio": {
    "en": "Lifetime Plan",
    "fr": "Plan à vie",
    "pt": "Plano Vitalício"
  },
  "Popular": {
    "en": "Popular",
    "fr": "Populaire",
    "pt": "Popular"
  },
  "Recomendado": {
    "en": "Recommended",
    "fr": "Recommandé",
    "pt": "Recomendado"
  },
  "/ mes": {
    "en": "/ month",
    "fr": "/ mois",
    "pt": "/ mês"
  },
  "/ año": {
    "en": "/ year",
    "fr": "/ an",
    "pt": "/ ano"
  },
  "/ siempre": {
    "en": "/ lifetime",
    "fr": "/ à vie",
    "pt": "/ vitalício"
  },
  "Acceso completo a todos los idiomas": {
    "en": "Full access to all languages",
    "fr": "Accès complet à toutes les langues",
    "pt": "Acesso total a todos os idiomas"
  },
  "Feedback fonético con Inteligencia Artificial": {
    "en": "Phonetic feedback with Artificial Intelligence",
    "fr": "Retour phonétique par Intelligence Artificielle",
    "pt": "Feedback fonético com Inteligência Artificial"
  },
  "Descarga de certificados oficiales": {
    "en": "Download official certificates",
    "fr": "Téléchargement de certificats officiels",
    "pt": "Download de certificados oficiais"
  },
  "Soporte prioritario 24/7": {
    "en": "Priority support 24/7",
    "fr": "Support prioritaire 24/7",
    "pt": "Suporte prioritário 24/7"
  },
  "Suscribirme ahora": {
    "en": "Subscribe Now",
    "fr": "S'abonner maintenant",
    "pt": "Assinar Agora"
  },
  "Canjear código de descuento": {
    "en": "Redeem discount code",
    "fr": "Échanger un code promo",
    "pt": "Resgatar código de desconto"
  },
  "Código de descuento": {
    "en": "Discount code",
    "fr": "Code de réduction",
    "pt": "Código de desconto"
  },
  "Aplicar código": {
    "en": "Apply code",
    "fr": "Appliquer le code",
    "pt": "Aplicar código"
  },
  "Ver comprobante de pago": {
    "en": "View payment receipt",
    "fr": "Voir le reçu de paiement",
    "pt": "Ver comprovante de pagamento"
  },
  "Descargar comprobante en PDF": {
    "en": "Download PDF receipt",
    "fr": "Télécharger le reçu PDF",
    "pt": "Baixar comprovante em PDF"
  },
  "LinguaLearn - Centro de Ayuda y Soporte": {
    "en": "LinguaLearn - Help & Support Center",
    "fr": "LinguaLearn - Centre d'aide et support",
    "pt": "LinguaLearn - Centro de Ajuda e Suporte"
  },
  "Centro de Ayuda y Soporte": {
    "en": "Help & Support Center",
    "fr": "Centre d'aide et support",
    "pt": "Centro de Ajuda e Suporte"
  },
  "LinguaLearn - Mis Tickets de Soporte": {
    "en": "LinguaLearn - My Support Tickets",
    "fr": "LinguaLearn - Mes tickets de support",
    "pt": "LinguaLearn - Meus Chamados de Suporte"
  },
  "Mis Tickets de Soporte": {
    "en": "My Support Tickets",
    "fr": "Mes tickets de support",
    "pt": "Meus Chamados de Suporte"
  },
  "Buscar en la base de conocimientos...": {
    "en": "Search knowledge base...",
    "fr": "Rechercher dans la base de connaissances...",
    "pt": "Buscar na base de conhecimento..."
  },
  "Preguntas Frecuentes": {
    "en": "Frequently Asked Questions",
    "fr": "Foire aux questions",
    "pt": "Perguntas Frequentes"
  },
  "Crear nuevo ticket": {
    "en": "Create New Ticket",
    "fr": "Créer un nouveau ticket",
    "pt": "Criar Novo Chamado"
  },
  "Asunto del ticket": {
    "en": "Ticket Subject",
    "fr": "Sujet du ticket",
    "pt": "Assunto do Chamado"
  },
  "Categoría": {
    "en": "Category",
    "fr": "Catégorie",
    "pt": "Categoria"
  },
  "Descripción detallada": {
    "en": "Detailed description",
    "fr": "Description détaillée",
    "pt": "Descrição detalhada"
  },
  "Enviar ticket": {
    "en": "Submit Ticket",
    "fr": "Envoyer le ticket",
    "pt": "Enviar Chamado"
  },
  "Estado": {
    "en": "Status",
    "fr": "Statut",
    "pt": "Status"
  },
  "Abierto": {
    "en": "Open",
    "fr": "Ouvert",
    "pt": "Aberto"
  },
  "En proceso": {
    "en": "In progress",
    "fr": "En cours",
    "pt": "Em andamento"
  },
  "Resuelto": {
    "en": "Resolved",
    "fr": "Résolu",
    "pt": "Resolvido"
  },
  "Prioridad": {
    "en": "Priority",
    "fr": "Priorité",
    "pt": "Prioridade"
  },
  "Alta": {
    "en": "High",
    "fr": "Élevée",
    "pt": "Alta"
  },
  "Media": {
    "en": "Medium",
    "fr": "Moyenne",
    "pt": "Média"
  },
  "Baja": {
    "en": "Low",
    "fr": "Basse",
    "pt": "Baixa"
  },
  "Aprende idiomas con inteligencia artificial adaptativa y diseño accesible.": {
    "en": "Learn languages with adaptive artificial intelligence and accessible design.",
    "fr": "Apprenez les langues avec une IA adaptative et un design accessible.",
    "pt": "Aprenda idiomas com inteligência artificial adaptativa e design acessível."
  },
  "Comenzar Ahora": {
    "en": "Start Now",
    "fr": "Commencer maintenant",
    "pt": "Começar Agora"
  },
  "Explorar Cursos": {
    "en": "Explore Courses",
    "fr": "Explorer les cours",
    "pt": "Explorar Cursos"
  },
  "¿Ya tienes una cuenta?": {
    "en": "Already have an account?",
    "fr": "Vous avez déjà un compte ?",
    "pt": "Já tem uma conta?"
  },
  "¿No tienes una cuenta?": {
    "en": "Don't have an account?",
    "fr": "Vous n'avez pas de compte ?",
    "pt": "Não tem uma conta?"
  },
  "Confirmar contraseña": {
    "en": "Confirm password",
    "fr": "Confirmer le mot de passe",
    "pt": "Confirmar senha"
  },
  "¿Olvidaste tu contraseña?": {
    "en": "Forgot your password?",
    "fr": "Mot de passe oublié ?",
    "pt": "Esqueceu sua senha?"
  },
  "Recordarme": {
    "en": "Remember me",
    "fr": "Se souvenir de moi",
    "pt": "Lembrar de mim"
  },
  "Crear cuenta gratuita": {
    "en": "Create Free Account",
    "fr": "Créer un compte gratuit",
    "pt": "Criar conta gratuita"
  },
  "O continúa con": {
    "en": "Or continue with",
    "fr": "Ou continuer avec",
    "pt": "Ou continue com"
  },
  "Términos de servicio": {
    "en": "Terms of Service",
    "fr": "Conditions d'utilisation",
    "pt": "Termos de Serviço"
  },
  "Política de privacidad": {
    "en": "Privacy Policy",
    "fr": "Politique de confidentialité",
    "pt": "Política de Privacidade"
  },
  "Abrir menú de navegación": {
    "en": "Open navigation menu",
    "fr": "Ouvrir le menu de navigation",
    "pt": "Abrir menu de navegação"
  },
  "Cerrar menú de navegación": {
    "en": "Close navigation menu",
    "fr": "Fermer le menu de navigation",
    "pt": "Fechar menu de navegação"
  }
};

  // Expresiones regulares para patrones dinámicos
  const PATTERNS = [
    {
      regex: /^Pregunta (\d+) de (\d+) · Evaluación Diagnóstica Inicial(.*)$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `Question ${m[1]} sur ${m[2]} · Évaluation diagnostique initiale${m[3]}`;
        if (lang === 'pt') return `Pergunta ${m[1]} de ${m[2]} · Avaliação Diagnóstica Inicial${m[3]}`;
        return `Question ${m[1]} of ${m[2]} · Initial Diagnostic Assessment${m[3]}`;
      }
    },
    {
      regex: /^Ejercicio (\d+) de (\d+) · Práctica de Fonética$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `Exercice ${m[1]} sur ${m[2]} · Pratique de phonétique`;
        if (lang === 'pt') return `Exercício ${m[1]} de ${m[2]} · Prática de Fonética`;
        return `Exercise ${m[1]} of ${m[2]} · Phonetics Practice`;
      }
    },
    {
      regex: /^Ejercicio (\d+) de (\d+) · Completado$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `Exercice ${m[1]} sur ${m[2]} · Terminé`;
        if (lang === 'pt') return `Exercício ${m[1]} de ${m[2]} · Concluído`;
        return `Exercise ${m[1]} of ${m[2]} · Completed`;
      }
    },
    {
      regex: /^(\d+)% completado$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `${m[1]}% complété`;
        if (lang === 'pt') return `${m[1]}% concluído`;
        return `${m[1]}% completed`;
      }
    },
    {
      regex: /^(\d+) días$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `${m[1]} jours`;
        if (lang === 'pt') return `${m[1]} dias`;
        return `${m[1]} days`;
      }
    },
    {
      regex: /^Faltan (\d+) días$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `Il reste ${m[1]} jours`;
        if (lang === 'pt') return `Faltam ${m[1]} dias`;
        return `${m[1]} days left`;
      }
    },
    {
      regex: /^(\d+) seleccionadas$/i,
      fn: (m, lang) => {
        if (lang === 'fr') return `${m[1]} sélectionnés`;
        if (lang === 'pt') return `${m[1]} selecionadas`;
        return `${m[1]} selected`;
      }
    }
  ];

  function getCurrentLang() {
    const val = localStorage.getItem(STORAGE_KEY_LANG);
    if (val && ['en', 'fr', 'pt'].includes(val)) return val;
    return 'en';
  }

  function translateText(text, targetLang) {
    if (!text || typeof text !== 'string') return text;
    const trimmed = text.trim();
    if (!trimmed) return text;

    // Verificar en diccionario exacto
    if (TRANSLATIONS[trimmed] && TRANSLATIONS[trimmed][targetLang]) {
      const translated = TRANSLATIONS[trimmed][targetLang];
      return text.replace(trimmed, translated);
    }

    // Verificar patrones dinámicos
    for (const p of PATTERNS) {
      const m = trimmed.match(p.regex);
      if (m) {
        return text.replace(trimmed, p.fn(m, targetLang));
      }
    }

    return text;
  }

  // Traduce un nodo de texto preservando el original
  function translateNode(node, targetLang) {
    if (node.nodeType === 3) { // Text node
      const val = node.nodeValue;
      if (!val || !val.trim()) return;

      if (!node._i18nOrig) {
        node._i18nOrig = val;
      }

      const original = node._i18nOrig;
      const trans = translateText(original, targetLang);
      if (trans !== val) {
        node.nodeValue = trans;
      }
    } else if (node.nodeType === 1) { // Element node
      if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT'].includes(node.tagName)) return;

      // Atributos traducibles
      ['placeholder', 'title', 'aria-label'].forEach(attr => {
        const val = node.getAttribute(attr);
        if (val && val.trim()) {
          const origKey = `_i18n_orig_${attr}`;
          if (!node[origKey]) {
            node[origKey] = val;
          }
          const trans = translateText(node[origKey], targetLang);
          if (trans !== val) {
            node.setAttribute(attr, trans);
          }
        }
      });

      // Recorrer hijos
      node.childNodes.forEach(child => translateNode(child, targetLang));
    }
  }

  // Traducir toda la página
  function translatePage(lang) {
    const targetLang = lang || getCurrentLang();
    document.documentElement.lang = targetLang;

    // Actualizar título de pestaña
    if (document.title) {
      if (!document._i18nTitleOrig) document._i18nTitleOrig = document.title;
      document.title = translateText(document._i18nTitleOrig, targetLang);
    }

    // Traducir cuerpo del documento
    if (document.body) {
      translateNode(document.body, targetLang);
    }

    // Actualizar badges e indicadores de idioma
    updateLangIndicators(targetLang);
  }

  function updateLangIndicators(targetLang) {
    const labels = {
      en: { name: 'Inglés', native: 'English', flag: '🇬🇧' },
      fr: { name: 'Francés', native: 'Français', flag: '🇫🇷' },
      pt: { name: 'Portugués', native: 'Português', flag: '🇧🇷' }
    };
    const info = labels[targetLang] || labels.en;

    document.querySelectorAll('.active-target-lang-badge').forEach(el => {
      el.textContent = `${info.flag} ${info.name}`;
    });

    document.querySelectorAll('.active-target-lang-name').forEach(el => {
      el.textContent = info.name;
    });

    document.querySelectorAll('.active-target-lang-flag').forEach(el => {
      el.textContent = info.flag;
    });

    const currBadge = document.getElementById('current-language-badge');
    if (currBadge) {
      currBadge.textContent = `${info.flag} ${info.name} (Activo)`;
    }

    // Actualizar tarjetas de selector si están en la vista
    document.querySelectorAll('.language-select-card').forEach(card => {
      const cardLang = card.getAttribute('data-lang');
      if (cardLang === targetLang) {
        card.classList.add('active');
        card.setAttribute('aria-pressed', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
      }
    });
  }

  function setLanguage(lang) {
    if (!['en', 'fr', 'pt'].includes(lang)) lang = 'en';
    localStorage.setItem(STORAGE_KEY_LANG, lang);

    // Sincronizar en usuario de LinguaApp si existe
    if (window.LinguaApp && window.LinguaApp.getUser) {
      const u = window.LinguaApp.getUser();
      u.targetLanguage = lang;
      if (window.LinguaApp.saveUser) window.LinguaApp.saveUser(u);
    }

    translatePage(lang);

    try {
      window.dispatchEvent(new CustomEvent('lingua:language-changed', { detail: { lang: lang } }));
    } catch (e) {}
  }

  // Observador de mutaciones para traducir contenido inyectado dinámicamente
  let observer = null;
  function setupMutationObserver() {
    if (observer || !window.MutationObserver) return;
    const targetLang = getCurrentLang();
    observer = new MutationObserver((mutations) => {
      mutations.forEach(mut => {
        mut.addedNodes.forEach(node => {
          if (node.nodeType === 1 || node.nodeType === 3) {
            translateNode(node, getCurrentLang());
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // API pública
  window.LinguaI18n = {
    getLanguage: getCurrentLang,
    setLanguage: setLanguage,
    t: (key) => translateText(key, getCurrentLang()),
    translatePage: () => translatePage(getCurrentLang())
  };

  // Escuchar eventos
  window.addEventListener('lingua:language-changed', (e) => {
    if (e.detail && e.detail.lang) {
      translatePage(e.detail.lang);
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY_LANG && e.newValue) {
      translatePage(e.newValue);
    }
  });

  // Inicializar al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      translatePage();
      setupMutationObserver();
    });
  } else {
    translatePage();
    setupMutationObserver();
  }
})();
