import os
import re

app_js_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\app.js'

with open(app_js_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

dashboard_logic = """
  // Dashboard U3 completion logic
  function checkU3Completion() {
    if (window.location.pathname.includes('dashboard.html') && localStorage.getItem('lingua_u3_completed') === 'true') {
      const u3Cards = document.querySelectorAll('.card-custom');
      u3Cards.forEach(card => {
        if (card.innerHTML.includes('Unidad 3')) {
          card.classList.replace('border-primary', 'border-success');
          card.style.background = 'rgba(235, 245, 235, 0.72) !important;';
          
          const badge = card.querySelector('.badge');
          if (badge) {
            badge.className = 'badge bg-success-subtle text-success border border-success-subtle fw-bold';
            badge.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completada 100%';
          }
          
          const stats = card.querySelectorAll('.text-secondary.small');
          if (stats.length > 0) stats[0].textContent = '6/6 Lecciones';
          
          const iconBox = card.querySelector('.bg-primary');
          if (iconBox) iconBox.className = 'p-2 bg-success text-white rounded-3 fs-5';
          
          const title = card.querySelector('h3');
          if (title) title.className = 'h6 fw-bold mb-1 text-success';
          
          const pb = card.querySelector('.progress-bar-fill');
          if (pb) {
            pb.style.width = '100%';
            pb.className = 'progress-bar-fill bg-success';
          }
          
          const footer = card.querySelector('.border-top');
          if (footer) {
            footer.className = 'd-flex justify-content-between align-items-center pt-3 border-top text-success small fw-bold';
            footer.innerHTML = `
                <a href="leccion.html" class="btn btn-sm btn-outline-success fw-bold d-inline-flex align-items-center gap-1">
                  <i class="bi bi-arrow-repeat"></i> Repasar Unidad
                </a>
                <span class="small fw-bold text-success">Nota: 100%</span>
            `;
          }
        }
      });
    }
  }

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

  document.addEventListener('DOMContentLoaded', () => {
    checkU3Completion();
  });
"""

# Append at the end of window.LinguaApp block, just before return
app_js = app_js.replace("return {\n    getUser,", dashboard_logic + "\n  return {\n    getUser,")

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(app_js)
print("app.js patched")
