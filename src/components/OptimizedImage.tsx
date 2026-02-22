import { ImgHTMLAttributes, useEffect, useRef, useState } from 'react'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  webpSrc?: string
  srcSet?: string
  webpSrcSet?: string
  alt: string
  width?: number
  height?: number
  eager?: boolean
}

export default function OptimizedImage({
  src,
  webpSrc,
  srcSet,
  webpSrcSet,
  alt,
  width,
  height,
  eager = false,
  loading,
  className,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(eager)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (eager || shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [eager, shouldLoad])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <picture>
      {webpSrcSet && shouldLoad && (
        <source type="image/webp" srcSet={webpSrcSet} />
      )}
      {webpSrc && shouldLoad && <source type="image/webp" srcSet={webpSrc} />}
      {srcSet && shouldLoad && <source srcSet={srcSet} />}
      <img
        ref={imgRef}
        src={shouldLoad ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : loading || 'lazy'}
        className={`${className || ''} ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={handleLoad}
        decoding="async"
        {...props}
      />
    </picture>
  )
}
