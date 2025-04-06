import "./contact.scss"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { contactViober } from "./ReactRedux/authSlice"
export default function Contact() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [message, setMessage] = useState("")
  const data = {
   message: message,
   userId: auth._id
  }
  const handleSubmit = () => {
   dispatch(contactViober(data))
   setMessage("")
  }
  return(
    <div className="contact">
     <h1>Contact</h1>
      <p>In here you can contact us about bug or what we is interested in.</p>
      <br/>
      <label>Contact field</label>
      <textarea placeholder="Enter your message here..." width="100%" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  )
}