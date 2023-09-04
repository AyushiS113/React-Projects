import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "./api";
import { AppThunk } from "./app";
import API_URL from "../config/ApiUrl";

interface CommonState {
  status: [];
  privilegesList: [];
  rolesList: [];
}

const initialState = {
  status: [],
  privilegesList: [],
  rolesList: [],
} as CommonState;

const CommonSlice = createSlice({
  name: "COMMON",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<any>) => {
      state.status = action.payload;
    },
    setPrivilegesList: (state, action: PayloadAction<any>) => {
      state.privilegesList = action.payload;
    },
    setRolesList: (state, action: PayloadAction<any>) => {
      state.rolesList = action.payload;
    },
  },
});

export const { setStatus, setPrivilegesList, setRolesList } =
  CommonSlice.actions;

export const fetchPrivilegesList = (): AppThunk<any> => async dispatch => {
  try {
    const response = await api.get(API_URL.COMMON.PRIVILEGES);
    dispatch(setPrivilegesList(response.data));
    return Promise.resolve(response.data)
  } catch (error: any) {
    dispatch(setPrivilegesList([]));
    return Promise.reject(error.data)
  }
};
export const fetchRolesList =
  (payload?: any): AppThunk<any> =>
  async dispatch => {
    try {
      const response = await api.get(API_URL.COMMON.ROLES_LIST(payload));
      dispatch(setRolesList(response.data?.data));
    } catch (error: any) {
      dispatch(setRolesList([]));
    }
  };

export default CommonSlice.reducer;
