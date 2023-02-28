import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from "./components/pages/Router";
import useStore from "./components/stores/CommonStore";
import Spinner from "./components/pages/Spinner";

function App() {
  const data = useStore();
  const app_loading = data.LoginStore.app_loading;

  return (
    <div className="App">
      <BrowserRouter>
        { app_loading === 'true' ? <Spinner/> : <Router/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
