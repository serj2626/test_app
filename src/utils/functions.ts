/**
 * Функция для форматирования даты
 * @param date - дата
 * @returns форматированная дата
 * Пример: formatDate('2023-01-01')
 */
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
