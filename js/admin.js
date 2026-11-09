/**
 * ============================================================================
 * LINGUALEARN - CONTROLADOR INTEGRAL DEL MENÚ DEL ADMINISTRADOR (admin.js)
 * Sistema reactivo con Menú Lateral, 8 Gráficos Chart.js, CRUD y Reportes
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. VERIFICACIÓN Y AUTENTICACIÓN DEL ADMINISTRADOR
  const ADMIN_SESSION_KEY = 'lingua_admin_session';
  const STUDENTS_KEY = 'lingua_admin_students';
  const SALES_KEY = 'lingua_admin_sales';
  const PLANS_KEY = 'lingua_admin_plans';
  const LOGS_KEY = 'lingua_admin_audit_logs';
  const ADMINS_KEY = 'lingua_admin_accounts';

  function checkAdminAuth() {
    try {
      let session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || '{}');
      if (!session || session.isLoggedIn !== true || session.isAdmin !== true) {
        // En caso de acceso directo sin login previo, inicializar sesión demo directiva
        session = {
          isLoggedIn: true,
          isAdmin: true,
          role: 'SuperAdmin',
          name: 'Director Administrativo',
          email: 'admin@lingualearn.edu',
          avatar: 'assets/sofia.jpg',
          token: 'lingua_admin_token_' + Date.now(),
          loginTime: new Date().toISOString()
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      }
      return session;
    } catch (e) {
      return { isLoggedIn: true, isAdmin: true, name: 'Director Administrativo', email: 'admin@lingualearn.edu' };
    }
  }

  const currentAdmin = checkAdminAuth();

  // 2. SEMILLERO DE DATOS INICIALES POR DEFECTO
  function initDefaultData() {
    // A. Estudiantes
    if (!localStorage.getItem(STUDENTS_KEY)) {
      const defaultStudents = [
        { id: 'EST-101', name: 'Sofia Martinez', email: 'sofia.mtz@gmail.com', phone: '+51 987 654 321', level: 'B2', progress: 84, streak: 18, xp: 3420, plan: 'Premium Anual', status: 'Activo', registeredAt: '2024-01-15', lastAccess: 'Hoy 09:20', skills: { grammar: 88, vocab: 92, reading: 85, writing: 78, speaking: 82 } },
        { id: 'EST-102', name: 'Carlos Mendoza', email: 'carlos.m@hotmail.com', phone: '+51 912 345 678', level: 'A2', progress: 52, streak: 7, xp: 1250, plan: 'Básico Mensual', status: 'Activo', registeredAt: '2024-02-01', lastAccess: 'Ayer 18:45', skills: { grammar: 60, vocab: 55, reading: 50, writing: 42, speaking: 52 } },
        { id: 'EST-103', name: 'Elena Ramos Gomez', email: 'elena.rg@outlook.com', phone: '+51 998 877 665', level: 'C1', progress: 95, streak: 45, xp: 7800, plan: 'Empresarial', status: 'Activo', registeredAt: '2023-11-10', lastAccess: 'Hoy 10:15', skills: { grammar: 96, vocab: 98, reading: 94, writing: 90, speaking: 95 } },
        { id: 'EST-104', name: 'Mateo Quispe', email: 'm.quispe@gmail.com', phone: '+51 945 123 789', level: 'A1', progress: 38, streak: 3, xp: 620, plan: 'Básico Mensual', status: 'Alerta', registeredAt: '2024-02-12', lastAccess: 'Hace 4 días', skills: { grammar: 40, vocab: 45, reading: 35, writing: 30, speaking: 42 } },
        { id: 'EST-105', name: 'Valeria Benitez', email: 'valeria.b@gmail.com', phone: '+51 963 852 741', level: 'B1', progress: 72, streak: 12, xp: 2600, plan: 'Premium Anual', status: 'Activo', registeredAt: '2024-01-20', lastAccess: 'Hoy 08:00', skills: { grammar: 75, vocab: 80, reading: 70, writing: 68, speaking: 74 } },
        { id: 'EST-106', name: 'Diego Fernando Torres', email: 'd.torres@empresa.com', phone: '+51 974 123 654', level: 'B2', progress: 68, streak: 9, xp: 2450, plan: 'Empresarial', status: 'Activo', registeredAt: '2023-12-05', lastAccess: 'Ayer 15:30', skills: { grammar: 70, vocab: 72, reading: 75, writing: 62, speaking: 65 } },
        { id: 'EST-107', name: 'Lucia Fernandez', email: 'lucia.f@gmail.com', phone: '+51 932 147 852', level: 'A1', progress: 24, streak: 1, xp: 410, plan: 'Básico Mensual', status: 'Alerta', registeredAt: '2024-02-18', lastAccess: 'Hace 6 días', skills: { grammar: 28, vocab: 32, reading: 20, writing: 18, speaking: 22 } },
        { id: 'EST-108', name: 'Javier Morales', email: 'j.morales@yahoo.es', phone: '+51 981 234 567', level: 'C2', progress: 98, streak: 62, xp: 11200, plan: 'Empresarial', status: 'Activo', registeredAt: '2023-09-01', lastAccess: 'Hoy 11:40', skills: { grammar: 99, vocab: 98, reading: 97, writing: 96, speaking: 99 } },
        { id: 'EST-109', name: 'Camila Rojas', email: 'camila.rojas@gmail.com', phone: '+51 954 789 321', level: 'A2', progress: 46, streak: 4, xp: 980, plan: 'Básico Mensual', status: 'Inactivo', registeredAt: '2024-01-10', lastAccess: 'Hace 2 semanas', skills: { grammar: 48, vocab: 50, reading: 44, writing: 40, speaking: 45 } },
        { id: 'EST-110', name: 'Gabriel Vargas', email: 'g.vargas@gmail.com', phone: '+51 925 874 136', level: 'B1', progress: 64, streak: 11, xp: 2150, plan: 'Premium Anual', status: 'Activo', registeredAt: '2024-01-28', lastAccess: 'Hoy 07:30', skills: { grammar: 66, vocab: 70, reading: 65, writing: 58, speaking: 62 } }
      ];
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(defaultStudents));
    }

    // B. Ventas
    if (!localStorage.getItem(SALES_KEY)) {
      const defaultSales = [
        { id: 'TRX-9481', date: '2024-02-28 14:32', student: 'Sofia Martinez', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'Yape', status: 'Aprobado' },
        { id: 'TRX-9480', date: '2024-02-28 11:15', student: 'Carlos Mendoza', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Plin', status: 'Aprobado' },
        { id: 'TRX-9479', date: '2024-02-27 19:40', student: 'Elena Ramos Gomez', plan: 'Plan Empresarial (Vitalicio)', amount: 399.00, gateway: 'Tarjeta', status: 'Aprobado' },
        { id: 'TRX-9478', date: '2024-02-27 16:05', student: 'Mateo Quispe', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Yape', status: 'Aprobado' },
        { id: 'TRX-9477', date: '2024-02-26 21:18', student: 'Valeria Benitez', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'PayPal', status: 'Aprobado' },
        { id: 'TRX-9476', date: '2024-02-26 13:50', student: 'Diego Fernando Torres', plan: 'Plan Empresarial (Vitalicio)', amount: 399.00, gateway: 'Transferencia', status: 'Aprobado' },
        { id: 'TRX-9475', date: '2024-02-25 18:22', student: 'Lucia Fernandez', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Plin', status: 'Aprobado' },
        { id: 'TRX-9474', date: '2024-02-25 10:05', student: 'Javier Morales', plan: 'Plan Empresarial (Vitalicio)', amount: 399.00, gateway: 'Tarjeta', status: 'Aprobado' },
        { id: 'TRX-9473', date: '2024-02-24 15:30', student: 'Camila Rojas', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Yape', status: 'Reembolsado' },
        { id: 'TRX-9472', date: '2024-02-24 09:12', student: 'Gabriel Vargas', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'Tarjeta', status: 'Aprobado' },
        { id: 'TRX-9471', date: '2024-02-23 20:45', student: 'Mariana Castro', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'PayPal', status: 'Aprobado' },
        { id: 'TRX-9470', date: '2024-02-23 14:10', student: 'Alonso Bellido', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Transferencia', status: 'En Revisión' }
      ];
      localStorage.setItem(SALES_KEY, JSON.stringify(defaultSales));
    }

    // C. Planes de Suscripción
    if (!localStorage.getItem(PLANS_KEY)) {
      const defaultPlans = [
        { id: 'plan-basic', name: 'Plan Básico (Mensual)', price: 29.00, period: 'mensual', badge: 'Estándar', features: ['Acceso completo al curso de Inglés', 'Test diagnóstico adaptativo', 'Ejercicios de pronunciación con IA', 'Soporte vía comunidad'], activeSubs: 580, status: 'Activo' },
        { id: 'plan-premium', name: 'Plan Premium (Anual)', price: 199.00, period: 'anual', badge: 'Más Popular', features: ['Todo lo del Plan Básico', 'Acceso a Francés y Portugués', 'Certificados oficiales descargables', 'Tutor virtual LinguaBot ilimitado', 'Modo offline y descargas'], activeSubs: 520, status: 'Activo' },
        { id: 'plan-enterprise', name: 'Plan Empresarial (Vitalicio)', price: 399.00, period: 'vitalicio', badge: 'Exclusivo', features: ['Acceso de por vida sin cuotas', 'Todos los idiomas presentes y futuros', 'Tutoría personalizada mensual', 'Licencia para 2 dispositivos simultáneos'], activeSubs: 148, status: 'Activo' }
      ];
      localStorage.setItem(PLANS_KEY, JSON.stringify(defaultPlans));
    }

    // D. Bitácora / Auditoría
    if (!localStorage.getItem(LOGS_KEY)) {
      const defaultLogs = [
        { timestamp: '2024-02-28 15:45:10', admin: 'Director Administrativo', action: 'Consulta de Módulo', module: 'Dashboard Ventas', ip: '192.168.1.45', severity: 'Info' },
        { timestamp: '2024-02-28 14:32:00', admin: 'Sistema Automatizado', action: 'Procesamiento de Pago', module: 'Ventas (Yape S/ 199)', ip: '10.0.0.12', severity: 'Éxito' },
        { timestamp: '2024-02-28 10:15:30', admin: 'Director Administrativo', action: 'Actualización de Perfil', module: 'Estudiantes (EST-101)', ip: '192.168.1.45', severity: 'Info' },
        { timestamp: '2024-02-27 16:20:05', admin: 'Admin Académico', action: 'Envío de Alerta Pedagógica', module: 'Seguimiento (EST-104)', ip: '192.168.1.52', severity: 'Advertencia' },
        { timestamp: '2024-02-26 11:00:22', admin: 'SuperAdmin', action: 'Modificación de Precio', module: 'Suscripciones (Plan Anual)', ip: '192.168.1.1', severity: 'Crítico' },
        { timestamp: '2024-02-25 09:12:45', admin: 'Director Administrativo', action: 'Login con Código de Seguridad', module: 'Seguridad / Autenticación', ip: '192.168.1.45', severity: 'Éxito' }
      ];
      localStorage.setItem(LOGS_KEY, JSON.stringify(defaultLogs));
    }

    // E. Cuentas de Administradores
    if (!localStorage.getItem(ADMINS_KEY)) {
      const defaultAdmins = [
        { id: 'ADM-01', name: 'Director Administrativo', email: 'admin@lingualearn.edu', role: 'SuperAdmin', permissions: ['all'], status: 'Activo', lastLogin: 'En línea ahora' },
        { id: 'ADM-02', name: 'Prof. Roberto Silva', email: 'academico@lingualearn.edu', role: 'Admin Académico', permissions: ['students', 'reports'], status: 'Activo', lastLogin: 'Hace 3 horas' },
        { id: 'ADM-03', name: 'Lic. Patricia Vega', email: 'finanzas@lingualearn.edu', role: 'Admin Financiero', permissions: ['sales', 'subscriptions', 'reports'], status: 'Activo', lastLogin: 'Ayer 18:20' }
      ];
      localStorage.setItem(ADMINS_KEY, JSON.stringify(defaultAdmins));
    }
  }

  initDefaultData();

  // Helper para agregar log a la bitácora
  function addAuditLog(action, module, severity = 'Info') {
    try {
      const logs = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 19);
      logs.unshift({
        timestamp: dateStr,
        admin: currentAdmin.name || 'Director Administrativo',
        action: action,
        module: module,
        ip: '192.168.1.' + Math.floor(Math.random() * 80 + 20),
        severity: severity
      });
      localStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(0, 100)));
      renderAuditLogsTable();
    } catch (e) {}
  }

  // Helper de Toast global
  function showAdminToast(msg, type = 'info') {
    const existing = document.getElementById('admin-toast-container');
    let container = existing;
    if (!container) {
      container = document.createElement('div');
      container.id = 'admin-toast-container';
      container.className = 'position-fixed bottom-0 end-0 p-3 z-3';
      container.style.zIndex = '99999';
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    toastEl.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'primary'} shadow-lg d-flex align-items-center gap-2 mb-2 py-2 px-3 rounded-3`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
      <i class="bi ${type === 'error' ? 'bi-exclamation-triangle-fill' : type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'} fs-5"></i>
      <span class="small fw-semibold">${msg}</span>
    `;
    container.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.add('fade');
      setTimeout(() => toastEl.remove(), 300);
    }, 3200);
  }
  window.showAdminToast = showAdminToast;

  // =========================================================================
  // 3. INICIALIZACIÓN ROBUSTA DE LOS 8 GRÁFICOS (CHART.JS)
  // =========================================================================
  const chartInstances = {};

  function isDarkMode() {
    return document.body.classList.contains('dark-mode') || localStorage.getItem('lingua_theme') === 'dark';
  }

  function safeDestroyChart(canvas, key) {
    if (!canvas) return;
    try {
      if (typeof Chart !== 'undefined' && Chart.getChart) {
        const existing = Chart.getChart(canvas);
        if (existing) {
          existing.destroy();
        }
      }
    } catch (e) {
      console.warn('Error destroying chart on canvas:', e);
    }
    if (key && chartInstances[key]) {
      try {
        chartInstances[key].destroy();
      } catch (e) {}
      delete chartInstances[key];
    }
  }

  function getChartColors() {
    const dark = isDarkMode();
    return {
      textColor: dark ? '#cbd5e1' : '#475569',
      gridColor: dark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
      primary: dark ? '#38bdf8' : '#0284c7',
      gold: dark ? '#facc15' : '#c29953',
      emerald: dark ? '#34d399' : '#059669',
      terracotta: dark ? '#fb923c' : '#ea580c',
      purple: dark ? '#c084fc' : '#9333ea',
      rose: dark ? '#f43f5e' : '#e11d48'
    };
  }

  function initAllCharts() {
    if (typeof Chart === 'undefined') {
      console.warn('Esperando a que Chart.js esté disponible...');
      return;
    }

    const c = getChartColors();

    // ==========================================
    // A. DASHBOARD DE VENTAS (4 Gráficos)
    // ==========================================

    // 1. Gráfico de líneas: Ingresos Mensuales
    const ctxVentasIngresos = document.getElementById('chart-ventas-ingresos');
    if (ctxVentasIngresos) {
      try {
        safeDestroyChart(ctxVentasIngresos, 'ingresos');
        chartInstances.ingresos = new Chart(ctxVentasIngresos, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
            datasets: [{
              label: 'Ingresos Mensuales (S/)',
              data: [14200, 18500, 22100, 19800, 24600, 28900, 31200, 29500, 33400, 36200, 38900, 42500],
              borderColor: c.emerald,
              backgroundColor: 'rgba(5, 150, 105, 0.12)',
              fill: true,
              tension: 0.35,
              borderWidth: 3,
              pointBackgroundColor: c.emerald,
              pointRadius: 4,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` S/ ${ctx.parsed.y.toLocaleString('es-PE')} generados`
                }
              }
            },
            scales: {
              x: { ticks: { color: c.textColor }, grid: { display: false } },
              y: {
                ticks: {
                  color: c.textColor,
                  callback: (val) => `S/ ${(val/1000)}k`
                },
                grid: { color: c.gridColor }
              }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de ingresos:', err);
      }
    }

    // 2. Gráfico circular / dona: Ventas por Tipo de Suscripción
    const ctxVentasPlanes = document.getElementById('chart-ventas-planes');
    if (ctxVentasPlanes) {
      try {
        safeDestroyChart(ctxVentasPlanes, 'planes');
        chartInstances.planes = new Chart(ctxVentasPlanes, {
          type: 'doughnut',
          data: {
            labels: ['Plan Básico (Mensual)', 'Plan Premium (Anual)', 'Plan Empresarial (Vitalicio)'],
            datasets: [{
              data: [580, 520, 148],
              backgroundColor: [c.primary, c.gold, c.terracotta],
              borderWidth: 2,
              borderColor: isDarkMode() ? '#121b28' : '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { color: c.textColor, boxWidth: 12, padding: 12 } },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` ${ctx.label}: ${ctx.raw} ventas (${((ctx.raw/1248)*100).toFixed(1)}%)`
                }
              }
            },
            cutout: '68%'
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de planes:', err);
      }
    }

    // 3. Gráfico de barras: Nuevos Clientes por Mes
    const ctxVentasClientes = document.getElementById('chart-ventas-clientes');
    if (ctxVentasClientes) {
      try {
        safeDestroyChart(ctxVentasClientes, 'clientes');
        chartInstances.clientes = new Chart(ctxVentasClientes, {
          type: 'bar',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
            datasets: [{
              label: 'Nuevos Clientes',
              data: [75, 92, 110, 98, 125, 142, 158, 135, 160, 172, 185, 210],
              backgroundColor: c.primary,
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: c.textColor }, grid: { display: false } },
              y: { ticks: { color: c.textColor }, grid: { color: c.gridColor } }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de nuevos clientes:', err);
      }
    }

    // 4. Gráfico de barras apiladas: Estado de Suscripciones
    const ctxVentasEstados = document.getElementById('chart-ventas-estados');
    if (ctxVentasEstados) {
      try {
        safeDestroyChart(ctxVentasEstados, 'estados');
        chartInstances.estados = new Chart(ctxVentasEstados, {
          type: 'bar',
          data: {
            labels: ['Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'],
            datasets: [
              { label: 'Activas', data: [780, 830, 890, 950, 1040, 1120, 1190, 1248], backgroundColor: c.emerald, borderRadius: 4 },
              { label: 'Vencidas', data: [85, 90, 78, 82, 95, 88, 76, 72], backgroundColor: c.gold, borderRadius: 4 },
              { label: 'Canceladas', data: [35, 28, 30, 25, 32, 28, 22, 18], backgroundColor: c.rose, borderRadius: 4 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top', labels: { color: c.textColor, boxWidth: 12 } }
            },
            scales: {
              x: { stacked: true, ticks: { color: c.textColor }, grid: { display: false } },
              y: { stacked: true, ticks: { color: c.textColor }, grid: { color: c.gridColor } }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de estado de suscripciones:', err);
      }
    }

    // ==========================================
    // B. DASHBOARD DE PROGRESO DE ESTUDIANTES (4 Gráficos)
    // ==========================================

    // 5. Gráfico de barras: Progreso General por Unidad de Aprendizaje
    const ctxProgresoGeneral = document.getElementById('chart-progreso-general');
    if (ctxProgresoGeneral) {
      try {
        safeDestroyChart(ctxProgresoGeneral, 'progresoGeneral');
        chartInstances.progresoGeneral = new Chart(ctxProgresoGeneral, {
          type: 'bar',
          data: {
            labels: ['U1: Fundamentos', 'U2: Vida Diaria', 'U3: En la Ciudad', 'U4: Trabajo', 'U5: Cultura', 'U6: Fluidez'],
            datasets: [{
              label: '% Promedio de Avance',
              data: [94, 82, 71, 64, 48, 38],
              backgroundColor: [
                'rgba(2, 132, 199, 0.85)',
                'rgba(5, 150, 105, 0.85)',
                'rgba(194, 153, 83, 0.85)',
                'rgba(147, 51, 234, 0.85)',
                'rgba(234, 88, 12, 0.85)',
                'rgba(225, 29, 72, 0.85)'
              ],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx) => ` Avance promedio: ${ctx.parsed.y}%` } }
            },
            scales: {
              x: { ticks: { color: c.textColor }, grid: { display: false } },
              y: { max: 100, ticks: { color: c.textColor, callback: (v) => `${v}%` }, grid: { color: c.gridColor } }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de progreso general:', err);
      }
    }

    // 6. Gráfico circular / dona: Estudiantes por Nivel de Idioma (A1 - C2)
    const ctxProgresoNiveles = document.getElementById('chart-progreso-niveles');
    if (ctxProgresoNiveles) {
      try {
        safeDestroyChart(ctxProgresoNiveles, 'niveles');
        chartInstances.niveles = new Chart(ctxProgresoNiveles, {
          type: 'pie',
          data: {
            labels: ['A1 (Inicial)', 'A2 (Básico)', 'B1 (Intermedio)', 'B2 (Intermedio Alto)', 'C1 (Avanzado)', 'C2 (Maestría)'],
            datasets: [{
              data: [425, 486, 334, 168, 76, 31],
              backgroundColor: ['#38bdf8', '#34d399', '#fde047', '#fb923c', '#c084fc', '#f43f5e'],
              borderWidth: 2,
              borderColor: isDarkMode() ? '#121b28' : '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'right', labels: { color: c.textColor, boxWidth: 12, padding: 8 } }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de niveles:', err);
      }
    }

    // 7. Gráfico de líneas: Evolución del Aprendizaje Mensual
    const ctxProgresoEvolucion = document.getElementById('chart-progreso-evolucion');
    if (ctxProgresoEvolucion) {
      try {
        safeDestroyChart(ctxProgresoEvolucion, 'evolucion');
        chartInstances.evolucion = new Chart(ctxProgresoEvolucion, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
            datasets: [{
              label: 'Evolución Promedio (%)',
              data: [42, 46, 51, 55, 60, 64, 68, 72, 75, 79, 82, 86],
              borderColor: c.primary,
              backgroundColor: 'rgba(2, 132, 199, 0.12)',
              fill: true,
              tension: 0.35,
              borderWidth: 3,
              pointRadius: 4,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: c.textColor }, grid: { display: false } },
              y: { max: 100, ticks: { color: c.textColor, callback: (v) => `${v}%` }, grid: { color: c.gridColor } }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de evolución:', err);
      }
    }

    // 8. Gráfico de barras: Rendimiento por Habilidad
    const ctxProgresoHabilidades = document.getElementById('chart-progreso-habilidades');
    if (ctxProgresoHabilidades) {
      try {
        safeDestroyChart(ctxProgresoHabilidades, 'habilidades');
        chartInstances.habilidades = new Chart(ctxProgresoHabilidades, {
          type: 'bar',
          data: {
            labels: ['Gramática', 'Vocabulario', 'Lectura', 'Escritura', 'Pronunciación'],
            datasets: [{
              label: 'Rendimiento Promedio (%)',
              data: [78, 85, 82, 71, 80],
              backgroundColor: [
                'rgba(5, 150, 105, 0.85)',
                'rgba(2, 132, 199, 0.85)',
                'rgba(194, 153, 83, 0.85)',
                'rgba(147, 51, 234, 0.85)',
                'rgba(234, 88, 12, 0.85)'
              ],
              borderRadius: 6
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { max: 100, ticks: { color: c.textColor, callback: (v) => `${v}%` }, grid: { color: c.gridColor } },
              y: { ticks: { color: c.textColor }, grid: { display: false } }
            }
          }
        });
      } catch (err) {
        console.error('Error inicializando gráfico de habilidades:', err);
      }
    }
  }

  // Garantizar que Chart.js esté cargado antes de renderizar
  function ensureChartJsLoaded(callback) {
    if (typeof Chart !== 'undefined') {
      if (typeof callback === 'function') callback();
      return;
    }

    // Inyectar fallback seguro desde CDN si no existe
    if (!document.getElementById('chartjs-cdn-fallback')) {
      const script = document.createElement('script');
      script.id = 'chartjs-cdn-fallback';
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
        if (typeof callback === 'function') callback();
      };
      script.onerror = () => {
        console.error('No se pudo cargar Chart.js desde CDN');
      };
      document.head.appendChild(script);
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts++;
      if (typeof Chart !== 'undefined') {
        clearInterval(timer);
        if (typeof callback === 'function') callback();
      } else if (attempts > 30) {
        clearInterval(timer);
        console.error('Tiempo de espera agotado para Chart.js');
      }
    }, 100);
  }

  // =========================================================================
  // 4. LÓGICA DE NAVEGACIÓN TOTALMENTE INTERACTIVA (MENÚ LATERAL)
  // =========================================================================
  function setupAdminNavigation() {
    const navButtons = document.querySelectorAll('.sidebar-nav-btn, [data-target^="sec-"]');
    const sections = document.querySelectorAll('.admin-tab-section');
    const titleEl = document.getElementById('current-section-title');
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    const titles = {
      'sec-dashboard': 'Dashboard General',
      'sec-estudiantes': 'Gestión de Estudiantes',
      'sec-ventas': 'Gestión de Ventas y Finanzas',
      'sec-suscripciones': 'Gestión de Suscripciones y Planes',
            'sec-reportes': 'Reportes y Estadísticas',
      'sec-configuracion': 'Configuración y Seguridad'
    };

    function activateSection(targetId, updateHash = true) {
      if (!targetId) return;

      // 1. Desactivar todos los botones y activar el seleccionado
      navButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === targetId) {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        }
      });

      // 2. Ocultar estrictamente todas las demás secciones y mostrar SOLO la solicitada
      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.style.setProperty('display', 'block', 'important');
          sec.classList.remove('d-none');
          sec.classList.add('active', 'fade-in-section');
        } else {
          sec.style.setProperty('display', 'none', 'important');
          sec.classList.add('d-none');
          sec.classList.remove('active', 'fade-in-section');
        }
      });

      // 3. Actualizar título dinámico en la barra superior
      if (titleEl && titles[targetId]) {
        titleEl.textContent = titles[targetId];
      }

      // 4. Si se ingresa a Dashboard, renderizar y redimensionar los 8 gráficos
      if (targetId === 'sec-dashboard') {
        setTimeout(() => {
          ensureChartJsLoaded(() => {
            initAllCharts();
            setTimeout(() => {
              Object.values(chartInstances).forEach(ch => {
                if (ch && typeof ch.resize === 'function') ch.resize();
              });
            }, 100);
          });
        }, 80);
      }

      // 5. Cerrar menú lateral en móviles si estaba abierto
      if (sidebar && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      }
      if (backdrop && backdrop.classList.contains('show')) {
        backdrop.classList.remove('show');
      }

      // 6. Actualizar historial de URL para permitir recarga o compartir enlace
      if (updateHash) {
        const hash = targetId.replace('sec-', '');
        try {
          history.replaceState(null, '', '#' + hash);
        } catch (e) {}
      }

      // 7. Scroll al inicio del contenedor
      const mainWrapper = document.querySelector('.admin-main-wrapper');
      if (mainWrapper) mainWrapper.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 8. Bitácora de navegación
      const sectionName = titles[targetId] || targetId;
      addAuditLog(`Navegación al módulo: ${sectionName}`, 'Navegación', 'Info');
    }

    // Vincular clic a todos los botones del menú lateral
    navButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        activateSection(targetId);
      });
    });

    // Control del drawer móvil (Hamburguesa y Cerrar)
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const closeBtn = document.getElementById('btn-close-sidebar');

    toggleBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      sidebar?.classList.add('show');
      backdrop?.classList.add('show');
    });

    closeBtn?.addEventListener('click', function (e) {
      e.preventDefault();
      sidebar?.classList.remove('show');
      backdrop?.classList.remove('show');
    });

    backdrop?.addEventListener('click', function () {
      sidebar?.classList.remove('show');
      backdrop?.classList.remove('show');
    });

    // Carga inicial: evaluar hash de URL o usar Dashboard por defecto
    let initialTarget = 'sec-dashboard';
    if (window.location.hash) {
      const candidateId = 'sec-' + window.location.hash.replace('#', '');
      if (document.getElementById(candidateId)) {
        initialTarget = candidateId;
      }
    }
    activateSection(initialTarget, false);
  }

  // Helper para generar badges de planes con alto contraste y legibilidad óptima
  function getPlanBadgeHtml(planName) {
    if (!planName) return '<span class="badge-plan badge-plan-basic">Sin Plan</span>';
    const p = planName.toLowerCase();
    let badgeType = 'basic';
    if (p.includes('premium')) {
      badgeType = 'premium';
    } else if (p.includes('empresarial') || p.includes('vitalicio')) {
      badgeType = 'enterprise';
    }
    return `<span class="badge-plan badge-plan-${badgeType}">${planName}</span>`;
  }

  // =========================================================================
  // 5. GESTIÓN DE ESTUDIANTES (CRUD Y FICHA DETALLADA)
  // =========================================================================
  function getStudents() {
    return JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
  }

  function saveStudents(data) {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(data));
  }

  function renderStudentsTable(filterLevel = 'all', search = '') {
    const tbody = document.getElementById('students-table-body');
    if (!tbody) return;

    let students = getStudents();

    if (filterLevel !== 'all') {
      students = students.filter(s => s.level.toLowerCase() === filterLevel.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      students = students.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }

    tbody.innerHTML = '';
    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No se encontraron estudiantes con los filtros seleccionados.</td></tr>`;
      return;
    }

    students.forEach(st => {
      const tr = document.createElement('tr');
      const lvlClass = 'badge-level-' + st.level.toLowerCase();
      const statusBadge = st.status === 'Activo' ? '<span class="badge-status-active">Activo</span>' :
                          st.status === 'Alerta' ? '<span class="badge-status-alert">En Riesgo</span>' :
                          '<span class="badge-status-inactive">Inactivo</span>';

      tr.innerHTML = `
        <td class="font-monospace fw-bold text-primary">${st.id}</td>
        <td>
          <div class="fw-bold text-dark">${st.name}</div>
          <div class="small text-secondary">${st.email}</div>
        </td>
        <td><span class="badge-level-mcer ${lvlClass}">${st.level}</span></td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="progress flex-grow-1" style="height: 6px; width: 70px;">
              <div class="progress-bar ${st.progress < 50 ? 'bg-danger' : st.progress > 80 ? 'bg-success' : 'bg-primary'}" style="width: ${st.progress}%;"></div>
            </div>
            <span class="small fw-semibold">${st.progress}%</span>
          </div>
        </td>
        <td>${getPlanBadgeHtml(st.plan)}</td>
        <td>${statusBadge}</td>
        <td class="text-end">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary btn-student-detail" data-id="${st.id}" title="Ver Ficha Académica"><i class="bi bi-eye"></i></button>
            <button class="btn btn-outline-secondary btn-student-edit" data-id="${st.id}" title="Editar Estudiante"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-outline-${st.status === 'Activo' ? 'danger' : 'success'} btn-student-toggle" data-id="${st.id}" title="${st.status === 'Activo' ? 'Desactivar Cuenta' : 'Activar Cuenta'}">
              <i class="bi ${st.status === 'Activo' ? 'bi-person-slash' : 'bi-person-check'}"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    bindStudentActions();
  }

  function bindStudentActions() {
    document.querySelectorAll('.btn-student-detail').forEach(btn => {
      btn.addEventListener('click', function () {
        openStudentDetailModal(this.getAttribute('data-id'));
      });
    });

    document.querySelectorAll('.btn-student-edit').forEach(btn => {
      btn.addEventListener('click', function () {
        openStudentEditModal(this.getAttribute('data-id'));
      });
    });

    document.querySelectorAll('.btn-student-toggle').forEach(btn => {
      btn.addEventListener('click', function () {
        toggleStudentStatus(this.getAttribute('data-id'));
      });
    });
  }

  function openStudentDetailModal(id) {
    const student = getStudents().find(s => s.id === id);
    if (!student) return;

    document.getElementById('detail-student-id').textContent = student.id;
    document.getElementById('detail-student-name').textContent = student.name;
    document.getElementById('detail-student-email').textContent = student.email;
    document.getElementById('detail-student-phone').textContent = student.phone || 'No registrado';
    document.getElementById('detail-student-level').textContent = student.level;
    document.getElementById('detail-student-progress-num').textContent = student.progress + '%';
    document.getElementById('detail-student-progress-bar').style.width = student.progress + '%';
    const detPlanEl = document.getElementById('detail-student-plan');
    if (detPlanEl) detPlanEl.innerHTML = getPlanBadgeHtml(student.plan);
    document.getElementById('detail-student-streak').textContent = student.streak + ' días seguidos';
    document.getElementById('detail-student-xp').textContent = student.xp + ' XP';
    document.getElementById('detail-student-status').textContent = student.status;
    document.getElementById('detail-student-registered').textContent = student.registeredAt;
    document.getElementById('detail-student-access').textContent = student.lastAccess;

    const skills = student.skills || { grammar: 50, vocab: 50, reading: 50, writing: 50, speaking: 50 };
    setSkillBar('skill-grammar', skills.grammar);
    setSkillBar('skill-vocab', skills.vocab);
    setSkillBar('skill-reading', skills.reading);
    setSkillBar('skill-writing', skills.writing);
    setSkillBar('skill-speaking', skills.speaking);

    const modalEl = document.getElementById('modal-student-detail');
    if (modalEl && window.bootstrap) {
      new bootstrap.Modal(modalEl).show();
    }
    addAuditLog(`Consulta de ficha detallada del alumno ${student.name} (${student.id})`, 'Gestión Estudiantes', 'Info');
  }

  function setSkillBar(prefix, val) {
    const bar = document.getElementById(`${prefix}-bar`);
    const valText = document.getElementById(`${prefix}-val`);
    if (bar) bar.style.width = val + '%';
    if (valText) valText.textContent = val + '%';
  }

  function openStudentEditModal(id) {
    const student = getStudents().find(s => s.id === id);
    if (!student) return;

    document.getElementById('edit-student-id').value = student.id;
    document.getElementById('edit-student-name').value = student.name;
    document.getElementById('edit-student-email').value = student.email;
    document.getElementById('edit-student-phone').value = student.phone || '';
    document.getElementById('edit-student-level').value = student.level;
    document.getElementById('edit-student-plan').value = student.plan;
    document.getElementById('edit-student-status').value = student.status;

    const modalEl = document.getElementById('modal-student-edit');
    if (modalEl && window.bootstrap) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  function toggleStudentStatus(id) {
    const students = getStudents();
    const st = students.find(s => s.id === id);
    if (!st) return;

    st.status = st.status === 'Activo' ? 'Inactivo' : 'Activo';
    saveStudents(students);
    renderStudentsTable();
    addAuditLog(`Cambio de estado a ${st.status} para ${st.name} (${id})`, 'Gestión Estudiantes', 'Advertencia');
    showAdminToast(`El estudiante ${st.name} ha sido marcado como ${st.status}.`, 'info');
  }

  // =========================================================================
  // 6. GESTIÓN DE VENTAS Y PASARELAS DE PAGO
  // =========================================================================
  function getSales() {
    return JSON.parse(localStorage.getItem(SALES_KEY) || '[]');
  }

  function renderSalesTable(filterGateway = 'all', filterStatus = 'all') {
    const tbody = document.getElementById('sales-table-body');
    if (!tbody) return;

    let sales = getSales();
    if (filterGateway !== 'all') {
      sales = sales.filter(s => s.gateway.toLowerCase() === filterGateway.toLowerCase());
    }
    if (filterStatus !== 'all') {
      sales = sales.filter(s => s.status.toLowerCase() === filterStatus.toLowerCase());
    }

    tbody.innerHTML = '';
    let total = 0;

    sales.forEach(sale => {
      if (sale.status === 'Aprobado') total += sale.amount;
      const tr = document.createElement('tr');
      const badgeClass = sale.status === 'Aprobado' ? 'badge-status-active' :
                          sale.status === 'Reembolsado' ? 'badge-status-inactive' : 'badge-status-alert';

      const gatewayIcon = sale.gateway === 'Yape' ? 'bi-phone-fill text-purple' :
                          sale.gateway === 'Plin' ? 'bi-phone text-info' :
                          sale.gateway === 'Tarjeta' ? 'bi-credit-card-2-front-fill text-primary' :
                          sale.gateway === 'PayPal' ? 'bi-paypal text-primary' : 'bi-bank2 text-secondary';

      tr.innerHTML = `
        <td class="font-monospace fw-bold text-primary">${sale.id}</td>
        <td class="small text-secondary">${sale.date}</td>
        <td class="fw-bold text-dark">${sale.student}</td>
        <td>${getPlanBadgeHtml(sale.plan)}</td>
        <td class="fw-bold text-dark">S/ ${sale.amount.toFixed(2)}</td>
        <td><span class="d-inline-flex align-items-center gap-1 small"><i class="bi ${gatewayIcon}"></i> ${sale.gateway}</span></td>
        <td><span class="${badgeClass}">${sale.status}</span></td>
      `;
      tbody.appendChild(tr);
    });

    const totalEl = document.getElementById('sales-filtered-total');
    if (totalEl) totalEl.textContent = `S/ ${total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
  }

  // =========================================================================
  // 7. GESTIÓN DE SUSCRIPCIONES Y PLANES
  // =========================================================================
  function getPlans() {
    return JSON.parse(localStorage.getItem(PLANS_KEY) || '[]');
  }

  function savePlans(plans) {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  }

  function renderPlansCards() {
    const container = document.getElementById('plans-cards-container');
    if (!container) return;

    const plans = getPlans();
    container.innerHTML = '';

    plans.forEach(p => {
      const isFeatured = p.id === 'plan-premium';
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6';
      col.innerHTML = `
        <div class="plan-pricing-card ${isFeatured ? 'featured' : ''} h-100 d-flex flex-direction-column justify-content-between p-4">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill">${p.badge}</span>
              <span class="badge ${p.status === 'Activo' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}">${p.status}</span>
            </div>
            <h3 class="h5 fw-bold text-dark mb-1">${p.name}</h3>
            <div class="my-3">
              <span class="display-6 fw-bold text-primary">S/ ${p.price.toFixed(2)}</span>
              <span class="text-secondary small">/ ${p.period}</span>
            </div>
            <div class="small fw-semibold text-secondary mb-3"><i class="bi bi-people me-1"></i>${p.activeSubs} suscriptores activos</div>
            <ul class="list-unstyled small d-flex flex-column gap-2 mb-4">
              ${p.features.map(f => `<li class="d-flex align-items-center gap-2"><i class="bi bi-check-circle-fill text-success"></i><span>${f}</span></li>`).join('')}
            </ul>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-primary w-100 fw-semibold btn-edit-plan" data-id="${p.id}">
              <i class="bi bi-pencil-square me-1"></i> Editar Precio y Beneficios
            </button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    document.querySelectorAll('.btn-edit-plan').forEach(btn => {
      btn.addEventListener('click', function () {
        openEditPlanModal(this.getAttribute('data-id'));
      });
    });
  }

  function openEditPlanModal(id) {
    const plan = getPlans().find(p => p.id === id);
    if (!plan) return;

    document.getElementById('edit-plan-id').value = plan.id;
    document.getElementById('edit-plan-name').textContent = plan.name;
    document.getElementById('edit-plan-price').value = plan.price;
    document.getElementById('edit-plan-badge').value = plan.badge;
    document.getElementById('edit-plan-features').value = plan.features.join('\n');

    const modalEl = document.getElementById('modal-edit-plan');
    if (modalEl && window.bootstrap) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  // 8. Módulo de Seguimiento removido según requerimiento

    // =========================================================================
  // 9. GENERACIÓN Y EXPORTACIÓN DE REPORTES ORDENADOS EN PDF
  // ==========================================================================

  // Generador de maquetación HTML limpia y ordenada para documentos PDF
  function buildPDFReportHTML(reportType = 'consolidado') {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    const currentAdmin = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || '{}');
    const adminName = currentAdmin.name || 'Administrador General';

    let titleText = 'INFORME EJECUTIVO CONSOLIDADO DE GESTIÓN';
    if (reportType === 'ingresos') titleText = 'REPORTE FINANCIERO DE INGRESOS MENSUALES';
    if (reportType === 'ventas') titleText = 'REPORTE COMERCIAL DE VENTAS Y SUSCRIPCIONES';
    if (reportType === 'niveles') titleText = 'REPORTE ACADÉMICO DE DISTRIBUCIÓN POR NIVELES';

    const headerHTML = `
      <div class="pdf-header-container">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <div class="pdf-brand-title">LinguaLearn &bull; Plataforma Global de Idiomas</div>
            <div style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase;">Sistema Integral de Administración y Analítica</div>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: 700; font-size: 10px; padding: 3px 8px; border-radius: 4px; border: 1px solid #bae6fd;">OFICIAL &bull; CONFIDENCIAL</span>
          </div>
        </div>
        <div style="text-align: center; margin: 16px 0 10px;">
          <h1 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">${titleText}</h1>
          <div style="font-size: 11px; color: #475569; margin-top: 3px;">Período Auditado: Año Fiscal 2024 &bull; Estado Operativo: Verificado</div>
        </div>
        <div class="pdf-meta-box" style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <div><strong>Fecha de emisión:</strong> ${formattedDate} (${formattedTime})</div>
          <div><strong>Generado por:</strong> ${adminName}</div>
          <div><strong>Código de Control:</strong> LL-REP-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}</div>
        </div>
      </div>
    `;

    // 1. Sección Ingresos Mensuales
    const ingresosHTML = `
      <div class="pdf-section-title">1. Balance de Ingresos Mensuales y Recaudación (S/)</div>
      <p style="font-size: 11.5px; color: #334155; margin-bottom: 10px;">
        Desglose contable de los ingresos brutos percibidos, altas de suscripción por período mensual, deducción de reembolsos e ingreso neto consolidado en moneda nacional (PEN S/).
      </p>
      
      <div class="pdf-kpi-grid">
        <div class="pdf-kpi-card">
          <div class="kpi-label">Ingresos Netos</div>
          <div class="kpi-number" style="color: #059669;">S/ 128,013.00</div>
        </div>
        <div class="pdf-kpi-card">
          <div class="kpi-label">Nuevas Altas</div>
          <div class="kpi-number" style="color: #2563eb;">642 clientes</div>
        </div>
        <div class="pdf-kpi-card">
          <div class="kpi-label">Promedio Mensual</div>
          <div class="kpi-number" style="color: #0f172a;">S/ 21,335.50</div>
        </div>
        <div class="pdf-kpi-card">
          <div class="kpi-label">Tasa Reembolsos</div>
          <div class="kpi-number" style="color: #d97706;">0.07% (Baja)</div>
        </div>
      </div>

      <table class="pdf-table">
        <thead>
          <tr>
            <th>Mes / Período</th>
            <th style="text-align: right;">Ingresos Brutos (S/)</th>
            <th style="text-align: center;">Nuevas Suscripciones</th>
            <th style="text-align: right;">Reembolsos (S/)</th>
            <th style="text-align: right;">Ingreso Neto (S/)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Enero 2024</strong></td>
            <td style="text-align: right;">S/ 14,200.00</td>
            <td style="text-align: center;">75</td>
            <td style="text-align: right;">S/ 0.00</td>
            <td style="text-align: right; font-weight: 600;">S/ 14,200.00</td>
          </tr>
          <tr>
            <td><strong>Febrero 2024</strong></td>
            <td style="text-align: right;">S/ 18,500.00</td>
            <td style="text-align: center;">92</td>
            <td style="text-align: right; color: #dc2626;">S/ 29.00</td>
            <td style="text-align: right; font-weight: 600;">S/ 18,471.00</td>
          </tr>
          <tr>
            <td><strong>Marzo 2024</strong></td>
            <td style="text-align: right;">S/ 22,100.00</td>
            <td style="text-align: center;">110</td>
            <td style="text-align: right;">S/ 0.00</td>
            <td style="text-align: right; font-weight: 600;">S/ 22,100.00</td>
          </tr>
          <tr>
            <td><strong>Abril 2024</strong></td>
            <td style="text-align: right;">S/ 19,800.00</td>
            <td style="text-align: center;">98</td>
            <td style="text-align: right;">S/ 0.00</td>
            <td style="text-align: right; font-weight: 600;">S/ 19,800.00</td>
          </tr>
          <tr>
            <td><strong>Mayo 2024</strong></td>
            <td style="text-align: right;">S/ 24,600.00</td>
            <td style="text-align: center;">125</td>
            <td style="text-align: right; color: #dc2626;">S/ 58.00</td>
            <td style="text-align: right; font-weight: 600;">S/ 24,542.00</td>
          </tr>
          <tr>
            <td><strong>Junio 2024</strong></td>
            <td style="text-align: right;">S/ 28,900.00</td>
            <td style="text-align: center;">142</td>
            <td style="text-align: right;">S/ 0.00</td>
            <td style="text-align: right; font-weight: 600;">S/ 28,900.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL CONSOLIDADO</td>
            <td style="text-align: right;">S/ 128,100.00</td>
            <td style="text-align: center;">642 suscripciones</td>
            <td style="text-align: right; color: #dc2626;">S/ 87.00</td>
            <td style="text-align: right; color: #059669;">S/ 128,013.00</td>
          </tr>
        </tfoot>
      </table>
    `;

    // 2. Sección Ventas por Suscripción
    const salesList = getSales();
    let salesRowsHTML = '';
    salesList.slice(0, 8).forEach(s => {
      salesRowsHTML += `
        <tr>
          <td><code style="font-weight: 600; color: #1e3a8a;">${s.id}</code></td>
          <td>${s.date}</td>
          <td><strong>${s.student}</strong></td>
          <td>${s.plan}</td>
          <td style="text-align: right; font-weight: 600;">S/ ${parseFloat(s.amount).toFixed(2)}</td>
          <td>${s.gateway}</td>
          <td><span style="color: #059669; font-weight: 600;">${s.status}</span></td>
        </tr>
      `;
    });

    const ventasHTML = `
      <div class="pdf-section-title">2. Distribución de Ventas por Tipo de Suscripción</div>
      <p style="font-size: 11.5px; color: #334155; margin-bottom: 10px;">
        Análisis de adopción de planes de membresía, precios unitarios vigentes, concentración de cartera y muestra de transacciones directas verificadas en pasarela de pagos.
      </p>

      <table class="pdf-table" style="margin-bottom: 14px;">
        <thead>
          <tr>
            <th>Plan de Estudio</th>
            <th style="text-align: right;">Precio Unitario</th>
            <th style="text-align: center;">Usuarios Activos</th>
            <th style="text-align: right;">Recaudación Mensual Estimada</th>
            <th style="text-align: center;">Participación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Plan Básico</strong> (Acceso a lecciones estándar)</td>
            <td style="text-align: right;">S/ 29.00 / mes</td>
            <td style="text-align: center;">480</td>
            <td style="text-align: right;">S/ 13,920.00</td>
            <td style="text-align: center;">22.5%</td>
          </tr>
          <tr>
            <td><strong>Plan Premium</strong> (Acceso total + ejercicios avanzados)</td>
            <td style="text-align: right;">S/ 59.00 / mes</td>
            <td style="text-align: center;">820</td>
            <td style="text-align: right;">S/ 48,380.00</td>
            <td style="text-align: center; font-weight: 700; color: #2563eb;">58.2% (Mayoría)</td>
          </tr>
          <tr>
            <td><strong>Plan Empresarial</strong> (Tutorías y certificaciones)</td>
            <td style="text-align: right;">S/ 149.00 / mes</td>
            <td style="text-align: center;">220</td>
            <td style="text-align: right;">S/ 32,780.00</td>
            <td style="text-align: center;">19.3%</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL GENERAL DE MEMBRESÍAS</td>
            <td style="text-align: right;">-</td>
            <td style="text-align: center;">1,520 usuarios</td>
            <td style="text-align: right; color: #059669;">S/ 95,080.00 / mes</td>
            <td style="text-align: center;">100.0%</td>
          </tr>
        </tfoot>
      </table>

      <div style="font-size: 11px; font-weight: 700; color: #334155; margin-bottom: 6px; text-transform: uppercase;">Muestra de Transacciones Recientes Auditadas:</div>
      <table class="pdf-table">
        <thead>
          <tr>
            <th>ID Transacción</th>
            <th>Fecha</th>
            <th>Estudiante</th>
            <th>Plan</th>
            <th style="text-align: right;">Monto</th>
            <th>Pasarela</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${salesRowsHTML}
        </tbody>
      </table>
    `;

    // 3. Sección Distribución por Niveles
    const nivelesHTML = `
      <div class="pdf-section-title">3. Distribución Académica de Estudiantes por Nivel MCER</div>
      <p style="font-size: 11.5px; color: #334155; margin-bottom: 10px;">
        Población estudiantil categorizada según el Marco Común Europeo de Referencia para las Lenguas (MCER), cuantificando la distribución porcentual y la tasa media de aprobación en evaluaciones diagnósticas.
      </p>

      <table class="pdf-table">
        <thead>
          <tr>
            <th>Nivel MCER</th>
            <th>Denominación Pedagógica</th>
            <th style="text-align: center;">Cantidad Estudiantes</th>
            <th style="text-align: center;">Distribución (%)</th>
            <th style="text-align: center;">Tasa de Aprobación (%)</th>
            <th>Estado Curricular</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong style="color: #2563eb;">A1</strong></td>
            <td>Acceso / Principiante</td>
            <td style="text-align: center; font-weight: 600;">425</td>
            <td style="text-align: center;">28.0%</td>
            <td style="text-align: center; font-weight: 600; color: #059669;">94.2%</td>
            <td><span style="font-size: 11px; color: #059669;">Óptimo</span></td>
          </tr>
          <tr>
            <td><strong style="color: #2563eb;">A2</strong></td>
            <td>Plataforma / Elemental</td>
            <td style="text-align: center; font-weight: 600;">486</td>
            <td style="text-align: center;">32.0%</td>
            <td style="text-align: center; font-weight: 600; color: #059669;">88.5%</td>
            <td><span style="font-size: 11px; color: #059669;">Óptimo</span></td>
          </tr>
          <tr>
            <td><strong style="color: #d97706;">B1</strong></td>
            <td>Umbral / Intermedio</td>
            <td style="text-align: center; font-weight: 600;">334</td>
            <td style="text-align: center;">22.0%</td>
            <td style="text-align: center; font-weight: 600; color: #059669;">82.1%</td>
            <td><span style="font-size: 11px; color: #059669;">Regular</span></td>
          </tr>
          <tr>
            <td><strong style="color: #d97706;">B2</strong></td>
            <td>Avanzado / Intermedio Alto</td>
            <td style="text-align: center; font-weight: 600;">168</td>
            <td style="text-align: center;">11.0%</td>
            <td style="text-align: center; font-weight: 600; color: #d97706;">76.4%</td>
            <td><span style="font-size: 11px; color: #d97706;">Supervisión</span></td>
          </tr>
          <tr>
            <td><strong style="color: #7c3aed;">C1</strong></td>
            <td>Dominio Operativo Eficaz</td>
            <td style="text-align: center; font-weight: 600;">76</td>
            <td style="text-align: center;">5.0%</td>
            <td style="text-align: center; font-weight: 600; color: #059669;">91.0%</td>
            <td><span style="font-size: 11px; color: #059669;">Excelente</span></td>
          </tr>
          <tr>
            <td><strong style="color: #7c3aed;">C2</strong></td>
            <td>Maestría Lingüística</td>
            <td style="text-align: center; font-weight: 600;">31</td>
            <td style="text-align: center;">2.0%</td>
            <td style="text-align: center; font-weight: 600; color: #059669;">96.8%</td>
            <td><span style="font-size: 11px; color: #059669;">Sobresaliente</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL ALUMNADO</td>
            <td>Matrícula Consolidada</td>
            <td style="text-align: center; color: #2563eb;">1,520 estudiantes</td>
            <td style="text-align: center;">100.0%</td>
            <td style="text-align: center; color: #059669;">88.2% promedio</td>
            <td>Certificado</td>
          </tr>
        </tfoot>
      </table>
    `;

    const footerHTML = `
      <div style="margin-top: 24px; padding: 10px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 10.5px; color: #475569; line-height: 1.4;">
        <strong>Declaración de Conformidad:</strong> Este informe oficial ha sido generado automáticamente por el Módulo de Analítica y Reportes de LinguaLearn. Las cifras de recaudación, membresías y progresos académicos han sido debidamente contrastadas con la base de datos de producción.
      </div>

      <div class="pdf-signature-grid">
        <div class="pdf-signature-item">
          <strong>Dirección Administrativa y Finanzas</strong><br>
          LinguaLearn Educational Technologies S.A.C.<br>
          <span style="color: #94a3b8; font-size: 9.5px;">Firma Digital Verificada</span>
        </div>
        <div class="pdf-signature-item">
          <strong>Coordinación Académica General</strong><br>
          Departamento de Evaluación y Certificación MCER<br>
          <span style="color: #94a3b8; font-size: 9.5px;">Auditoría de Calidad Educativa</span>
        </div>
      </div>
    `;

    let bodyHTML = '';
    if (reportType === 'ingresos') {
      bodyHTML = headerHTML + ingresosHTML + footerHTML;
    } else if (reportType === 'ventas') {
      bodyHTML = headerHTML + ventasHTML + footerHTML;
    } else if (reportType === 'niveles') {
      bodyHTML = headerHTML + nivelesHTML + footerHTML;
    } else {
      // Consolidado completo
      bodyHTML = headerHTML + ingresosHTML + ventasHTML + nivelesHTML + footerHTML;
    }

    return bodyHTML;
  }

  // Abre el modal de vista previa y prepara el contenedor de impresión
  function openPDFReport(reportType = 'consolidado') {
    const html = buildPDFReportHTML(reportType);

    // Contenedor que se imprime estrictamente en el papel / PDF
    const printContainer = document.getElementById('printable-pdf-document');
    if (printContainer) {
      printContainer.innerHTML = html;
    }

    // Contenedor visual para vista previa en pantalla
    const modalBody = document.getElementById('modal-pdf-body');
    if (modalBody) {
      modalBody.innerHTML = html;
    }

    // Abrir modal de Bootstrap
    const modalEl = document.getElementById('modal-pdf-preview');
    if (modalEl && window.bootstrap) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }

    addAuditLog(`Apertura de Reporte PDF (${reportType})`, 'Reportes y PDF', 'Info');
  }

  function setupReports() {


    // Botón Principal de la Sección: Exportar Reporte Completo en PDF
    document.getElementById('btn-export-consolidated-pdf')?.addEventListener('click', function () {
      openPDFReport('consolidado');
    });

    // Botones Individuales de Cada Tarjeta de Reporte
    document.querySelectorAll('.btn-print-report').forEach(btn => {
      btn.addEventListener('click', function () {
        const reportType = this.getAttribute('data-report-type') || 'consolidado';
        openPDFReport(reportType);
      });
    });

    // Botón de confirmación dentro del Modal de Vista Previa
    document.getElementById('btn-confirm-print-pdf')?.addEventListener('click', function () {
      window.print();
      addAuditLog('Impresión/Guardado de Documento PDF finalizado', 'Reportes y PDF', 'Éxito');
    });
  }

  // =========================================================================
  // 10. CONFIGURACIÓN, PERMISOS RBAC Y BITÁCORA
  // =========================================================================
  function renderAuditLogsTable(search = '') {
    const tbody = document.getElementById('audit-logs-body');
    if (!tbody) return;

    let logs = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      logs = logs.filter(l => l.action.toLowerCase().includes(q) || l.module.toLowerCase().includes(q) || l.admin.toLowerCase().includes(q));
    }

    tbody.innerHTML = '';
    logs.forEach(l => {
      const sevBadge = l.severity === 'Crítico' ? '<span class="badge bg-danger-subtle text-danger border border-danger-subtle">Crítico</span>' :
                        l.severity === 'Advertencia' ? '<span class="badge bg-warning-subtle text-warning border border-warning-subtle">Advertencia</span>' :
                        l.severity === 'Éxito' ? '<span class="badge bg-success-subtle text-success border border-success-subtle">Éxito</span>' :
                        '<span class="badge bg-info-subtle text-info border border-info-subtle">Info</span>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-monospace small text-secondary">${l.timestamp}</td>
        <td class="fw-bold small text-dark">${l.admin}</td>
        <td class="fw-semibold">${l.action}</td>
        <td><span class="badge-module">${l.module}</span></td>
        <td class="font-monospace small text-secondary">${l.ip}</td>
        <td>${sevBadge}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderAdminsTable() {
    const tbody = document.getElementById('admins-table-body');
    if (!tbody) return;

    const admins = JSON.parse(localStorage.getItem(ADMINS_KEY) || '[]');
    tbody.innerHTML = '';

    admins.forEach(ad => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-monospace fw-bold text-primary">${ad.id}</td>
        <td class="fw-bold text-dark">${ad.name}</td>
        <td class="small text-secondary">${ad.email}</td>
        <td><span class="badge bg-primary-subtle text-primary border border-primary-subtle">${ad.role}</span></td>
        <td><span class="badge-status-active">${ad.status}</span></td>
        <td class="small text-secondary">${ad.lastLogin}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // =========================================================================
  // 11. INICIALIZACIÓN GLOBAL AL CARGAR DOM
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    // Sincronizar datos del administrador activo en el sidebar
    const adminNameEl = document.getElementById('sidebar-admin-name');
    if (adminNameEl) adminNameEl.textContent = currentAdmin.name || 'Director Administrativo';

    // Botón de Cerrar Sesión Administrador
    document.getElementById('btn-admin-logout')?.addEventListener('click', function (e) {
      e.preventDefault();
      addAuditLog('Cierre de sesión administrativo', 'Seguridad', 'Info');
      localStorage.removeItem(ADMIN_SESSION_KEY);
      showAdminToast('Sesión de Administrador cerrada correctamente.', 'info');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 500);
    });

    // Iniciar Navegación del Menú Lateral
    setupAdminNavigation();

    // Renderizar tablas iniciales
    renderStudentsTable();
    renderSalesTable();
    renderPlansCards();
        setupReports();
    renderAuditLogsTable();
    renderAdminsTable();

    // Cargar gráficos iniciales con resize garantizado
    ensureChartJsLoaded(() => {
      initAllCharts();
      setTimeout(() => {
        Object.values(chartInstances).forEach(ch => {
          if (ch && typeof ch.resize === 'function') ch.resize();
        });
      }, 150);
    });

    window.addEventListener('resize', () => {
      Object.values(chartInstances).forEach(ch => {
        if (ch && typeof ch.resize === 'function') ch.resize();
      });
    });

    // Buscador y filtros de estudiantes
    const searchStudent = document.getElementById('input-search-student');
    const filterLevel = document.getElementById('select-filter-level');

    searchStudent?.addEventListener('input', () => {
      renderStudentsTable(filterLevel ? filterLevel.value : 'all', searchStudent.value);
    });
    filterLevel?.addEventListener('change', () => {
      renderStudentsTable(filterLevel.value, searchStudent ? searchStudent.value : '');
    });

    // Modal Registrar Estudiante
    const formNewStudent = document.getElementById('form-new-student');
    formNewStudent?.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('new-student-name').value.trim();
      const email = document.getElementById('new-student-email').value.trim();
      const phone = document.getElementById('new-student-phone').value.trim();
      const level = document.getElementById('new-student-level').value;
      const plan = document.getElementById('new-student-plan').value;

      if (!name || !email) return;

      const students = getStudents();
      const newId = 'EST-' + (100 + students.length + 1);
      const newSt = {
        id: newId,
        name: name,
        email: email,
        phone: phone,
        level: level,
        progress: 0,
        streak: 0,
        xp: 0,
        plan: plan,
        status: 'Activo',
        registeredAt: new Date().toISOString().substring(0, 10),
        lastAccess: 'Nunca',
        skills: { grammar: 50, vocab: 50, reading: 50, writing: 50, speaking: 50 }
      };

      students.unshift(newSt);
      saveStudents(students);
      renderStudentsTable();
      addAuditLog(`Registro de nuevo estudiante ${name} (${newId})`, 'Gestión Estudiantes', 'Éxito');
      showAdminToast(`Estudiante ${name} registrado con éxito con ID ${newId}.`, 'success');

      const modalEl = document.getElementById('modal-new-student');
      if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl)?.hide();
      }
      formNewStudent.reset();
    });

    // Modal Editar Estudiante
    const formEditStudent = document.getElementById('form-edit-student');
    formEditStudent?.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('edit-student-id').value;
      const name = document.getElementById('edit-student-name').value.trim();
      const email = document.getElementById('edit-student-email').value.trim();
      const phone = document.getElementById('edit-student-phone').value.trim();
      const level = document.getElementById('edit-student-level').value;
      const plan = document.getElementById('edit-student-plan').value;
      const status = document.getElementById('edit-student-status').value;

      const students = getStudents();
      const st = students.find(s => s.id === id);
      if (st) {
        st.name = name;
        st.email = email;
        st.phone = phone;
        st.level = level;
        st.plan = plan;
        st.status = status;
        saveStudents(students);
        renderStudentsTable();
        addAuditLog(`Edición de datos de estudiante ${name} (${id})`, 'Gestión Estudiantes', 'Info');
        showAdminToast(`Datos de ${name} actualizados correctamente.`, 'success');

        const modalEl = document.getElementById('modal-student-edit');
        if (modalEl && window.bootstrap) {
          bootstrap.Modal.getInstance(modalEl)?.hide();
        }
      }
    });

    // Modal Editar Plan
    const formEditPlan = document.getElementById('form-edit-plan');
    formEditPlan?.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('edit-plan-id').value;
      const price = parseFloat(document.getElementById('edit-plan-price').value);
      const badge = document.getElementById('edit-plan-badge').value.trim();
      const featuresRaw = document.getElementById('edit-plan-features').value.trim();

      const plans = getPlans();
      const p = plans.find(x => x.id === id);
      if (p) {
        p.price = price;
        p.badge = badge;
        p.features = featuresRaw.split('\n').filter(f => f.trim().length > 0);
        savePlans(plans);
        renderPlansCards();
        addAuditLog(`Modificación de precio y beneficios de ${p.name}`, 'Gestión Suscripciones', 'Advertencia');
        showAdminToast(`Plan ${p.name} actualizado con nuevo precio S/ ${price.toFixed(2)}.`, 'success');

        const modalEl = document.getElementById('modal-edit-plan');
        if (modalEl && window.bootstrap) {
          bootstrap.Modal.getInstance(modalEl)?.hide();
        }
      }
    });

    // Modal Crear Nuevo Administrador
    const btnCreateAdmin = document.getElementById('btn-submit-new-admin');
    btnCreateAdmin?.addEventListener('click', function () {
      const nameInput = document.getElementById('new-admin-name');
      const emailInput = document.getElementById('new-admin-email');
      const roleInput = document.getElementById('new-admin-role');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const role = roleInput ? roleInput.value : 'Admin Académico';

      if (!name || !email) {
        showAdminToast('Complete el nombre y correo del nuevo administrador.', 'error');
        return;
      }

      const admins = JSON.parse(localStorage.getItem(ADMINS_KEY) || '[]');
      const newAdminId = 'ADM-0' + (admins.length + 1);
      admins.push({
        id: newAdminId,
        name: name,
        email: email,
        role: role,
        permissions: role === 'SuperAdmin' ? ['all'] : role === 'Admin Académico' ? ['students', 'reports'] : ['sales', 'subscriptions', 'reports'],
        status: 'Activo',
        lastLogin: 'Nunca (Recién creado)'
      });

      localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
      renderAdminsTable();
      addAuditLog(`Creación de cuenta administrativa para ${name} (${role})`, 'Seguridad y Roles', 'Crítico');
      showAdminToast(`Nuevo administrador ${name} (${newAdminId}) registrado con éxito.`, 'success');

      const modalEl = document.getElementById('modal-new-admin');
      if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl)?.hide();
      }
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
    });

    // Filtros de ventas
    const gatewayFilter = document.getElementById('select-filter-gateway');
    const statusFilter = document.getElementById('select-filter-sale-status');
    gatewayFilter?.addEventListener('change', () => {
      renderSalesTable(gatewayFilter.value, statusFilter ? statusFilter.value : 'all');
    });
    statusFilter?.addEventListener('change', () => {
      renderSalesTable(gatewayFilter ? gatewayFilter.value : 'all', statusFilter.value);
    });

    // Buscador en logs de auditoría
    const searchLogs = document.getElementById('input-search-logs');
    searchLogs?.addEventListener('input', function () {
      renderAuditLogsTable(this.value);
    });

    // Guardar permisos RBAC
    document.getElementById('btn-save-rbac')?.addEventListener('click', function () {
      showAdminToast('¡Matriz de Roles y Permisos (RBAC) actualizada con éxito!', 'success');
      addAuditLog('Actualización de Matriz de Permisos RBAC', 'Seguridad y Roles', 'Crítico');
    });

    // Alternar tema oscuro con re-dibujo inmediato de gráficos
    document.addEventListener('click', function (e) {
      if (e.target.closest('.btn-toggle-darkmode')) {
        const currentTheme = localStorage.getItem('lingua_theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('lingua_theme', newTheme);
        if (newTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          document.body.classList.add('dark-mode');
          document.querySelectorAll('.darkmode-text').forEach(t => t.textContent = 'Modo Claro');
        } else {
          document.documentElement.removeAttribute('data-theme');
          document.body.classList.remove('dark-mode');
          document.querySelectorAll('.darkmode-text').forEach(t => t.textContent = 'Modo Oscuro');
        }
        setTimeout(initAllCharts, 120);
      }
    });

    // Botones de accesibilidad de fuente
    document.querySelector('.btn-font-increase')?.addEventListener('click', () => {
      const current = parseFloat(getComputedStyle(document.body).fontSize) || 16;
      document.body.style.fontSize = (current + 1) + 'px';
    });
    document.querySelector('.btn-font-decrease')?.addEventListener('click', () => {
      const current = parseFloat(getComputedStyle(document.body).fontSize) || 16;
      if (current > 13) document.body.style.fontSize = (current - 1) + 'px';
    });



  });

})();
