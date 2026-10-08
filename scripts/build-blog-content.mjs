import fs from 'node:fs/promises'
import path from 'node:path'
import {compile} from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
const output=path.resolve('app/blog/generated')
await fs.mkdir(output,{recursive:true})
const imports=[];const collections={posts:[],frenchPosts:[]}
for(const [collection,folder] of [['posts','posts'],['frenchPosts','posts-fr']]){
 let files=[]
 try{files=(await fs.readdir(path.resolve('app/blog',folder))).filter(f=>f.endsWith('.mdx')).sort()}catch(error){if(error.code!=='ENOENT')throw error}
 for(const filename of files){
  const raw=await fs.readFile(path.resolve('app/blog',folder,filename),'utf8')
  const match=raw.match(/---\s*([\s\S]*?)\s*---/)
  if(!match)throw Error('Missing frontmatter: '+filename)
  const metadata={}
  for(const line of match[1].trim().split('\n')){const [key,...rest]=line.split(': ');metadata[key.trim()]=rest.join(': ').trim().replace(/^['"](.*)['"]$/,'$1')}
  const content=raw.replace(/---\s*([\s\S]*?)\s*---/,'').trim()
  const slug=path.basename(filename,'.mdx'), moduleName=collection+'-'+slug+'.mjs', id='Content'+imports.length
  await fs.writeFile(path.join(output,moduleName),String(await compile(content,{remarkPlugins:[remarkGfm]})))
  imports.push(`import ${id} from './${moduleName}'`)
  collections[collection].push(`{...${JSON.stringify({slug,metadata,content})},Component:${id}}`)
 }
}
await fs.writeFile(path.join(output,'index.mjs'),imports.join('\n')+'\n'+Object.entries(collections).map(([key,entries])=>`export const ${key}=[${entries.join(',\n')}]`).join('\n')+'\n')
console.log(`Compiled ${imports.length} published MDX files for the Worker`)
