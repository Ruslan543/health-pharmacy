import { useReducer, useMemo } from "react";
import { createReducerActions } from "../../utils/helper";

const initialState = {
  name: "",
  surname: "",
  day: "",
  month: "Январь",
  year: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };

    case "setSurname":
      return { ...state, surname: action.payload };

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

    case "init":
      return { ...state, ...action.payload };

    default:
      throw new Error("Action unknown!");
  }
}

const actionNames = [
  "setName",
  "setSurname",
  "setDay",
  "setMonth",
  "setYear",
  "init",
];

function useAccountReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useMemo(
    () => createReducerActions({ dispatch, actionNames }),
    []
  );

  return { state, actions };
}

export { useAccountReducer };
