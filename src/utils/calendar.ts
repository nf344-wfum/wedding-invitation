import { CONTENT } from '../content'

/**
 * Formats a Date object into an iCalendar UTC timestamp string: YYYYMMDDTHHMMSSZ
 */
function formatIcsUtcDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

/**
 * Escapes characters for iCalendar text values per RFC 5545
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/**
 * Generates an RFC 5545 compliant .ics file and prompts download
 */
export function downloadCalendarInvite(lang: 'bn' | 'en'): void {
  const startDate = new Date(CONTENT.event.isoDateTime)
  
  let endDate: Date
  if (CONTENT.event.isoEndDateTime) {
    endDate = new Date(CONTENT.event.isoEndDateTime)
  } else {
    endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000)
  }

  const now = new Date()
  const uid = `azraf-huzaifa-wedding-${startDate.getTime()}@invitation`

  const summary =
    lang === 'bn'
      ? 'বিবাহ অনুষ্ঠান — আজরাফ ও হুজাইফা'
      : 'Wedding Ceremony — Azraf & Huzaifa'

  const location = `${CONTENT.venue.name[lang]}, ${CONTENT.venue.address[lang]}`

  const description =
    lang === 'bn'
      ? `${CONTENT.translations.bn.invitationBody}\n\nস্থান: ${location}\nতারিখ: ${CONTENT.translations.bn.details.date}\nপ্রীতিভোজ: ${CONTENT.translations.bn.details.time}\nগুগল ম্যাপ: ${CONTENT.venue.googleMapsDirectionsUrl}`
      : `${CONTENT.translations.en.invitationBody}\n\nVenue: ${location}\nDate: ${CONTENT.translations.en.details.date}\nTime: ${CONTENT.translations.en.details.time}\nGoogle Maps: ${CONTENT.venue.googleMapsDirectionsUrl}`

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Azraf & Huzaifa//Wedding Ceremony Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsUtcDate(now)}`,
    `DTSTART:${formatIcsUtcDate(startDate)}`,
    `DTEND:${formatIcsUtcDate(endDate)}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `GEO:${CONTENT.venue.latitude};${CONTENT.venue.longitude}`,
    `URL:${CONTENT.venue.googleMapsDirectionsUrl}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Azraf & Huzaifa Wedding Ceremony Tomorrow',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Azraf & Huzaifa Wedding Ceremony starts in 2 hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const icsContent = icsLines.join('\r\n')
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'azraf-huzaifa-wedding-ceremony-invitation.ics'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
