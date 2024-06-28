import { NavLink } from "react-router-dom";

export const Footer = () => {
return (
    <footer className="footer center-align-text light">
    <div className="m-5 row no-padding center-align">
    <div className="col-md-4">
    <div className="widget widget_nav_menu">
        <div className="menu-footer-menu-container">
        <h5 className="mb-3">Készítette:</h5>
        <h6>Hóri Ágnes</h6>
        <a href="mailto:horiagnes@gmail.com">horiagnes@gmail.com</a>
        </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="widget widget_text">
        <img src="https://i.ibb.co/P4gbvWT/Upload.jpg" className="rounded-3 img-fluid" />
    </div>
    </div>
    <div className="col-md-4">
    <div className="widget widget_text">
       <div className="textwidget">
            <ul className="navbar-nav mx-auto">
            <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page" href="#">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/upload" className="nav-link" href="#">Recept feltöltés</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/login" className="nav-link " aria-current="page" href="#">Bejelentkezés</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/register" className="nav-link" href="#">Regisztráció</NavLink>
            </li>   
            <li className="nav-item">
                <NavLink to="/logout" className="nav-link" href="#">Kijelentkezés</NavLink>
            </li>                   
        </ul>
      </div>
    </div>
    </div>
    </div>
    </footer>
    )
}