import React from 'react'
import './App.css'
import Search from './components/Search';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

export default function App(){

  return(
  <Routes>
    <Route path="/search" element={<Search />} />
    <Route path = "/" element={<MainPage />} />
    <Route path = "*" element={<MainPage />} />
  </Routes>)
    
    

}

