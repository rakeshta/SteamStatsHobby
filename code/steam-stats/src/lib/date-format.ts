/** Date utilities */
export const DateFormat = {
  /** Formats the given date for display with full text day, month & year. */
  long(date: number | Date) {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  },
} as const;
