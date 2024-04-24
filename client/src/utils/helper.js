export function classNameJoin(classes) {
  return classes.join(" ");
}

export function convertDate(date) {
  const dateString = date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return dateString;
}
