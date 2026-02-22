import { trackGA4Event } from './ga4'

export interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export function trackEvent(event: AnalyticsEvent): void {
  trackGA4Event(event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
  })
}

export function trackDownload(fileName: string): void {
  trackGA4Event('resume_download', {
    file_name: fileName,
    event_category: 'engagement',
  })
}

export function trackFormSubmission(formName: string, success: boolean): void {
  trackGA4Event(
    success ? 'form_submission_success' : 'form_submission_error',
    {
      form_name: formName,
      event_category: 'engagement',
      success: success,
    },
    { allowDuplicates: false }
  )
}

export function trackProjectInteraction(
  projectId: string,
  interactionType: 'view' | 'click' | 'close'
): void {
  trackGA4Event(`project_${interactionType}`, {
    project_id: projectId,
    interaction_type: interactionType,
    event_category: 'engagement',
  })
}

export function trackSocialClick(platform: string): void {
  trackGA4Event('social_click', {
    platform: platform,
    event_category: 'engagement',
  })
}

export function trackThemeToggle(theme: 'light' | 'dark'): void {
  trackGA4Event(
    'theme_toggle',
    {
      theme: theme,
      event_category: 'user_preference',
    },
    { allowDuplicates: false }
  )
}
