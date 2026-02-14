import Header from '@/components/header'

import sharedStyles from '@/styles/shared.module.css'

export default function Index() {
  return (
    <>
      <Header title="Accueil" />
      <div className={sharedStyles.layout}>
        <h1>Bienvenue</h1>
        <h2>Ce blog est maintenant 100% statique et alimenté par des fichiers MDX.</h2>
      </div>
    </>
  )
}
