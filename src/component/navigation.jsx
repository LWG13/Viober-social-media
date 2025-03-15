import "./navigation.scss"
import { Link, Outlet } from "react-router-dom"
import nofication from "./nofication.png"
import home from "./home.png"
import fav from "./fav.png"
import watch from "./watch.png"
import createPost from "./createPost.png"
import viober from "./viober.png"
import searchWhite from "./searchWhite.png"
import chat from "./chat.png"
import searchBlue from "./searchBlue.png"
import { useSelector } from "react-redux"

import lwg from "./lwg.png"
export default function Navigation() {
  const auth = useSelector(state => state.auth)
  return (
 <div>
    <div className="grid">
     <div className="navigation">

      <img src={viober} alt="viober" className="logo" loading="lazy" />
       <div className="search">
                   <input type="text" placeholder="Searching.."/>
         <img src={searchBlue} alt="search" loading="lazy" />
       </div>
       <div style={{padding: "7px"}}>
         
         <img src={createPost} alt="create" loading="lazy" className="asset" />
         <img src={nofication} alt="ping" className="asset" loading="lazy" />
         <img src={searchWhite} alt="search" loading="lazy" className="searchWhite"/>
         <img src={chat} alt="chat" loading="lazy" className="chat" />
         <Link to={`/profile/${auth._id}`} className="item"  >
          <img src={auth.image} alt="profile" loading="lazy" className="profile1" width="90px"/>
         </Link>
         </div>
      
     </div>
    
   </div>
   <div className="outlet">
    <Outlet />
   </div>
         <div className="navi-mobile">
        <Link to="/" className="item" >
          <img src={home} alt="home" loading="lazy"/>
          <span className="linkm">Home</span>
        </Link>
        <div className="item" to="/category" >
          <img src={watch} alt="category" loading="lazy" />
          <span className="linkm">Watch</span>
        </div>           
        <Link to={`/profile/${auth._id}`} className="item"  >
          <img src={auth.image} alt="profile" loading="lazy" className="profile"/>
          <span className="linkm">Profile</span>
        </Link>
      </div>
 </div>
  )
}
