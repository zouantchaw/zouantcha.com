import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const workerDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../workers/field-notes')
const sql =
  'SELECT email, created_at, source, utm_source, utm_medium, utm_campaign FROM subscribers ORDER BY created_at'

function csv(value) {
  const text = value == null ? '' : String(value)
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

const child = spawn(
  'wrangler',
  ['d1', 'execute', 'zouantcha-field-notes', '--remote', '--json', '--command', sql],
  { cwd: workerDir, env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: '0bb05130da965c096b12cc1f0637f763' } },
)

let stdout = ''
let stderr = ''
child.stdout.on('data', (chunk) => {
  stdout += chunk
})
child.stderr.on('data', (chunk) => {
  stderr += chunk
})

child.on('close', (code) => {
  if (code !== 0) {
    process.stderr.write(stderr || `wrangler exited ${code}\n`)
    process.exit(code || 1)
  }
  const parsed = JSON.parse(stdout)
  const rows = parsed[0]?.results || parsed.result?.[0]?.results || []
  const columns = ['email', 'created_at', 'source', 'utm_source', 'utm_medium', 'utm_campaign']
  process.stdout.write(columns.join(',') + '\n')
  for (const row of rows) {
    process.stdout.write(columns.map((column) => csv(row[column])).join(',') + '\n')
  }
})
