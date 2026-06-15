import pyfiglet

def to_block(text: str) -> str:
    raw = pyfiglet.figlet_format(text, font='banner3-D')
    lines = []
    for line in raw.splitlines():
        if not line.strip():
            continue
        mapped = (
            line.replace('#', '\u2588')
            .replace(':', '\u2591')
            .replace("'", '\u2591')
        )
        lines.append(mapped)
    return '\n'.join(lines)

import pyfiglet

def to_block(text: str) -> str:
    raw = pyfiglet.figlet_format(text, font='banner3-D')
    lines = []
    for line in raw.splitlines():
        if not line.strip():
            continue
        mapped = (
            line.replace('#', '\u2588')
            .replace(':', '\u2591')
            .replace("'", '\u2591')
        )
        lines.append(mapped)
    return '\n'.join(lines)

with open('scripts/ascii-output.txt', 'w', encoding='utf-8') as f:
    f.write('=== MR.WZRD (reference) ===\n')
    f.write(to_block('MR.WZRD'))
    f.write('\n\n=== MR.CXDEV ===\n')
    f.write(to_block('MR.CXDEV'))

