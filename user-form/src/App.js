import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import EditUser from './components/Users/EditUser';
import { Routes, Route } from 'react-router-dom';
function App() {

  return (
    <Routes>
      <Route path="/create" element={<AddUser />}></Route>
      <Route path="/edit" element={<EditUser />}></Route>
      <Route path="/" element={<UsersList />}></Route>
    </Routes>

  );
}

export default App;
