import { Link, useNavigate } from "react-router-dom";

const SidBar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("login_token")
        navigate('/')

    }

    return (
        <>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <li className="nav-item active">
                    <a className="nav-link">
                        <i className="fas fa-university"></i>
                        <span> Gestion & Administration des examens</span>
                    </a>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="">
                        <i className="fas fa-home"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="etudiantList" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-user-graduate"></i>
                        <span>Etudiants</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="filieres" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-stream"></i>
                        <span>filieres</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="professeurs" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-user-tie"></i>
                        <span>Professeurs</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="salles" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-archway"></i>
                        <span>Salles</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="examens" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-file-edit"></i>
                        <span>Examens</span>
                    </Link>
                </li>


                <li className="nav-item">
                    <button onClick={logout} className="nav-link collapsed" >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Deconnexion</span>
                    </button>
                </li></ul>
        </>
    )
}

export default SidBar;