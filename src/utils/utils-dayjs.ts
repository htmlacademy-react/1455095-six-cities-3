import dayjs from 'dayjs';

interface Date {
  date: string;
  format: string;
}

function humanizeDate({ date, format }: Date) {
  return date ? dayjs(date).format(format) : '';
}

export { humanizeDate };
