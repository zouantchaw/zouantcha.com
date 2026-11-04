import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { Cta, EmailLayout, Footer, Header, paragraph, tokens } from './base'

export function ConfirmationEmail({ confirm, unsubscribe, assetOrigin }: { confirm: string; unsubscribe: string; assetOrigin: string }) {
  return <EmailLayout preview="One more step to get my weekly build log.">
    <Header label="Build log · Confirm your email" assetOrigin={assetOrigin} />
    <Heading as="h1" className="copy" style={{ fontFamily: tokens.sans, fontSize: 28, lineHeight: '34px', fontWeight: 600, margin: '0 0 24px' }}>A short note, once a week.</Heading>
    <Text className="copy" style={paragraph}>Hi,</Text>
    <Text className="copy" style={paragraph}>Confirm your email to get my weekly build log: what I built, what worked, what broke, and the numbers.</Text>
    <Cta href={confirm}>Confirm my email →</Cta>
    <Text className="muted" style={{ ...paragraph, color: tokens.muted, fontSize: 14, lineHeight: '22px' }}>This link expires in 24 hours. It opens a page where you can confirm your signup. If you didn't ask for this, you can ignore this email.</Text>
    <Text className="copy" style={paragraph}>Wiel</Text>
    <Footer unsubscribe={unsubscribe} confirmation />
  </EmailLayout>
}
