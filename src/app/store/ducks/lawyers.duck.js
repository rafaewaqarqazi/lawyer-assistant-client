import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  AddLawyers: "[AddLawyers] Action"
};

const initialAuthState = {
  lawyersList: []
};

export const reducer = persistReducer(
  { storage, key: "lawyers", whitelist: ["lawyersList"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.AddLawyers: {
        const { lawyers } = action.payload;
        return {
          lawyersList: lawyers
        };
      }
      default:
        return state;
    }
  }
);

export const actions = {
  addLawyers: lawyers => ({ type: actionTypes.AddLawyers, payload: { lawyers } })
};

export function* saga() {

}
