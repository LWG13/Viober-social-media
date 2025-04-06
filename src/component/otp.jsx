import "./loginPage.scss"
import { Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { Form, useForm } from "react-hook-form"
import { otpAuth } from "./ReactRedux/authSlice"
import back from "./back.png"
import OtpInput from 'react-otp-input'
export default function Otp() {
  const [user, setUser] = useState("")
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(otpAuth(user))
  }
  const navigate = useNavigate()
  useEffect(() => {
    if(auth.secondAuth === true) navigate("/reset")
  },[auth.secondAuth, navigate])
  const { control, register, formState: { errors } } = useForm()
return(
  <div className="loginPage" >
                  <div className="naviDetail1">
        <Link to="/login" className="goback1">
        <img src={back} alt="go back" />
        </Link>
      </div>
    {auth.firstAuth === true ? (
                 <div className="wrapper">
      <Form action ="" method="post" onSubmit={handleSubmit} control={control}>
       <h1>Comfirm OTP</h1>
        <br/>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} >
        <OtpInput
      value={user}
      onChange={setUser}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={{width: "50px", height:"50px", fontSize: "28px", border: "2px solid black"}}
    />
      </div>
        {auth.registerStatus === "reject" ? (<p>{auth.error}</p>) : null}
        <p>Check Gmail to have OTP code</p>
        <br/><br/>
        <button className="btn">Confirm</button>
  </Form>
                 </div>
  ) : (<p>You cannot go here</p>)}
            </div>
  )
}