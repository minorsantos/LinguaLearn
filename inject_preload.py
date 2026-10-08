import os
import glob
import re

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'

# 1. Add preload class to all bodies
html_files = glob.glob(os.path.join(dir_path, '*.html'))

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Add preload to body class
    pattern = r'<body([^>]*)class="([^"]*)"([^>]*)>'
    
    def replacer(match):
        attrs1 = match.group(1)
        classes = match.group(2)
        attrs2 = match.group(3)
        if 'preload-theme' not in classes:
            classes = classes.strip() + ' preload-theme'
        return f'<body{attrs1}class="{classes}"{attrs2}>'
        
    html = re.sub(pattern, replacer, html)
    
    # Also handle <body > without class
    if 'class=' not in html.split('<body')[1].split('>')[0]:
         html = re.sub(r'<body([^>]*)>', r'<body\1 class="preload-theme">', html)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Added preload-theme to {os.path.basename(file)}")

# 2. Add CSS for preload-theme
css_path = os.path.join(dir_path, 'css', 'styles.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

preload_css = """
/* Prevenir transiciones en la carga de la página */
body.preload-theme,
body.preload-theme * {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -ms-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}
"""

if 'body.preload-theme' not in css:
    css = css + preload_css
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Added preload-theme to styles.css")

# 3. Add JS to remove preload-theme in app.js
js_path = os.path.join(dir_path, 'js', 'app.js')
with open(js_path, 'r', encoding='utf-8') as f:
    js = f.read()

remove_preload_js = """
  // Remover preload-theme despues de la primera carga para permitir transiciones
  setTimeout(() => {
    document.body.classList.remove('preload-theme');
  }, 100);
"""

if 'preload-theme' not in js:
    # insert inside DOMContentLoaded
    pattern = r'(document\.addEventListener\(\'DOMContentLoaded\', \(\) => \{)'
    js = re.sub(pattern, r'\1' + remove_preload_js, js)
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print("Added preload-theme removal to app.js")

print("Preload logic injected.")
