import os
import glob
import re

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'
html_files = glob.glob(os.path.join(dir_path, '*.html'))

script_to_inject = """
  <script>
    if (localStorage.getItem('lingua_theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark-mode');
    }
  </script>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Check if already injected
    if "if (localStorage.getItem('lingua_theme') === 'dark')" in html:
        continue
        
    # Find body tag and inject immediately after
    # Using regex to capture `<body ...>` and replace with `<body ...> \n <script>...`
    pattern = r'(<body[^>]*>)'
    
    html = re.sub(pattern, r'\1' + script_to_inject, html, count=1)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Patched {os.path.basename(file)}")

print("All files patched to prevent white flash.")
