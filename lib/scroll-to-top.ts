// Utility to scroll to top of page after navigation
export function scrollToTop() {
  // Use setTimeout to ensure this runs after Next.js navigation completes
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, 0)
}
