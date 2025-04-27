import "./navigation.scss"
import { Link, Outlet, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import nofication from "./nofication.png"
import { useQuery } from "react-query"
import home from "./home.png"
import watch from "./watch.png"
import viober from "./viober.png"
import chat from "./chat.png"
import { searchViober, resetSearchSuccess } from "./ReactRedux/authSlice.js"
import searchBlue from "./searchBlue.png"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
export default function Navigation() {
  const auth = useSelector(state => state.auth)
  const { data } = useQuery({
    queryKey: ["count"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/post/nofication/${auth._id}/isRead`),
    refetchInterval: 3000
  })
  console.log(data?.data?.length)
  const navigate = useNavigate("")
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const handleSearch = () => {
    dispatch(searchViober(search))
  }
   
  
    useEffect(() => {
  if (auth.userAuth === false) {
    const timeout = setTimeout(() => {
      navigate("/login");
    }, 0); // delay nhẹ 0ms

    return () => clearTimeout(timeout); // cleanup
  }
}, [navigate, auth.userAuth]);
    useEffect(() => {
  if (auth.searchSuccess) {
    navigate("/search-result");
    setTimeout(() => {
      dispatch(resetSearchSuccess());
    }, 1000); // Chỉ reset sau 1 giây để tránh mất dữ liệu khi quay lại
  }
}, [auth.searchSuccess]);
   
  return (
 <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div className="grid">
     <div className="navigation">

      <img src={viober} alt="viober" className="logo" loading="lazy" />
       <div className="search">
                   <input type="text" placeholder="Searching.." value={search} onChange={e => setSearch(e.target.value)} />
         { auth.searchPending === true ?               (<div class="spinner">
  <span class="spinner-inner-1"></span>
  <span class="spinner-inner-2"></span>
  <span class="spinner-inner-3"></span>
</div>) : <img src={searchBlue} alt="search" loading="lazy" onClick={() => handleSearch()} /> }
       </div> 
       <div style={{padding: "7px", display: "flex"}} >
         
        <Link to="/notification" >
         
         <img src={nofication} alt="ping" className="asset" loading="lazy" />
        </Link>
         {data?.data?.length > 0 ?
          <div style={{width: "25px", height: "25px", background: "red", 
  fontSize:"20px", color: "white", borderRadius: "5px", marginTop: "10px", marginRight: "5px", display: "flex"}}><span>{data?.data?.length}</span></div>
          : null}
         <Link to="/chat" >
         <img src={chat} alt="chat" loading="lazy" className="chat" />
         </Link>
         <Link to={`/profile/${auth._id}`} className="item"  >
          <img src={auth.image} alt="profile" loading="lazy" className="profile1" />
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
        <Link to="/watch" className="item" >
          <img src={watch} alt="category" loading="lazy" />
          <span className="linkm">Watch</span>
        </Link>           
        <Link to={`/profile/${auth._id}`} className="item"  >
          <img src={auth.image} alt="profile" loading="lazy" className="profile"/>
          <span className="linkm">Profile</span>
        </Link>
      </div>
 </div>
  )
}
