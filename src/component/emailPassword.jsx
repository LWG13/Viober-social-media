import "./loginPage.scss"
import { Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import back from "./back.png"

import { Form, useForm} from "react-hook-form"
import { emailAuth } from "./ReactRedux/authSlice"

export default function EmailPassword() {
  const [user, setUser] = useState({
    email: ""
  })
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(emailAuth(user))
  }
  useEffect(() => {
    if (auth.firstAuth === true) navigate("/otp")
  }, [auth.firstAuth, navigate])
  const { control, register, formState: { errors } } = useForm()
return(
  <div className="loginPage" >
                                   <div className="naviDetail1">
        <Link to="/login" className="goback1">
        <img src={back} alt="go back" />
        </Link>
      </div>

                 <div className="wrapper">
      <Form action ="" method="post" onSubmit={handleSubmit} control={control}>
       <h1>Confirm Email</h1> 
      
       <div className="input-box">
         <input type="email" placeholder="Email" required {...register("email", { required: {value: true, message: "Email is required"}, pattern: {
       value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 
       message: "invalid email format!"
    }})} onChange={(e => setUser({...user, email: e.target.value}))}/>

       </div>
        <span className="error">{errors?.email?.message}</span>
        { auth.registerStatus === "reject" ? (<p style={{color: "red"}}>{auth.error}</p>) : null}
        <br/><br/>
       <button className="btn">Confirm</button>
      </Form>
                 </div>
            </div>
  )
}
