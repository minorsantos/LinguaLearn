import os

app_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

alt_r_logic = """
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
"""

if 'Atajo Alt + R' not in app_js:
    app_js = app_js.replace("  // Inicializar al cargar", alt_r_logic + "\n  // Inicializar al cargar")
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(app_js)
    print("Added Alt+R logic")
else:
    print("Already exists")
