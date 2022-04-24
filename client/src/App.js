import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { Home } from "./components/Home";
//import { SingleRecipe } from "./components/SingleRecipe";
import { Contact } from "./components/Contact";
import { Upload } from "./components/Upload";
import { Register } from "./components/Register";
import { Settings } from "./components/Settings";
import { Login } from "./components/Login";
import { Recipes } from "./components/Recipes";
import { Logout } from "./components/Logout";
import { Single } from "./components/Single";
import {Write} from './components/Write'
function App() {
  const [user, setUser] = useState(true);
//31 sor write csak próba, ezt ki kell majd venni!!!!!!
  return (
    <>
      <BrowserRouter>
        <TopBar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:recipeId" element={<Single />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/write" element={ user ? <Write /> : <Register />} />
          <Route path="/write" element={ <Write />} /> 
          <Route path="/upload" element={user ? <Upload /> : <Register />} />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Register />}
          />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
