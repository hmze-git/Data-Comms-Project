import { useContext,useState } from "react"
import AuthContext from "../context/authContext"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api";


const Register = ()=>{

   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    let navigation = useNavigate();
    

    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await register(email, password);
      if (data.success) {
        navigation("/auth/login", { replace: true });
      } else {
        console.log("failed register");
      }
    } catch (error) {
        console.log("REG FAIL ",error); 
    }
  };

  const register =async ()=>{

    try {
         const userDetails = {
                userName:userName,
                email:email,
                password:password,

            }
        const resp = await api.post("/users/register",userDetails)

            return resp.data
    } catch (error) {
        console.log("ERR in Reg due to ",error )
    }



  }

  return(

    <div class="login spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="login__form">
                        <h3>Register</h3>
                        <form  onSubmit={handleSubmit}>
                            <div class="input__item">
                                <input type="text" placeholder="Email address" 
                                onChange={handleEmailChange}
                                required={true}
                                
                                />
                                <span class="icon_mail"></span>
                            </div>
                             <div class="input__item">
                                <input type="text" placeholder="Username" 
                                onChange={handleUserNameChange}
                                required={true}
                                
                                />
                                <span class="icon_profile"></span>
                            </div>
                            <div class="input__item">
                                <input type="password" 
                                placeholder="Password"
                                 onChange={handlePasswordChange}
                                 required={true}
                                />
                                <span class="icon_lock"></span>
                            </div>
                           
                            <button type="submit" class="site-btn" >Register Now</button>
                        </form>
                    
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="login__register">
                        <h3>Already Registered?</h3>
                        <Link to="/auth/login" class="primary-btn">Login Here</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>


  )

}
export default Register