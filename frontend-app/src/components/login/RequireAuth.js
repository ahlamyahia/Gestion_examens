import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const token = localStorage.getItem("login_token");
    return token? <Outlet/> : <Navigate to="/"/>
}

export default RequireAuth;