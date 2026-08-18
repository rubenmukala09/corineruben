"""Turn lyrics into a styled ASS subtitle track sized for a 1080x1920 clip.

Input is either an .lrc (lines like "[01:12.40] text") or plain text, one line
per displayed line. With plain text, lines are spread across sung passages
detected from the audio energy envelope, which gets them close enough to
nudge by hand rather than time from scratch.
"""
import sys, re, json, numpy as np

ENV = sys.argv[3] if len(sys.argv) > 3 else "env30.npy"
src, out = sys.argv[1], sys.argv[2]
raw = [l.rstrip("\n") for l in open(src, encoding="utf-8")]

def ts(t):
    h, r = divmod(max(t, 0), 3600); m, s = divmod(r, 60)
    return "%d:%02d:%05.2f" % (h, m, s)

lrc = re.compile(r"^\s*\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$")
timed = []
for l in raw:
    m = lrc.match(l)
    if m:
        timed.append((int(m.group(1)) * 60 + float(m.group(2)), m.group(3).strip()))

if timed:                                    # explicit timings win
    timed.sort()
    cues = [(t, timed[i + 1][0] - 0.08 if i + 1 < len(timed) else t + 4.0, txt)
            for i, (t, txt) in enumerate(timed) if txt]
else:                                        # spread over detected sung passages
    lines = [l.strip() for l in raw if l.strip()]
    env = np.load(ENV); fps = 30
    thr = np.percentile(env, 42)
    on = env > thr
    runs, i = [], 0
    while i < len(on):
        if on[i]:
            j = i
            while j < len(on) and on[j]: j += 1
            if (j - i) / fps > 0.9: runs.append((i / fps, j / fps))
            i = j
        else: i += 1
    merged = []                              # join passages split by short gaps
    for s, e in runs:
        if merged and s - merged[-1][1] < 0.45: merged[-1][1] = e
        else: merged.append([s, e])
    if len(merged) >= len(lines):
        step = len(merged) / len(lines)
        slots = [merged[int(i * step)] for i in range(len(lines))]
    else:                                    # more lines than passages: split evenly
        t0, t1 = merged[0][0], merged[-1][1]
        edges = np.linspace(t0, t1, len(lines) + 1)
        slots = [[edges[i], edges[i + 1]] for i in range(len(lines))]
    cues = []
    for i, (l, (s, e)) in enumerate(zip(lines, slots)):
        end = min(e + 0.6, slots[i + 1][0] - 0.05 if i + 1 < len(slots) else e + 2.5)
        cues.append((max(s - 0.25, 0), max(end, s + 1.2), l))

HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Lyric,DejaVu Sans,66,&H00FFFFFF,&H008AD6FF,&H00201810,&H96000000,-1,0,0,0,100,100,1.2,0,1,3,4,2,70,70,120,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
with open(out, "w", encoding="utf-8") as f:
    f.write(HEAD)
    for s, e, txt in cues:
        txt = txt.replace("{", "(").replace("}", ")")
        # fade in/out plus a small scale-up so each line lands rather than blinks
        eff = r"{\fad(200,220)\fscx92\fscy92\t(0,220,\fscx100\fscy100)}"
        f.write("Dialogue: 0,%s,%s,Lyric,,0,0,0,,%s%s\n" % (ts(s), ts(e), eff, txt))
print("wrote %d lines -> %s" % (len(cues), out))
if cues:
    print("first cue %.2fs, last cue ends %.2fs" % (cues[0][0], cues[-1][1]))
