// @ts-ignore OpenNext generates the Worker during the build.
import handler from './.open-next/worker.js'
async function fetchSite(request:Request,env:CloudflareEnv,ctx:unknown){
 const url=new URL(request.url)
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
  if(env.SITE_ENV!=='staging')return fetchSite(request,env,ctx)
  const response=new URL(request.url).pathname==='/robots.txt'
   ? new Response(request.method==='HEAD'?null:'User-agent: *\nDisallow: /\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}})
   : await fetchSite(request,env,ctx)
  const headers=new Headers(response.headers)
  headers.set('X-Robots-Tag','noindex, nofollow')
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers})
 }
}
