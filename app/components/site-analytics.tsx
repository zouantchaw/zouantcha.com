'use client'
import { usePathname } from 'next/navigation'
import { useReportWebVitals } from 'next/web-vitals'
import { useEffect } from 'react'
import { track } from 'app/lib/analytics'
const report=(metric:{name:string;value:number})=>track('web_vital',{metric:metric.name,value:String(metric.value)})
export function SiteAnalytics() {
  useReportWebVitals(report)
  const path=usePathname()
  useEffect(()=>{track('page_view')},[path])
  return null
}
