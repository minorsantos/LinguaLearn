/**
 * ============================================================================
 * LINGUALEARN - GESTOR GLOBAL DE ESTADO, SESIÓN Y AUTENTICACIÓN (app.js)
 * ============================================================================
 * Maneja registro de usuarios, login, logout, recuperación de contraseña,
 * visualización de contraseñas y persistencia multi-usuario en localStorage.
 */

(function () {
  'use strict';

  const STORAGE_KEY_USER = 'lingua_current_user';
  const STORAGE_KEY_USERS_DB = 'lingua_users_db';
  const STORAGE_KEY_TARGET_LANG = 'lingua_target_language';

  // Perfil predeterminado de Sofia Martinez
  const DEFAULT_USER = {
    name: 'Sofia Martinez',
    email: 'sofia.martinez@universidad.edu',
    password: '12345678',
    avatar: 'assets/sofia.jpg',
    targetLanguage: 'en', // 'en' (Inglés), 'fr' (Francés), 'pt' (Portugués)
    isLoggedIn: false,
    hasCompletedTest: true,
    level: 'Básico',
    levelCode: 'A2',
    streak: 5,
    xp: 120,
    dailyGoal: 100,
    todayXp: 80,
    weeklyGoalPct: 65,
    weeklyLessons: 28,
    audioAccuracy: 92,
    recordDays: 15,
    interests: ['Viajes y Turismo', 'Gastronomía y Comida', 'Negocios y Entrevistas'],
    badges: [
      { id: 'puntualidad', title: 'Puntualidad de Hierro', tier: 'ORO', icon: 'bi-trophy-fill', unlocked: true },
      { id: 'oido', title: 'Oído de Oro', tier: 'PLATA', icon: 'bi-headphones', unlocked: true },
      { id: 'poliglota', title: 'Políglota Veloz', tier: 'BLOQUEADO', icon: 'bi-lock-fill', unlocked: false }
    ],
    units: [
      { id: 1, title: 'Fundamentos y Presentación', level: 'A1', lessons: '5/5', progress: 100, status: 'completed', score: '98%' },
      { id: 2, title: 'En el Restaurante y Viajes', level: 'A2', lessons: '3/5', progress: 60, status: 'in-progress', score: null },
      { id: 3, title: 'Entrevistas de Trabajo y Negocios', level: 'B1', lessons: '0/6', progress: 0, status: 'locked', score: null }
    ],
    preferences: {
      autoSubtitles: true,
      assistedReading: true,
      reduceMotion: false
    }
  };

  // Base de datos de usuarios registrados en localStorage
  function getUsersDatabase() {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (!raw) {
      const initialDb = [DEFAULT_USER];
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(initialDb));
      return initialDb;
    }
    try {
      const parsed = JSON.parse(raw);
      // Asegurar que Sofia Martinez tenga contraseña predeterminada '12345678' si viene de 'password123'
      const sofia = parsed.find(u => u.email.toLowerCase() === DEFAULT_USER.email.toLowerCase());
      if (sofia && sofia.password === 'password123') {
        sofia.password = '12345678';
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      return [DEFAULT_USER];
    }
  }

  function saveUsersDatabase(db) {
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
  }

  // Obtener usuario activo
  function getCurrentUser() {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_USER));
      return { ...DEFAULT_USER };
    }
    try {
      const parsed = JSON.parse(data);
      if (parsed.email && parsed.email.toLowerCase() === DEFAULT_USER.email.toLowerCase() && parsed.password === 'password123') {
        parsed.password = '12345678';
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(parsed));
      }
      return parsed;
    } catch (e) {
      return { ...DEFAULT_USER };
    }
  }

  // Guardar usuario activo
  function saveCurrentUser(user) {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    // Sincronizar también en la base de datos
    const db = getUsersDatabase();
    const idx = db.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx !== -1) {
      db[idx] = { ...db[idx], ...user };
    } else {
      db.push(user);
    }
    saveUsersDatabase(db);
    syncAuthState();
    syncHeaderStats();
  }

  
  // Verificación de inicio de sesión
  function isUserLoggedIn() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (!data) return false;
      const parsed = JSON.parse(data);
      return Boolean(parsed && parsed.isLoggedIn === true);
    } catch (e) {
      return false;
    }
  }

  // Sincronizar clases de autenticación en <html> y <body> y actualizar la barra de navegación
  function syncAuthState() {
    const loggedIn = isUserLoggedIn();
    const guestNav = document.getElementById('nav-guest-actions');
    const guestWrapper = document.getElementById('guest-hero-wrapper');
    const loggedWrapper = document.getElementById('logged-hero-wrapper');

    if (loggedIn) {
      document.documentElement.classList.add('user-logged-in');
      document.documentElement.classList.remove('user-not-logged-in');
      if (document.body) {
        document.body.classList.add('user-logged-in');
        document.body.classList.remove('user-not-logged-in');
      }

      // Eliminar por completo el botón de iniciar sesión sin dejar ningún espacio
      if (guestNav) {
        guestNav.style.setProperty('display', 'none', 'important');
        guestNav.style.setProperty('visibility', 'hidden', 'important');
        guestNav.style.setProperty('width', '0', 'important');
        guestNav.style.setProperty('height', '0', 'important');
        guestNav.style.setProperty('margin', '0', 'important');
        guestNav.style.setProperty('padding', '0', 'important');
        guestNav.classList.add('d-none');
        guestNav.classList.remove('d-flex');
      }

      if (guestWrapper) {
        guestWrapper.style.setProperty('display', 'none', 'important');
        guestWrapper.classList.add('d-none');
        guestWrapper.classList.remove('d-flex');
      }

      if (loggedWrapper) {
        loggedWrapper.style.removeProperty('display');
        loggedWrapper.classList.remove('d-none');
      }

      document.querySelectorAll('.auth-only-guest').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
        el.classList.add('d-none');
      });

      document.querySelectorAll('.auth-only-logged-in').forEach(el => {
        el.style.removeProperty('display');
        el.classList.remove('d-none');
      });
    } else {
      document.documentElement.classList.add('user-not-logged-in');
      document.documentElement.classList.remove('user-logged-in');
      if (document.body) {
        document.body.classList.add('user-not-logged-in');
        document.body.classList.remove('user-logged-in');
      }

      if (guestNav) {
        guestNav.style.removeProperty('display');
        guestNav.style.removeProperty('visibility');
        guestNav.style.removeProperty('width');
        guestNav.style.removeProperty('height');
        guestNav.style.removeProperty('margin');
        guestNav.style.removeProperty('padding');
        guestNav.classList.remove('d-none');
        guestNav.classList.add('d-flex');
      }

      if (guestWrapper) {
        guestWrapper.style.removeProperty('display');
        guestWrapper.classList.remove('d-none');
        guestWrapper.classList.add('d-flex');
      }

      if (loggedWrapper) {
        loggedWrapper.style.setProperty('display', 'none', 'important');
        loggedWrapper.classList.add('d-none');
      }

      document.querySelectorAll('.auth-only-guest').forEach(el => {
        el.style.removeProperty('display');
        el.classList.remove('d-none');
      });

      document.querySelectorAll('.auth-only-logged-in').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
        el.classList.add('d-none');
      });
    }
  }

  // Inicialización de primer acceso para garantizar estado inicial no autenticado
  if (localStorage.getItem('lingua_auth_v3_init') !== 'true') {
    localStorage.setItem('lingua_auth_v3_init', 'true');
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (raw) {
      try {
        const u = JSON.parse(raw);
        u.isLoggedIn = false;
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
      } catch (e) {}
    }
  }

  // Sincronizar estadísticas y nombre en la barra de navegación
  function syncHeaderStats() {
    const user = getCurrentUser();

    // Actualizar racha
    document.querySelectorAll('.stat-streak-val').forEach(el => {
      el.textContent = `${user.streak || 0} días`;
    });

    // Actualizar XP
    document.querySelectorAll('.stat-xp-val').forEach(el => {
      el.textContent = `${user.xp || 0} XP`;
    });

    // Actualizar nombre de usuario si existe
    document.querySelectorAll('.user-display-name').forEach(el => {
      el.textContent = user.name;
    });

    // Actualizar nivel
    document.querySelectorAll('.user-level-badge').forEach(el => {
      el.textContent = `Nivel ${user.levelCode || 'A1'} - ${user.level || 'Inicial'} Activo`;
    });

    // Actualizar avatar e imagen de perfil
    document.querySelectorAll('.header-avatar-img, .profile-avatar-img').forEach(img => {
      if (user.avatar) {
        img.src = user.avatar;
      }
      img.alt = `Foto de perfil de ${user.name}`;
    });

    // Configurar menú de usuario / avatar dropdown en el navbar
    setupHeaderAvatarDropdown(user);
  }

  // Menú desplegable en el avatar y botón de usuario en navbar con opción de Cerrar Sesión
  function setupHeaderAvatarDropdown(user) {
    // 1. Enlazar todos los botones de Cerrar Sesión existentes
    document.querySelectorAll('.btn-global-logout').forEach(btn => {
      if (btn.dataset.boundLogout === 'true') return;
      btn.dataset.boundLogout = 'true';
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        logoutUser();
      });
    });

    // 2. Soporte para enlaces o botones de avatar dinámicos si no tienen menú
    document.querySelectorAll('.header-avatar-btn').forEach(btn => {
      const parent = btn.parentElement;
      if (!parent.classList.contains('dropdown') && !btn.closest('.dropdown')) {
        parent.classList.add('dropdown');
        btn.setAttribute('data-bs-toggle', 'dropdown');
        btn.setAttribute('aria-expanded', 'false');
        btn.style.cursor = 'pointer';

        btn.addEventListener('click', function (e) {
          e.preventDefault();
        });

        const menu = document.createElement('ul');
        menu.className = 'dropdown-menu dropdown-menu-end shadow-lg border-0 card-custom test-card-glass p-2 mt-2';
        menu.style.minWidth = '250px';
        menu.style.zIndex = '1080';

        menu.innerHTML = `
          <li class="px-3 py-2 border-bottom mb-1">
            <div class="fw-bold text-dark text-truncate">${user.name}</div>
            <div class="small text-secondary text-truncate" style="font-size: 0.775rem;">${user.email}</div>
            <div class="badge bg-primary-subtle text-primary mt-1" style="font-size: 0.7rem;">Nivel: ${user.levelCode || 'A2'} (${user.level || 'Básico'})</div>
          </li>
          <li>
            <a class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2" href="perfil.html">
              <i class="bi bi-person-circle text-primary"></i> <span>Mi Perfil y Logros</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2" href="dashboard.html">
              <i class="bi bi-speedometer2 text-success"></i> <span>Mi Dashboard</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2" href="suscripcion.html">
              <i class="bi bi-gem text-warning"></i> <span>Suscripciones de estudio</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2" href="soporte.html">
              <i class="bi bi-question-circle text-info"></i> <span>Centro de Ayuda</span>
            </a>
          </li>
          <li><hr class="dropdown-divider my-1"></li>
          <li>
            <button type="button" class="dropdown-item rounded-2 py-2 small text-danger d-flex align-items-center gap-2 btn-global-logout fw-semibold">
              <i class="bi bi-box-arrow-right"></i> <span>Cerrar Sesión</span>
            </button>
          </li>
        `;

        parent.appendChild(menu);

        menu.querySelector('.btn-global-logout')?.addEventListener('click', function () {
          logoutUser();
        });
      }
    });
  }

  // 1. Registro de nuevo usuario
  function registerUser(name, email, password) {
    if (!name || !email || !password) {
      showToast('Por favor completa todos los campos del registro.', 'error');
      return false;
    }

    const cleanEmail = email.trim().toLowerCase();
    const db = getUsersDatabase();

    // Comprobar si el correo ya existe
    const existing = db.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast('Este correo electrónico ya está registrado. Intenta iniciar sesión.', 'error');
      return false;
    }

    const newUser = {
      ...DEFAULT_USER,
      name: name.trim(),
      email: cleanEmail,
      password: password,
      avatar: 'assets/sofia.jpg',
      isLoggedIn: true,
      hasCompletedTest: false,
      streak: 1,
      xp: 0,
      todayXp: 0,
      level: 'Sin calibrar',
      levelCode: 'Inicial'
    };

    db.push(newUser);
    saveUsersDatabase(db);
    saveCurrentUser(newUser);

    showToast(`¡Bienvenido/a ${newUser.name}! Tu cuenta fue creada exitosamente.`, 'success');

    // Redirigir a evaluación diagnóstica
    setTimeout(() => {
      window.location.href = 'test-diagnostico.html';
    }, 700);

    return true;
  }

  // 2. Inicio de sesión
  function loginUser(email, password) {
    if (!email) {
      const emailInput = document.getElementById('hero-user-input')?.value;
      email = emailInput || '';
    }
    if (!password) {
      const passInput = document.getElementById('hero-pass-input')?.value;
      if (passInput) {
        password = passInput;
      } else if (email && email.trim().toLowerCase() === 'sofia.martinez@universidad.edu') {
        password = '12345678';
      }
    }

    if (!email || !password) {
      showToast('Por favor introduce tu correo y contraseña.', 'error');
      return false;
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();
    const db = getUsersDatabase();
    const user = db.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      showToast('No existe ninguna cuenta asociada a este correo.', 'error');
      return false;
    }

    // Para Sofia Martinez (cuenta predeterminada), validar con '12345678', 'password123' o su contraseña guardada
    let isPasswordValid = false;
    if (cleanEmail === 'sofia.martinez@universidad.edu') {
      isPasswordValid = (user.password === cleanPass) || (cleanPass === '12345678') || (cleanPass === 'password123');
    } else {
      isPasswordValid = (user.password === cleanPass);
    }

    if (!isPasswordValid) {
      showToast('Contraseña incorrecta. Puedes usar la opción "¿Olvidaste tu contraseña?".', 'error');
      return false;
    }

    // Login exitoso
    user.isLoggedIn = true;
    saveCurrentUser(user);
    syncAuthState();
    showToast(`¡Hola de nuevo, ${user.name}! Sesión iniciada.`, 'success');

    setTimeout(() => {
      window.location.href = user.hasCompletedTest ? 'dashboard.html' : 'test-diagnostico.html';
    }, 600);

    return true;
  }

  // 3. Cierre de sesión
  function logoutUser() {
    const user = getCurrentUser();
    user.isLoggedIn = false;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    syncAuthState();
    showToast('Has cerrado sesión correctamente. ¡Hasta pronto!', 'info');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  }

  // 4. Verificación de correo para Recuperación de Contraseña
  function verifyEmailForRecovery(email) {
    if (!email) return false;
    const cleanEmail = email.trim().toLowerCase();
    const db = getUsersDatabase();
    return db.find(u => u.email.toLowerCase() === cleanEmail) || null;
  }

  // 5. Restablecer / Cambiar Contraseña
  function resetPassword(email, newPassword) {
    if (!email || !newPassword) return false;
    const cleanEmail = email.trim().toLowerCase();
    const db = getUsersDatabase();
    const idx = db.findIndex(u => u.email.toLowerCase() === cleanEmail);

    if (idx === -1) {
      showToast('No se encontró el correo registrado en el sistema.', 'error');
      return false;
    }

    db[idx].password = newPassword;
    saveUsersDatabase(db);

    // Si es el usuario activo, actualizar también
    const current = getCurrentUser();
    if (current.email.toLowerCase() === cleanEmail) {
      current.password = newPassword;
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(current));
    }

    showToast('¡Contraseña actualizada con éxito! Ya puedes iniciar sesión con tu nueva clave.', 'success');
    return true;
  }

  // 6. Configuración de conmutadores para mostrar/ocultar contraseñas
  function setupPasswordToggles() {
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
      // Evitar duplicar listeners
      if (btn.dataset.boundToggle === 'true') return;
      btn.dataset.boundToggle = 'true';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const inputGroup = this.closest('.input-group') || this.closest('.input-warm-group') || this.parentElement;
        const input = inputGroup?.querySelector('input[type="password"], input[type="text"]');
        if (!input) return;

        const isPassword = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPassword ? 'text' : 'password');

        const icon = this.querySelector('i');
        if (icon) {
          icon.className = isPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill';
        }
      });
    });
  }

  // Sumar XP a la cuenta
  function addExperience(amount) {
    const user = getCurrentUser();
    user.xp = (user.xp || 0) + amount;
    user.todayXp = Math.min((user.todayXp || 0) + amount, 100);
    saveCurrentUser(user);
    return user.xp;
  }

  // Sistema de Notificaciones Toast Accesibles
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('lingua-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'lingua-toast-container';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '9999';
      document.body.appendChild(toastContainer);
    }

    // Limpiar alertas anteriores para evitar acumulación excesiva
    toastContainer.innerHTML = '';

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success text-white' : type === 'error' ? 'bg-danger text-white' : 'bg-primary text-white';
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg rounded-3" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi ${iconClass} fs-5"></i>
            <span class="small fw-medium">${message}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && window.bootstrap.Toast) {
      const bsToast = new window.bootstrap.Toast(toastEl, { delay: 4200 });
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    } else {
      setTimeout(() => toastEl.remove(), 4200);
    }
  }

  // Configuración de formularios de Auth y Recuperación
  function setupAuthForms() {
    setupPasswordToggles();

    // 1. Formulario de Login en Hero de index.html
    const heroLoginForm = document.getElementById('form-hero-login');
    if (heroLoginForm) {
      heroLoginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('hero-user-input')?.value;
        const pass = document.getElementById('hero-pass-input')?.value;
        loginUser(email, pass);
      });
    }

    // 2. Formulario de Registro Rápido
    const regForm = document.getElementById('form-modal-register');
    const registerModalEl = document.getElementById('modal-register-hero');

    // Manejar eventos del modal para evitar congelamiento de pantalla y capas superpuestas
    if (registerModalEl) {
      registerModalEl.addEventListener('hidden.bs.modal', function () {
        // Limpiar cualquier backdrop residual
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');

        // Retornar foco al formulario de inicio de sesión
        const userInput = document.getElementById('hero-user-input');
        if (userInput) userInput.focus();
      });
    }

    if (regForm) {
      regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('reg-name')?.value;
        const email = document.getElementById('reg-email')?.value;
        const pass1 = document.getElementById('reg-password')?.value;
        const pass2 = document.getElementById('reg-password-confirm')?.value;

        if (!name || !email || !pass1 || !pass2) {
          showToast('Por favor completa todos los campos del registro.', 'error');
          return;
        }

        if (pass1 !== pass2) {
          showToast('Las contraseñas no coinciden. Por favor verifícalas.', 'error');
          return;
        }

        if (pass1.length < 6) {
          showToast('La contraseña debe tener al menos 6 caracteres.', 'error');
          return;
        }

        // Cerrar modal antes de registrar
        if (window.bootstrap && window.bootstrap.Modal && registerModalEl) {
          const m = window.bootstrap.Modal.getInstance(registerModalEl);
          if (m) m.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');

        registerUser(name, email, pass1);
      });
    }

    // 3. Flujo del Modal de Recuperación de Contraseña
    const btnVerifyRecoveryEmail = document.getElementById('btn-verify-recovery-email');
    const btnConfirmResetPass = document.getElementById('btn-confirm-reset-pass');
    let emailBeingRecovered = '';

    if (btnVerifyRecoveryEmail) {
      btnVerifyRecoveryEmail.addEventListener('click', function () {
        const emailInput = document.getElementById('recovery-email-input');
        const email = emailInput?.value.trim();

        if (!email || !email.includes('@')) {
          showToast('Por favor introduce un correo electrónico válido.', 'error');
          return;
        }

        const user = verifyEmailForRecovery(email);
        if (!user) {
          showToast('No encontramos ninguna cuenta con ese correo electrónico.', 'error');
          return;
        }

        emailBeingRecovered = email;

        // Pasar al Paso 2: Introducir nueva contraseña
        document.getElementById('recovery-step-1')?.classList.add('d-none');
        document.getElementById('recovery-step-2')?.classList.remove('d-none');
        document.getElementById('lbl-recovery-target-email').textContent = email;
      });
    }

    if (btnConfirmResetPass) {
      btnConfirmResetPass.addEventListener('click', function () {
        const pass1 = document.getElementById('new-password-input')?.value;
        const pass2 = document.getElementById('confirm-new-password-input')?.value;

        if (!pass1 || !pass2) {
          showToast('Por favor introduce y confirma tu nueva contraseña.', 'error');
          return;
        }

        if (pass1 !== pass2) {
          showToast('Las contraseñas no coinciden.', 'error');
          return;
        }

        if (pass1.length < 6) {
          showToast('La nueva contraseña debe tener al menos 6 caracteres.', 'error');
          return;
        }

        const success = resetPassword(emailBeingRecovered, pass1);
        if (success) {
          // Pasar al Paso 3: Confirmación y botón de inicio de sesión
          document.getElementById('recovery-step-2')?.classList.add('d-none');
          document.getElementById('recovery-step-3')?.classList.remove('d-none');

          // Pre-rellenar en el login si estamos en index.html
          const heroUserInput = document.getElementById('hero-user-input');
          const heroPassInput = document.getElementById('hero-pass-input');
          if (heroUserInput) heroUserInput.value = emailBeingRecovered;
          if (heroPassInput) {
            heroPassInput.value = pass1;
            heroPassInput.focus();
          }
        }
      });
    }
  }

  // Transiciones fluidas entre páginas
  function setupPageTransitions() {
    if (document.body.classList.contains('reduce-motion') || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || 
          href.startsWith('#') || 
          href.startsWith('javascript:') || 
          href.startsWith('mailto:') || 
          link.target === '_blank' || 
          link.hasAttribute('data-bs-toggle') ||
          link.hasAttribute('data-bs-target')) {
        return;
      }

      if (href.endsWith('.html') || href.includes('.html#') || href.includes('.html?')) {
        link.addEventListener('click', function(e) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          document.body.classList.add('page-is-exiting');
          setTimeout(() => {
            window.location.href = href;
          }, 160);
        });
      }
    });

    window.addEventListener('pageshow', () => {
      document.body.classList.remove('page-is-exiting');
    });
  }

  // =========================================================================
  // GESTOR DE SOPORTE MULTIIDIOMA (INGLÉS, FRANCÉS, PORTUGUÉS)
  // =========================================================================
  const LANGUAGE_CONFIGS = {
    en: {
      code: 'en',
      name: 'Inglés',
      flag: '🇬🇧',
      speechLang: 'en-US',
      goalText: 'Meta: Inglés Profesional (B2)',
      unitTitle: 'Unidad 2: Vocabulario de la Vida Diaria y Cafetería',
      scenarioLabel: 'Cafetería & Encuentros Urbanos (Londres)',
      glossary: [
        { term: 'Coffee', es: 'Café (bebida caliente)', phonetic: '/ˈkɔː.fi/' },
        { term: 'Bill', es: 'La cuenta / factura', phonetic: '/bɪl/' },
        { term: 'Order', es: 'Ordenar / pedir', phonetic: '/ˈɔːr.dər/' }
      ]
    },
    fr: {
      code: 'fr',
      name: 'Francés',
      flag: '🇫🇷',
      speechLang: 'fr-FR',
      goalText: 'Meta: Francés Conversacional (B1)',
      unitTitle: 'Unité 2 : Vocabulaire du Quotidien et Café Parisien',
      scenarioLabel: 'Café & Rencontres Urbaines (Paris)',
      glossary: [
        { term: 'Café', es: 'Café (boisson chaude)', phonetic: '/ka.fe/' },
        { term: "L'addition", es: 'La cuenta / factura', phonetic: '/la.di.sjɔ̃/' },
        { term: 'Commander', es: 'Ordenar / pedir', phonetic: '/kɔ.mɑ̃.de/' }
      ]
    },
    pt: {
      code: 'pt',
      name: 'Portugués',
      flag: '🇧🇷',
      speechLang: 'pt-BR',
      goalText: 'Meta: Portugués Fluido (B1)',
      unitTitle: 'Unidade 2: Vocabulário do Dia a Dia e Cafeteria',
      scenarioLabel: 'Cafeteria & Encontros Urbanos (Lisboa / Rio)',
      glossary: [
        { term: 'Café', es: 'Café (bebida quente)', phonetic: '/kaˈfɛ/' },
        { term: 'A conta', es: 'La cuenta / factura', phonetic: '/a ˈkõ.tɐ/' },
        { term: 'Pedir', es: 'Ordenar / pedir', phonetic: '/peˈdʒiʁ/' }
      ]
    }
  };

  function getTargetLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY_TARGET_LANG);
    if (stored && ['en', 'fr', 'pt'].includes(stored)) {
      return stored;
    }
    const user = getCurrentUser();
    if (user && user.targetLanguage && ['en', 'fr', 'pt'].includes(user.targetLanguage)) {
      localStorage.setItem(STORAGE_KEY_TARGET_LANG, user.targetLanguage);
      return user.targetLanguage;
    }
    return 'en';
  }

  function setTargetLanguage(lang) {
    if (!['en', 'fr', 'pt'].includes(lang)) lang = 'en';
    localStorage.setItem(STORAGE_KEY_TARGET_LANG, lang);
    const user = getCurrentUser();
    user.targetLanguage = lang;
    saveCurrentUser(user);
    updateLanguageBadges(lang);
    try {
      window.dispatchEvent(new CustomEvent('lingua:language-changed', { detail: { lang: lang } }));
    } catch (e) {}
    return lang;
  }

  function getLanguageConfig(lang) {
    const l = lang || getTargetLanguage();
    return LANGUAGE_CONFIGS[l] || LANGUAGE_CONFIGS.en;
  }

  function updateLanguageBadges(lang) {
    const cfg = getLanguageConfig(lang);
    document.querySelectorAll('.active-target-lang-name').forEach(el => el.textContent = cfg.name);
    document.querySelectorAll('.active-target-lang-flag').forEach(el => el.textContent = cfg.flag);
    document.querySelectorAll('.active-target-lang-badge').forEach(el => el.textContent = `${cfg.flag} ${cfg.name}`);
    const metaEl = document.getElementById('profile-meta-text');
    if (metaEl) metaEl.innerHTML = `<i class="bi bi-bullseye me-1"></i> ${cfg.goalText}`;
  }

  // ==========================================================================
  // CONFIGURACIÓN DEL MENÚ Y CONTROL CENTER DE PANTALLA COMPLETA
  // ==========================================================================
  function setupResponsiveNavbar() {
    const hamburgerBtn = document.getElementById('btn-navbar-hamburger') || document.querySelector('.hamburger-nav-btn');
    const navbarContent = document.getElementById('navbarContent');

    if (!hamburgerBtn || !navbarContent) return;

    if (hamburgerBtn.dataset.boundHamburger === 'true') return;
    hamburgerBtn.dataset.boundHamburger = 'true';

    const symbolSpan = hamburgerBtn.querySelector('.hamburger-symbol') || hamburgerBtn;

    function toggleMenu(forceState) {
      const isCurrentlyOpen = navbarContent.classList.contains('show') || navbarContent.classList.contains('is-open');
      const willOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

      if (typeof playMicroClick === 'function') {
        try { playMicroClick(); } catch (e) {}
      }

      if (willOpen) {
        navbarContent.classList.add('show', 'is-open');
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Cerrar panel de opciones');
        document.body.classList.add('mobile-menu-open');
        if (symbolSpan && symbolSpan.classList.contains('hamburger-symbol')) {
          symbolSpan.textContent = '✕';
        }
      } else {
        navbarContent.classList.remove('show', 'is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir panel de opciones');
        document.body.classList.remove('mobile-menu-open');
        if (symbolSpan && symbolSpan.classList.contains('hamburger-symbol')) {
          symbolSpan.textContent = '☰';
        }
      }
    }

    // Toggle al hacer clic o tap en el botón hamburguesa
    hamburgerBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Enlazar botón de cierre dentro de la cabecera del overlay móvil
    const closeBtn = navbarContent.querySelector('.navbar-mobile-close-btn') || document.getElementById('btn-close-navbar-modal');
    if (closeBtn && closeBtn.dataset.boundClose !== 'true') {
      closeBtn.dataset.boundClose = 'true';
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(false);
      });
    }

    // Cerrar inmediatamente al hacer clic en cualquier opción, enlace o botón del overlay
    navbarContent.querySelectorAll('a, .nav-link-custom, .dropdown-item, .nav-link, .btn-navbar-logout, .btn-global-logout').forEach(link => {
      link.addEventListener('click', function () {
        if (!this.classList.contains('dropdown-toggle')) {
          toggleMenu(false);
        }
      });
    });

    // Cerrar al hacer clic fuera del panel en móviles
    document.addEventListener('click', function (e) {
      if (navbarContent.classList.contains('show') || navbarContent.classList.contains('is-open')) {
        if (!navbarContent.contains(e.target) && !hamburgerBtn.contains(e.target)) {
          toggleMenu(false);
        }
      }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (navbarContent.classList.contains('show') || navbarContent.classList.contains('is-open')) {
          toggleMenu(false);
          hamburgerBtn.focus();
        }
      }
    });

    // Reajustar al cambiar de orientación o redimensionar a pantalla de escritorio
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 992 && window.innerHeight > 600) {
        navbarContent.classList.remove('show', 'is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir panel de opciones');
        document.body.classList.remove('mobile-menu-open');
        if (symbolSpan && symbolSpan.classList.contains('hamburger-symbol')) {
          symbolSpan.textContent = '☰';
        }
      }
    });
  }

  // Exponer API global
  window.LinguaApp = {
    getUser: getCurrentUser,
    saveUser: saveCurrentUser,
    getUsersDb: getUsersDatabase,
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    verifyEmail: verifyEmailForRecovery,
    resetPassword: resetPassword,
    setupPasswordToggles: setupPasswordToggles,
    addXP: addExperience,
    showToast: showToast,
    syncHeader: syncHeaderStats,
    isLoggedIn: isUserLoggedIn,
    syncAuth: syncAuthState,
    getTargetLanguage: getTargetLanguage,
    setTargetLanguage: setTargetLanguage,
    getLanguageConfig: getLanguageConfig,
    updateLanguageBadges: updateLanguageBadges,
    setupResponsiveNavbar: setupResponsiveNavbar
  };


  // Atajo Alt + R para modo oscuro
  document.addEventListener('keydown', function(e) {
    if (e.altKey && (e.key === 'r' || e.key === 'R')) {
      e.preventDefault();
      const currentTheme = localStorage.getItem('lingua_theme') || 'light';
      if (currentTheme === 'light') {
        localStorage.setItem('lingua_theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-mode');
        document.querySelectorAll('.btn-toggle-darkmode .darkmode-text').forEach(el => el.textContent = 'Modo Claro');
      } else {
        localStorage.setItem('lingua_theme', 'light');
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('dark-mode');
        document.querySelectorAll('.btn-toggle-darkmode .darkmode-text').forEach(el => el.textContent = 'Modo Oscuro');
      }
    }
  });


  // =========================================================================
  // GESTIÓN REACTIVA DE ESTADO LINGUALEARN PRO (SOFÍA MARTÍNEZ)
  // =========================================================================
  function syncProStatus() {
    const isPro = localStorage.getItem('lingua_user_pro_active') === 'true';

    // 1. Navbar: Asegurar botón exclusivo PRO con diseño único
    const navLists = document.querySelectorAll('.navbar-nav');
    navLists.forEach(ul => {
      let proItem = ul.querySelector('.pro-nav-item');
      if (!proItem && isPro) {
        proItem = document.createElement('li');
        proItem.className = 'nav-item pro-nav-item';
        proItem.id = 'nav-item-pro-tab';
        proItem.innerHTML = `
          <a class="nav-link nav-link-pro-special" href="panel-pro.html" title="Ingresar a tu espacio exclusivo LinguaLearn PRO">
            <div class="nav-link-icon-box icon-box-pro">
              <i class="bi bi-stars"></i>
            </div>
            <div class="nav-link-text-box">
              <span class="nav-link-title">LinguaLearn PRO</span>
              <span class="nav-link-desc">Espacio Exclusivo</span>
            </div>
          </a>
        `;
        ul.appendChild(proItem);
      } else if (proItem) {
        proItem.style.display = isPro ? 'block' : 'none';
      }
    });

    // 2. Banner de estado PRO activo en Suscripción
    const activeBanner = document.getElementById('pro-already-active-banner');
    if (activeBanner) {
      activeBanner.style.display = isPro ? 'block' : 'none';
    }

    // 3. Menú desplegable de perfil de usuario
    const userRoleBadges = document.querySelectorAll('.user-level-badge');
    if (isPro) {
      userRoleBadges.forEach(b => {
        b.className = 'badge bg-warning text-dark mt-1 user-level-badge fw-bold';
        b.innerHTML = '<i class="bi bi-stars me-1"></i>Membresía PRO Activa';
      });
    }
  }
  window.syncProStatus = syncProStatus;

  // Inicializar al cargar
  document.addEventListener('DOMContentLoaded', () => {
  // Remover preload-theme despues de la primera carga para permitir transiciones
  setTimeout(() => {
    document.body.classList.remove('preload-theme');
  }, 100);

    syncAuthState();
    syncHeaderStats();
    updateLanguageBadges(getTargetLanguage());
    setupAuthForms();
    setupPageTransitions();
    setupResponsiveNavbar();
    syncProStatus();
  });
})();
