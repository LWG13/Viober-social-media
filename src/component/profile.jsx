import "./profile.scss"
import { Grid } from "@mui/material"
import { Link, useParams, useNavigate } from "react-router-dom"
import setting1 from "./setting.png"
import axios from "axios"
import { useQuery } from "react-query"
import { CopyToClipboard } from "react-copy-to-clipboard";
import delete1 from "./delete.png"
import edit from "./edit.png"
import bookmark from "./bookmark.png"
import { likePost, dislikePost, followUser, deletePost, favPost, editPost, editAccount, friendRequest, deleteFriend} from "./ReactRedux/authSlice.js"
import { logoutUser } from "./ReactRedux/authSlice.js"
import { useState, useRef, useEffect } from "react"
import back from "./back.png"
import {useSelector, useDispatch} from "react-redux"
import likeBlue from "./likeBlue.png"
import dislikeBlue from "./dislikeBlue.png"
import CreatePost from "./createPost.jsx"
import like from "./like.png"
import dislike from "./dislike.png"
import link from "./link.png"
import favBlue from "./favBlue.png"
import dot3 from "./3dot.png"
import comment from "./comment.png"
export default function Profile() {
  const [isEdit, setIsEdit] = useState({})
  const [editDesc, setEditDesc] = useState(false)
   const toggleEdit = (postId) => {
    setIsEdit(prev => ({
      ...prev,
      [postId]:[!postId], // Chỉ thay đổi trạng thái của commentId được bấm
    }));
  };
  const [desc, setDesc] = useState("")
  const [content1, setContent1] = useState("")
  const [copied, setCopied] = useState(false)
  const dispatch= useDispatch()
  const id = useParams()
  console.log(id)
  const auth = useSelector(state => state.auth)
   const navigate = useNavigate()
  useEffect(() => {
    if(auth.userAuth === false) navigate("/login")
  }, [navigate, auth.userAuth])
  
 
  const { data } = useQuery({
   queryKey: ["profile", id.id],
    queryFn: () =>  axios.get(`${import.meta.env.VITE_BACKEND}/user/users/${id.id}`)
  })
  const { data: data1 } = useQuery({
     queryKey: "profile",
     queryFn: () =>  axios.get(`${import.meta.env.VITE_BACKEND}/post/posts/user/${id.id}`)
  })
  console.log(data1)
  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-EN', {
    day: 'numeric',
    month:"short",
    year:"numeric"
  });
};
  const [menu, setMenu] = useState(false)
  const { data : friend} = useQuery({
    queryKey:["friend"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/user/friend/list?userId=${data?.data?._id}&limit=6`),
    refetchInterval: 2000
  })
  const { data : isFriend} = useQuery({
    queryKey:["friend1"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/user/friend/isFriend/${auth._id}/${data?.data?._id}`),
    refetchInterval: 2000
  })
  console.log("is: ", isFriend)
  const settingRef = useRef(null)
  const handleEdit = (post) => {
    console.log(post)
    dispatch(editPost({ 
        _id: post._id,
       userId: post.userId,
       userImage: post.userImage,
       usernamePost: post.usernamePost,
       content: content1,
       type: post.type,
       media: post.media,
       createdAt: post.createdAt                              }))
    setIsEdit({})
  }
  useEffect(() => {
   let handler = (e) => {
     if(!settingRef.current.contains(e.target)){
       setMenu(false)
     }
   }
   document.addEventListener("mousedown", handler)
   return () => document.removeEventListener("mousedown",handler)
  })
   const dataUser ={
     username: auth.username,
     image: auth.image,
     _id: auth._id,
     email: auth.email,
     password: auth.password,
   }
  const handleEditDesc = () => {
       dispatch(editAccount({
           ...dataUser,
           desc: desc
        }))
        setEditDesc(false)
        setDesc("")
  }
  return(
    <div className="profile8">
            <div className="profile-box">  
              <div className="postNav" >
                <Link to="/" className="goback">
                 <img src={back} alt="go back"  />

                </Link>
                <img src={dot3} alt="dot" className="dot3" onClick={() => setMenu(true)} ref={settingRef}/>
                {menu ? <Setting setting={settingRef} dispatch={dispatch} /> : null}
                <br/><br/>
                 </div>
      <div className="group">
      <img src={data?.data?.image} alt="profile" width="130px" loading="lazy"/>
      <div className="profile-info" >
       <h2>{data?.data?.username}</h2>
       <p>{data?.data?.follower?.length} follower</p>
      </div>
        { data?.data?._id !== auth._id ?
        <div className="buttonGroup">
          {data?.data?.follower?.includes(auth._id) ?
          <button onClick={() => dispatch(followUser({followerId: auth._id, _id: data?.data?._id}))} className="are">Unfollow</button> : <button onClick={() => dispatch(followUser({followerId: auth._id, _id: data?.data?._id}))} className="notAre">Follow</button> }
          {isFriend?.data?.type === "notFriend" ?  <button className="notAre"  onClick={() => dispatch(friendRequest({user1: auth._id, user2: data?.data?._id, image1: auth.image, username1: auth.username, username2: data?.data?.username, image2: data?.data?.image}))}>Send Friend</button> : null }
          {isFriend?.data?.type === "friend request" ? <button className="are" >is Sending</button> : null}
          {isFriend?.data?.type === "friend" ? <button className="are" onClick={() => dispatch(deleteFriend({user1: auth._id, user2: data?.data?._id}))} >Unfriend</button> : null }
          </div>
         : null}
     </div>

     </div>
     <div className="profile-content">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={5} >
          <div className="info" >
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h2>Description</h2>
            {data?.data._id === auth._id ?
            <img src={edit} alt= "edit" width="50px" height="50px" onClick={() => setEditDesc(!editDesc)} /> : null}
          </div> 
            <div className="description" >
              {editDesc ? (<div style={{height: "100%"}}><textarea type="text" placeholder="Edit your description" value={desc} style={{width:"100%" ,height:"200px", border: "1px solid black", padding: "10px", borderRadius: "10px"}} onChange={e => setDesc(e.target.value)} /> <button onClick={() => handleEditDesc()} style={{width: "90px", height: "40px",outline: "none", border: "none", background: "#4169E1", color: "white", borderRadius: "5px" }}>Edit</button> </div> ): <Post content={data?.data?.desc} /> }
            <p>{data?.data?.desc?.length}</p>
            <br/>

            </div>
             <p style={{color: "red"}}>{auth.editError}</p>
            <hr/>
            <br/><br/>
            <div className="friend" >
              <h2>Friends</h2>
              <h2>{friend?.data?.length } Friends</h2>
              <div className="friend-list" >
               <Grid container spacing={2}>
                 {friend?.data?.map(fri => (
                <Grid item xs={4} sm={4} md={4} lg={4} >
                <Link to={`/profile/${fri.user1 === data?.data?._id ? fri.user2 : fri.user1}`} className="userFriend">
                  {fri.image1 === data?.data?.image ? <img src={fri.image2} /> : <img src={fri.image1}  /> }

                  { fri.username1 === data?.data?.username ? <p>{fri.username2} </p> : <p>{fri.username1}</p> }

                </Link>
                </Grid>
                ))}
               </Grid>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <div className="post-content" >
            {data?.data?._id === auth._id ? <CreatePost /> : null}
            {data1?.data.map(post => (
             <div style={{background: "white", display: "flex", flexDirection: "column", padding: "10px", marginTop: "10px", borderRadius: "5px",wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap" }}>
            <div className="post-posting"  key={post._id}> 
              <div className="post-user">
              <Link to={`/${post._id}`} style={{textDecoration: "none", display: "flex", width: "100%"}}>
                <img src={post.userImage} alt="profile" className="userImage" style={{borderRadius: "50%"}} />
                <div >
                <p>{post.usernamePost}</p>
                <span>{formatDate(post.createdAt)}</span>

                </div>
              </Link>
              {data?.data?._id === auth._id ?  (
            <div style={{display: "flex"}}>
              <img src={edit} alt="dot" className="dot"  style={{ float: "right"}} onClick={() => toggleEdit(post._id)} /> <img src={delete1} alt="dot" className="dot2"  style={{ float: "right"}} onClick={() => dispatch(deletePost({_id: post._id}))} />
            </div>
            ) : null}

               </div>
              <br/>
              </div>
            {isEdit[post._id] ? ( 
                 <div className="comment-input" >
                   <input type="text" placeholder="Write a comment" value={content1} onChange={e => setContent1(e.target.value)} />
    <button onClick={() => handleEdit(post)} >Edit</button>

                  </div>

    ) : <Post content={post.content} /> }


                          {post.type === "image" ?
               <img src={post.media} alt="" /> : null }
          {post.type === "video" ? <video src={post.media} controls /> : null}
              <br/>
              <hr/>
              <div className="post-feature">
              <div className="postNumber">
                <span>{post?.likes.length}</span>
                {post?.likes?.includes(auth._id) ? <img src={likeBlue} alt="like" width="25px" height="25px" onClick={() => dispatch(likePost({postId: post._id, userId: auth._id}))} /> : <img src={like} alt="like" width="25px" height="25px" onClick={() => dispatch(likePost({postId: post._id, userId: auth._id, userGetId: post.userId}))} /> }

              </div>
                <div className="postNumber">
                <span>{post.dislikes.length}</span>
               {post?.dislikes?.includes(auth._id) ? <img src={dislikeBlue} alt="dislike" width="22px" height="22px" onClick={() => dispatch(dislikePost({postId: post._id, userId: auth._id}))} /> : <img src={dislike} alt="dislike" width="22px" height="22px" onClick={() => dispatch(dislikePost({postId: post._id, userId: auth._id}))} />}

                </div>
               <img src={comment} alt="comment" width="25px" height="25px" />
               <CopyLinkButton postId={post._id} setCopied={setCopied} copied={copied} key={post._id} />
                { post?.favs?.includes(auth._id) ? <img src={favBlue} alt="bookmark" width="25px" height="25px" onClick={() => dispatch(favPost({postId: post._id, userFavId: auth._id, usernamePost: post.usernamePost, userImage: post.userImage, type: post.type, content: post.content, media: post.media}))} /> : <img src={bookmark} alt="bookmark" width="25px" height="25px" onClick={() => dispatch(favPost({postId: post._id, userFavId: auth._id, usernamePost: post.usernamePost, userImage: post.userImage, type: post.type, content: post.content, media: post.media}))} />}
              </div>
             </div>

            ))}
          <br/><br/><br/><br/>
          </div>  
        </Grid>
      </Grid>
     </div>
    </div>
  )
}

const Post = ({ content, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p >
        {isExpanded ? content : content?.slice(0, maxLength)}
        {content?.length > maxLength && (
          <p
            style={{ color: "grey", cursor: "pointer" }}
            onClick={handleToggle}
          >
            {isExpanded ? " Ẩn bớt" : "... Đọc thêm"}
          </p>
        )}
      </p>
    </div>
  );
};


const CopyLinkButton = ({ postId, setCopied, copied }) => {
  const postLink = `${window.location.origin}/post/${postId}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Ẩn tooltip sau 2s
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <CopyToClipboard text={postLink} onCopy={handleCopy}>
       <img src={link} alt="link" width="25px" height="25px"/>
      </CopyToClipboard>

      {copied && (
        <span className="tooltip">Copied!</span>
      )}
    </div>
  );
};

function Setting({setting, dispatch}) {

  return (

         <div className={`dropdownmenu10`} ref={setting}>
             <Link to="/fav" className="dropdownitem10" >
               <img src={favBlue} alt="overview" />
               <p to="/fav" className="link10" >Favourite</p>
             </Link>
           <Link to="/setting" className="dropdownitem10" >
              <img src={setting1} alt="overview" />
              <p  className="link10" >Setting</p>
            </Link>
            <div className="dropdownitem10" onClick={() => dispatch(logoutUser())} >
              <p  className="link10" >Log out</p>
            </div>

         </div>

  )
}