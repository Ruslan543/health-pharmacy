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
