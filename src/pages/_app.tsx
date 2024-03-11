import '../styles/global.css'
import 'katex/dist/katex.css'

import { NextPage } from 'next'

export default function MyApp({ Component, pageProps }: { Component: NextPage, pageProps: Record<string, unknown> }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
