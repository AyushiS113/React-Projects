import { createContext, useContext } from "react";
import Attract from "./AttractPlaceStore";
import Login from "./LoginStore";
import Data from "./UserStore";

const mainStore = createContext({
  LoginStore: new Login(),
  UserStore: new Data(),
  Attract: new Attract(),
});
const useStore = () => useContext(mainStore);
export default useStore;
