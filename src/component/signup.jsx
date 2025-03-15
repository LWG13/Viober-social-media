import "./signup.scss"
import { Link, useParams ,useNavigate } from "react-router-dom"
import axios from "axios"
import { useForm, Form } from "react-hook-form"
import { registerUser, googleLogin } from "./ReactRedux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import {useRef, useState, useEffect} from "react"

export default function SignupPage() {
      const { register, control, formState: { errors, isSubmitting, isDirty } } = useForm();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(auth.userAuth === true) navigate("/")
  }, [navigate, auth.userAuth])
  
    const inputRef= useRef()
    const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  const handleSubmit = (e) => {
    dispatch(registerUser(user))
  }
  console.log(auth.userAuth)
console.log(user)
  
      return(
            <div className="signupPage" >
                   <div className="wrapper1">
      <Form action="" method="POST" control={control} onSubmit={handleSubmit} >
       <h1>Sign Up</h1> 
       <div className="input-box">
         <input type="text" placeholder="Username"  {...register("username", { required: {value: true, message: "Username is required" }, pattern: {
            value: /^[A-Za-z0-9]+$/i,
            message: "only type alpharic and number",
          },})} onChange={(e => setUser({...user, username: e.target.value}))} />
       </div>
        <span style={{color: "red"}}>{errors.username?.message}</span>
       <div className="input-box">
         <input type="email" placeholder="Email" required  {...register("email", { required: {value: true, message: "Email is required"}, pattern: {
       value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 
       message: "invalid email format!"
    }})} onChange={(e => setUser({...user, email: e.target.value}))}/>
       </div>
        <span style={{color: "red"}}>{errors.email?.message}</span>
        <div className="input-box">
         <input type="password" placeholder="Password" required {...register("password", { minLength:{ value: 6, message: "password cannot lower than 6 character" },pattern: {
            value: /^[A-Za-z0-9]+$/i,
            message: "only type alpharic and number",
          },  required: {
      value: true,
      message: "password is required"
         }, })}  onChange={(e => setUser({...user, password: e.target.value}))} />
        </div>
          <span style={{color: "red"}}>{errors.password?.message}</span>     
                 {auth.registerStatus === "reject" ? (
       <span style={{color: "red"}}>{auth.registerError}</span>
      )  : null}
                           <button className="btn" disabled={auth.registerStatus === "PENDING"}>{auth.registerStatus === "PENDING" ? <span>Sending...</span> : <span>Send</span>} </button>
                  <div className="register-link">
       <p>Already Have Account?<Link to="/login">.  Log In</Link></p>
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