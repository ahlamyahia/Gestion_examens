import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            const user = { email: email, password: password };
            const response = await axios.post("http://localhost:8000/api/auth/login", user);
            const token = response.data.token;
            localStorage.setItem("login_token", token);
            navigate("/dashboard/etudiantList");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password/Email incorrect!!!",
               
              });
        }
    };

    return (
           
           <div className="login-dark">
                                <form>
                                <h2 className="sr-only">Login Form</h2>
        <div className="illustration">
        <FontAwesomeIcon icon={faLock} />
        </div>
                                    <div className="form-group">
          <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="form3Example3" className="form-control" placeholder="Email" />
                                     
                                    </div>

                                    <div className="form-group">
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4" className="form-control"  placeholder="Password" />
                                        
                                    </div>

                                    <button onClick={login} type="button" className="btn btn-primary btn-block">Connexion</button>

                                    
                                </form>
                            </div>
                      
         
    );
};

export default Login;
