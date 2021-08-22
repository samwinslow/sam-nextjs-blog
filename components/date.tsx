import { parseISO, format } from 'date-fns'

export const formatDate = (dateString: string): string =>
  format(parseISO(dateString), `LLL d, yyyy`)

const Date = ({ dateString }: { dateString: string }) => {
  return <time dateTime={dateString}>{formatDate(dateString)}</time>
}

export default Date
