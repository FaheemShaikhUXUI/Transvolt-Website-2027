import os, re

for root, dirs, files in os.walk('Transvolt Website V2/src'):
    for f in files:
        if f.endswith(('.css', '.jsx', '.js')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8') as fl:
                c = fl.read()
                for m in re.finditer(r'@keyframes\s+([a-zA-Z0-9_-]+)', c):
                    print(f, 'keyframes:', m.group(1))
                if 'translateX' in c:
                    for line in c.splitlines():
                        if 'translateX' in line and any(k in line.lower() for k in ['veh', 'drive', 'car', 'bus']):
                            print(f, 'translateX line:', line.strip())

