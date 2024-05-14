import { useMemo, useReducer } from "react";
import { createReducerActions } from "../../utils/helper";

const initialState = {
  email: "",
  password: "",
  passwordConfirm: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setEmail":
      return { ...state, email: action.payload };

    case "setPassword":
      return { ...state, password: action.payload };

    case "setPasswordConfirm":
      return { ...state, passwordConfirm: action.payload };

    case "init":
      return { ...state, ...action.payload };

    default:
      throw new Error("Action unknown!");
  }
}

const actionNames = ["setEmail", "setPassword", "setPasswordConfirm", "init"];

function useSettingsReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useMemo(
    () => createReducerActions({ dispatch, actionNames }),
    []
  );

  return { state, actions };
}

export { useSettingsReducer };
