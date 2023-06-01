import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.nextUrl)
  const redirectURL1 = new URL('/', request.url)

  NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=''; Path=/; max-age=0; token=''; Path=/; max-age=0;`,
    },
  })
  return NextResponse.redirect(redirectURL1, {
    headers: {
      'Set-Cookie': `token=''; Path=/; max-age=0; token=''; Path=/; max-age=0;`,
    },
  })
}
