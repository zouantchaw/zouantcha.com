// @ts-ignore OpenNext generates the Worker during the build.
import handler from './.open-next/worker.js'
export default {async fetch(request:Request,env:CloudflareEnv,ctx:unknown){
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
}}
