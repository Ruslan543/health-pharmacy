import { useMemo, useReducer } from "react";

const initialState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  day: "",
  month: "Январь",
  year: "",
};

function createActions({ dispatch, actionNames }) {
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

function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };

    case "setSurname":
      return { ...state, surname: action.payload };

    case "setEmail":
      return { ...state, email: action.payload };

    case "setPassword":
      return { ...state, password: action.payload };

    case "setPasswordConfirm":
      return { ...state, passwordConfirm: action.payload };

    case "setDay": {
      const { payload } = action;
      if (payload > 31) return state;

      return { ...state, day: payload };
    }

    case "setMonth":
      return { ...state, month: action.payload };

    case "setYear": {
      const { payload } = action;
      if (payload.length > 4) return state;

      return { ...state, year: payload };
    }

    default:
      throw new Error("Action unknown!");
  }
}

const actionNames = [
  "setName",
  "setSurname",
  "setEmail",
  "setPassword",
  "setPasswordConfirm",
  "setDay",
  "setMonth",
  "setYear",
];

function useSignupReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useMemo(() => {
    return createActions({ dispatch, actionNames });
  }, []);

  return { state, actions };
}

export { useSignupReducer };
