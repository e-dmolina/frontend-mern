import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <div className="container p-4">
        <Route exact path="/" component={NotesList}></Route>
        <Route path="/edit/:id" component={CreateNote}></Route>
        <Route path="/create" component={CreateNote}></Route>
        <Route path="/user" component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
