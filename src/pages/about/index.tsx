import Header from '@/components/header'
import Link from 'next/link'

import styles from '@/styles/index.module.css'

export default function AboutPage() {
  return (
    <>
      <Header title="About" />
      <div className={styles.container}>
        <h1>À propos</h1>
        <h2>Un blog statique, versionné dans GitHub.</h2>

        <div className="explanation">
          <p>
            Ce blog est généré statiquement avec <Link href="https://nextjs.org">Next.js</Link>. Les
            articles vivent directement dans ce dépôt au format <strong>MDX</strong>, avec les images,
            composants et contenus versionnés ensemble.
          </p>

          <p>
            Le build est déclenché à chaque commit sur Vercel, ce qui simplifie le workflow et évite
            toute dépendance à un CMS externe.
          </p>

          <p>
            Le code source est disponible sur{' '}
            <Link href="https://github.com/SimonLeclere/simons-notion-blog">GitHub</Link>.
          </p>
        </div>
      </div>
    </>
  )
}
