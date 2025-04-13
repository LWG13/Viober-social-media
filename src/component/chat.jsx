import { Outlet, useParams, useNavigate, Link} from "react-router-dom";
import back from "./back.png"
import "./chat.scss";
import { Grid } from "@mui/material"
import viober from "./viober.png"
import { useQuery } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { useEffect } from "react"
const Chat = () => {
  const { conversationId } = useParams();
   const auth = useSelector(state => state.auth)

  const navigate = useNavigate()
  useEffect(() => {
    if(auth.userAuth === false) navigate("/login")
  }, [navigate, auth.userAuth])
  
  const isMobile = window.innerWidth <= 768;
  const { data } = useQuery({
    queryKey: ["chat"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/user/chat?userId=${auth._id}`)
  })
  return (
    <div className="chat-container">
      <div className="grid2">
      <div className="chatNav" >
       <img src={viober} alt="ligi" width="100px" />
      </div>
      </div>
      <div className="gridO2">
      <div className="gridDetail2">
       
      <div className="chat-wrapper">
        <Grid container spacing={1}>
     
        {(!isMobile || !conversationId) && <Grid item xs={12} sm={12} md={4} lg={4} > 
        <div className="chat-list-wrapper">
          <div className="chat-list">
            <div className="chatNav">
              <Link to="/" className="goback1">
              <img src={back} alt="go back" width="65px"/>
              </Link>
            </div>
            <h1>Chat</h1>
            <div className="chat-list__content">
              {data?.data?.map(chat => (
       <div>
                <Link key={chat._id} to={`/chat/${chat._id}`} className="chat-item">
                  <img src={chat.image1 === auth.image ? chat.image2 : chat.image1} />
                  <span>{chat.username1 === auth.username ? chat.username2 : chat.username1}</span>
                </Link>
        
       </div>
              ))}
         
            </div>
          </div>
        </div>
        </Grid>
        }
        {conversationId && <Grid item xs={12} sm={12} md={8} lg={8} style={{height: "100%"}}> <div className="chat-room-wrapper"> <Outlet /></div> </Grid>}

        </Grid>
  
      </div>
       
      </div>
      </div>
    </div>
  );
};


export default Chat;