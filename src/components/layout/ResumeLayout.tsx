import type { ReactNode } from 'react'
import ThemeToggle from '@components/ThemeToggle'
import SkipNav from '@components/SkipNav'

interface ResumeLayoutProps {
  navigation: ReactNode
  children: ReactNode
}

export default function ResumeLayout({
  navigation,
  children,
}: ResumeLayoutProps) {
  return (
    <div className="resume-layout">
      <SkipNav />
      <div className="resume-layout__background" aria-hidden="true" />
      <header className="resume-layout__header">
        <div className="resume-layout__header-container">
          {navigation}
          <div className="resume-layout__theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="main-content" className="resume-layout__content">
        {children}
      </main>
    </div>
  )
}
