import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\suscripcion.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the coupon logic
coupon_old = """      btnApplyCoupon.addEventListener('click', function () {
        const code = inputCoupon.value.trim().toUpperCase();
        if (code === 'PERU2026' || code === 'LINGUA10') {
          couponApplied = true;
          couponFeedback.classList.remove('d-none');
          updatePrices();
        } else {
          alert('Cupón no válido. Prueba utilizando el código promocional: PERU2026');
        }
      });"""

# Because of encoding issues with Ó and Á, let's use regex
coupon_pattern = r"const code = inputCoupon\.value\.trim\(\)\.toUpperCase\(\);\s*if \(code === 'PERU2026' \|\| code === 'LINGUA10'\) {[\s\S]*?alert\('.*?'\);\s*\}"

coupon_new = """const code = inputCoupon.value.trim();
        if (code === '123456') {
          couponApplied = true;
          couponFeedback.classList.remove('d-none');
          updatePrices();
        } else {
          alert('Cupón no válido.');
        }"""

html = re.sub(coupon_pattern, coupon_new, html)

# 2. Add print styles for PDF
print_style = """
  <style>
    @media print {
      body * {
        visibility: hidden;
      }
      #modal-voucher-success, #modal-voucher-success * {
        visibility: visible;
      }
      #modal-voucher-success {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 20px;
        box-shadow: none !important;
        background: transparent !important;
      }
      #modal-voucher-success .modal-dialog, #modal-voucher-success .modal-content {
        margin: 0;
        padding: 0;
        width: 100%;
        border: none !important;
        box-shadow: none !important;
      }
      #modal-voucher-success .btn-close, #modal-voucher-success .modal-footer {
        display: none !important;
      }
    }
  </style>
</head>"""

html = html.replace('</head>', print_style)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("suscripcion.html successfully patched")
