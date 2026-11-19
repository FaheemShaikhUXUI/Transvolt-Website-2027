resolutions = [
    ('1920x1080 (100% zoom)', 1920, 1080),
    ('1536x864 (125% zoom)', 1536, 864),
    ('1536x750 (laptop with toolbars)', 1536, 750),
    ('2400x1350 (80% zoom)', 2400, 1350),
    ('1366x768 (budget laptop)', 1366, 768),
    ('1440x900 (MacBook)', 1440, 900)
]

print("=== FORMULA A: Width only (scale = w / 1920) ===")
for label, w, h in resolutions:
    s = w / 1920
    vw = w / s
    vh = h / s
    print(f"{label}: scale={s:.3f} => virtual W={vw:.0f}px, virtual H={vh:.0f}px")

print("\n=== FORMULA B: Width & Height fit (scale = min(w/1920, h/960)) ===")
for label, w, h in resolutions:
    s = min(w / 1920, h / 960)
    vw = w / s
    vh = h / s
    print(f"{label}: scale={s:.3f} => virtual W={vw:.0f}px, virtual H={vh:.0f}px")

