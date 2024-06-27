import React from "react";
import { NavLink } from "react-router-dom";
import { TopBarSearch } from "./TopBarSearch";
import avatar from './avatar.svg'

export const TopBar = ({ user, userName,recipes,admin }) => {
  console.log('TopBar:',user,userName,recipes)
  console.log('TopBar',admin)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-pinterest"></i>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page" href="#">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/upload" className="nav-link" href="#">Recept feltöltés</NavLink>
              </li>
              <li className={userName.length>0 ? "nav-item" : "d-none"}>
                <NavLink to="/myrecipes" className="nav-link" href="#">Receptjeim</NavLink>
              </li>
              <li className={admin===true ? "nav-item" :"d-none"}>
                <NavLink to="/admin" className="nav-link " href="#">Admin felület</NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {!userName && (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link " aria-current="page" href="#">Bejelentkezés</NavLink></li>)}
              {!userName && (
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" href="#">Regisztráció</NavLink></li>)}
              {userName && (
                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link" href="#">Kijelentkezés</NavLink></li>)}
            </ul>
          </div>
              <TopBarSearch placeholder="Recept keresése..." recipes={recipes} />
          <div>
            {user && (
              <NavLink to="/"><img className="top-img" src={avatar} alt={userName} title={userName} /></NavLink>)}
          </div>
        </div>
      </nav>
    </div>
  );
};
