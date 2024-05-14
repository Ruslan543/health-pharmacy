import { NUMBER_DAYS_IN_MONTHS } from "../utils/constans";

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

export function createReducerActions({ dispatch, actionNames }) {
  const actions = actionNames.reduce((acc, name) => {
    return {
      ...acc,
      [name]: (payload) => {
        dispatch({ type: name, payload });
      },
    };
  }, {});

  return actions;
}

export function getDaysInMonth(month, year) {
  const days = NUMBER_DAYS_IN_MONTHS[month];

  if (month === "Февраль" && year % 4 === 0) {
    return 29;
  }

  return days;
}
