import os
import glob
import re

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'
html_files = glob.glob(os.path.join(dir_path, '*.html'))

tickets_menu_item = """
                  <li>
                    <a href="tickets.html" class="dropdown-item rounded-2 py-2 small d-flex align-items-center gap-2">
                      <i class="bi bi-ticket-detailed fs-6 text-primary"></i> <span>Mis Tickets</span>
                    </a>
                  </li>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()

    modified = False

    # 1. Remove Language Toggle
    pattern_lang = r'<li>\s*<button type="button" class="dropdown-item[^>]*btn-lang-toggle[^>]*>[\s\S]*?<\/button>\s*<\/li>'
    if re.search(pattern_lang, html):
        html = re.sub(pattern_lang, '', html)
        modified = True

    # 2. Remove i18n script
    if '<script src="js/i18n.js"></script>' in html:
        html = html.replace('  <script src="js/i18n.js"></script>\n', '')
        html = html.replace('<script src="js/i18n.js"></script>', '')
        modified = True
        
    # Remove data-i18n attributes
    html = re.sub(r'\sdata-i18n="[^"]+"', '', html)

    # 3. Add Mis Tickets if it's missing (specifically for comunidad.html)
    if 'tickets.html' not in html and 'comunidad.html' in file:
        pattern_menu = r'(<li><hr class="dropdown-divider my-1"><\/li>\s*<li>\s*<button[^>]*btn-global-logout)'
        if re.search(pattern_menu, html):
            html = re.sub(pattern_menu, tickets_menu_item + r'\n                  \1', html)
            modified = True

    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Cleaned up {os.path.basename(file)}')

# Delete i18n.js
i18n_path = os.path.join(dir_path, 'js', 'i18n.js')
if os.path.exists(i18n_path):
    os.remove(i18n_path)
    print("Deleted i18n.js")

print('Cleanup complete.')
