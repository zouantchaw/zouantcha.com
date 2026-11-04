import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section as EmailSection, Text } from '@react-email/components'
import { PUBLIC_POSTAL_ADDRESS } from '../app/lib/public-contact'

export const tokens = {
  paper: '#ffffff', ink: '#171717', muted: '#616161', line: '#d9dde5', blue: '#2449d8',
  sans: "Arial, Helvetica, sans-serif", mono: "'Courier New', Courier, monospace",
  width: 600, gutter: 24,
} as const
export const paragraph: React.CSSProperties = { fontFamily: tokens.sans, fontSize: 17, lineHeight: '27px', margin: '0 0 16px', color: tokens.ink }
const small: React.CSSProperties = { fontFamily: tokens.mono, fontSize: 12, lineHeight: '20px', color: tokens.muted, margin: 0 }
export const linkStyle: React.CSSProperties = { color: tokens.blue, textDecoration: 'underline', textUnderlineOffset: '4px' }

export function EmailLayout({ preview, children }: { preview: string; children: React.ReactNode }) {
  return <Html lang="en"><Head>
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
    <style>{`a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font:inherit!important}
@media(prefers-color-scheme:dark){.surface{background-color:#171717!important}.copy{color:#f4f4f4!important}.muted{color:#bdbdbd!important}.rule{border-color:#444444!important}.brand-link,.figure{color:#a7b8ff!important}.cta{background-color:#a7b8ff!important;color:#171717!important}}`}</style>
  </Head><Preview>{preview}</Preview><Body className="surface" style={{ margin: 0, padding: 0, backgroundColor: tokens.paper, color: tokens.ink, fontFamily: tokens.sans }}>
    <Container className="surface" style={{ width: '100%', maxWidth: tokens.width, margin: '0 auto', backgroundColor: tokens.paper }}>
      <EmailSection style={{ padding: `32px ${tokens.gutter}px` }}>{children}</EmailSection>
    </Container>
  </Body></Html>
}

export function Header({ label, date, assetOrigin }: { label: string; date?: string; assetOrigin: string }) {
  return <EmailSection className="rule" style={{ borderBottom: `1px solid ${tokens.line}`, paddingBottom: 24, marginBottom: 28 }}>
    <Img src={`${assetOrigin}/email/wiel-wordmark@2x.png`} alt="Wiel Zouantcha ↗" width="220" height="40" style={{ display: 'block', width: 220, height: 40, maxWidth: '100%' }} />
    <Text className="muted" style={{ ...small, marginTop: 20 }}>{label}{date ? ` · ${date}` : ''}</Text>
  </EmailSection>
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <EmailSection className="rule" style={{ borderTop: `1px solid ${tokens.line}`, paddingTop: 24, marginTop: 24 }}>
    <Heading as="h2" className="copy" style={{ fontFamily: tokens.sans, fontSize: 20, lineHeight: '26px', fontWeight: 600, margin: '0 0 12px' }}>{title}</Heading>
    {children}
  </EmailSection>
}

export function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return <EmailSection style={{ marginTop: 28, marginBottom: 32 }}>
    <Button className="cta" href={href} style={{ boxSizing: 'border-box', display: 'block', textAlign: 'center', backgroundColor: tokens.blue, color: '#ffffff', fontFamily: tokens.sans, fontWeight: 600, fontSize: 16, lineHeight: '24px', padding: '14px 12px', textDecoration: 'none', borderRadius: 0 }}>{children}</Button>
  </EmailSection>
}

export function Footer({ unsubscribe, confirmation = false }: { unsubscribe: string; confirmation?: boolean }) {
  // Break the street number and every address word, not just spaces. Gmail
  // still recognizes an address when only its word boundaries contain joiners.
  const address = Array.from(PUBLIC_POSTAL_ADDRESS).join('\u200d')
  return <EmailSection className="rule" style={{ borderTop: `1px solid ${tokens.line}`, paddingTop: 20 }}>
    <Text className="muted" style={{ ...paragraph, fontSize: 12, lineHeight: '19px', color: tokens.muted, marginBottom: 12 }}>
      {confirmation ? "You're getting this because you asked to join" : "You're getting this because you signed up at"}{' '}
      <Link className="brand-link" href="https://www.zouantcha.com/log" style={linkStyle}>zouantcha.com/log</Link>.
    </Text>
    <Text style={{ ...paragraph, fontSize: 12, lineHeight: '20px', marginBottom: 12 }}><Link className="brand-link" href={unsubscribe} style={linkStyle}>Unsubscribe</Link></Text>
    <Text className="muted" style={{ ...paragraph, fontSize: 12, lineHeight: '19px', color: tokens.muted, margin: 0 }}><span style={{ color: 'inherit', textDecoration: 'none' }}>{address}</span></Text>
  </EmailSection>
}
