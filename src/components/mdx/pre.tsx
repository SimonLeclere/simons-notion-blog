'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function Pre({ children, ...props }: any) {
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
          {title && <span className="h-4 w-px bg-gray-200 dark:bg-zinc-800" />}
          <span>{lang}</span>
        </div>
        <button onClick={onCopy} className="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-zinc-100">
          {isCopied ? <><Check className="h-3 w-3 text-green-500" /><span className="text-green-500">Copied!</span></> : <><Copy className="h-3 w-3" /><span>Copy</span></>}
        </button>
      </div>
      <pre ref={preRef} {...props} className={["overflow-x-auto rounded-t-none rounded-b-xl border border-t-0 border-gray-200 bg-zinc-50/50 py-4 subpixel-antialiased text-[0.9em] mt-0! dark:border-zinc-800 dark:bg-zinc-900/30", props.className].filter(Boolean).join(' ')}>
        {children}
      </pre>
    </div>
  )
}
