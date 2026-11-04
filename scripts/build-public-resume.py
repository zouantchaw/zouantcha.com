"""Build identical public resume aliases from public-resume.json.

Run from the repo: uv run --isolated --with reportlab --with pypdf python scripts/build-public-resume.py
The content is intentionally public: no phone number or precise location.
"""
from html import escape
import json
from pathlib import Path
from shutil import copyfile

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
CONTENT = json.loads((ROOT / "scripts/public-resume.json").read_text())
OUT = ROOT / "public/resume.pdf"
ALIAS = ROOT / "public/wielfried-zouantcha-resume.pdf"
INK = HexColor("#171717")
MUTED = HexColor("#525866")
BLUE = HexColor("#2449a8")
STYLES = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=INK, spaceAfter=5),
    "headline": ParagraphStyle("headline", fontName="Helvetica", fontSize=11, leading=15, textColor=INK, spaceAfter=7),
    "meta": ParagraphStyle("meta", fontName="Helvetica", fontSize=9.5, leading=14, textColor=MUTED, spaceAfter=10),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10.5, leading=14, textColor=INK, spaceAfter=5),
    "bullet": ParagraphStyle("bullet", fontName="Helvetica", fontSize=10.5, leading=14, textColor=INK, leftIndent=10, firstLineIndent=-10, spaceAfter=5),
    "section": ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=11, leading=15, spaceBefore=11, spaceAfter=9, textColor=BLUE, keepWithNext=True),
    "job": ParagraphStyle("job", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=INK, spaceAfter=2, keepWithNext=True),
    "details": ParagraphStyle("details", fontName="Helvetica", fontSize=10, leading=13, textColor=MUTED, spaceAfter=6, keepWithNext=True),
}


def para(text, style="body"):
    return Paragraph(text, STYLES[style])


def link(label, href):
    return f'<link href="{escape(href, quote=True)}" color="#2449a8">{escape(label)}</link>'


def bullets(items):
    return [para("- " + escape(item), "bullet") for item in items]


def footer(page_canvas, doc):
    page_canvas.saveState()
    page_canvas.setFont("Helvetica", 8.5)
    page_canvas.setFillColor(MUTED)
    page_canvas.drawString(48, 27, "Wielfried Zouantcha | zouantcha.com")
    page_canvas.drawRightString(letter[0] - 48, 27, str(doc.page))
    page_canvas.restoreState()


def build():
    story = [
        para(escape(CONTENT["name"]), "name"),
        para(escape(CONTENT["headline"]), "headline"),
        para(escape(CONTENT["location"]) + " | " + " | ".join(link(c["label"], c["href"]) for c in CONTENT["contact"]), "meta"),
        para("SUMMARY", "section"),
        para(escape(CONTENT["summary"])),
        para("TECHNICAL SKILLS", "section"),
    ]
    for group in CONTENT["skills"]:
        story.append(para(f'<b>{escape(group["label"])}</b>: {escape(group["text"])}'))
    story.append(para("SELECTED PROJECTS", "section"))
    for project in CONTENT["projects"]:
        story.append(KeepTogether([
            para(escape(project["name"]) + " | " + escape(project["dates"]), "job"),
            para(escape(project["descriptor"]), "details"),
            para(link(project["link_label"], project["href"]), "meta"),
            *bullets(project["bullets"]),
            Spacer(1, 7),
        ]))
    story += [PageBreak(), para("EXPERIENCE", "section")]
    for job in CONTENT["experience"]:
        story.append(KeepTogether([
            para(escape(job["company"]), "job"),
            para(escape(job["title"]) + " | " + escape(job["dates"]), "details"),
            *bullets(job["bullets"]),
            Spacer(1, 5),
        ]))
    story += [para("EDUCATION", "section"), para(escape(CONTENT["education"]))]
    SimpleDocTemplate(
        str(OUT), pagesize=letter, rightMargin=48, leftMargin=48,
        topMargin=36, bottomMargin=44, title=f'{CONTENT["name"]} | {CONTENT["headline"]}',
        author=CONTENT["name"], subject=CONTENT["headline"], invariant=1,
    ).build(story, onFirstPage=footer, onLaterPages=footer)
    copyfile(OUT, ALIAS)
    for path in (OUT, ALIAS):
        print(path)


if __name__ == "__main__":
    build()
