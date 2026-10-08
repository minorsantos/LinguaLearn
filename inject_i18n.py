import os
import glob

dir_path = r'c:\Users\estra\OneDrive\Documentos\IDIOMAS'
html_files = glob.glob(os.path.join(dir_path, '*.html'))

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    if '<script src="js/i18n.js"></script>' not in html:
        html = html.replace('</body>', '  <script src="js/i18n.js"></script>\n</body>')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Injected i18n into {os.path.basename(file)}')

print('Script injection complete.')
