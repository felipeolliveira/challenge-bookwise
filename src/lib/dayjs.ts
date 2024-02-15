import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale(ptBR)

export function dayjsWithRelative(
  date?: dayjs.ConfigType,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
) {
  dayjs.extend(relativeTime)
  return dayjs(date, format, locale, strict)
}
