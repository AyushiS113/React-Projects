import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Attractions from './components/Attractions';
import CommonContent from './components/CommonContent';
import NotFound from './components/NotFound'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route element={<CommonContent/>}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/attractions" element={<Attractions/>}></Route>
      </Route>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
    </>
  );
}

export default App;
