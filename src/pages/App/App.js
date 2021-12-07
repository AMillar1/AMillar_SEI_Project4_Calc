import React, { useState, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import CalcPage from '../CalcPage/CalcPage';
import CompListPage from '../CompListPage/CompListPage';
import NavBar from '../../components/NavBar/NavBar';


export default function App() {
  
  const [user, setUser] = useState(getUser());
  // const [{currentOperand, previousOperand, operation, log, overwrite}, dispatch] = useReducer(reducer, {})
  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* client-side route that renders the component instance if the path matches the url in the address bar */}
            <Route path="/calc" element={<CalcPage />} />
            <Route path="/complist" element={<CompListPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
        
      }
    </main>
  );
}
