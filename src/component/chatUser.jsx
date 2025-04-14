import { useParams, Link } from "react-router-dom";
import "./chatUser.scss";
import back from "./back.png"
import { useQuery } from "react-query"
import axios from "axios"
import { useSelector, useDispatch} from "react-redux"
import send from "./send.png"
import { useState, useEffect, useRef } from "react"
import edit from "./edit.png"
import delete1 from "./delete.png"
import { createChat, editChat, deleteChat } from "./ReactRedux/authSlice.js"
function ChatUser() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { conversationId } = useParams();
  
  
  const { data } = useQuery({
    queryKey: ["chat", conversationId],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/user/chat/${conversationId}`)
  })
  const { data: message } = useQuery({
    queryKey: ["message", conversationId],
    queryFn: () => axios.get(`${import.meta.env.VITE_BACKEND}/user/chat/message/${conversationId}`),
    refetchInterval: 4000
    
  })
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-EN', {
      day: 'numeric',
      month:"short",
      year:"numeric"
    });
  };
  const [liveMessages, setLiveMessages] = useState([])

  useEffect(() => {
    if (message?.data) {
      setLiveMessages(message.data)
    }
  }, [message])

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
  
  const handleSubmit = () => {
  const messageData = {
    userPost: auth._id,
    message: content,
    username: auth.username,
    image: auth.image,
    type,
    media,
    roomId: conversationId,
    createdAt: Date.now()
  };

  dispatch(createChat(messageData));
  setContent("");
  setMedia("");
};
  const [editText, setEditText] = useState("")
  const [edit1, setEdit] = useState({})
 const toggleEdit =(editId) => {
setEdit(prev => ({
    ...prev,
    [editId]: !prev[editId], // Chỉ thay đổi trạng thái của commentId được bấm
  }));
};
  const handleEdit = (editId, editTex) => {
    dispatch(editChat({_id: editId, message: editTex}))
    setEdit({})
    setEditText("")
  }
  return (
    <div className="chat-room">
      <div className="chat-room-header">
      <Link to="/chat" className="back2" >
       <img src={back} alt="back" width="40px" />
        
      </Link>
        <img src={data?.data?.image1 === auth.image ? data?.data?.image2 : data?.data?.image1} alt="back" style={{marginLeft: "10px" }}/>
        <p style={{marginLeft: "10px"}}>{data?.data?.username1 === auth.username ? data?.data?.username2 : data?.data?.username1}</p>
      </div>
    <div className="chat-room-body" style={{height: `${media ? "79.5vh" : "85.5vh"}`}}>
      <div className="messages" >
        {liveMessages?.map(chat => (
        <div className={`chat-box ${chat.userPost === auth._id ? "right1" : "left1"}`} key={chat._id}>
          <img src={chat.image} alt="avatar" className="profile" />
          <div className="chat-box-content">
            {chat.userPost === auth._id ? null :  <h2>{chat.username}</h2>}
            <div className="chat-box-content-text">
              {edit1[chat._id] ? null : <Chat content={chat.message} />}
              {edit1[chat._id] && (
           <div className="edit-input" >
           <input type="text" value={editText}  onChange={e => setEditText(e.target.value)} />
             <button onClick={() => handleEdit(chat._id, editText)}>Edit</button>
           </div>
              )}
            </div>
            {chat.type === "image" ? <img src={chat.media} alt="media" className="img3" /> : null}
            {chat.type === "video" ? <video src={chat.media} controls className="video3"/> : null}
            <span>{formatDate(chat.createdAt)}</span>
            <br/>
             {chat.userPost === auth._id ? (
          <div>
              <img src={edit} alt="edit" width="27px" onClick={() => toggleEdit(chat._id)} />
          <img src={delete1} alt="edit" width="27px" onClick={() => dispatch(deleteChat({_id: chat._id}))} />
          </div>
            ) : null }

            
          </div>
          
        </div>
        ))}
      </div>
    </div>
  <div className="chat-room-down" style={{height: `${media ? "180px" : "auto"}`}}>
    {media && (
          <div className="previow22">
            {type === "image" ? (
              <img src={media} alt="preview" className="ing22" />
            ) : (
              <video src={media} controls className="vineo22"/>
            )}
          </div>
        )}
      <div className="chat-room-input">
        

               <div className="post-image-video" >

              <div className="upload-container">
                <label className="upload-btn">
                   <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      </label>
              </div>
              </div>
           <div className="chat-room-input1">
               <input type="text" placeholder="Write a message" value={content} onChange={e => setContent(e.target.value)} />
                <button><img src={send} alt="send" className="send"  onClick={() => handleSubmit()} /></button>
           </div>  
      
           </div>
  </div>

      </div>
  
  )
}

export default ChatUser;

const Chat = ({ content, maxLength = 120 }) => {
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
