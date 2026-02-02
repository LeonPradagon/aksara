'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps, MouseEvent } from 'react'

type NavLinkProps = ComponentProps<typeof Link> & {
  scrollToTop?: boolean
}

export function NavLink({ href, onClick, scrollToTop = true, children, ...props }: NavLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call any existing onClick handler
    if (onClick) {
      onClick(e)
    }

    // If default was prevented, don't do anything else
    if (e.defaultPrevented) return

    // For hash links on the same page, let browser handle it
    const hrefString = typeof href === 'string' ? href : href.pathname || ''
    if (hrefString.startsWith('#')) return

    // For links with hash to different pages, navigate then scroll to element
    if (hrefString.includes('#') && scrollToTop) {
      e.preventDefault()
      const [path, hash] = hrefString.split('#')
      router.push(path)
      
      // Scroll to top first, then to the element after a delay
      window.scrollTo({ top: 0, behavior: 'instant' })
      
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
      return
    }

    // For regular links, scroll to top
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
