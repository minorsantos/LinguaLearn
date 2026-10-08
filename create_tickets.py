import os

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'
soporte_path = os.path.join(dir_path, 'soporte.html')
tickets_path = os.path.join(dir_path, 'tickets.html')

with open(soporte_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <title>
html = html.replace('<title>LinguaLearn - Soporte y Ayuda</title>', '<title>LinguaLearn - Mis Tickets</title>')
html = html.replace('<title>LinguaLearn - Soporte</title>', '<title>LinguaLearn - Mis Tickets</title>')

# Find <main> and replace it
start_main = html.find('<main')
end_main = html.find('</main>') + 7

main_content = """
  <main class="dashboard-main py-5">
    <div class="container-xl">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold text-dark mb-1" data-i18n="tickets.title"><i class="bi bi-inbox-fill text-primary me-2"></i> Buzón de Tickets</h1>
          <p class="text-secondary small mb-0" data-i18n="tickets.subtitle">Aquí puedes consultar todos los tickets de soporte que has registrado.</p>
        </div>
        <div>
          <button class="btn btn-outline-danger fw-bold rounded-pill" id="btn-clear-tickets">
            <i class="bi bi-trash3-fill me-1"></i> <span data-i18n="tickets.clear">Vaciar buzón</span>
          </button>
        </div>
      </div>

      <div class="row g-4" id="tickets-container">
        <!-- Tickets will be injected here via JS -->
      </div>
      
      <div id="no-tickets-msg" class="text-center py-5 d-none">
        <div class="display-1 text-muted mb-3 opacity-25"><i class="bi bi-inbox"></i></div>
        <h3 class="h5 fw-bold text-secondary" data-i18n="tickets.empty">Tu buzón está vacío</h3>
        <p class="small text-muted" data-i18n="tickets.empty_sub">No tienes tickets de soporte registrados en este momento.</p>
        <a href="soporte.html" class="btn btn-primary-custom mt-2 rounded-pill"><i class="bi bi-plus-circle me-1"></i> <span data-i18n="tickets.create">Crear Ticket</span></a>
      </div>

    </div>
  </main>
"""

new_html = html[:start_main] + main_content + html[end_main:]

# Inject JS for tickets logic before </body>
tickets_js = """
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const ticketsContainer = document.getElementById('tickets-container');
      const noTicketsMsg = document.getElementById('no-tickets-msg');
      const btnClear = document.getElementById('btn-clear-tickets');
      
      function loadTickets() {
        let tickets = JSON.parse(localStorage.getItem('lingua_tickets') || '[]');
        ticketsContainer.innerHTML = '';
        
        if (tickets.length === 0) {
          noTicketsMsg.classList.remove('d-none');
          ticketsContainer.classList.add('d-none');
          btnClear.style.display = 'none';
        } else {
          noTicketsMsg.classList.add('d-none');
          ticketsContainer.classList.remove('d-none');
          btnClear.style.display = 'inline-block';
          
          tickets.reverse().forEach(t => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
              <div class="card-custom dashboard-card-glass h-100 p-4 border-start border-4 border-primary">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge bg-primary-subtle text-primary fw-bold px-2 py-1">${t.id}</span>
                  <span class="small text-muted"><i class="bi bi-clock me-1"></i>${t.time}</span>
                </div>
                <h3 class="h6 fw-bold mb-2">${t.category}</h3>
                <p class="small text-secondary mb-3">${t.description}</p>
                <div class="pt-3 border-top small text-muted d-flex justify-content-between">
                  <span><i class="bi bi-calendar-event me-1"></i>${t.date}</span>
                  <span class="text-success"><i class="bi bi-check-circle-fill me-1"></i>Registrado</span>
                </div>
              </div>
            `;
            ticketsContainer.appendChild(card);
          });
        }
      }
      
      btnClear.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas vaciar tu buzón de tickets? Esta acción no se puede deshacer.')) {
          localStorage.removeItem('lingua_tickets');
          loadTickets();
        }
      });
      
      loadTickets();
    });
  </script>
"""

new_html = new_html.replace('</body>', tickets_js + '\n</body>')

with open(tickets_path, 'w', encoding='utf-8') as f:
    f.write(new_html)

print("tickets.html created")
