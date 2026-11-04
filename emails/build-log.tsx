import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { Cta, EmailLayout, Footer, Header, Section, paragraph, tokens } from './base'

export interface IssueContent {
  number: number
  date: string
  preheader: string
  intro: string[]
  built: string[]
  broke: string[]
  numbers: { label: string; value: string }[]
  closing: string
  cta: { label: string; url: string }
}
export const issueOneSubject = "2.66M views, $150, and what I'm doing about it"
export const issueOne: IssueContent = {
  number: 1,
  date: 'October 25, 2026',
  preheader: "The next thing I'm building uses the same method on data with buyers behind it.",
  intro: ["Hi,", "This is the first build log. Once a week I'll send what I built, what worked, what broke, and the numbers."],
  built: ["The next thing I'm building uses the same method on data with buyers behind it. Québec publishes every alcohol permit for events every day, under an open licence.", "That's the fundraisers, galas, tournaments and festivals that need tents, chairs, DJs and security. I'm turning it into alerts for the companies that supply them."],
  broke: ["MTL Archives is a page I run about Montréal's history, built from old public photos. The page did exactly what it was built to do: get attention. But the people paying attention were enjoying old photos, not looking to buy anything.", "I never finished Meta's payout setup, so none of it was paid, and some has expired."],
  numbers: [
    { label: 'Facebook + Instagram views · Jan–Jul', value: '2.66M' },
    { label: 'Facebook views · February', value: '1.36M' },
    { label: 'Earned so far', value: 'About $150' },
    { label: 'Earned in February', value: '$123.69' },
    { label: 'Facebook link clicks · February', value: '57' },
  ],
  closing: "Next week: the first version of the data feed, and what the permits actually show.",
  cta: { label: 'Follow the build log →', url: 'https://www.zouantcha.com/log' },
}

function Paragraphs({ values }: { values: string[] }) {
  return <>{values.map((p, i) => <Text key={i} className="copy" style={paragraph}>{p}</Text>)}</>
}
export function BuildLogEmail({ title, issue, unsubscribe, assetOrigin }: { title: string; issue: IssueContent; unsubscribe: string; assetOrigin: string }) {
  return <EmailLayout preview={issue.preheader}>
    <Header label={`Build log #${issue.number}`} date={issue.date} assetOrigin={assetOrigin} />
    <Heading as="h1" className="copy" style={{ fontFamily: tokens.sans, fontSize: 28, fontWeight: 600, lineHeight: '34px', letterSpacing: '-0.6px', margin: '0 0 24px' }}>{title}</Heading>
    <Paragraphs values={issue.intro} />
    <Section title="What I built"><Paragraphs values={issue.built} /></Section>
    <Section title="What broke"><Paragraphs values={issue.broke} /></Section>
    <Section title="The numbers">
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>{issue.numbers.map(({ label, value }) => <tr key={label}>
          <td className="muted rule" style={{ width: '64%', fontFamily: tokens.sans, fontSize: 14, lineHeight: '21px', color: tokens.muted, padding: '14px 12px 14px 0', borderBottom: `1px solid ${tokens.line}` }}>{label}</td>
          <td className="figure rule" align="right" style={{ width: '36%', fontFamily: tokens.sans, fontSize: 22, fontWeight: 500, lineHeight: '28px', color: tokens.blue, padding: '14px 0', borderBottom: `1px solid ${tokens.line}` }}>{value}</td>
        </tr>)}</tbody>
      </table>
    </Section>
    <Text className="copy" style={{ ...paragraph, marginTop: 28 }}>{issue.closing}</Text>
    <Text className="copy" style={paragraph}>Wiel</Text>
    <Cta href={issue.cta.url}>{issue.cta.label}</Cta>
    <Footer unsubscribe={unsubscribe} />
  </EmailLayout>
}
