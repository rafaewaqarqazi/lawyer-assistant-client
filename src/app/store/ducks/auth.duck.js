import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getAllJobs } from "../../crud/job.crud";
import * as routerHelpers from "../../router/RouterHelpers";
import * as jobsActions from './jobs.duck'
export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined
};

export const reducer = persistReducer(
    { storage, key: "auth", whitelist: ["user", "authToken"] },
    (state = initialAuthState, action) => {
      switch (action.type) {
        case actionTypes.Login: {
          const { authToken } = action.payload;
          return { authToken, user: undefined };
        }

        case actionTypes.Register: {
          const { authToken } = action.payload;

          return { authToken, user: undefined };
        }

        case actionTypes.Logout: {
          routerHelpers.forgotLastLocation();
          return initialAuthState;
        }

        case actionTypes.UserLoaded: {
          const { user } = action.payload;

          return { ...state, user };
        }

        default:
          return state;
      }
    }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* getJobs() {
    console.log('here')
    const { data: {jobs}} = yield getAllJobs();

    yield put(jobsActions.actions.addJobs(jobs));
  });
}
