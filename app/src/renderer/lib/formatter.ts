export const locale = "en-US";

export const formatDate = (date: Date): string => {
  const formatter = Intl.DateTimeFormat(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const [month, day, year] = formatter.format(date).split("/");
  return `${day}.${month}.${year}`;
};
