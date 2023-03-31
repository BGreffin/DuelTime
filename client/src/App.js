import React from 'react';

import CLibrary from './components/cLibrary';
import Dashboard from './components/dashboard';
import DeckForm from './components/deckForm';
import DeckList from './components/deckList';
import LRForm from './components/lrForm';
import Update from './components/update';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<DeckForm/>} path='/api/duelists/:userName/create' />
          <Route element={<Update/>} path='/api/duelists/:userName/edit/:id' />
          <Route element={<LRForm/>}  path='/' />
          <Route element={<Dashboard/>} path='/api/duelists/:userName' />
          <Route element={<DeckList/>} path='/api/duelists/:userName/decks' />
          <Route element={<CLibrary/>} path='/api/duelists/:userName/clib' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
