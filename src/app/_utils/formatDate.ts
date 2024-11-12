// YYYY-MM-DD 형식으로 반환
export const formatDate = (date: string): string => {
  return date.substring(0, 10);
};

export const newsFormatDate = (date: string) => {
  const dateToFormat = new Date(date);
  const formattedDate = dateToFormat.toISOString().split("T")[0];
  return formattedDate;
};
