import "./profile.scss"
import { Grid } from "@mui/material"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "react-query"
import back from "./back.png"
import {useSelector} from "react-redux"
import send from "./send.png"
import image from "./image.png"
import video from "./video.png"
import postImage from "./postImage.png"
import like from "./like.png"
import dislike from "./dislike.png"
import link from "./link.png"
import bookmark from "./bookmark.png"
import comment from "./comment.png"
export default function Profile() {
  const id = useParams()
  console.log(id)
  const auth = useSelector(state => state.auth)
  const { data } = useQuery({
   queryKey: ["profile", id.id],
    queryFn: () =>  axios.get(`${import.meta.env.VITE_BACKEND}/user/users/${id.id}`)
  })
  console.log(data)
  return(
    <div className="profile8">
            <div className="profile-box">  
              <div className="postNav" >
                <Link to="/" className="goback">
                 <img src={back} alt="go back"  />
                </Link>
                 </div>
      <div className="group">
      <img src={data?.data.image} alt="profile" width="130px" loading="lazy"/>
      <div className="profile-info" >
       <h2>{data?.data.username}</h2>
       <p>13 Follower</p>
      </div>
        <div className="buttonGroup">
          <button >Chat</button>
           <button >Send Friend</button>
          </div>
     </div>
      
     </div>
     <div className="profile-content">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={5} >
          <div className="info" >
            <h2>Description</h2>
            <div className="description" >
              <p>{data?.data.desc}</p>
            </div>
            <hr/>
            <div className="friend" >
              <h2>Friends</h2>
              <h3>134 Friends</h3>
              <div className="friend-list" >
               <Grid container spacing={2}>
                <Grid item xs={4} sm={4} md={4} lg={4} >
                <div>
                 <div className="userFriend" >
                 </div>
                 <p>LWG13</p>
                </div>
                </Grid>
                 <Grid item xs={4} sm={4} md={4} lg={4} >
                <div>
                  <div className="userFriend" >

                  </div>
                   <p>LWG13</p>
                </div>
                 </Grid>
                 <Grid item xs={4} sm={4} md={4} lg={4} >
                <div>
                  <div className="userFriend" >

                  </div>
                   <p>LWG13</p>
                </div>
                 </Grid>
                 <Grid item xs={4} sm={4} md={4} lg={4} >
                 <div>
                  <div className="userFriend" >

                  </div>
                   <p>LWG13</p>
                 </div>
                 </Grid>
                 <Grid item xs={4} sm={4} md={4} lg={4} >
                <div>
                  <div className="userFriend" >

                  </div>
                   <p>LWG13</p>
                 </div>
                 </Grid>
                 <Grid item xs={4} sm={4} md={4} lg={4} >
              <div>
                  <div className="userFriend" >

                  </div>
                   <p>LWG13</p>
              </div>
                 </Grid>
               </Grid>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} >
          <div className="post-content">
            <div className="post-create" >
             <div className="post-user">
              <img src={auth.image} alt="profile" />
              <h3>{auth.username}</h3>
             </div>
              <br/><br/>
             <div>
              <input type="text" placeholder="What's on your mind?" className="postInput"/>
              <span><img src={send} alt="send" className="send" /></span>
             </div>
               <br/>
              <div className="post-image-video" >
               <img src={image} alt="image" width="40px"/>
               <img src={video} alt="image" width="60px"/>
              </div>
            </div>
            <div className="post-posting" >
              <div className="post-user">
                <img src={auth.image} alt="profile" />
                <div >
                <h3>{auth.username}</h3>
                <span>24 June 2025, 2025</span>
                
                </div>
                
              
               </div>
              <br/>
               <p>Last day is the best day in my life!</p>
               <img src={postImage} alt="" />
              <br/>
              <hr/>
              <div className="post-feature">
              <div className="postNumber">
               <span>24</span>
               <img src={like} alt="like" width="30px" />
              </div>
               <img src={dislike} alt="dislike" width="30px" />
               <img src={comment} alt="comment" width="30px" />
               <img src={link} alt="link" width="30px" />
                <img src={bookmark} alt="bookmark" width="30px" />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
     </div>
    </div>
  )
}