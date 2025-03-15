import "./homePage.scss"
import {useSelector, useDispatch} from "react-redux"
import { Link } from "react-router-dom"
import postImage from "./postImage.png"
import likeBlue from "./likeBlue.png"
import { likePost, dislikePost } from "./ReactRedux/authSlice.js"
import like from "./like.png"
import dislike from "./dislike.png"
import { useState } from "react"
import link from "./link.png"
import bookmark from "./bookmark.png"
import comment from "./comment.png"
import { useQuery } from "react-query"
import axios from "axios"
import CreatePost from "./createPost.jsx"
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { data } = useQuery({
    queryKey: ["post"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/post/posts`),
    refetchInterval: 3000,
    refetchOnWindowFocus: true,
  })
  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-EN', {
    day: 'numeric',
    month:"short",
    year:"numeric"
  });
};
  
  
  
  return(
    <div className="homePage" >
       <CreatePost/>     
      {data?.data.map(post => (
        <div style={{background: "white", display: "flex", flexDirection: "column", padding: "10px", marginTop: "10px", borderRadius: "5px",wordWrap: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap" }}>
            <Link to={`/${post._id}`} className="post-posting"  key={post._id}> 
              <div className="post-user">
                <img src={post.userImage} alt="profile" />
                <div >
                <h3>{post.usernamePost}</h3>
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
                <span>{post?.likes.length}</span>
                <img src={like} alt="like" width="25px" height="25px" onClick={() => dispatch(likePost({postId: post._id, userId: auth._id}))} /> 
              </div>
                <div className="postNumber">
                <span>{post.dislikes.length}</span>
               <img src={dislike} alt="dislike" width="22px" height="22px" onClick={() => dispatch(dislikePost({postId: post._id, userId: auth._id}))} />
                </div>
               <img src={comment} alt="comment" width="25px" height="25px" />
               <CopyLinkButton postId={post._id} setCopied={setCopied} copied={copied} key={post._id} />
                <img src={bookmark} alt="bookmark" width="25px" height="25px" />
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
