import { Grid } from "@mui/material"
import "./home.scss"
import { Link, useNavigate, Outlet} from "react-router-dom"
import axios from "axios"
import setting from "./setting.png"
import home from"./homeBlue.png"
import watch from "./watchBlue.png"
import fav from "./favBlue.png"
import lwg from "./lwg.png"
import {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useQuery } from "react-query"
import { logoutUser } from "./ReactRedux/authSlice.js"

export default function Home() {
  const navigate = useNavigate()
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { data : friend} = useQuery({
    queryKey:["friend"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/user/friend/list?userId=${auth._id}&limit=8`)
  })
  console.log(auth)
  const logout = () => {
   dispatch(logoutUser())
  }
  return(
    <div className="homepage" >
     <Grid container>
      <Grid item xs={0} sm={4} md={3} lg={3} >
       <div className="left">
         <div className="menu">
          <Link to={`/profile/${auth._id}`} className="user">
           <img src={auth.image} alt="user" loading="lazy"/>
           <span >{auth.username}</span>
          </Link>
          <Link to="/" className="menu-item">
           <img src={home} alt="home" loading="lazy" width="40px" />
  <span>Home</span>
          </Link>
           <Link to="/watch" className="menu-item">
              <img src={watch} alt="home" loading="lazy" width="40px" />
           <span>Watch</span>
             </Link>
           <Link to="/fav" className="menu-item">
              <img src={fav} alt="home" loading="lazy" width="40px" />
           <span>Favourite Post</span>
             </Link>
           <Link to="/setting" className="menu-item">
              <img src={setting} alt="home" loading="lazy" width="40px" />
           <span>Setting</span>
           </Link>
           <br/>
           <hr/>
           <h2>Your Lastest Post</h2>
         </div>
       </div>
      </Grid>
       <Grid item xs={12} sm={8} md={6} lg={6} >
         <div className="mid">
          <div style={{height: "100%", overflowY: "auto", display: "flex", flexDirection: "column" }} >
           <Outlet/>
          </div>
          </div>
       </Grid>
       <Grid item xs={0} sm={0} md={3} lg={3} >
         <div className="right">
           <h1>Friends</h1>
           {friend?.data?.map(fri => (
             <Link to={`/profile/${fri.user1 === auth._id ? fri.user2 : fri.user1}`} className="friendList" >
               <img src={fri.image1 === auth.image ? fri.image2 : fri.image1} alt="avatar"/>
               {fri.username1 === auth.username ? <p>{fri.username2}</p> : <p>{fri.username1}</p>}
             </Link>
           ))}
          </div>
       </Grid>
     </Grid>
    </div>
  )
}