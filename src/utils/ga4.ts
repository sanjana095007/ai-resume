interface GA4Config {
  measurementId: string
  debug?: boolean
}

interface GA4Event {
  eventName: string
  eventParams?: Record<string, unknown>
}

let isInitialized = false
let isLoading = false
let measurementId: string | null = null

const eventQueue: GA4Event[] = []
const trackedEvents = new Set<string>()

function shouldRespectDoNotTrack(): boolean {
  if (typeof window === 'undefined') {
    return true
  }

  const dnt =
    navigator.doNotTrack ||
    (window as Window & { doNotTrack?: string }).doNotTrack
  return dnt === '1' || dnt === 'yes'
}

function isDevelopment(): boolean {
  return import.meta.env.DEV
}

async function loadGA4Script(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Analytics'))
    document.head.appendChild(script)
  })
}

export async function initializeGA4(
  config?: Partial<GA4Config>
): Promise<void> {
  if (isInitialized || isLoading) {
    return
  }

  const envMeasurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID
  measurementId = config?.measurementId || envMeasurementId

  if (!measurementId) {
    if (isDevelopment()) {
      console.log(
        '[Analytics] No GA4 Measurement ID provided - analytics disabled'
      )
    }
    return
  }

  if (shouldRespectDoNotTrack()) {
    console.log('[Analytics] Do Not Track enabled - analytics disabled')
    return
  }

  isLoading = true

  try {
    await loadGA4Script(measurementId)

    window.dataLayer = window.dataLayer || []
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args)
      }

    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      send_page_view: true,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    })

    isInitialized = true
    isLoading = false

    if (isDevelopment() || config?.debug) {
      console.log('[Analytics] GA4 initialized with ID:', measurementId)
    }

    eventQueue.forEach((event) => {
      sendGA4Event(event.eventName, event.eventParams)
    })
    eventQueue.length = 0
  } catch (error) {
    isLoading = false
    console.error('[Analytics] Failed to initialize GA4:', error)
  }
}

function sendGA4Event(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (!isInitialized) {
    eventQueue.push({ eventName, eventParams })
    return
  }

  if (!window.gtag) {
    return
  }

  window.gtag('event', eventName, eventParams)

  if (isDevelopment()) {
    console.log('[Analytics] Event:', eventName, eventParams)
  }
}

export function trackGA4Event(
  eventName: string,
  eventParams?: Record<string, unknown>,
  options?: { allowDuplicates?: boolean }
): void {
  const eventKey = options?.allowDuplicates
    ? `${eventName}-${Date.now()}`
    : `${eventName}-${JSON.stringify(eventParams || {})}`

  if (!options?.allowDuplicates && trackedEvents.has(eventKey)) {
    if (isDevelopment()) {
      console.log('[Analytics] Duplicate event prevented:', eventName)
    }
    return
  }

  trackedEvents.add(eventKey)
  sendGA4Event(eventName, eventParams)

  setTimeout(() => {
    trackedEvents.delete(eventKey)
  }, 5000)
}

export function trackPageView(pagePath?: string, pageTitle?: string): void {
  trackGA4Event('page_view', {
    page_path: pagePath || window.location.pathname,
    page_title: pageTitle || document.title,
  })
}

export function isAnalyticsEnabled(): boolean {
  return isInitialized && !shouldRespectDoNotTrack()
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
