type SectionLabelProps = {
  children: React.ReactNode
  tone?: 'red' | 'olive' | 'gold' | 'slate'
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="font-mono text-[13px] text-muted">
      {children}
    </p>
  )
}
