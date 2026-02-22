import { useEffect } from 'react'
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

interface WebVitalsOptions {
  reportToConsole?: boolean
  reportToAnalytics?: boolean
  analyticsEndpoint?: string
}

const DEFAULT_OPTIONS: WebVitalsOptions = {
  reportToConsole: true,
  reportToAnalytics: false,
}

function getVitalColor(metric: Metric): string {
  const { rating } = metric
  switch (rating) {
    case 'good':
      return 'color: #0cce6b'
    case 'needs-improvement':
      return 'color: #ffa400'
    case 'poor':
      return 'color: #ff4e42'
    default:
      return ''
  }
}

function logMetricToConsole(metric: Metric) {
  const color = getVitalColor(metric)
  console.log(
    `%c${metric.name} (${metric.rating}): ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`,
    color
  )
}

async function sendToAnalytics(
  metric: Metric,
  endpoint?: string
): Promise<void> {
  if (!endpoint) return

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, body)
  } else {
    try {
      await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      })
    } catch (error) {
      console.error('Failed to send web vital to analytics:', error)
    }
  }
}

function handleMetric(metric: Metric, options: WebVitalsOptions) {
  if (options.reportToConsole) {
    logMetricToConsole(metric)
  }

  if (options.reportToAnalytics && options.analyticsEndpoint) {
    sendToAnalytics(metric, options.analyticsEndpoint)
  }
}

export function useWebVitals(options: WebVitalsOptions = DEFAULT_OPTIONS) {
  useEffect(() => {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options }

    onCLS((metric: Metric) => handleMetric(metric, mergedOptions))
    onINP((metric: Metric) => handleMetric(metric, mergedOptions))
    onLCP((metric: Metric) => handleMetric(metric, mergedOptions))
    onFCP((metric: Metric) => handleMetric(metric, mergedOptions))
    onTTFB((metric: Metric) => handleMetric(metric, mergedOptions))
  }, [options])
}
