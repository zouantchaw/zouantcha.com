"""Generate the public résumé at /resume.pdf. Run: uv run --with reportlab python scripts/build-public-resume.py"""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter

root = Path(__file__).resolve().parents[1]
out = root / 'public/resume.pdf'
ink = HexColor('#171717')
muted = HexColor('#525866')
blue = HexColor('#2449d8')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=ink, spaceAfter=4),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=11, leading=14, textColor=ink, spaceAfter=6),
    'meta': ParagraphStyle('meta', fontName='Helvetica', fontSize=9, leading=13, textColor=muted, spaceAfter=8),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.5, leading=13, textColor=ink, spaceAfter=5),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=12, spaceAfter=6, textColor=blue),
    'job': ParagraphStyle('job', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=ink, spaceAfter=2),
    'dates': ParagraphStyle('dates', fontName='Helvetica', fontSize=9, leading=12, textColor=muted, spaceAfter=4),
}

story = []

def para(text, style='body'):
    return Paragraph(text, styles[style])

def job(title, dates, text):
    story.append(KeepTogether([para(title, 'job'), para(dates, 'dates'), para(text), Spacer(1, 6)]))

story += [
    para('Wielfried Zouantcha', 'name'),
    para('Software Engineer · Product, Data &amp; Applied AI', 'role'),
    para(
        'Washington, DC · '
        '<link href="mailto:zouantchaw74@gmail.com">zouantchaw74@gmail.com</link> · '
        '<link href="https://www.zouantcha.com">zouantcha.com</link> · '
        '<link href="https://www.linkedin.com/in/wielfried-zouantcha-6b4722136/">LinkedIn</link> · '
        '<link href="https://github.com/zouantchaw">GitHub</link>',
        'meta',
    ),
    para('Full-stack engineer with 5+ years shipping SaaS products, data systems, internal tools, and applied AI. I work across product and engineering, from understanding the problem to getting the system into production.'),
    para('EXPERIENCE', 'section'),
]
job(
    'Oloodi Technologies | Customer Engineer / Full-Stack Engineer (Contract)',
    'November 2025 – present',
    'Build KROW Workforce across staffing, onboarding, shift assignment, time tracking and invoicing. Work across a React/TypeScript portal and backend services. Prepare and deliver product demonstrations to teams including Snapchat, Google, EA Sports and Nvidia.',
)
job(
    'Ethos / HeyEthos | Senior Full-Stack Engineer',
    'May 2022 – November 2025',
    'Took a single-tenant membership MVP to a multi-tenant SaaS serving 50+ merchant accounts. Built across Shopify storefront, checkout and point-of-sale integrations and the Luna merchant platform using React, Next.js, Node.js and Azure.',
)
job(
    'Independent | Engineering Consultant',
    'January 2023 – present',
    'Turn operational workflows into production software for service businesses. Diane Party Rentals connects quotes, bookings and Stripe payments to rental operations. Starthome connects mobile inspection capture, reviewed observations, tenant participation and reports.',
)
job(
    'SaaS Alerts | Software Engineer, Integrations &amp; Security',
    'October 2020 – December 2021',
    'Built integrations for security monitoring across IT Glue, Datto, ConnectWise, Kaseya and Microsoft Graph. Investigated source events and normalized vendor data into a shared security schema.',
)
job(
    'StackLabs | Frontend Engineer (Contract)',
    'January 2020 – October 2020',
    'Built React and JavaScript interfaces for agency clients and integrated backend REST APIs.',
)
story.append(para('SELECTED WORK', 'section'))
story.append(para('<b>PortMind</b> · Built a six-camera collector, datasets, model comparisons and review tools around 81,202 activity snapshots. Audited label provenance so evaluation scores could be trusted. <link href="https://www.zouantcha.com/case-studies/portmind">Case study</link>'))
story.append(para('<b>MTL Archives</b> · Built ingestion, image enrichment, visual search, product and editorial tooling around 13,499 serving records. Saved January–July reports recorded 2.66M social views. <link href="https://www.zouantcha.com/case-studies/mtl-archives">Case study</link>'))
story.append(para('<b>Diane Party Rentals</b> · Replaced manual quotes and disconnected payments with online booking and an operating platform for the work after checkout. <link href="https://www.zouantcha.com/case-studies/diane-party-rentals">Case study</link>'))
story.append(para('TOOLS', 'section'))
story.append(para('TypeScript, JavaScript, Python, SQL · React, Next.js, Node.js · Cloudflare Workers, D1, R2, Vectorize · PostgreSQL, Azure, Shopify · Data ingestion, vector search, model evaluation'))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(muted)
    canvas.drawString(48, 28, 'Wielfried Zouantcha · zouantcha.com')
    canvas.drawRightString(letter[0] - 48, 28, str(doc.page))
    canvas.restoreState()

SimpleDocTemplate(
    str(out),
    pagesize=letter,
    rightMargin=48,
    leftMargin=48,
    topMargin=40,
    bottomMargin=42,
    title='Wielfried Zouantcha | Resume',
    author='Wielfried Zouantcha',
).build(story, onFirstPage=footer, onLaterPages=footer)
print(out)
