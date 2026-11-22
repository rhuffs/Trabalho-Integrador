import { NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./Header.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { VerificaPermissao } from "../pages/Login/Login";

export default function Header() {

    function logout(){
        localStorage.removeItem("token");
        window.location.href = "/login"
    }


    return (
        <nav className="navbar bg-white shadow-sm">
            <div className="container-fluid d-flex flex-wrap align-items-center justify-content-start px-4 navbar-conteudo">
                <img
                    src={logo}
                    alt="Logo do consultório"
                    className="img-fluid logo"
                />

                <ul className="navbar-nav flex-row flex-wrap align-items-center mb-0 links-header">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/agenda">
                            Agenda
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/pacientes">
                            Pacientes
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/financeiro">
                            Financeiro
                        </NavLink>
                    </li>

                    {VerificaPermissao("ADMIN") && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profissionais">
                                Profissionais
                            </NavLink>
                        </li>
                    )}

                </ul>

                <Button onClick={logout}
                    sx={{color : 'red',
                        borderColor : 'black'
                    }}>
                    Logout
                </Button>
                
            </div>
        </nav>
    );
}