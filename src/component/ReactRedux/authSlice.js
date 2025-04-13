import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import { toast } from "react-toastify"
const initialState= {
  token: localStorage.getItem(import.meta.env.VITE_TOKEN),
  username: "",
  email: "",
  password: "",
  _id: "",
  banner: "",
  image: "",
  desc: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userAuth: false,
  emailReset: "",
  firstAuth: false,
  secondAuth: false,
  successReset: false,
  createPostSuccess: false,
  likePostSucces: false,
  dislikePostSuccess: false,
  commentSuccess: false,
  editError: "",
  editedProfile: false,
  searchPending: false,
  searchResult: [],
  searchError: "",
  searchSuccess: false
}

export const registerUser = createAsyncThunk("auth/signup", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/signup`, {
       username: values.username,
       email: values.email,
       password: values.password,
       image: values.image,
       desc: values.desc,
     })
          localStorage.setItem(import.meta.env.VITE_TOKEN, response.data)
     return response.data
   } catch (error) {
      return rejectWithValue(error.response.data)
   }
  
})
export const createPost = createAsyncThunk("auth/create", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/post/create`, {
       userId: values.userId,
       usernamePost: values.usernamePost,
       userImage: values.userImage,
       content: values.content,
       type: values.type,
       media: values.media
     })
     return response.data
   } catch (error) {
      return rejectWithValue(error.response.data)
   }

})
export const contactViober = createAsyncThunk("auth/contact", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/contact`, {
       userId: values.userId,
       message: values.message,
       
     })
     return response.data
   } catch (error) {
      return rejectWithValue(error.response.data)
   }

})
export const emailAuth = createAsyncThunk("auth/email", async (values, {rejectWithValue}) => {
   try{
      const data = await axios.post(`${import.meta.env.VITE_BACKEND}/user/verify`, {
       email: values.email,

     })
    return data.data
   }catch(err){
     console.log(err.response.data)
     return  rejectWithValue(err.response.data)
   }
})
export const otpAuth = createAsyncThunk("auth/otp", async (values, {rejectWithValue}) => {
   try{
      const data = await axios.post(`${import.meta.env.VITE_BACKEND}/user/verify/otp`, {
       otp: values

     })
    return data.data
   }catch(err){
     console.log(err.response.data)
     return  rejectWithValue(err.response.data)
   }
})
export const resetPassword = createAsyncThunk("auth/reset", async (values, {rejectWithValue}) => {
   try{
      const data = await axios.post(`${import.meta.env.VITE_BACKEND}/user/verify/password`, {
       password: values.password,
       email: values.email
     })
    return data.data
   }catch(err){
     console.log(err.response.data)
     return  rejectWithValue(err.response.data)
   }
})
export const favPost = createAsyncThunk("auth/fav", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/post/fav`, {
       userFavId: values.userFavId,
       postId: values.postId,
       usernamePost: values.usernamePost,
       userImage: values.userImage,
       content: values.content,
       type: values.type,
       media: values.media,
       
     })
     return response.data
   } catch (error) {
      return rejectWithValue(error.response.data)
   }

})

export const likePost = createAsyncThunk("auth/like", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/like/${values.postId}`, {
       postId: values.postId,
       userId: values.userId,
       userGetId: values.userGetId
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)
        
   }

})
export const nofiIsRead = createAsyncThunk("auth/nofi", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/nofication/${values}`, {
       _id: values
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const friendRequest = createAsyncThunk("auth/request", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/friend`, {
       user1: values.user1,
       user2: values.user2,
       image1: values.image1,
       username1: values.username1,
       image2: values.image2,
       username2: values.username2       
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const replyFriend = createAsyncThunk("auth/reply", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/friend/reply`, {
       user1: values.user1,
       user2: values.user2,
       username1: values.username1,
       username2: values.username2,
       image1: values.image1,
       image2: values.image2,
       reply: values.reply
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const deleteFriend = createAsyncThunk("auth/unfriend", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/user/friend/${values.user1}/${values.user2}/delete`)
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})

export const deletePost = createAsyncThunk("auth/deletePost", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/post/posts/delete/${values._id}`, {
       _id: values._id,
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const editPost = createAsyncThunk("autheditPost", async (values, {rejectWithValue}) => {
   try{
     
           const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/posts/put/${values._id}`, {
       _id: values._id,
       userId: values.userId,
       userImage: values.userImage,
       usernamePost: values.usernamePost,
       content: values.content,
       type: values.type,
       media: values.media,
       createdAt: values.createdAt
     })
     console.log(response.data)
     localStorage.setItem(import.meta.env.VITE_TOKEN, response.data)
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})

export const followUser = createAsyncThunk("auth/follow", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/user/follower/${values._id}`, {
       _id: values._id,
       followerId: values.followerId
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const commentPost = createAsyncThunk("auth/comment", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/post/posts/comment`, {
       postId: values.postId,
       userGetId: values.userGetId,
       userId: values.userId,
       usernamePost: values.usernamePost,
       userImage: values.userImage,
       content: values.content,
       type: values.type,
       media: values.media
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})

export const createChat = createAsyncThunk("auth/chat", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/chat/message`, {
       userPost: values.userPost,
       username: values.username,
       image: values.image,
       message: values.message,
       type: values.type,
       roomId: values.roomId,
       media: values.media
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const editChat = createAsyncThunk("auth/editchat", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/user/chat/message/edit/${values._id}`, {
       _id: values._id,
       message: values.message
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const deleteChat = createAsyncThunk("auth/deleteChat", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/user/chat/message/delete/${values._id}`, {
       _id: values._id,
      })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})

export const replyComment = createAsyncThunk("auth/reply", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/comment/reply/${values._id}`, {
       _id: values._id,
       userId: values.userId,
       usernamePost: values.usernamePost,
       userImage: values.userImage,
       content: values.content,
     })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const editAccount = createAsyncThunk("auth/account", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/user/edit-account/${values._id}`, {
       _id: values._id,
       email: values.email,
       password: values.password,
       username: values.username,
       image: values.image,
       desc: values.desc,
     })
     localStorage.setItem(import.meta.env.VITE_TOKEN, response.data)
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const deleteComment = createAsyncThunk("auth/reply", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/post/posts/comment/delete/${values.commentId}`, {
       commentId: values.commentId,
      })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const deleteReply = createAsyncThunk("auth/reply", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/posts/comment/reply/delete`, {
       commentId: values.commentId,
       replyId: values.replyId
        })
     return response.data
   } catch (error) {
     console.log(error.response.data)
      return rejectWithValue(error.response.data)

   }

})
export const dislikePost = createAsyncThunk("auth/dislikelike", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/dislike/${values.postId}`, {
       postId: values.postId,
      userId: values.userId
     })
     return response.data
   } catch (error) {
      return rejectWithValue(error.response.data)
   }

})
export const loginUser = createAsyncThunk("auth/login", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/user/login`, {
       email: values.email,
       password: values.password,
     })
     localStorage.setItem(import.meta.env.VITE_TOKEN, response.data)

     return response.data
   }catch(err){
     console.log(err.response.data)
     return  rejectWithValue(err.response.data)
   }
})

export const googleLogin = createAsyncThunk("auth/googleLogin", async (_, { rejectWithValue }) => {
  try{
        // Mở popup Google và lấy token từ Firebase
      const result =  await signInWithPopup(auth, provider)
                             console.log(result.user)
      const token = await result.user.getIdToken();

        // Gửi token lên backend để lấy JWT
        const res = await axios.post(`${import.meta.env.VITE_BACKEND}/user/google-login`, { token });
        localStorage.setItem(import.meta.env.VITE_TOKEN, res.data)

        return res.data
      
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi đăng nhập");
    }
});
export const searchViober = createAsyncThunk("auth/search", async (values, {rejectWithValue}) => {
   try{
      const data = await axios.post(`${import.meta.env.VITE_BACKEND}/user/search`, {
       search: values,
     })
     return data.data
   }catch(err){
     console.log(err.response.data)
     return  rejectWithValue(err.response.data)
   }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
        loadUser(state, action) {
      const token = state.token

      if(token) {
        const user = jwtDecode(token)
        return {
          ...state,
          username: user.username,
          email: user.email,
          banner: user.banner,
          password: user.password,
          _id: user._id,
          image: user.image,
          desc: user.desc,
          userAuth: true,
        }
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem(import.meta.env.VITE_TOKEN) 
      return {
        ...state,
        token: "",
        username: "",
        email: "",
        _id: "",
        banner: "",
        password: "",
        image: "",
        desc: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userAuth: false,

      }
    }, 
    resetSearchSuccess(state,action) {
      return {
        ...state,
        searchSuccess: false
      }
    }
  },
  extraReducers: (builder) => {
       builder.addCase(registerUser.fulfilled, (state,action) => {
      if(action.payload) {
        const user = jwtDecode(action.payload)

      return {
        ...state,
        token: action.payload,
        username: user.username,
        email: user.email,
        password: user.password,
        banner: user.banner,
        _id: user._id,
        image: user.image,
        desc: user.desc,
        registerStatus: "success",
        userAuth: true
      }
      }else {
        return state
      }
    })
        builder.addCase(registerUser.rejected, (state,action) => {
      return {...state, registerStatus: "reject", registerError: action.payload}
    })
    builder.addCase(loginUser.pending, (state, action) => {
      return {...state, registerStatus: "pending"}
    })
      builder.addCase(loginUser.fulfilled, (state,action) => {
      if(action.payload) {
        const user = jwtDecode(action.payload)

      return {
        ...state,
        token: action.payload,
        username: user.username,
        email: user.email,
        _id: user._id,
        banner: user.banner,
        password: user.password,
        image: user.image,
        desc: user.desc,
        loginStatus: "success",
        registerStatus: "",
        userAuth: true
      }
      }else {
        return state
      }
    })
    builder.addCase(loginUser.rejected, (state,action) => {
      return {...state, loginStatus: "reject", loginError: action.payload}
    })
    
    builder.addCase(googleLogin.fulfilled, (state, action) => {
        if(action.payload) {
          const user = jwtDecode(action.payload)

        return {
          ...state,
          token: action.payload,
          username: user.username,
          email: user.email,
          _id: user._id,
          banner: user.banner,
          password: user.password,
          image: user.image,
          desc: user.desc,
          loginStatus: "success",
          registerStatus: "",
          userAuth: true
        }
        }else {
          return state
        }
            })
    builder.addCase(createPost.fulfilled, (state,action) => {
      return {...state, createPostSuccess: true}
    })
    builder.addCase(likePost.fulfilled, (state,action) => {
      return {...state, likePostSuccess: true}
    })
    builder.addCase(favPost.fulfilled, (state,action) => {
              toast.success(`Favourite Post successfully`, {
          position: "top-right"
        })
      return {...state, likePostSuccess: true}
    })
    builder.addCase(deletePost.fulfilled, (state,action) => {
              toast.success(`Delete Post successfully`, {
          position: "top-right"
        })
      return {...state, likePostSuccess: true}
    })
    builder.addCase(editPost.fulfilled, (state,action) => {
              toast.success(`Edit Post successfully`, {
          position: "top-right"
        })
      return {...state, likePostSuccess: true}
    })
    builder.addCase(editAccount.fulfilled, (state,action) => {
       toast.success(`Edit account successfully`, {
          position: "top-right"
        })
      if(action.payload) {
        const user = jwtDecode(action.payload)

      return {
        ...state,
        token: action.payload,
        username: user.username,
        email: user.email,
        _id: user._id,
        banner: user.banner,
        password: user.password,
        image: user.image,
        desc: user.desc,
        
      }
      }else {
        return state
      }
    })

    builder.addCase(dislikePost.fulfilled, (state,action) => {
      return {...state, dislikePostSuccess: true}
    })
    builder.addCase(replyComment.fulfilled, (state,action) => {
      return {...state, commentSuccess: true}
    })
        builder.addCase(emailAuth.fulfilled, (state,action) => {

      return {
        ...state,
        firstAuth: true,
        emailReset: action.payload,
        registerStatus: ""
      }

    })

    builder.addCase(emailAuth.pending, (state,action) => {

      return {
        ...state,
        registerStatus: "pending"
      }

    })
    builder.addCase(otpAuth.rejected, (state,action) => {
      return {...state,  error: action.payload}
    }) 
    builder.addCase(otpAuth.pending, (state,action) => {

      return {
        ...state,
       registerStatus: "pending"
      }

    })
    builder.addCase(otpAuth.fulfilled, (state,action) => {

      return {
        ...state,
        secondAuth: true,
        registerStatus: ""

      }

    })
    builder.addCase(emailAuth.rejected, (state,action) => {
      return {...state,  error: action.payload}
    })
        builder.addCase(resetPassword.fulfilled, (state,action) => {

      return {
        ...state,
        firstAuth: false,
        secondAuth: false,
        successReset: true,
        registerStatus: ""
      }
    })
    builder.addCase(resetPassword.rejected, (state,action) => {

      return {
        ...state,
        error: "invalid password",
        registerStatus: "reject"
      }
    })
    builder.addCase(editAccount.rejected, (state,action) => {

      return {
        ...state,
        editError: action.payload
      }
    })
builder.addCase(editAccount.pending, (state,action) => {

      return {
        ...state,
        editError: ""
      }

    })
       builder.addCase(searchViober.pending, (state, action) => {
      return {
        ...state,
        searchPending: true,
        searchSuccess: false,
      }
    })
    builder.addCase(searchViober.fulfilled, (state,action) => {
      if(action.payload) {


      return {
        ...state,
        postResult: action.payload.post,
        userResult: action.payload.user,
        searchPending: false,
        searchSuccess: true
      }
      }else {
        return state
      }
    })
  builder.addCase(nofiIsRead.fulfilled, (state, action) => {
      return {
        ...state,
        dislikePostSuccess: false,
      }
    })

  } 
})

export const {loadUser, logoutUser, resetSearchSuccess} = authSlice.actions
export default authSlice.reducer