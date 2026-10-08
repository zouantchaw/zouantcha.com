interface CloudflareEnv {
  FIELD_NOTES_API: {fetch(input:RequestInfo|URL,init?:RequestInit):Promise<Response>}
  ASSETS: {fetch(input:RequestInfo|URL,init?:RequestInit):Promise<Response>}
  ANALYTICS: {writeDataPoint(point:{blobs?:string[];doubles?:number[];indexes?:string[]}):void}
}
