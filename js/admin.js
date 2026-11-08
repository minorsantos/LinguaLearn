/**
 * ============================================================================
 * LINGUALEARN - CONTROLADOR DEL MENÚ Y PORTAL DEL ADMINISTRADOR (admin.js)
 * ============================================================================
 * Implementa seguridad, 8 gráficos con Chart.js, gestión de estudiantes,
 * ventas, suscripciones, seguimiento pedagógico, reportes CSV/PDF y logs de auditoría.
 */

(function () {
  'use strict';

  // 1. SEGURIDAD Y CONTROL DE ACCESO
  const ADMIN_SESSION_KEY = 'lingua_admin_session';
  const STUDENTS_KEY = 'lingua_admin_students';
  const SALES_KEY = 'lingua_admin_sales';
  const PLANS_KEY = 'lingua_admin_plans';
  const LOGS_KEY = 'lingua_admin_audit_logs';
  const ADMINS_KEY = 'lingua_admin_accounts';

  function checkAdminAuth() {
    try {
      const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || '{}');
      if (!session || session.isLoggedIn !== true || session.isAdmin !== true) {
        window.location.replace('index.html?portal=admin&error=auth_required');
        return null;
      }
      return session;
    } catch (e) {
      window.location.replace('index.html?portal=admin&error=auth_required');
      return null;
    }
  }

  const currentAdmin = checkAdminAuth();
  if (!currentAdmin) return;

  // 2. DATOS PREDETERMINADOS (SEMILLA REALISTA SI NO EXISTEN)
  function initDefaultData() {
    // A. Estudiantes
    if (!localStorage.getItem(STUDENTS_KEY)) {
      const defaultStudents = [
        { id: 'EST-101', name: 'Sofia Martinez', email: 'sofia.martinez@universidad.edu', phone: '+51 987 654 321', level: 'A2', progress: 68, streak: 5, xp: 120, plan: 'Plan Premium (Anual)', status: 'Activo', registeredAt: '2024-01-15', lastAccess: 'Hace 10 min', skills: { grammar: 75, vocab: 82, reading: 80, writing: 68, speaking: 72 } },
        { id: 'EST-102', name: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', phone: '+51 912 345 678', level: 'B1', progress: 84, streak: 12, xp: 450, plan: 'Plan Básico (Mensual)', status: 'Activo', registeredAt: '2024-02-01', lastAccess: 'Hace 2 horas', skills: { grammar: 85, vocab: 90, reading: 88, writing: 82, speaking: 80 } },
        { id: 'EST-103', name: 'Lucia Ramirez', email: 'lucia.ramirez@outlook.com', phone: '+51 945 678 123', level: 'A1', progress: 32, streak: 1, xp: 45, plan: 'Plan Básico (Mensual)', status: 'Activo', registeredAt: '2024-02-18', lastAccess: 'Ayer', skills: { grammar: 45, vocab: 50, reading: 40, writing: 35, speaking: 42 } },
        { id: 'EST-104', name: 'Alejandro Benitez', email: 'alejandro.b@corporativo.pe', phone: '+51 923 890 456', level: 'C1', progress: 92, streak: 28, xp: 1240, plan: 'Plan Empresarial (Vitalicio)', status: 'Activo', registeredAt: '2023-11-10', lastAccess: 'Hace 30 min', skills: { grammar: 95, vocab: 94, reading: 96, writing: 90, speaking: 92 } },
        { id: 'EST-105', name: 'Valeria Castro', email: 'v.castro@empresa.com', phone: '+51 978 123 456', level: 'A2', progress: 48, streak: 0, xp: 90, plan: 'Plan Premium (Anual)', status: 'Alerta', registeredAt: '2024-01-20', lastAccess: 'Hace 8 días', skills: { grammar: 48, vocab: 52, reading: 46, writing: 40, speaking: 45 } },
        { id: 'EST-106', name: 'Mateo Quispe', email: 'mateo.q@gmail.com', phone: '+51 955 432 109', level: 'B2', progress: 76, streak: 15, xp: 620, plan: 'Plan Premium (Anual)', status: 'Activo', registeredAt: '2023-12-05', lastAccess: 'Hace 1 hora', skills: { grammar: 78, vocab: 82, reading: 85, writing: 72, speaking: 75 } },
        { id: 'EST-107', name: 'Camila Herrera', email: 'camila.herrera@hotmail.com', phone: '+51 966 789 012', level: 'A1', progress: 22, streak: 0, xp: 30, plan: 'Plan Básico (Mensual)', status: 'Alerta', registeredAt: '2024-02-10', lastAccess: 'Hace 12 días', skills: { grammar: 35, vocab: 38, reading: 30, writing: 25, speaking: 28 } },
        { id: 'EST-108', name: 'Diego Flores', email: 'diego.flores@tech.pe', phone: '+51 933 210 987', level: 'C2', progress: 98, streak: 45, xp: 2150, plan: 'Plan Empresarial (Vitalicio)', status: 'Activo', registeredAt: '2023-09-12', lastAccess: 'Hace 5 min', skills: { grammar: 98, vocab: 99, reading: 98, writing: 96, speaking: 97 } },
        { id: 'EST-109', name: 'Mariana Gomez', email: 'mariana.g@gmail.com', phone: '+51 911 876 543', level: 'B1', progress: 62, streak: 4, xp: 310, plan: 'Plan Básico (Mensual)', status: 'Desactivado', registeredAt: '2024-01-08', lastAccess: 'Hace 20 días', skills: { grammar: 65, vocab: 70, reading: 68, writing: 58, speaking: 60 } },
        { id: 'EST-110', name: 'Gabriel Navarro', email: 'gabriel.navarro@uni.edu.pe', phone: '+51 999 111 222', level: 'A2', progress: 54, streak: 3, xp: 160, plan: 'Plan Premium (Anual)', status: 'Activo', registeredAt: '2024-02-05', lastAccess: 'Ayer', skills: { grammar: 58, vocab: 62, reading: 60, writing: 50, speaking: 52 } }
      ];
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(defaultStudents));
    }

    // B. Ventas y Transacciones
    if (!localStorage.getItem(SALES_KEY)) {
      const defaultSales = [
        { id: 'TRX-8901', date: '2024-02-28 14:32', student: 'Sofia Martinez', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'Yape', status: 'Completado', code: '890123' },
        { id: 'TRX-8902', date: '2024-02-28 12:15', student: 'Carlos Mendoza', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Plin', status: 'Completado', code: '451290' },
        { id: 'TRX-8903', date: '2024-02-27 18:40', student: 'Alejandro Benitez', plan: 'Plan Empresarial (Vitalicio)', amount: 399.00, gateway: 'Tarjeta Visa', status: 'Completado', code: '992104' },
        { id: 'TRX-8904', date: '2024-02-27 10:20', student: 'Lucia Ramirez', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Yape', status: 'Completado', code: '112094' },
        { id: 'TRX-8905', date: '2024-02-26 16:55', student: 'Mateo Quispe', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'Tarjeta Mastercard', status: 'Completado', code: '772134' },
        { id: 'TRX-8906', date: '2024-02-25 09:10', student: 'Valeria Castro', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'PayPal', status: 'Completado', code: '661029' },
        { id: 'TRX-8907', date: '2024-02-24 15:22', student: 'Camila Herrera', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Yape', status: 'Completado', code: '339182' },
        { id: 'TRX-8908', date: '2024-02-23 11:45', student: 'Diego Flores', plan: 'Plan Empresarial (Vitalicio)', amount: 399.00, gateway: 'Transferencia Bancaria', status: 'Completado', code: '554109' },
        { id: 'TRX-8909', date: '2024-02-22 17:05', student: 'Gabriel Navarro', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'Tarjeta Visa', status: 'Completado', code: '228710' },
        { id: 'TRX-8910', date: '2024-02-20 13:30', student: 'Renato Silva', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Plin', status: 'Pendiente', code: '901243' },
        { id: 'TRX-8911', date: '2024-02-18 19:12', student: 'Mariana Gomez', plan: 'Plan Básico (Mensual)', amount: 29.00, gateway: 'Yape', status: 'Reembolsado', code: '445109' },
        { id: 'TRX-8912', date: '2024-02-15 08:50', student: 'Jorge Vidal', plan: 'Plan Premium (Anual)', amount: 199.00, gateway: 'Tarjeta Visa', status: 'Completado', code: '883901' }
      ];
      localStorage.setItem(SALES_KEY, JSON.stringify(defaultSales));
    }

    // C. Planes de Suscripción
    if (!localStorage.getItem(PLANS_KEY)) {
      const defaultPlans = [
        { id: 'plan-basic', name: 'Plan Básico (Mensual)', price: 29.00, period: 'mes', badge: 'Popular', features: ['Acceso ilimitado a 3 idiomas', 'Lecciones interactivas A1-C2', 'Feedback fonético básico', 'Soporte vía tickets'], activeSubs: 580, status: 'Activo' },
        { id: 'plan-premium', name: 'Plan Premium (Anual)', price: 199.00, period: 'año', badge: 'Recomendado', features: ['Todo lo del Plan Básico', 'Laboratorio Fonético con IA avanzada', 'Descarga de Certificados oficiales', 'Ahorro del 42% anual', 'Soporte prioritario 24/7'], activeSubs: 520, status: 'Activo' },
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
        { timestamp: '2024-02-27 16:20:05', admin: 'Admin Académico', action: 'Envío de Alerta Pedagógica', module: 'Seguimiento (EST-105)', ip: '192.168.1.52', severity: 'Advertencia' },
        { timestamp: '2024-02-26 11:00:22', admin: 'SuperAdmin', action: 'Modificación de Precio', module: 'Suscripciones (Plan Anual)', ip: '192.168.1.1', severity: 'Crítico' },
        { timestamp: '2024-02-25 09:12:45', admin: 'Director Administrativo', action: 'Login con Código de Seguridad', module: 'Seguridad / Autenticación', ip: '192.168.1.45', severity: 'Éxito' }
      ];
      localStorage.setItem(LOGS_KEY, JSON.stringify(defaultLogs));
    }

    // E. Cuentas de Administradores
    if (!localStorage.getItem(ADMINS_KEY)) {
      const defaultAdmins = [
        { id: 'ADM-01', name: 'Director Administrativo', email: 'admin@lingualearn.edu', role: 'SuperAdmin', permissions: ['all'], status: 'Activo', lastLogin: 'En línea ahora' },
        { id: 'ADM-02', name: 'Prof. Roberto Silva', email: 'academico@lingualearn.edu', role: 'Admin Académico', permissions: ['students', 'learning', 'reports'], status: 'Activo', lastLogin: 'Hace 3 horas' },
        { id: 'ADM-03', name: 'Lic. Patricia Vega', email: 'finanzas@lingualearn.edu', role: 'Admin Financiero', permissions: ['sales', 'subscriptions', 'reports'], status: 'Activo', lastLogin: 'Ayer 18:20' }
      ];
      localStorage.setItem(ADMINS_KEY, JSON.stringify(defaultAdmins));
    }
  }

  initDefaultData();

  // Helper para agregar log
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

  // 3. INICIALIZACIÓN DE LOS 8 GRÁFICOS (CHART.JS)
  const chartInstances = {};

  function isDarkMode() {
    return document.body.classList.contains('dark-mode') || localStorage.getItem('lingua_theme') === 'dark';
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
      console.warn('Chart.js no está cargado');
      return;
    }

    const c = getChartColors();

    // ==========================================
    // A. DASHBOARD DE VENTAS (4 Gráficos)
    // ==========================================

    // 1. Gráfico de líneas: Ingresos Mensuales
    const ctxVentasIngresos = document.getElementById('chart-ventas-ingresos');
    if (ctxVentasIngresos) {
      if (chartInstances.ingresos) chartInstances.ingresos.destroy();
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
    }

    // 2. Gráfico circular / dona: Ventas por Tipo de Suscripción
    const ctxVentasPlanes = document.getElementById('chart-ventas-planes');
    if (ctxVentasPlanes) {
      if (chartInstances.planes) chartInstances.planes.destroy();
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
    }

    // 3. Gráfico de barras: Nuevos Clientes por Mes
    const ctxVentasClientes = document.getElementById('chart-ventas-clientes');
    if (ctxVentasClientes) {
      if (chartInstances.clientes) chartInstances.clientes.destroy();
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
    }

    // 4. Gráfico de barras apiladas: Estado de Suscripciones
    const ctxVentasEstados = document.getElementById('chart-ventas-estados');
    if (ctxVentasEstados) {
      if (chartInstances.estados) chartInstances.estados.destroy();
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
    }

    // ==========================================
    // B. DASHBOARD DE PROGRESO DE ESTUDIANTES (4 Gráficos)
    // ==========================================

    // 5. Gráfico de barras: Progreso General por Unidad de Aprendizaje
    const ctxProgresoGeneral = document.getElementById('chart-progreso-general');
    if (ctxProgresoGeneral) {
      if (chartInstances.progresoGeneral) chartInstances.progresoGeneral.destroy();
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
    }

    // 6. Gráfico circular / dona: Estudiantes por Nivel de Idioma
    const ctxProgresoNiveles = document.getElementById('chart-progreso-niveles');
    if (ctxProgresoNiveles) {
      if (chartInstances.niveles) chartInstances.niveles.destroy();
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
    }

    // 7. Gráfico de líneas: Evolución del Aprendizaje (Avance Promedio Mensual)
    const ctxProgresoEvolucion = document.getElementById('chart-progreso-evolucion');
    if (ctxProgresoEvolucion) {
      if (chartInstances.evolucion) chartInstances.evolucion.destroy();
      chartInstances.evolucion = new Chart(ctxProgresoEvolucion, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Evolución Promedio (%)',
            data: [42, 46, 51, 55, 60, 64, 68, 72, 75, 79, 82, 86],
            borderColor: c.primary,
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
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
    }

    // 8. Gráfico de barras: Rendimiento por Habilidad
    const ctxProgresoHabilidades = document.getElementById('chart-progreso-habilidades');
    if (ctxProgresoHabilidades) {
      if (chartInstances.habilidades) chartInstances.habilidades.destroy();
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
    }
  }

  // 4. GESTIÓN MODULAR DE PESTAÑAS (TABS)
  function setupAdminTabs() {
    const tabBtns = document.querySelectorAll('.admin-nav-tab');
    const sections = document.querySelectorAll('.admin-tab-section');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');

        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        sections.forEach(sec => {
          if (sec.id === targetId) {
            sec.classList.remove('d-none');
            sec.classList.add('fade-in-section');
          } else {
            sec.classList.add('d-none');
            sec.classList.remove('fade-in-section');
          }
        });

        // Re-renderizar gráficos si entra a dashboard
        if (targetId === 'sec-dashboard') {
          setTimeout(initAllCharts, 100);
        }

        // Registrar navegación
        const tabName = this.textContent.trim();
        addAuditLog(`Navegación al módulo ${tabName}`, 'Navegación Admin', 'Info');
      });
    });
  }

  // 5. GESTIÓN DE ESTUDIANTES (CRUD Y FILTROS)
  function getStudents() {
    return JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
  }

  function saveStudents(students) {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }

  function renderStudentsTable(filterLevel = 'all', searchQuery = '') {
    const tbody = document.getElementById('students-table-body');
    const countEl = document.getElementById('students-count-badge');
    if (!tbody) return;

    let students = getStudents();

    // Filtros
    if (filterLevel !== 'all') {
      students = students.filter(s => s.level.toUpperCase() === filterLevel.toUpperCase());
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      students = students.filter(s => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }

    if (countEl) countEl.textContent = `${students.length} estudiantes registrados`;

    tbody.innerHTML = '';
    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-secondary"><i class="bi bi-inbox fs-3 d-block mb-2"></i>No se encontraron estudiantes con los filtros seleccionados.</td></tr>`;
      return;
    }

    students.forEach(st => {
      const statusBadge = st.status === 'Activo' ? '<span class="badge-status-active"><i class="bi bi-check-circle-fill me-1"></i>Activo</span>' :
                          st.status === 'Alerta' ? '<span class="badge-status-alert"><i class="bi bi-exclamation-triangle-fill me-1"></i>En Riesgo</span>' :
                          '<span class="badge-status-inactive"><i class="bi bi-pause-circle-fill me-1"></i>Desactivado</span>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-bold font-monospace small text-primary">${st.id}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="avatar-circle-sm bg-primary-subtle text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; font-size: 0.8rem;">
              ${st.name.charAt(0)}
            </div>
            <div>
              <div class="fw-bold text-dark">${st.name}</div>
              <div class="text-secondary small" style="font-size: 0.775rem;">${st.email}</div>
            </div>
          </div>
        </td>
        <td><span class="badge-level badge-level-${st.level.toLowerCase()}">${st.level}</span></td>
        <td style="min-width: 140px;">
          <div class="d-flex align-items-center gap-2">
            <div class="progress flex-grow-1" style="height: 6px;">
              <div class="progress-bar ${st.progress < 50 ? 'bg-danger' : st.progress < 75 ? 'bg-warning' : 'bg-success'}" style="width: ${st.progress}%;"></div>
            </div>
            <span class="small fw-semibold">${st.progress}%</span>
          </div>
        </td>
        <td><span class="badge bg-light text-dark border small">${st.plan}</span></td>
        <td>${statusBadge}</td>
        <td class="small text-secondary">${st.lastAccess}</td>
        <td class="text-end">
          <div class="d-flex justify-content-end gap-1">
            <button class="btn-action-icon btn-view-student" data-id="${st.id}" title="Ver Ficha y Rendimiento"><i class="bi bi-eye"></i></button>
            <button class="btn-action-icon btn-edit-student" data-id="${st.id}" title="Editar Información"><i class="bi bi-pencil"></i></button>
            <button class="btn-action-icon btn-toggle-student text-${st.status === 'Activo' ? 'danger' : 'success'}" data-id="${st.id}" title="${st.status === 'Activo' ? 'Desactivar Cuenta' : 'Activar Cuenta'}">
              <i class="bi bi-${st.status === 'Activo' ? 'person-x' : 'person-check'}"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Enlazar botones de acción
    bindStudentActions();
  }

  function bindStudentActions() {
    // 1. Ver Ficha de Estudiante
    document.querySelectorAll('.btn-view-student').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openStudentDetailModal(id);
      });
    });

    // 2. Editar Estudiante
    document.querySelectorAll('.btn-edit-student').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openStudentEditModal(id);
      });
    });

    // 3. Activar / Desactivar
    document.querySelectorAll('.btn-toggle-student').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        toggleStudentStatus(id);
      });
    });
  }

  function openStudentDetailModal(id) {
    const students = getStudents();
    const st = students.find(s => s.id === id);
    if (!st) return;

    document.getElementById('det-student-name').textContent = st.name;
    document.getElementById('det-student-id').textContent = st.id;
    document.getElementById('det-student-email').textContent = st.email;
    document.getElementById('det-student-phone').textContent = st.phone || 'No registrado';
    document.getElementById('det-student-level').textContent = `Nivel ${st.level}`;
    document.getElementById('det-student-level').className = `badge-level badge-level-${st.level.toLowerCase()}`;
    document.getElementById('det-student-plan').textContent = st.plan;
    document.getElementById('det-student-progress').textContent = `${st.progress}%`;
    document.getElementById('det-student-streak').textContent = `${st.streak} días`;
    document.getElementById('det-student-xp').textContent = `${st.xp} XP`;
    document.getElementById('det-student-registered').textContent = st.registeredAt;
    document.getElementById('det-student-lastaccess').textContent = st.lastAccess;

    // Desglose de habilidades
    const skills = st.skills || { grammar: 70, vocab: 75, reading: 70, writing: 65, speaking: 70 };
    setSkillBar('skill-det-grammar', skills.grammar);
    setSkillBar('skill-det-vocab', skills.vocab);
    setSkillBar('skill-det-reading', skills.reading);
    setSkillBar('skill-det-writing', skills.writing);
    setSkillBar('skill-det-speaking', skills.speaking);

    const modalEl = document.getElementById('modal-student-detail');
    if (modalEl && window.bootstrap) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  function setSkillBar(id, val) {
    const bar = document.getElementById(id);
    const valText = document.getElementById(id + '-val');
    if (bar) bar.style.width = val + '%';
    if (valText) valText.textContent = val + '%';
  }

  function openStudentEditModal(id) {
    const students = getStudents();
    const st = students.find(s => s.id === id);
    if (!st) return;

    document.getElementById('edit-student-id').value = st.id;
    document.getElementById('edit-student-name').value = st.name;
    document.getElementById('edit-student-email').value = st.email;
    document.getElementById('edit-student-phone').value = st.phone || '';
    document.getElementById('edit-student-level').value = st.level;
    document.getElementById('edit-student-plan').value = st.plan;
    document.getElementById('edit-student-status').value = st.status;

    const modalEl = document.getElementById('modal-student-edit');
    if (modalEl && window.bootstrap) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  function toggleStudentStatus(id) {
    const students = getStudents();
    const st = students.find(s => s.id === id);
    if (!st) return;

    const prev = st.status;
    st.status = st.status === 'Activo' ? 'Desactivado' : 'Activo';
    saveStudents(students);
    renderStudentsTable();
    addAuditLog(`Cambio de estado de estudiante ${st.name} (${id}): ${prev} -> ${st.status}`, 'Gestión Estudiantes', 'Advertencia');
    showAdminToast(`El estudiante ${st.name} ha sido ${st.status === 'Activo' ? 'activado' : 'desactivado'}.`, 'info');
  }

  // 6. GESTIÓN DE VENTAS Y PASARELAS DE PAGO
  function getSales() {
    return JSON.parse(localStorage.getItem(SALES_KEY) || '[]');
  }

  function renderSalesTable(gatewayFilter = 'all', statusFilter = 'all', dateFilter = 'all') {
    const tbody = document.getElementById('sales-table-body');
    const totalRevenueEl = document.getElementById('kpi-sales-total-amount');
    if (!tbody) return;

    let sales = getSales();

    if (gatewayFilter !== 'all') {
      sales = sales.filter(s => s.gateway.toLowerCase().includes(gatewayFilter.toLowerCase()));
    }
    if (statusFilter !== 'all') {
      sales = sales.filter(s => s.status.toLowerCase() === statusFilter.toLowerCase());
    }

    // Calcular ingresos acumulados mostrados
    const totalAmount = sales.reduce((acc, curr) => acc + (curr.status === 'Completado' ? curr.amount : 0), 0);
    if (totalRevenueEl) totalRevenueEl.textContent = `S/ ${totalAmount.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;

    tbody.innerHTML = '';
    if (sales.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-secondary">No hay transacciones registradas con estos filtros.</td></tr>`;
      return;
    }

    sales.forEach(sl => {
      const statusBadge = sl.status === 'Completado' ? '<span class="badge bg-success-subtle text-success border border-success-subtle"><i class="bi bi-check-circle me-1"></i>Completado</span>' :
                          sl.status === 'Pendiente' ? '<span class="badge bg-warning-subtle text-warning border border-warning-subtle"><i class="bi bi-clock me-1"></i>Pendiente</span>' :
                          '<span class="badge bg-danger-subtle text-danger border border-danger-subtle"><i class="bi bi-arrow-counterclockwise me-1"></i>Reembolsado</span>';

      const gatewayIcon = sl.gateway.includes('Yape') ? '<i class="bi bi-qr-code text-primary fs-6 me-1"></i>' :
                          sl.gateway.includes('Plin') ? '<i class="bi bi-phone text-info fs-6 me-1"></i>' :
                          sl.gateway.includes('Tarjeta') ? '<i class="bi bi-credit-card text-success fs-6 me-1"></i>' :
                          sl.gateway.includes('PayPal') ? '<i class="bi bi-paypal text-primary fs-6 me-1"></i>' :
                          '<i class="bi bi-bank text-secondary fs-6 me-1"></i>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="font-monospace fw-bold text-dark">${sl.id}</td>
        <td class="small text-secondary">${sl.date}</td>
        <td class="fw-semibold text-dark">${sl.student}</td>
        <td><span class="badge bg-light text-dark border small">${sl.plan}</span></td>
        <td class="fw-bold text-success">S/ ${sl.amount.toFixed(2)}</td>
        <td><div class="d-flex align-items-center">${gatewayIcon} <span>${sl.gateway}</span></div></td>
        <td>${statusBadge}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // 7. GESTIÓN DE SUSCRIPCIONES (PLANES Y PRECIOS)
  function getPlans() {
    return JSON.parse(localStorage.getItem(PLANS_KEY) || '[]');
  }

  function savePlans(plans) {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  }

  function renderPlansCards() {
    const container = document.getElementById('plans-cards-grid');
    if (!container) return;

    const plans = getPlans();
    container.innerHTML = '';

    plans.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-3';
      col.innerHTML = `
        <div class="plan-pricing-card ${p.badge === 'Recomendado' ? 'featured' : ''}">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill">${p.badge}</span>
              <span class="badge bg-success-subtle text-success small">${p.status}</span>
            </div>
            <h3 class="h5 fw-bold text-dark mb-1">${p.name}</h3>
            <div class="d-flex align-items-baseline gap-1 my-3">
              <span class="h2 fw-bold text-primary mb-0">S/ ${p.price.toFixed(2)}</span>
              <span class="text-secondary small">/ ${p.period}</span>
            </div>
            <div class="small text-secondary mb-3">
              <i class="bi bi-people me-1"></i> <strong>${p.activeSubs}</strong> suscriptores activos
            </div>
            <ul class="list-unstyled d-flex flex-column gap-2 mb-4 small">
              ${p.features.map(f => `<li><i class="bi bi-check2 text-success me-2"></i>${f}</li>`).join('')}
            </ul>
          </div>
          <div>
            <button class="btn btn-outline-primary btn-sm w-100 fw-semibold btn-edit-plan" data-id="${p.id}">
              <i class="bi bi-pencil-square me-1"></i> Editar Precio y Beneficios
            </button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    // Enlazar edición de planes
    document.querySelectorAll('.btn-edit-plan').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openEditPlanModal(id);
      });
    });
  }

  function openEditPlanModal(id) {
    const plans = getPlans();
    const p = plans.find(x => x.id === id);
    if (!p) return;

    document.getElementById('edit-plan-id').value = p.id;
    document.getElementById('edit-plan-name').value = p.name;
    document.getElementById('edit-plan-price').value = p.price;
    document.getElementById('edit-plan-period').value = p.period;
    document.getElementById('edit-plan-badge').value = p.badge;
    document.getElementById('edit-plan-features').value = p.features.join('\n');

    const modalEl = document.getElementById('modal-edit-plan');
    if (modalEl && window.bootstrap) {
      new bootstrap.Modal(modalEl).show();
    }
  }

  // 8. SEGUIMIENTO DEL APRENDIZAJE Y ALERTAS PEDAGÓGICAS
  function renderLearningTracking(onlyAlerts = false) {
    const tbody = document.getElementById('learning-table-body');
    if (!tbody) return;

    let students = getStudents();
    if (onlyAlerts) {
      students = students.filter(s => s.status === 'Alerta' || s.progress < 50);
    }

    tbody.innerHTML = '';
    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-secondary"><i class="bi bi-emoji-smile fs-3 d-block text-success mb-2"></i>No hay estudiantes en situación de alerta actualmente.</td></tr>`;
      return;
    }

    students.forEach(st => {
      const skills = st.skills || { grammar: 70, vocab: 70, reading: 70, writing: 65, speaking: 70 };
      const lowestSkill = Object.keys(skills).reduce((a, b) => skills[a] < skills[b] ? a : b);
      const skillLabels = { grammar: 'Gramática', vocab: 'Vocabulario', reading: 'Lectura', writing: 'Escritura', speaking: 'Pronunciación' };

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="fw-bold">${st.name}</td>
        <td><span class="badge-level badge-level-${st.level.toLowerCase()}">${st.level}</span></td>
        <td style="min-width: 130px;">
          <div class="progress" style="height: 6px;">
            <div class="progress-bar ${st.progress < 50 ? 'bg-danger' : 'bg-success'}" style="width: ${st.progress}%;"></div>
          </div>
          <span class="small fw-bold">${st.progress}% avance</span>
        </td>
        <td><span class="badge bg-light text-dark border">${st.streak} días seguidos</span></td>
        <td><span class="small fw-semibold text-danger"><i class="bi bi-arrow-down me-1"></i>${skillLabels[lowestSkill]} (${skills[lowestSkill]}%)</span></td>
        <td>${st.status === 'Alerta' ? '<span class="badge bg-danger-subtle text-danger border border-danger-subtle">Riesgo de abandono</span>' : '<span class="badge bg-success-subtle text-success">Regular</span>'}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-warning btn-send-alert d-inline-flex align-items-center gap-1" data-name="${st.name}">
            <i class="bi bi-send-fill"></i> <span>Enviar Refuerzo</span>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.btn-send-alert').forEach(btn => {
      btn.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        showAdminToast(`¡Alerta pedagógica y material de refuerzo enviado a ${name}!`, 'success');
        addAuditLog(`Envío de refuerzo pedagógico a ${name}`, 'Seguimiento Aprendizaje', 'Info');
      });
    });
  }

  // 9. GENERACIÓN Y DESCARGA DE REPORTES (CSV Y PDF)
  function downloadCSV(filename, content) {
    const blob = new Blob(["\uFEFF" + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAdminToast(`Reporte descargado: ${filename}`, 'success');
    addAuditLog(`Descarga de reporte ${filename}`, 'Reportes', 'Info');
  }

  function setupReports() {
    // 1. Reporte de Ingresos Mensuales
    document.getElementById('btn-rep-ingresos-csv')?.addEventListener('click', function () {
      const csv = `Mes,Ingresos Brutos (S/),Suscripciones Nuevas,Reembolsos (S/),Ingreso Neto (S/)\n` +
        `Enero 2024,14200.00,75,0.00,14200.00\n` +
        `Febrero 2024,18500.00,92,29.00,18471.00\n` +
        `Marzo 2024,22100.00,110,0.00,22100.00\n` +
        `Abril 2024,19800.00,98,0.00,19800.00\n` +
        `Mayo 2024,24600.00,125,58.00,24542.00\n` +
        `Junio 2024,28900.00,142,0.00,28900.00\n` +
        `TOTAL ACUMULADO,128100.00,642,87.00,128013.00`;
      downloadCSV('reporte_ingresos_mensuales_lingualearn.csv', csv);
    });

    // 2. Reporte de Ventas por Tipo de Suscripción
    document.getElementById('btn-rep-ventas-csv')?.addEventListener('click', function () {
      const sales = getSales();
      let csv = 'ID Transaccion,Fecha,Estudiante,Plan,Monto (S/),Pasarela,Estado\n';
      sales.forEach(s => {
        csv += `"${s.id}","${s.date}","${s.student}","${s.plan}",${s.amount},"${s.gateway}","${s.status}"\n`;
      });
      downloadCSV('reporte_ventas_suscripcion_lingualearn.csv', csv);
    });

    // 3. Reporte de Distribución de Estudiantes por Nivel
    document.getElementById('btn-rep-niveles-csv')?.addEventListener('click', function () {
      const csv = `Nivel MCER,Descripcion,Cantidad Alumnos,Porcentaje,Tasa de Aprobacion\n` +
        `A1,Inicial,425,28.0%,94.2%\n` +
        `A2,Basico,486,32.0%,88.5%\n` +
        `B1,Intermedio,334,22.0%,82.1%\n` +
        `B2,Intermedio Alto,168,11.0%,76.4%\n` +
        `C1,Avanzado,76,5.0%,91.0%\n` +
        `C2,Maestria,31,2.0%,96.8%\n` +
        `TOTAL,,1520,100%,88.2%`;
      downloadCSV('reporte_distribucion_niveles_lingualearn.csv', csv);
    });

    // 4. Reporte Consolidado de Rendimiento Académico
    document.getElementById('btn-rep-rendimiento-csv')?.addEventListener('click', function () {
      const students = getStudents();
      let csv = 'ID,Nombre,Nivel,Progreso General (%),Racha (dias),XP Total,Gramatica (%),Vocabulario (%),Lectura (%),Escritura (%),Pronunciacion (%)\n';
      students.forEach(st => {
        const sk = st.skills || {};
        csv += `"${st.id}","${st.name}","${st.level}",${st.progress},${st.streak},${st.xp},${sk.grammar||0},${sk.vocab||0},${sk.reading||0},${sk.writing||0},${sk.speaking||0}\n`;
      });
      downloadCSV('reporte_rendimiento_academico_lingualearn.csv', csv);
    });

    // Botones de Impresión / PDF
    document.querySelectorAll('.btn-print-report').forEach(btn => {
      btn.addEventListener('click', function () {
        window.print();
        addAuditLog('Generación de Reporte para Impresión/PDF', 'Reportes', 'Info');
      });
    });
  }

  // 10. CONFIGURACIÓN Y BITÁCORA DE AUDITORÍA
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
        <td><span class="badge bg-light text-dark border small">${l.module}</span></td>
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

  // 11. TOAST HELPER
  function showAdminToast(msg, type = 'info') {
  window.showAdminToast = showAdminToast;
    if (window.LinguaApp && window.LinguaApp.showToast) {
      LinguaApp.showToast(msg, type);
      return;
    }
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'primary'} position-fixed bottom-0 end-0 m-3 shadow-lg z-3`;
    toast.style.zIndex = '99999';
    toast.innerHTML = `<i class="bi bi-info-circle me-2"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  // 12. INICIALIZACIÓN GLOBAL AL CARGAR DOM
  document.addEventListener('DOMContentLoaded', function () {
    // Sincronizar datos del administrador activo en la barra superior
    const adminNameEl = document.getElementById('header-admin-name');
    const adminEmailEl = document.getElementById('header-admin-email');
    if (adminNameEl) adminNameEl.textContent = currentAdmin.name || 'Director Administrativo';
    if (adminEmailEl) adminEmailEl.textContent = currentAdmin.email || 'admin@lingualearn.edu';

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

    // Pestañas
    setupAdminTabs();

    // Gráficos
    setTimeout(initAllCharts, 150);

    // Renderizar tablas
    renderStudentsTable();
    renderSalesTable();
    renderPlansCards();
    renderLearningTracking();
    setupReports();
    renderAuditLogsTable();
    renderAdminsTable();

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

      // Cerrar modal
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

    // Filtros de ventas
    const gatewayFilter = document.getElementById('select-filter-gateway');
    const statusFilter = document.getElementById('select-filter-sale-status');
    gatewayFilter?.addEventListener('change', () => {
      renderSalesTable(gatewayFilter.value, statusFilter ? statusFilter.value : 'all');
    });
    statusFilter?.addEventListener('change', () => {
      renderSalesTable(gatewayFilter ? gatewayFilter.value : 'all', statusFilter.value);
    });

    // Filtro de seguimiento (Solo en riesgo)
    const checkOnlyAlerts = document.getElementById('check-only-alerts');
    checkOnlyAlerts?.addEventListener('change', function () {
      renderLearningTracking(this.checked);
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
        permissions: role === 'SuperAdmin' ? ['all'] : role === 'Admin Académico' ? ['students', 'learning', 'reports'] : ['sales', 'subscriptions', 'reports'],
        status: 'Activo',
        lastLogin: 'Nunca (Recién creado)'
      });

      localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
      renderAdminsTable();
      addAuditLog(Creación de cuenta administrativa para  (), 'Seguridad y Roles', 'Crítico');
      showAdminToast(Nuevo administrador  () registrado con éxito., 'success');

      const modalEl = document.getElementById('modal-new-admin');
      if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl)?.hide();
      }
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
    });

    // Re-dibujar gráficos si se cambia el tema oscuro/claro
    window.addEventListener('storage', function (e) {
      if (e.key === 'lingua_theme') {
        setTimeout(initAllCharts, 150);
      }
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('.btn-toggle-darkmode')) {
        setTimeout(initAllCharts, 150);
      }
    });
  });

})();
