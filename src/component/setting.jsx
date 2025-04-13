import "./setting.scss"
import { Grid } from "@mui/material"

import { useState, useRef, useEffect } from "react"
import { logoutUser } from "./ReactRedux/authSlice"
import cato from "./cato.png"
import back from "./backWhite.png"
import { Link, Outlet } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
export default function Setting() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  return(
    <div className="Admin">
      <div className="grid1">
        <div className="naviDetail">
           <Link to={`/profile/${auth._id}`} className="goback1">
        <img src={back} alt="go back" width="90px"/>
        </Link>
        <Menu menu={menu} setMenu={setMenu}/>
        </div>
      </div>
      <div className="gridO">
      <div className="gridDetail">
        <Grid container >

          <Grid item xs={4} sm={4} md={4} lg={4} >
           <div className="sidebar">
             <h1>Setting Page</h1>

               <li className="sidebar-list"><Link to="/setting">Account</Link></li>
               <li className="sidebar-list"><Link to="/setting/contact">Contact</Link></li>
             <li className="sidebar-list" onClick={() => dispatch(logoutUser)}>
               Log Out
             </li>


           </div>
          </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} >
         <Outlet />
        </Grid>
        </Grid>
      </div>
      </div>
    </div>
  )
}
function Menu({menu, setMenu}) {
    useEffect(() => {
     let handler = (e) => {
       if(!settingRef.current.contains(e.target)){
         setMenu(false)
       }
     }
     document.addEventListener("mousedown", handler)
     return () => document.removeEventListener("mousedown",handler)
    })
  const settingRef = useRef(null)
  return (
       <div className="menuContainer10" ref={settingRef}>
         <div className="menu-trigger10" onClick={() => {setMenu(!menu)}} >
         <img className="image10" src={cato} alt="menu" width="60px"/>
         </div>
         <div className={`dropdownmenu10 ${ menu ? "active10" : "deactive10" }`}>
            <Link to="/setting" className="dropdownitem10" >
               
               <p className="link10" >Account</p>
             </Link>
           <Link to="/setting/contact" className="dropdownitem10" >
              <p  className="link10" >Contact</p>
             </Link>
         </div>
       </div>
  )
}