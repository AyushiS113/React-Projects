import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./config/RouterConfig";
import { initialAppOptions } from "./store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/app";
import PageSpinner from "./components/PageSpinner/PageSpinner";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const AUTH = useSelector((state: RootState) => state.AUTH);
  // const { AUTH } = useStore();
  // const { InitializeApp, app_loading } = AUTH;
  //
  useEffect(() => {
    dispatch(initialAppOptions());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {AUTH.appLoading ? <PageSpinner /> : <Router />}
    </BrowserRouter>
  );
};

export default App;
