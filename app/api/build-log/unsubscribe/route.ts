import { NextRequest } from 'next/server'
import { actionPost } from 'app/lib/build-log-action-route'
export const POST = (request: NextRequest) => actionPost(request, 'unsubscribe')
