/**
 * Format a number using Intl.NumberFormat with the given locale.
 * Replacement for the deprecated i18n.number() from Lingui.
 */
export function formatNumber(locale: string, value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a date using Intl.DateTimeFormat with the given locale.
 * Replacement for the deprecated i18n.date() from Lingui.
 */
export function formatDate(locale: string, value: Date | number, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale, options).format(value);
}

const RELATIVE_TIME_DIVISIONS: Array<{amount: number; unit: Intl.RelativeTimeFormatUnit}> = [
  {amount: 60, unit: 'second'},
  {amount: 60, unit: 'minute'},
  {amount: 24, unit: 'hour'},
  {amount: 7, unit: 'day'},
  {amount: 4.34524, unit: 'week'},
  {amount: 12, unit: 'month'},
  {amount: Number.POSITIVE_INFINITY, unit: 'year'},
];

/**
 * Format a date relative to now (e.g. "5m ago") using Intl.RelativeTimeFormat.
 */
export function formatRelativeDate(locale: string, value: Date | number, now: number = Date.now()): string {
  const formatter = new Intl.RelativeTimeFormat(locale, {numeric: 'always', style: 'narrow'});

  let duration = (new Date(value).getTime() - now) / 1000;
  for (const division of RELATIVE_TIME_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }

  return formatter.format(Math.round(duration), 'year');
}
