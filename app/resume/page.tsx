import { pageMetadata } from 'app/lib/metadata'
import { ResumeDownload } from 'app/components/resume-download'
import { ResumePageView } from 'app/components/resume-page-view'
import { TrackAnchor } from 'app/components/track-link'
import { site } from 'app/lib/site'

export const metadata = pageMetadata({
  title: 'Résumé',
  description: `Résumé for ${site.name}, ${site.title}. Download the PDF or read it here.`,
  path: '/resume',
  section: 'Résumé',
})

export default function Page() {
  return (
    <div className="site-shell resume-page">
      <ResumePageView />
      <header className="resume-toolbar">
        <div>
          <p className="eyebrow">Résumé</p>
          <h1>{site.name}</h1>
          <p className="resume-lede">{site.title}</p>
        </div>
        <div className="resume-actions">
          <ResumeDownload from="resume_page" className="hero-cta-primary">
            Download PDF
          </ResumeDownload>
          <TrackAnchor
            href={site.resume}
            event="resume_click"
            data={{ from: 'resume_page', destination: 'pdf' }}
            className="hero-cta-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF <span aria-hidden="true">↗</span>
          </TrackAnchor>
        </div>
      </header>
      <div className="resume-viewer">
        <object
          data={`${site.resume}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          aria-label={`Résumé for ${site.name}`}
        >
          <iframe
            src={`${site.resume}#toolbar=0&navpanes=0&view=FitH`}
            title={`Résumé for ${site.name}`}
          />
        </object>
        <p className="resume-fallback">
          If the viewer does not appear,{' '}
          <ResumeDownload from="resume_fallback">download the PDF</ResumeDownload>
          {' or '}
          <TrackAnchor
            href={site.resume}
            event="resume_click"
            data={{ from: 'resume_fallback', destination: 'pdf' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            open it in a new tab ↗
          </TrackAnchor>
          .
        </p>
      </div>
    </div>
  )
}
