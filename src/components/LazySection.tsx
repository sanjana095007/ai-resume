import {
  ComponentType,
  lazy,
  LazyExoticComponent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import Skeleton from '@components/Skeleton'

interface SectionComponent {
  className?: string
}

interface LazySectionProps extends Record<string, unknown> {
  importFn: () => Promise<{ default: ComponentType<SectionComponent> }>
  fallback?: JSX.Element
  preloadDistance?: number
  className?: string
}

const preloadedComponents = new Set<
  () => Promise<{ default: ComponentType<SectionComponent> }>
>()

export default function LazySection({
  importFn,
  fallback,
  preloadDistance = 200,
  ...props
}: LazySectionProps) {
  const [Component, setComponent] = useState<LazyExoticComponent<
    ComponentType<SectionComponent>
  > | null>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: `${preloadDistance}px`,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [preloadDistance])

  useEffect(() => {
    if (shouldRender && !Component) {
      if (!preloadedComponents.has(importFn)) {
        importFn().then(() => {
          preloadedComponents.add(importFn)
        })
      }
      const LazyComponent = lazy(importFn)
      setComponent(() => LazyComponent)
    }
  }, [shouldRender, Component, importFn])

  const defaultFallback = fallback || (
    <div style={{ padding: '2rem' }}>
      <Skeleton height="2rem" width="40%" variant="rectangular" />
      <div style={{ marginTop: '1rem' }}>
        <Skeleton height="1rem" variant="rectangular" />
        <Skeleton height="1rem" variant="rectangular" />
        <Skeleton height="1rem" variant="rectangular" />
      </div>
    </div>
  )

  return (
    <div ref={sectionRef}>
      {Component ? (
        <Suspense fallback={defaultFallback}>
          <Component {...props} />
        </Suspense>
      ) : (
        shouldRender && defaultFallback
      )}
    </div>
  )
}
