import Head from 'next/head'
import { ReactNode } from 'react'

export default function Layout({ children, title = 'Mon Blog' }: { children: ReactNode; title?: string }) {
  return (
    <div className="relative min-h-screen">
      <Head><title>{title}</title></Head>
      <div className="fixed top-8 left-8 w-4 h-4 border-l border-t border-gray-300 dark:border-zinc-800 pointer-events-none" />
      <div className="fixed top-8 right-8 w-4 h-4 border-r border-t border-gray-300 dark:border-zinc-800 pointer-events-none" />
      <div className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-gray-300 dark:border-zinc-800 pointer-events-none" />
      <div className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-gray-300 dark:border-zinc-800 pointer-events-none" />
      <main className="max-w-4xl mx-auto p-8 relative z-10 bg-white dark:bg-zinc-950 min-h-screen border-x border-dashed border-gray-100 dark:border-zinc-800">
        {children}
      </main>
    </div>
  )
}
