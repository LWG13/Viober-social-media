import "./nofication.scss"
import { useNavigate, Link } from "react-router-dom"
import back from "./back.png"
import likeNofi from "./likeNofi.png"
import commentNofi from "./commentNofi.png"
import { nofiIsRead, replyFriend } from "./ReactRedux/authSlice.js"
import { useSelector, useDispatch } from "react-redux"
import { useQuery } from "react-query"
import axios from "axios"
export default function Nofication() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ["notification"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/post/nofication/${auth._id}`)
  })
  const handleClick = async (e, path, nofiId) => {
    e.preventDefault(); // Ngăn Link chuyển trang ngay lập tức
    try {
      await dispatch(nofiIsRead(nofiId)).unwrap();
      navigate(path); // Chỉ chuyển trang sau khi request thành công
    } catch (error) {
      console.error("Failed to log click:", error);
    }
  };
  const handleReply = (user1, user2, reply) => {
   dispatch(replyFriend({user1, user2, reply}))
    
  }
  return(
    <div className="nofication" >
     <div className="postNav" >
          <Link to="/" className="goback"  >
           <img src={back} alt="go back" width="50px" />
          </Link>
     </div>
    <h1>Notification</h1>
      {data?.data?.map(noti => (
    <div >
      {noti?.type === "friend request" ? (
        <div className="noti-box" key={noti._id}>
      <Link to={`/profile/${noti.userPostId}`} >
        <img src={noti.image} alt="like" width="90px" height="90px" style={{borderRadius: "50%"}} />
      </Link>
        <div className="noti-content">
         <p>{noti.username} {noti.message}</p>
         <button onClick={() => handleReply(noti.userPostId, auth._id, "reject")} style={{outline: "none", border: "none", width: "90px", height: "40px", borderRadius: "5px", marginLeft: "10px", color: "black", background: "#bfbfbf"}}>Reject</button>
         <button onClick={() => handleReply(noti.userPostId, auth._id, "accept")} style={{outline: "none", border: "none", width: "90px", height: "40px", borderRadius: "5px", marginLeft: "10px", color: "white", background: "#4169E1"}}>Accept</button>
        </div>
      </div>
      ) : null}
      {noti?.isRead === false ? (
      <Link to={`/${noti.postId}`} className="noti-box" onClick={(e) => handleClick(e, `/${noti.postId}`, noti._id)} key={noti._id}>
        {noti.type === "like" ? <img src={likeNofi} alt="like" width="90px" height="90px" /> : <img src={commentNofi} alt="like" width="90px" height="90px" />}
        <div className="noti-content">
         <p>{noti.message}</p>
        </div>
      </Link>) : (
        <Link to={`/${noti.postId}`} className="noti-box1" onClick={(e) => handleClick(e, `/${noti.postId}`, noti._id)} key={noti._id}>
        {noti.type === "like" ? <img src={likeNofi} alt="like" width="90px" height="90px" /> : <img src={commentNofi} alt="like" width="90px" height="90px" />}
        <div className="noti-content1">
         <p>{noti.message}</p>
        </div>
      </Link>
      )} 
    </div>
      ))}
    </div>
  )
}