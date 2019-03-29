import React from 'react';
import { Link } from 'react-router-dom';

const linksRender = [
    { to: "/", title: "Home" },
    { to: "/info", title: "Info" },
    { to: "/launches", title: "Launches" },
    { to: "/rockets", title: "Rockets" },
    { to: "/roadster", title: "Roadster" },
    {to: "/about", title: "About This Page"}
]

const Navbar = () => {
    return (
        <nav id="Nav" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">SpaceX API View</Link>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {
                        linksRender.map((link, index) =>
                            <li className="nav-item" key={index}>
                                <Link to={link.to} className="nav-link">{link.title}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;