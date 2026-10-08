import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\suscripcion.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_modal = """
  <!-- MODAL DE COMPROBANTE Y PAGO EXITOSO (DISEÑO BOLETA SUNAT) -->
  <div class="modal fade" id="modal-voucher-success" tabindex="-1" aria-labelledby="modalVoucherLabel" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content card-custom test-card-glass border-0 p-0" id="print-invoice-content">
        
        <div class="modal-header border-0 pb-0 px-4 pt-4 d-print-none">
          <div class="d-flex align-items-center gap-2">
            <div class="p-2 bg-success text-white rounded-circle fs-5">
              <i class="bi bi-check-lg"></i>
            </div>
            <div>
              <h2 class="h5 modal-title fw-bold" id="modalVoucherLabel">¡Pago Confirmado con Éxito!</h2>
              <div class="small text-secondary">Comprobante generado correctamente</div>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>

        <div class="modal-body p-4 bg-white text-dark" style="font-family: Arial, sans-serif; border-radius: 12px; margin: 15px;" id="invoice-body">
          
          <!-- Header de Factura -->
          <div class="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
            <div class="d-flex align-items-center gap-2">
              <div class="bg-primary text-white rounded p-2" style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
                <div style="width: 20px; height: 20px; background: white; border-radius: 50%;"></div>
              </div>
              <div>
                <h1 class="h4 fw-bold text-dark mb-0" style="letter-spacing: -0.5px; color: #0f172a !important;">LinguaLearn</h1>
                <div class="small fw-bold" style="font-size: 11px; color: #334155;">LINGUALEARN PERÚ S.A.C.</div>
                <div style="font-size: 10px; color: #64748b; line-height: 1.2; margin-top: 4px;">
                  Av. Javier Prado Este 4200, Santiago de Surco, Lima - Perú<br>
                  soporte@lingualearn.pe | www.lingualearn.pe
                </div>
              </div>
            </div>
            <div class="border border-2 border-primary-subtle rounded text-center overflow-hidden" style="min-width: 280px;">
              <div class="fw-bold py-2 bg-light text-dark" style="font-size: 15px;">R.U.C. 20608945123</div>
              <div class="bg-primary-subtle text-primary fw-bold py-2" style="font-size: 14px;">BOLETA DE VENTA ELECTRÓNICA</div>
              <div class="fw-bold text-danger py-2 fs-5 bg-light">B001 - 00048291</div>
            </div>
          </div>

          <!-- Datos Cliente / Transacción -->
          <div class="row g-3 mb-4">
            <div class="col-sm-6">
              <div class="border rounded p-3 h-100 bg-light border-light-subtle">
                <div class="fw-bold mb-2 text-primary" style="font-size: 12px;">DATOS DEL CLIENTE / RECEPTOR</div>
                <table style="font-size: 12px; width: 100%;">
                  <tr><td class="fw-bold py-1" style="width: 90px; color:#475569;">Cliente:</td><td class="fw-bold text-dark">Sofía Martínez</td></tr>
                  <tr><td class="fw-bold py-1" style="color:#475569;">Correo:</td><td class="text-dark">sofia.martinez@universidad.edu</td></tr>
                  <tr><td class="fw-bold py-1" style="color:#475569;">Doc. Identidad:</td><td class="text-dark">DNI 74829104</td></tr>
                </table>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="border rounded p-3 h-100 bg-light border-light-subtle">
                <div class="fw-bold mb-2 text-primary" style="font-size: 12px;">DATOS DE LA TRANSACCIÓN</div>
                <table style="font-size: 12px; width: 100%;">
                  <tr><td class="fw-bold py-1" style="width: 120px; color:#475569;">Fecha de Emisión:</td><td class="text-dark">08/10/2026 - 17:45 hrs</td></tr>
                  <tr><td class="fw-bold py-1" style="color:#475569;">Método de Pago:</td><td class="text-dark">Billetera Digital (Yape / Plin)</td></tr>
                  <tr><td class="fw-bold py-1" style="color:#475569;">N° Operación / Ref:</td><td class="fw-bold text-primary">TXN-YP-98421045</td></tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="border rounded overflow-hidden mb-4 border-light-subtle">
            <table class="table table-borderless mb-0" style="font-size: 12px;">
              <thead class="bg-light border-bottom text-primary" style="font-size: 11px;">
                <tr>
                  <th class="py-2 px-3 fw-bold">ÍTEM / DESCRIPCIÓN DEL SERVICIO</th>
                  <th class="py-2 px-3 text-center fw-bold">CANT.</th>
                  <th class="py-2 px-3 text-center fw-bold">P. UNITARIO</th>
                  <th class="py-2 px-3 text-end fw-bold">VALOR TOTAL</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr>
                  <td class="py-3 px-3 border-bottom-0 text-dark">
                    <strong style="font-size: 13px;" id="invoice-plan-name">Suscripción LinguaLearn - Plan Pro Anual</strong><br>
                    <span style="color: #64748b;">• Acceso completo a contenidos y algoritmo adaptativo</span><br>
                    <span style="color: #64748b;">• Práctica de pronunciación por voz y comunidad de intercambio</span><br>
                    <strong class="text-success mt-1 d-inline-block" style="font-size: 11px;">• Vigencia: 08/10/2026 hasta 08/10/2027 (12 meses)</strong>
                  </td>
                  <td class="py-3 px-3 text-center align-top text-dark border-bottom-0">1</td>
                  <td class="py-3 px-3 text-center align-top text-dark border-bottom-0" id="invoice-p-unitario">S/ 203.31</td>
                  <td class="py-3 px-3 text-end align-top fw-bold text-dark border-bottom-0" id="invoice-valor-total">S/ 203.31</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div class="row g-3 mb-4">
            <div class="col-sm-6">
              <div class="border border-2 border-success rounded p-3 h-100 bg-success-subtle text-success">
                <h4 class="fw-bold mb-2 fs-5" style="letter-spacing: -0.5px;">ESTADO: CANCELADO</h4>
                <div style="font-size: 11px; line-height: 1.6;">
                  Transacción validada electrónicamente<br>
                  Código de Autorización: 0938472-SUNAT<br>
                  <strong>Plataforma: LinguaLearn Web Perú</strong>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="border rounded p-3 h-100 bg-light border-light-subtle">
                <table style="font-size: 12px; width: 100%; color: #475569;" class="mb-2">
                  <tr><td class="py-1">Op. Gravada:</td><td class="text-end text-dark" id="invoice-op-gravada">S/ 203.31</td></tr>
                  <tr><td class="py-1">I.G.V. (18%):</td><td class="text-end text-dark" id="invoice-igv">S/ 36.59</td></tr>
                </table>
                <div class="border-top pt-2 mt-2 d-flex justify-content-between align-items-center">
                  <strong class="text-primary fs-6">TOTAL A PAGAR:</strong>
                  <div class="text-end">
                    <strong class="text-primary fs-4" id="invoice-total-pagar" style="letter-spacing: -0.5px;">S/ 239.90</strong>
                    <div style="font-size: 9px; color: #64748b; margin-top: -3px;" class="fw-bold">SOLES (PEN)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fw-bold text-dark mb-4" style="font-size: 11px; margin-top: -10px;">SON: DOSCIENTOS TREINTA Y NUEVE CON 90/100 SOLES</div>

          <!-- Footer Factura con QR -->
          <div class="border rounded p-3 bg-light border-light-subtle d-flex align-items-center gap-4 mb-4">
            <!-- Simulated QR code using CSS blocks to match aesthetic without external img -->
            <div style="width: 80px; height: 80px; background: white; border: 2px solid #0f172a; padding: 4px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 2px;" class="flex-shrink-0">
              <div style="background: #0f172a; grid-column: span 2; grid-row: span 2; border: 2px solid white; outline: 3px solid #0f172a; margin: 2px;"></div>
              <div></div><div></div>
              <div style="background: #0f172a; grid-column: span 2; grid-row: span 2; border: 2px solid white; outline: 3px solid #0f172a; margin: 2px;"></div>
              <div></div><div style="background: #0f172a;"></div><div></div><div style="background: #0f172a;"></div>
              <div style="background: #0f172a; grid-column: span 2; grid-row: span 2; border: 2px solid white; outline: 3px solid #0f172a; margin: 2px;"></div>
              <div></div><div style="background: #0f172a;"></div><div style="background: #0f172a;"></div><div></div>
            </div>
            
            <div style="font-size: 11px; color: #475569; line-height: 1.5;">
              <strong class="text-primary" style="font-size: 12px;">Representación impresa de la BOLETA DE VENTA ELECTRÓNICA</strong><br>
              Autorizado mediante Resolución de Superintendencia SUNAT N° 034-005-0005315<br>
              Consulte la autenticidad de este comprobante ingresando a: portal.lingualearn.pe/validador<br><br>
              <strong class="text-dark">Resumen Hash Electrónico: a7f89d3e21c890123fabc78921df6504</strong><br>
              Firma Digital SUNAT: RSA-SHA256 / Certificado emitido por RENIEC-PKI
            </div>
          </div>

          <div class="border-top pt-3 text-center">
            <strong class="text-success" style="font-size: 12px;">¡Gracias por suscribirte a LinguaLearn! Su cuenta ha sido activada automáticamente para todas las funciones.</strong><br>
            <span style="font-size: 9px; color: #94a3b8;">LinguaLearn Perú S.A.C. — Plataforma Web de Aprendizaje Adaptativo de Idiomas © 2026</span>
          </div>

        </div>

        <div class="modal-footer border-0 pt-0 px-4 pb-4 justify-content-between d-print-none">
          <button type="button" class="btn btn-secondary-custom rounded-pill" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary-custom rounded-pill px-4" onclick="window.print()">
            <i class="bi bi-file-earmark-pdf-fill me-1"></i> Descargar Comprobante (PDF)
          </button>
        </div>
      </div>
    </div>
  </div>
"""

pattern_modal = r'<!-- MODAL DE COMPROBANTE Y PAGO EXITOSO -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>'
html = re.sub(pattern_modal, new_modal.strip(), html)

# We must update app.js or script to dynamically populate the invoice, or just do it in script of suscripcion.html
pattern_script = r"document\.getElementById\('modal-plan-name'\)\.textContent = summaryTitle\.textContent;"
new_script = """
        const planName = summaryTitle.textContent;
        const total = parseFloat(summaryTotalPay.textContent.replace('S/ ', ''));
        const opGravada = (total / 1.18).toFixed(2);
        const igv = (total - opGravada).toFixed(2);
        
        document.getElementById('invoice-plan-name').textContent = 'Suscripción LinguaLearn - ' + planName;
        document.getElementById('invoice-p-unitario').textContent = 'S/ ' + opGravada;
        document.getElementById('invoice-valor-total').textContent = 'S/ ' + opGravada;
        document.getElementById('invoice-op-gravada').textContent = 'S/ ' + opGravada;
        document.getElementById('invoice-igv').textContent = 'S/ ' + igv;
        document.getElementById('invoice-total-pagar').textContent = 'S/ ' + total.toFixed(2);
"""

# Wait, `summaryTitle.textContent` might include "Mensual" or something. The script is inside suscripcion.html.
html = re.sub(r"document\.getElementById\('modal-plan-name'\)\.textContent = summaryTitle\.textContent;\s*document\.getElementById\('modal-total-paid'\)\.textContent = summaryTotalPay\.textContent;", new_script.strip(), html)


# Fix the Print CSS to ensure only the invoice-body is printed beautifully
new_print_css = """
  <style>
    @media print {
      @page {
        size: A4 portrait;
        margin: 0;
      }
      body * {
        visibility: hidden !important;
      }
      #invoice-body, #invoice-body * {
        visibility: visible !important;
      }
      body {
        background: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      #modal-voucher-success {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: #ffffff !important;
      }
      #invoice-body {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 21cm; /* A4 width */
        padding: 2cm !important;
        margin: 0 !important;
        border: none !important;
      }
      .d-print-none {
        display: none !important;
      }
    }
  </style>
"""

# replace old @media print style
html = re.sub(r'<style>\s*@media print \{[\s\S]*?\}\s*<\/style>', new_print_css.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("suscripcion.html patched with new PDF invoice design")

