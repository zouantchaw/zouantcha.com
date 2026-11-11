import { readFile, writeFile, access } from 'node:fs/promises'
import path from 'node:path'

// OpenNext emits absolute OG binary imports. Make a Box-built artifact portable
// before deploying it from the authenticated workstation.
const handlerPath = path.resolve('.open-next/server-functions/default/handler.mjs')
const directory = path.dirname(handlerPath)
const source = await readFile(handlerPath, 'utf8')
const targets = new Set()
const relocated = source.replace(/["']([^"']*\/node_modules\/(?:\.pnpm\/next@[^/]+\/node_modules\/)?next\/dist\/compiled\/@vercel\/og\/(?:Geist-Regular\.ttf\.bin|resvg\.wasm|yoga\.wasm))(\?module)?["']/g, (match, absolute, suffix) => {
  const filename = path.basename(absolute)
  const relative = `./node_modules/next/dist/compiled/@vercel/og/${filename}`
  targets.add(relative)
  return JSON.stringify(relative + (suffix || ''))
})
for (const target of targets) await access(path.resolve(directory, target))
if (relocated !== source) await writeFile(handlerPath, relocated)
console.log(`Verified ${targets.size} portable OG binary imports`)
