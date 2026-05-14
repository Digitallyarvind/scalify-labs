/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window { gtag: (...args: any[]) => void }
}

/**
 * Fire a GA4 lead_submission event.
 * Call this on the client side immediately after a successful form submit.
 */
export function trackLead(source: string, service?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  // Standard GA4 lead event (also registered as a conversion in GA4 dashboard)
  window.gtag('event', 'generate_lead', {
    event_category: 'Lead Generation',
    event_label: source,
    service_interest: service || 'General',
    currency: 'INR',
    value: 1,
  })

  // Secondary descriptive event for segmentation in reports
  window.gtag('event', 'lead_form_submission', {
    form_source: source,
    service_interest: service || 'General',
  })
}

/**
 * Track Super 30 application submission.
 */
export function trackS30Application() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'super30_application', {
    event_category: 'Super 30',
    event_label: 'Application Submitted',
  })
}

/**
 * Track newsletter subscription.
 */
export function trackNewsletterSignup() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'newsletter_signup', {
    event_category: 'Engagement',
    event_label: 'Newsletter Subscribe',
  })
}
