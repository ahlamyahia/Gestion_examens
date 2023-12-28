import { Outlet } from "react-router-dom";
import SidBar from "../components/sidBar/SidBar";


const ProtectedRoutes = () => {
  return (
    <div id="wrapper" className="d-flex">
    <SidBar />
    
    <div id="content" className="container-fluid d-flex align-items-center justify-content-center">
      <Outlet/>
    </div>
  </div>
  );
};

export default ProtectedRoutes;
