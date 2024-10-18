import * as Sentry from "@sentry/react"

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN
const environment = process.env.REACT_APP_SENTRY_ENV

const sentryDebug = process.env.REACT_APP_SENTRY_DEBUG === 'true'

const sentryTraceSampleRate = process.env.REACT_APP_SENTRY_TRACE_RATE
const sentryEventRate = process.env.REACT_APP_SENTRY_EVENT_RATE

// If no DSN, don't bother configuring Sentry.
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: sentryTraceSampleRate
      ? Number(sentryTraceSampleRate)
      : 1.0,
    profilesSampleRate: sentryEventRate ? Number(sentryEventRate) : 1.0,

    debug: sentryDebug,
    environment,

    // Session Replay
    replaysSessionSampleRate: sentryEventRate
      ? Number(sentryEventRate)
      : 0.1,
    replaysOnErrorSampleRate: sentryEventRate
      ? Number(sentryEventRate)
      : 1.0,
  })
}
