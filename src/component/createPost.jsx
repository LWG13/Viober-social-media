import { useSelector, useDispatch } from "react-redux"
import send from "./send.png"
import { useForm, Form } from "react-hook-form"
import "./homePage.scss"
import { createPost } from "./ReactRedux/authSlice"
import { useState } from "react"

export default function CreatePost() {
  const { register, control, formState: { errors, isSubmitting, isDirty } } = useForm();
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
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
  const handleSubmit = (e) => {
    dispatch(createPost(userData))
    setContent("")
    setMedia("")
  }
  const userData = {
    userId: auth._id,
    usernamePost: auth.username,
    userImage: auth.image,
    type,
    content,
    media: media,
  }
  console.log(userData)
  
  return(
    <div className="post-create" >
             <div className="post-user">
              <img src={auth.image} alt="profile" />
              <h3>{auth.username}</h3>
             </div>
              <br/><br/>
          <Form action ="" method="post"  control={control} onSubmit={handleSubmit}>
             <div className="postInput">
              <input type="text" placeholder="What's on your mind?" className="postInput" {...register("content", { required: {value: true, message: "content is required" }})} onChange={(e => setContent(e.target.value))} value={content} />
              <button><img src={send} alt="send" className="send" onClick={handleSubmit} /></button>
             </div>
               <br/>
              <div className="post-image-video" >
              
              <div className="upload-container">
                <label className="upload-btn">
                   <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      </label>
              </div>
              </div>
               </Form>
      {media && (
        <div className="preview">
          {type === "image" ? (
            <img src={media} alt="preview" />
          ) : (
            <video src={media} controls />
          )}
        </div>
      )}
            </div>
  )
}