import os
import re

app_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS\js\app.js'

with open(app_path, 'r', encoding='utf-8') as f:
    app_js = f.read()

# Remove checkU3Completion function
app_js = re.sub(r'\s*// Dashboard U3 completion logic[\s\S]*?function checkU3Completion\(\) \{[\s\S]*?\}\s*\}', '', app_js)

# Remove the call to checkU3Completion() inside DOMContentLoaded
app_js = re.sub(r'\s*checkU3Completion\(\);', '', app_js)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_js)
print("Removed U3 logic from app.js")
