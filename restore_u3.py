import os
import re
import subprocess

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'
new_path = os.path.join(dir_path, 'dashboard.html')

# Get old html from git directly to avoid encoding issues
old_html = subprocess.check_output(['git', 'show', 'af37c8a:dashboard.html'], cwd=dir_path).decode('utf-8')

with open(new_path, 'r', encoding='utf-8') as f:
    new_html = f.read()

pattern = r'<!-- Unidad 3:.*?(?=</section>)'
old_u3_match = re.search(pattern, old_html, re.DOTALL)
old_u3 = old_u3_match.group(0) if old_u3_match else None

new_u3_match = re.search(pattern, new_html, re.DOTALL)
if new_u3_match and old_u3:
    new_html = new_html[:new_u3_match.start()] + old_u3 + new_html[new_u3_match.end():]
    with open(new_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Restored U3 in dashboard")
else:
    print("Could not find pattern")

