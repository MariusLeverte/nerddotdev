import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isThisMonth,
  format,
} from "date-fns";

export const getTimeSince = (d: Date | string) => {
  const now = new Date();
  const date = new Date(d);

  const minutes = differenceInMinutes(now, date);

  if (minutes < 60) {
    return `${minutes} minutter siden`;
  }

  const hours = differenceInHours(now, date);

  if (hours < 24) {
    return `${hours} timer siden`;
  }

  if (isThisMonth(date)) {
    const days = differenceInDays(now, date);
    return `${days} dager siden`;
  }

  return format(date, "dd MMM yyyy 'kl.' HH:mm");
};
