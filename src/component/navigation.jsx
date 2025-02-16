import "./navigation.scss"
import { Link, Outlet } from "react-router-dom"
import viober from "./viober.png"
export default function Navigation() {
  return (
 <div>
    <div className="grid">
     <div className="navigation">
      <img src={viober} alt="viober" className="logo" loading="lazy" />
     
     </div>
    <div className="outlet">
     <Outlet />
    </div>
   </div>
 </div>
  )
}
