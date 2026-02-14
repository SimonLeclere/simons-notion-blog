import '../styles/global.css'
import Layout from '@/components/layout'
import { NextPage } from 'next'

export default function MyApp({ Component, pageProps }: { Component: NextPage, pageProps: Record<string, unknown> }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
