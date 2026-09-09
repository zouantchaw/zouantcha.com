export function sectionId(heading: string) {
  return heading === 'A little help, when you need it'
    ? 'mobile-preview'
    : heading
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}
