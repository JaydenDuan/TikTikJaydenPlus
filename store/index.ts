import { configureStore, Action, ThunkAction} from "@reduxjs/toolkit";
import { type } from "os";
import videoSlice from "./video";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import userSlice from "./authentication";

const makeStore = () =>
  configureStore({
    reducer: {
      video: videoSlice.reducer,
      user: userSlice.reducer
    },
    devTools:true
  });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export const userSliceAction = userSlice.actions
export const videoSliceAction = videoSlice.actions;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);
// export default makeStore;
