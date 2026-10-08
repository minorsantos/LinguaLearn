import os
import glob
import re

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'

html_files = glob.glob(os.path.join(dir_path, '*.html'))

tickets_menu_item = """
                  <li>
                    <a href="tickets.html" class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2">
                      <i class="bi bi-ticket-detailed fs-6 text-primary"></i> <span data-i18n="menu.tickets">Mis Tickets</span>
                    </a>
                  </li>
                  <li>
                    <button type="button" class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2" id="btn-lang-toggle">
                      <i class="bi bi-globe fs-6 text-success"></i> <span id="lang-toggle-text">English (EN)</span>
                    </button>
                  </li>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Add menu items before the <hr> of Cerrar Sesión
    # Search for: <li><hr class="dropdown-divider my-1"></li> followed by Cerrar Sesi
    pattern_menu = r'(<li><hr class="dropdown-divider my-1"><\/li>\s*<li>\s*<button[^>]*btn-global-logout)'
    
    if re.search(pattern_menu, html) and 'tickets.html' not in html:
        html = re.sub(pattern_menu, tickets_menu_item + r'\n                  \1', html)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Patched menu in {os.path.basename(file)}')

print('Menu patching complete.')
