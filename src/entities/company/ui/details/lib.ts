export const formatDateForInput = (dateString: string) => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};

export const formatDateForDisplay = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}.${month}.${year}`;
};

export const snakeToRegular = (str: string) => {
  return str.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
