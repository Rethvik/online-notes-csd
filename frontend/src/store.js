import { configureStore, createSlice } from "@reduxjs/toolkit";
const intialLoginState = {
  email: "",
  password: "",
  speech: "",
  error: false,
  loading: false,
  isLogged: false,
};
const loginSlice = createSlice({
  name: "loginStore",
  initialState: intialLoginState,
  reducers: {
    emailHandler(state, action) {
      state.email = action.payload;
    },
    passwordHandler(state, action) {
      state.password = action.payload;
    },
    loadingTrue(state) {
      state.loading = true;
    },
    loadingFalse(state) {
      state.loading = false;
    },
    error(state, action) {
      state.error = action.payload;
    },
    loggedIn(state) {
      state.isLogged = true;
    },
    loggedOut(state) {
      state.isLogged = false;
    },
    speechType(state, action) {
      state.type = action.payload;
    },
    speechRecg(state, action) {
      state.speech = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
export const loginActions = loginSlice.actions;
export default store;
