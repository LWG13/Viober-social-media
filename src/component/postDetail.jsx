import "./postDetail.scss"
import back from "./back.png"
import {useSelector, useDispatch} from "react-redux"
import { useParams, Link } from "react-router-dom"
import like from "./like.png"
import dislike from "./dislike.png"
import link from "./link.png"
import bookmark from "./bookmark.png"
import comment1 from "./comment.png"
import { useQuery } from "react-query"
import axios from "axios"
import { likePost, dislikePost, commentPost, replyComment } from "./ReactRedux/authSlice.js"


import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"; 

export default function PostDetail() {
  const [copied, setCopied] = useState(false)
  const [reply, setReply] = useState({})
  const toggleReply = (commentId) => {
  setReply(prev => ({
    ...prev,
    [commentId]: !prev[commentId], // Chỉ thay đổi trạng thái của commentId được bấm
  }));
};
  const [content1, setContent1] = useState("")
  const id = useParams()
  console.log(id.postId)
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { data } = useQuery({
    queryKey: ["post", id.postId],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/post/posts/${id.postId}`),
    refetchOnWindowFocus: true,
  })
  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-EN', {
    day: 'numeric',
    month:"short",
    year:"numeric"
  });
};
  const [content, setContent] = useState("")
  const [media, setMedia] = useState("")
  const [type, setType] = useState("")
  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  // Lấy MIME type và đuôi file
  const mimeType = file.type;
  const fileName = file.name;
  const extension = fileName.split(".").pop().toLowerCase();

  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

  if (mimeType.startsWith("image/") && imageExtensions.includes(extension)) {
    setType("image")
  } else if (mimeType.startsWith("video/") && videoExtensions.includes(extension)) {
    setType("video")
  } else {
    console.log("File không hợp lệ");
    alert("Chỉ chấp nhận hình ảnh hoặc video!");
    return;
  }
  // Chuyển file sang Base64
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    setMedia(reader.result); // Lưu file dưới dạng Base64
  
 }
 
};
  const { data : comment } = useQuery({
    queryKey: ["comment", id.postId],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/post/posts/comment/${id.postId}`),
    refetchOnWindowFocus: true,
  })
  const userData = {
    userId: auth._id,
    usernamePost: auth.username,
    userImage: auth.image,
    type,
    content,
    media: media,
    postId: id.postId
  }
  const [isReplying, setIsReplying] = useState(false);

const handleReply = async (id) => {
  if (!content1.trim() || isReplying) return; // Nếu content rỗng hoặc đang gửi, không làm gì

  setIsReplying(true); // Đánh dấu đang gửi request

  const values = {
    _id: id, // Lấy từ comment cần reply
    userId: auth._id,
    usernamePost: auth.username,
    userImage: auth.image,
    content: content1,
  };
  try{
 dispatch(replyComment(values))
    setContent1(""); // Reset nội dung input
  } catch (error) {
    console.log("Reply failed:", error);
  } finally {
    setIsReplying(false); // Cho phép gửi request tiếp
  }
};
  
  const handleSubmit = () => {
    dispatch(commentPost(userData))
    setContent("")
    setMedia("")
  }
  console.log(userData)
  console.log(comment?.data)
  console.log(data)
  return(
    <div className="postDetail">
    
      <div className="post-posting"  key={data?.data._id}>
        <div className="postNav" >
          <Link to="/" className="goback" >
           <img src={back} alt="go back" width="50px" />
          </Link>

           </div>
           <br/><hr style={{color: "black", background: "black" }} />
              <div className="post-user">
                <img src={data?.data.userImage} alt="profile" />
                <div >
                <h3>{data?.data.usernamePost}</h3>
                <span>{formatDate(data?.data.createdAt)}</span>
                
                </div>
                
              
               </div>
              <Post content={data?.data.content} />
              {data?.data.type === "image" ?
               <img src={data?.data.media} alt="" /> : null }
          {data?.data.type.type === "video" ? <video src={data?.data.media} controls /> : null}
        <br/>
              <hr/>
              <div className="post-feature">
              <div className="postNumber">
                <span>{data?.data?.likes?.length}</span>
                <img src={like} alt="like" width="25px" height="25px" onClick={() => dispatch(likePost({postId: data?.data._id, userId: auth._id}))} /> 
              </div>
                <div className="postNumber">
                <span>{data?.data?.dislikes?.length}</span>
               <img src={dislike} alt="dislike" width="25px" height="25px" onClick={() => dispatch(dislikePost({postId: data?.data._id, userId: auth._id}))} />
                </div>
               
               <img src={comment1} alt="link" width="25px" height="25px" />
                <CopyLinkButton postId={data?.data._id} setCopied={setCopied} copied={copied} />
                <img src={bookmark} alt="bookmark" width="25px" height="25px" />
                
              </div>
            <br/>
            <hr/>
            <div className="post-comment">
             <h2>Comments</h2>
              <div className="comment-input">
               <input type="text" placeholder="Write a comment" value={content} onChange={e => setContent(e.target.value)} />
                <button onClick={handleSubmit}>Post</button>
              </div>
              <div className="post-image-video" >
              
              <div className="upload-container">
                <label className="upload-btn">
                   <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      </label>
              </div>
              </div>
              {media && (
        <div className="preview">
          {type === "image" ? (
            <img src={media} alt="preview" />
          ) : (
            <video src={media} controls />
          )}
                   </div>
        )}
          <br/>
              {comment?.data?.map(comment =>  (
               <div className="comment-item" key={comment._id}>
                 <img src={comment.userImage} alt="image" />
               <div className="comment-box" >
               <div className="comment-chat" >
                <h2>{comment.usernamePost}</h2>
                 <Post content={comment.content} />
               </div>
               <div className="comment-feature" >
                <span>{formatDate(comment.createdAt)}</span>
                <button onClick={() => toggleReply(comment._id)} >Reply</button>
               </div>
                 
                 {reply[comment._id] && ( 
                 <div className="comment-input" >
                   <input type="text" placeholder="Write a comment" value={content1} onChange={e => setContent1(e.target.value)} />
                    <button onClick={handleReply(comment._id)} >Post</button>
                  </div>
    )}
                 {comment.replies?.map(com => (
                 <div className="comment-item" key={com._id}>
                    <img src={com.userImage} alt="image" />
                  <div className="comment-box" >
                  <div className="comment-chat1" >
                   <h2>{com.usernamePost}</h2>
                    <Post content={com.content} />
                  </div>
                  <div className="comment-feature" >
                   <span>{formatDate(com.createdAt)}</span>
                   
                  </div>
                  </div>
                 </div>
                 
                ))}
               </div>
               </div>
              ))}

        
            </div>
            </div>
            
      
    </div>
  )
}
const Post = ({ content, maxLength = 120 }) => {
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
