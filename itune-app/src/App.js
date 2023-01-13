import React from 'react';
import './App.css';
import AlbumList from './AlbumList';
import WishList from './WishList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlbumList />}></Route>
        <Route path="/wishList" element={<WishList />}></Route>
      </Routes>
    </BrowserRouter >

  );

}


export default App;