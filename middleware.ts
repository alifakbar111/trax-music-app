// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']

export default function middleware(req: any) {
  const url = req.nextUrl.clone()
  const { pathname, origin } = url
  const token = req.cookies.get('TRAX_ACCESS_TOKEN')

  if (signedinPages.find((p) => p === pathname)) {
    if (!token) {
      return NextResponse.redirect(`${origin}/signin`)
    }
  }
}
