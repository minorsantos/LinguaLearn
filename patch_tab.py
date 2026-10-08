import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\suscripcion.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Clean up the trailing old modal
# Find the start of the old modal fragment which was left behind
# It starts with "          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>"
# and ends with "</a>\n        </div>"
old_modal_start = html.find('          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>\n        </div>\n        <div class="modal-body py-3">')
if old_modal_start != -1:
    # Find the end of this div block
    old_modal_end = html.find('</a>\n        </div>', old_modal_start)
    if old_modal_end != -1:
        # Also include the closing tags that follow
        # Actually it's better to just regex it
        pass

pattern_cleanup = r'          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"><\/button>\s*<\/div>\s*<div class="modal-body py-3">[\s\S]*?<\/a>\s*<\/div>\s*(<\/div>\s*<\/div>\s*<\/div>)?'
html = re.sub(pattern_cleanup, '', html)

# Fix any extra closing divs if they exist
html = html.replace('      </div>\n    </div>\n  </div>\n          <button', '      </div>\n    </div>\n  </div>') # fallback

# 2. Add openPDFTab function
script_function = """
      function openPDFTab() {
        const invoiceHTML = document.getElementById('invoice-body').outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Comprobante LinguaLearn PDF</title>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
              <style>
                body {
                  background: #525659;
                  display: flex;
                  justify-content: center;
                  padding: 2rem;
                  margin: 0;
                }
                #invoice-container {
                  background: white;
                  width: 21cm;
                  min-height: 29.7cm;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                  padding: 2cm !important;
                  position: relative !important;
                  left: 0 !important;
                  top: 0 !important;
                  transform: none !important;
                }
                @media print {
                  body { background: white; padding: 0; }
                  #invoice-container { box-shadow: none; padding: 0 !important; width: 100%; min-height: auto; }
                }
              </style>
            </head>
            <body>
              <div id="invoice-container">
                ${invoiceHTML}
              </div>
              <script>
                // Opcional: auto imprimir
                // setTimeout(() => window.print(), 500);
              </script>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
"""

if 'function openPDFTab()' not in html:
    html = html.replace('// Confirmar y pagar', script_function + '\n      // Confirmar y pagar')

# 3. Change onclick="window.print()" to onclick="openPDFTab()"
html = html.replace('onclick="window.print()"', 'onclick="openPDFTab()"')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("suscripcion.html cleaned and openPDFTab added")

