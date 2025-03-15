
import { Link, useNavigate} from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { loginUser, googleLogin} from "./ReactRedux/authSlice"
import { Form, useForm} from "react-hook-form"
import "./loginPage.scss"

export default function LoginPage() {
      const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const { control } = useForm()
  const handleSubmit = (e) => {
   dispatch(loginUser(user))
  }
  
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(auth.userAuth === true) navigate("/")
  }, [navigate, auth.userAuth])
      return(
            <div className="loginPage" >
      <div className="wrapper">
      <Form action ="" method="post"  control={control} onSubmit={handleSubmit}>
       <h1>Login</h1> 
       <div className="input-box">
         <input type="email" placeholder="Email" required onChange={(e => setUser({...user, email: e.target.value}))}/>
         <FaUser className="icon"/>
       </div>
       <div className="input-box">
         <input type="password" placeholder="Password" required onChange={(e => setUser({...user, password: e.target.value}))}/>
         <FaLock className="icon"/>
       </div>
       {auth.loginStatus === "reject" ? (
       <span style={{color: "red"}}>{auth.loginError}</span>
      )  : null}
      <br/>
       <a href="#" className="Link">Forgot password?</a>

       <button className="btn">Login</button>
      <div className="register-link">
       <p>Don't Have An Account?<Link to="/signup">.  Register</Link></p>
        <br/>
        
      </div>
     </Form>
        <button className="google" onClick={() => dispatch(googleLogin())}>
         Continue With Google
        </button>
    </div>  

            </div>
)
}