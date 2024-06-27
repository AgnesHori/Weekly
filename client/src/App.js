import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { Home } from "./components/Home";
//import { SingleRecipe } from "./components/SingleRecipe";
import { Upload } from "./components/Upload";
import { Register } from "./components/Register";
import { Settings } from "./components/Settings";
import { Login } from "./components/Login";
//import { Recipes } from "./components/Recipes";
import { Logout } from "./components/Logout";
import { Single } from "./components/Single";
import { WelcomePage } from "./components/WelcomePage";
import { EditRecipe } from "./components/EditRecipe";
import { Myrecipes } from "./components/Myrecipes";
import { Admin } from "./components/Admin";
import { Footer } from "./components/Footer";
import axios from "axios";
import {ConfirmProvider} from 'material-ui-confirm'


function App() {
  const [user, setUser] = useState(localStorage.getItem('user')?localStorage['user']:false);
  const [categ,setCateg] = useState([])
  const [userName, setUserName] = useState(localStorage.getItem('userName')?localStorage['userName']:'');
  const [userId, setUserId] = useState(localStorage.getItem('userId')?localStorage['userId']:0);
  const [recipes,setRecipes]=useState([])
  const [ingredient,setIngredient]=useState('')
  const [admin,setAdmin]=useState(localStorage.getItem('admin')?localStorage['admin']:false)



  useEffect(()=>{
    fetchCateg()
  },[])

  useEffect(()=>{
    localStorage.setItem('user',user)
    localStorage.setItem('userName',userName)
    localStorage.setItem('userId',userId)
    localStorage.setItem('admin',admin)
  },[user,userName,userId,admin])


  const fetchCateg=async () => {
    let url='/categ'
    try{
      const resp=await axios.get(url)
      console.log(resp.data)
      setCateg(resp.data)
    }catch(err){
      console.log(err)
    }
  }

  
  return (
    <ConfirmProvider>
      <HashRouter>
        <TopBar user={user} userName={userName} recipes={recipes} admin={admin}/>
        <Routes>
          <Route path="/" element={<Home categ={categ} userId={userId} recipes={recipes} setRecipes={setRecipes}/>} />
          <Route path="/myrecipes" element={<Myrecipes categ={categ} userId={userId} />} />
          <Route path="/recipes/:recipeId/:imageId" element={<Single categ={categ} userId={userId} />} />
          <Route path="/admin" element={<Admin admin={false} />} />
          <Route path="/upload" element={userName ? <Upload userId={userId} categ={categ} ingredient={ingredient}
            setIngredient={setIngredient} /> : <Register />} />
          <Route path="/settings" element={user ? <Settings /> : <Register />}/>
          <Route path="/login" element={ userName ? <Home categ={categ} recipes={recipes} setRecipes={setRecipes} /> :
            <Login setUser={setUser} setUserName={setUserName} setUserId={setUserId} setAdmin={setAdmin}/>} />
          <Route path="/register" element={userName ? <Home  categ={categ} recipes={recipes} setRecipes={setRecipes} /> : <Register />} />
          <Route path="/logout" element={<Logout categ={categ} setUser={setUser} setUserName={setUserName}
            setUserId={setUserId} recipes={recipes} setRecipes={setRecipes} setAdmin={setAdmin} />} />
          <Route path="/confirm/:confirmationCode" element={<WelcomePage setUser={setUser}/>} />
          <Route path="/editRecipe/:recipeId" element={user? <EditRecipe userId={userId} categ={categ}/> : <Login/>} />
        </Routes>
          <Footer/>
      </HashRouter>
      </ConfirmProvider>
  );



}



export default App;
