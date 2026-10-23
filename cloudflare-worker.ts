// @ts-ignore OpenNext generates the Worker during the build.
import handler from './.open-next/worker.js'
async function fetchSite(request:Request,env:CloudflareEnv,ctx:unknown){
 const url=new URL(request.url)
 // Temporary privacy restriction: keep source assets while preventing direct access.
 const privateAsset=(path:string)=>path==='/downloads/diane-party-rentals.pdf'||path.startsWith('/images/case-studies/dpr-stripe/')
 let optimizedPath=''
 if(url.pathname==='/_next/image'){
  try{optimizedPath=new URL(url.searchParams.get('url')||'',url.origin).pathname}catch{}
 }
 if(privateAsset(url.pathname)||privateAsset(optimizedPath)){
  return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}})
 }
 const aliases:Record<string,string>={'/ig':'ig','/tiktok':'tiktok','/youtube':'youtube','/linkedin':'linkedin'}
 if((request.method==='GET'||request.method==='HEAD')&&Object.hasOwn(aliases,url.pathname)){
  const destination=new URL('/start',url)
  if(url.hostname==='zouantcha.com')destination.hostname='www.zouantcha.com'
  destination.searchParams.set('src',aliases[url.pathname])
  return new Response(null,{status:302,headers:{Location:destination.toString(),'Cache-Control':'no-store'}})
 }
 if(url.hostname==='zouantcha.com'){url.hostname='www.zouantcha.com';return Response.redirect(url.toString(),308)}
 if(url.pathname==='/bitcoin-whitepaper'){url.pathname='/blog/bitcoin-whitepaper';return Response.redirect(url.toString(),308)}
 let assetResponse:Response|undefined
 if(request.method==='GET'||request.method==='HEAD'){
  const asset=await env.ASSETS.fetch(request)
  if(asset.status!==404)assetResponse=asset
 }
 const response:Response=assetResponse??await handler.fetch(request,env,ctx)
 if(['/resume.pdf','/wielfried-zouantcha-resume.pdf'].includes(url.pathname)){
  const headers=new Headers(response.headers);headers.set('Content-Disposition',`${url.pathname==='/resume.pdf'?'inline':'attachment'}; filename="wielfried-zouantcha-resume.pdf"`)
  return new Response(response.body,{status:response.status,headers})
 }
 return response
}

// Apply staging controls outside both the asset and OpenNext response paths.
export default {
 async fetch(request:Request,env:CloudflareEnv,ctx:unknown){
  const action=/^\/(?:log|api\/build-log)\/(confirm|unsubscribe)(?:\/|$)/.test(new URL(request.url).pathname)
  if(env.SITE_ENV!=='staging'&&!action)return fetchSite(request,env,ctx)
  const response=new URL(request.url).pathname==='/robots.txt'
   ? new Response(request.method==='HEAD'?null:'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}})
   : await fetchSite(request,env,ctx)
  const headers=new Headers(response.headers)
  headers.set('X-Robots-Tag','noindex, nofollow')
  if(action){headers.set('Cache-Control','no-store');headers.set('Referrer-Policy','no-referrer')}
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers})
 }
}
