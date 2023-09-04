import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";
import CommonSliceReducer from "./CommonSlice";
import UserSliceReducer from "../views/modules/UserManagement/utils/slice";
import RoleSliceReducer from "../views/modules/RoleManagement/utils/slice";

const store = configureStore({
  reducer: {
    AUTH: AuthSliceReducer,
    USER: UserSliceReducer,
    ROLE: RoleSliceReducer,
    COMMON: CommonSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<any>
>;

export default store; // Export the store as the default export
