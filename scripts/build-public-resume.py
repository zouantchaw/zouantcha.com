"""Generate the public résumé. Run with a Python environment containing reportlab."""
from pathlib import Path
from html import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4

root = Path(__file__).resolve().parents[1]
out = root / 'public/downloads/wielfried-zouantcha-resume.pdf'
styles = {
 'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=22, leading=26, spaceAfter=6),
 'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.5, leading=13, spaceAfter=5, textColor=HexColor('#20242b')),
 'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=12, spaceAfter=6, textColor=HexColor('#2449d8')),
 'role': ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=10, leading=13, spaceAfter=3),
 'meta': ParagraphStyle('meta', fontName='Helvetica', fontSize=9, leading=12, textColor=HexColor('#525866'), spaceAfter=5),
}
story=[]
def para(text, style='body'):
 return Paragraph(text,styles[style])
def block(title, dates, text):
 story.append(KeepTogether([para(title,'role'),para(dates,'meta'),para(text),Spacer(1,5)]))
story += [para('Wielfried Zouantcha','name'),
 para('Full-Stack Engineer / Design Engineer','role'),
 para('Washington, DC · <link href="mailto:zouantchaw74@gmail.com">zouantchaw74@gmail.com</link> · <link href="https://www.zouantcha.com">zouantcha.com</link> · <link href="https://github.com/zouantchaw">GitHub</link>','meta'),
 para('I build product interfaces and the systems behind them. My work spans workforce software, merchant platforms, external integrations, data pipelines and vision-model evaluation.'),
 para('EXPERIENCE','section')]
block('Oloodi Technologies | Customer Engineer / Full-Stack Engineer (Contract)','November 2025 - present',
'Build KROW Workforce across staffing, onboarding, shift assignment, time tracking and invoicing. Work across a React/TypeScript portal and backend services. Prepare and deliver product demonstrations to teams including Snapchat, Google, EA Sports and Nvidia.')
block('Ethos / HeyEthos | Senior Full-Stack Engineer','May 2022 - November 2025',
'Built across blockchain services, Shopify membership and loyalty integrations, and the Luna merchant platform. Worked on storefront and cart extensions, checkout and point-of-sale flows, request verification and webhooks. Developed onboarding, membership management, member views, integrations, reporting and billing interfaces using React, Next.js and Node.js.')
block('Independent | Full Stack Design Engineer','January 2023 - present',
'Design and implement products directly with founders and operating businesses. Diane Party Rentals connects quotes, bookings and Stripe payments to rental operations. Starthome connects mobile inspection capture, reviewed observations, tenant participation and reports.')
block('SaaS Alerts | Software Engineer, Integrations & Security','October 2020 - December 2021',
'Built integrations for security monitoring across IT Glue, Datto, ConnectWise, Kaseya and Microsoft Graph. Investigated source events and normalized vendor data into a shared security schema, documenting what each integration could reliably expose.')
block('StackLabs | Frontend Engineer (Contract)','January 2020 - October 2020',
'Built React and JavaScript interfaces for agency clients and integrated backend REST APIs.')
story.append(para('SELECTED RESEARCH','section'))
story.append(para('<b>MTL Archives</b> · Built ingestion, image enrichment, visual search, product and editorial tooling around 13,499 serving records (June 2026 audit). Saved January-July reports recorded 2.66M social views; website activity is measured separately. <link href="https://www.zouantcha.com/case-studies/mtl-archives">Case study</link>'))
story.append(para('<b>PortMind / Port Observatory MTL</b> · Built a six-camera collector, datasets, model comparisons and review tools. Audited label provenance and evaluation splits; the replacement benchmark requires independent review. <link href="https://www.zouantcha.com/case-studies/portmind">Case study</link>'))
story.append(para('TOOLS & METHODS','section'))
story.append(para('TypeScript, JavaScript, Python, SQL · React, Next.js, Node.js · Cloudflare Workers, D1, R2, Vectorize · PostgreSQL, Firebase, Cloud Run, Azure · Shopify integrations · Data ingestion, vector search, model evaluation'))
def footer(canvas,doc):
 canvas.saveState()
 canvas.setFont('Helvetica',8)
 canvas.setFillColor(HexColor('#525866'))
 canvas.drawString(42,25,'Wielfried Zouantcha · September 2026')
 canvas.drawRightString(A4[0]-42,25,str(doc.page))
 canvas.restoreState()
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=35,bottomMargin=40,title='Wielfried Zouantcha | Resume',author='Wielfried Zouantcha').build(story,onFirstPage=footer,onLaterPages=footer)
print(out)
