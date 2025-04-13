import "./searchResult.scss"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRef, useEffect} from 'react';
import dislikeBlue from "./dislikeBlue.png"
import likeBlue from "./likeBlue.png"
import { likePost, dislikePost, favPost} from "./ReactRedux/authSlice.js"
import like from "./like.png"
import dislike from "./dislike.png"
import { useState } from "react"
import link from "./link.png"
import bookmark from "./bookmark.png"
import bookmarkBlue from "./favBlue.png"
import comment from "./comment.png"
import back from "./back.png"

export default function SearchResult() {
  const auth = useSelector(state => state.auth)
  const [copied, setCopied] = useState(false)
  const dispatch = useDispatch()
   const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-EN', {
    day: 'numeric',
    month:"short",
    year:"numeric"
  });
};
  return(
    <div className="searchResult" >
      <div className="postNav" >
          <Link to="/" className="goback" >
           <img src={back} alt="go back" width="50px" />
          </Link>

           </div>
      <h1>Search Result</h1>
      {auth?.userResult?.map(user => (
      <div to={`/profile/${user._id}`} className="userResult" >
        <Link to={`/profile/${user._id}`} >
         <img src={user.image} alt="avatar" /> 
        </Link>  
         <div className="userDetail" >
          <h2>{user.username}</h2>
          
         </div>
      </div>
      ))}
      {auth?.postResult?.map(post => (
        <div style={{background: "white", display: "flex", flexDirection: "column", padding: "10px", marginTop: "10px", borderRadius: "5px",wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap" }}>
            <Link to={`/${post._id}`} className="post-posting"  key={post._id}> 
              <div className="post-user">
                <img src={post.userImage} alt="profile" className="userImage" />
                <div >
                <p>{post.usernamePost}</p>
                <span>{formatDate(post.createdAt)}</span>
                
                </div>
                
               </div>
              <br/>
              </Link>
              <Post content={post.content} />
                          {post.type === "image" ?
               <img src={post.media} alt="" /> : null }
          {post.type === "video" ? <video src={post.media} controls /> : null}
              <br/>
              <hr/>
              <div className="post-feature">
              <div className="postNumber">
                <span>{post?.likes?.length}</span>
                {post?.likes?.includes(auth._id) ? <img src={likeBlue} alt="like" width="25px" height="25px" onClick={() => dispatch(likePost({postId: post._id, userId: auth._id}))} /> : <img src={like} alt="like" width="25px" height="25px" onClick={() => dispatch(likePost({postId: post._id, userId: auth._id, userGetId: post.userId}))} /> }
 
              </div>
                <div className="postNumber">
                <span>{post.dislikes?.length}</span>
               {post?.dislikes?.includes(auth._id) ? <img src={dislikeBlue} alt="dislike" width="22px" height="22px" onClick={() => dispatch(dislikePost({postId: post._id, userId: auth._id}))} /> : <img src={dislike} alt="dislike" width="22px" height="22px" onClick={() => dispatch(dislikePost({postId: post._id, userId: auth._id}))} />}

                </div>
               <img src={comment} alt="comment" width="25px" height="25px" />
               <CopyLinkButton postId={post._id} setCopied={setCopied} copied={copied} key={post._id} />
                { post?.favs?.includes(auth._id) ? <img src={bookmarkBlue} alt="bookmark" width="25px" height="25px" onClick={() => dispatch(favPost({postId: post._id, userFavId: auth._id, usernamePost: post.usernamePost, userImage: post.userImage, type: post.type, content: post.content, media: post.media}))} /> : <img src={bookmark} alt="bookmark" width="25px" height="25px" onClick={() => dispatch(favPost({postId: post._id, userFavId: auth._id, usernamePost: post.usernamePost, userImage: post.userImage, type: post.type, content: post.content, media: post.media}))} />}
              </div>
        
        </div>
         ))}
    </div>
  )
}

const Post = ({ content, maxLength = 120 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p >
        {isExpanded ? content : content.slice(0, maxLength)}
        {content.length > maxLength && (
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
