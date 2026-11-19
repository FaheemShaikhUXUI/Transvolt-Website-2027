import json

with open(r'C:\Users\LENOVO\.gemini\antigravity\brain\70d3391e-bf75-4063-8c04-5e3a3fa21514\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in lines:
    d = json.loads(line)
    if d.get('source') == 'USER_EXPLICIT' or d.get('type') == 'USER_INPUT':
        txt = str(d.get('content', ''))
        if any(k in txt.lower() for k in ['veh', 'car', 'truck', 'bus', 'drive', 'tree', 'right', 'left']):
            print('Step', d.get('step_index'), ':', txt.strip()[:150])

