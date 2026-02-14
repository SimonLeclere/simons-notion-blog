import Header from '@/components/header'
import Link from 'next/link'

export default function Index() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Header title="Accueil" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
            Bienvenue
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Ce blog est <span className="font-semibold text-gray-900 dark:text-gray-100">100% statique</span> et alimenté par MDX.
          </p>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Link href="/blog" className="px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
            Lire le blog
          </Link>
          <Link href="/about-me" className="px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors dark:bg-zinc-800 dark:text-gray-100 dark:hover:bg-zinc-700">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  )
}
