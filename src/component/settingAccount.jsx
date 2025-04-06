import "./settingAccount.scss"
import { useSelector, useDispatch} from "react-redux"
import { Link } from "react-router-dom"


import { useNavigate } from "react-router-dom"
import { Grid } from "@mui/material"
import { editAccount } from "./ReactRedux/authSlice"
import { useState, useEffect } from "react"
export default function EditProfile() {
  const [file, setFile] = useState("") 
   const auth = useSelector(state => state.auth) 
  const [username, setUsername] = useState(auth.username)
  console.log(username)
  console.log(username)
  const [password, setPassword] = useState(auth.password)
  useState(auth.phoneNumber)

   const [image, setImage] = useState(auth.image)
  const user = {
    username: username,
    email: auth.email,
    password: password,
    image: image,
    desc: auth.desc,
    _id: auth._id,
  }
  console.log(auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
   if(auth.editedProfile) navigate(`/profile/${auth._id}`)
  },[navigate, auth.editedProfile])
  const previewFile= (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
      console.log(image)
    }
  }
  const handleSubmit = () => {
    dispatch(editAccount(user))

  }
  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    previewFile(file)
  }
  return (
    <div className="editAccount" >
     <h1>Edit Account</h1>
             <div className="profileImg">
        <img src={image} alt="avatar"/>
          
       </div>
      <br/><br/>
    <div className="upload-box">
      <input 
        type="file" 
        onChange={(e) => handleChange(e)} 
        className="file-input" 
        id="fileInput"
      />
      <label 
        htmlFor="fileInput" 
        className="upload-button"
      >
        Choose your file
      </label>
    
    </div>
      <br/>
            <label>Name</label>
      <input type="text" defaultValue={auth.username} onChange={(e => setUsername(e.target.value))} />
        <label>Password</label>
        <input type="password" defaultValue={auth.password} onChange={(e => setPassword(e.target.value))} />
      <p>{auth.editError}</p>
        <button className="btnSubmit" onClick={() => handleSubmit()}>Edit</button>
    </div>
  )
}