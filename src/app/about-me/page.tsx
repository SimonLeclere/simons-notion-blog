import Nav from '@/components/nav'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos de moi',
}

export default function AboutMePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Nav />
      <div className="mt-16 prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight">À propos de moi</h1>
        <p className="lead text-xl text-gray-600 dark:text-gray-400">
          Passionné de développement web et créateur de contenu.
        </p>

        <div className="mt-8 space-y-6">
          <p>
            Ce blog est généré statiquement avec <Link href="https://nextjs.org" className="font-medium text-blue-600 dark:text-blue-400 no-underline hover:underline">Next.js</Link>. Les
            articles vivent directement dans ce dépôt au format <strong>MDX</strong>, avec les images,
            composants et contenus versionnés ensemble.
          </p>

          <p>
            Le build est déclenché à chaque commit sur Vercel, ce qui simplifie le workflow et évite
            toute dépendance à un CMS externe.
          </p>

          <p>
            Le code source est disponible sur{' '}
            <Link href="https://github.com/SimonLeclere/simons-notion-blog" className="font-medium text-blue-600 dark:text-blue-400 no-underline hover:underline">GitHub</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
