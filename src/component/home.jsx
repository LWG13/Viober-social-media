import { Grid } from "@mui/material"
import "./home.scss"
import { Link, useNavigate, Outlet} from "react-router-dom"
import setting from "./setting.png"
import home from"./homeBlue.png"
import watch from "./watchBlue.png"
import fav from "./favBlue.png"
import lwg from "./lwg.png"
import {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "./ReactRedux/authSlice.js"

export default function Home() {
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if(auth.userAuth === false) navigate("/login")
  }, [navigate, auth.userAuth])
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
          <div className="menu-item">
           <img src={home} alt="home" loading="lazy" width="40px" />
  <span>Home</span>
          </div>
           <div className="menu-item">
              <img src={watch} alt="home" loading="lazy" width="40px" />
           <span>Watch</span>
             </div>
           <div className="menu-item">
              <img src={fav} alt="home" loading="lazy" width="40px" />
           <span>Favourite Post</span>
             </div>
           <div className="menu-item">
              <img src={setting} alt="home" loading="lazy" width="40px" />
           <span>Setting</span>
             </div>
           <br/>
           <hr/>
           <h3>Your Lastest Post</h3>
         </div>
       </div>
      </Grid>
       <Grid item xs={12} sm={8} md={6} lg={6} >
         <div className="mid">
           <Outlet/>
          </div>
       </Grid>
       <Grid item xs={0} sm={0} md={3} lg={3} >
         <div className="right">

          </div>
       </Grid>
     </Grid>
    </div>
  )
}