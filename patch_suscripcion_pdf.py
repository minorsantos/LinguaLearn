import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\suscripcion.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_print_style = """
  <style>
    @media print {
      @page {
        size: A4 portrait;
        margin: 1cm;
      }
      body * {
        visibility: hidden;
      }
      #modal-voucher-success, #modal-voucher-success * {
        visibility: visible;
      }
      body {
        background: #f6f0e4 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      #modal-voucher-success {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 18cm;
        height: auto;
        margin: 0;
        padding: 30px;
        background: #ffffff !important;
        border: 2px solid #d7c3a0 !important;
        border-radius: 15px !important;
        box-shadow: none !important;
        page-break-after: avoid;
        page-break-before: avoid;
      }
      #modal-voucher-success .modal-dialog, #modal-voucher-success .modal-content {
        margin: 0;
        padding: 0;
        width: 100%;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
      }
      #modal-voucher-success .btn-close, #modal-voucher-success .modal-footer {
        display: none !important;
      }
      
      /* Decoración extra para no verse tan vacío */
      #modal-voucher-success::after {
        content: "LinguaLearn - Documento Válido";
        display: block;
        text-align: center;
        margin-top: 40px;
        color: #999;
        font-size: 10px;
        font-style: italic;
      }
    }
  </style>
</head>
"""

pattern = r'<style>\s*@media print \{[\s\S]*?\}\s*<\/style>\s*<\/head>'
html = re.sub(pattern, new_print_style.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('patched')
