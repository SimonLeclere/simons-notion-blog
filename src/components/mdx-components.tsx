import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Check, Copy } from 'lucide-react'
import Callout from './mdx/callout'
import Bookmark from './mdx/bookmark'
import Columns from './mdx/columns'

const Pre = ({ children, ...props }: any) => {
  const preRef = useRef<HTMLPreElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const lang = props['data-language'] || 'code'
  const title = props['data-title'] || props.dataTitle

  const onCopy = async () => {
    if (!preRef.current?.textContent) return
    await navigator.clipboard.writeText(preRef.current.textContent)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative group my-8">
      <div className="flex items-center justify-between px-5 py-2.5 text-[0.7rem] font-mono uppercase tracking-widest text-gray-400 bg-gray-50 border border-gray-200 rounded-t-xl dark:text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          {title && <span className="font-semibold normal-case tracking-normal text-gray-700 dark:text-zinc-300">{title}</span>}
          {title && <span className="h-4 w-[1px] bg-gray-200 dark:bg-zinc-800" />}
          <span>{lang}</span>
        </div>
        <button onClick={onCopy} className="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-zinc-100">
          {isCopied ? <><Check className="h-3 w-3 text-green-500" /><span className="text-green-500">Copied!</span></> : <><Copy className="h-3 w-3" /><span>Copy</span></>}
        </button>
      </div>
      <pre ref={preRef} {...props} className={["overflow-x-auto rounded-t-none rounded-b-xl border border-t-0 border-gray-200 bg-zinc-50/50 py-4 subpixel-antialiased text-[0.9em] !mt-0 dark:border-zinc-800 dark:bg-zinc-900/30", props.className].filter(Boolean).join(' ')}>
        {children}
      </pre>
    </div>
  )
}

const Figure = ({ src, caption, alt, className, width = "100%", align = "center" }: any) => (
  <figure className={["my-8 pt-1", align === 'left' ? 'mr-auto' : align === 'right' ? 'ml-auto' : 'mx-auto', className].filter(Boolean).join(' ')} style={{ width }}>
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800">
      <img src={src} alt={alt || caption || ''} className="w-full h-auto object-cover" />
    </div>
    {caption && <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400 italic">{caption}</figcaption>}
  </figure>
)

const Table = (props: any) => (
  <div className="my-0 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
    <table className="w-full text-left text-sm border-collapse m-0 border-hidden" {...props} />
  </div>
)

const Code = (props: any) => {
  if (props['data-language'] || props.className?.includes('language-')) return <code {...props} />
  return <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-blue-600 dark:bg-zinc-800 dark:text-blue-400" {...props} />
}

const P = (props: any) => {
  const hasBlockChild = React.Children.toArray(props.children).some((child: any) => child?.type && ['figure', 'div', 'table', 'pre', 'blockquote'].includes(child.type))
  return hasBlockChild ? <div className="my-0 leading-relaxed" {...props} /> : <p className="mb-4 last:mb-0 leading-relaxed" {...props} />
}

export const components = {
  p: P,
  pre: Pre,
  code: Code,
  img: (props: any) => props.title ? <Figure src={props.src} caption={props.title} alt={props.alt} /> : <div className="my-0 overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-800"><img {...props} alt={props.alt || ''} className="w-full h-auto" /></div>,
  Figure,
  table: Table,
  thead: (props: any) => <thead className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900" {...props} />,
  th: (props: any) => <th className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100" {...props} />,
  td: (props: any) => <td className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50 last:border-0" {...props} />,
  Callout,
  Bookmark,
  Columns,
  a: ({ href, children, ...props }: any) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#')
    return isInternal ? <Link href={href} {...props}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  }
}
