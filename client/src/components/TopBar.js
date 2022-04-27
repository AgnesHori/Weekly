import React from "react";
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { TopBarSearch } from "./TopBarSearch";
import avatar from './avatar.svg'

export const TopBar = ({ user, userName,recipes }) => {
  console.log('TopBar:',user,userName,recipes)
=======
import photo from "./myPhoto.jpg";
import { NavLink } from "react-router-dom";

export const TopBar = ({ user }) => {
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-pinterest"></i>
          </div>
<<<<<<< HEAD
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
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link " href="#">Kapcsolat</NavLink>
=======
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/recipes" className="nav-link" href="#">
                  Rólam
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/write" className="nav-link" href="#">
                  Írj
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link " href="#">
                  Kapcsolat
                </NavLink>
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
<<<<<<< HEAD
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
              <NavLink to="/settings"><img className="top-img" src={avatar} alt={userName} title={userName} /></NavLink>)}
=======
              {!user && (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link "
                    aria-current="page"
                    href="#"
                  >
                    Bejelentkezés
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link" href="#">
                    Regisztráció
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink to="/logout" className="nav-link" href="#">
                    Kijelentkezés
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <i className="search-icon fa-solid fa-magnifying-glass"></i>
          <div>
            {user && (
              <NavLink to="/settings">
                <img className="top-img" src={photo} alt="fotó" />
              </NavLink>
            )}
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
          </div>
        </div>
      </nav>
    </div>
  );
};
