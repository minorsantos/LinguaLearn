import os
import re

html_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\soporte.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_logic = """
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ticketId = `#TK-${randomNum}`;
        document.getElementById('lbl-generated-ticket').textContent = ticketId;
        
        // Save to localStorage for tickets.html
        let tickets = JSON.parse(localStorage.getItem('lingua_tickets') || '[]');
        const catSelect = document.getElementById('ticket-cat-select');
        const category = catSelect ? catSelect.value : 'General';
        
        const now = new Date();
        tickets.push({
            id: ticketId,
            category: category + " - " + subject,
            description: desc,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        });
        localStorage.setItem('lingua_tickets', JSON.stringify(tickets));

        const modalTicket = bootstrap.Modal.getInstance(document.getElementById('modal-ticket'));
"""

pattern = r'const randomNum = Math\.floor\(1000 \+ Math\.random\(\) \* 9000\);[\s\S]*?const modalTicket = bootstrap\.Modal\.getInstance\(document\.getElementById\(\'modal-ticket\'\)\);'
html = re.sub(pattern, new_logic.strip(), html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print('patched soporte')
