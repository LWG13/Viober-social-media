import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import { auth, provider, signInWithPopup } from "../firebaseConfig";

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
  commentSuccess: false
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

export const likePost = createAsyncThunk("auth/like", async (values, {rejectWithValue}) => {
   try{
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/post/like/${values.postId}`, {
       postId: values.postId,
       userId: values.userId
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
    builder.addCase(dislikePost.fulfilled, (state,action) => {
      return {...state, dislikePostSuccess: true}
    })
    builder.addCase(replyComment.fulfilled, (state,action) => {
      return {...state, commentSuccess: true}
    })
  } 
})
export const {loadUser, logoutUser} = authSlice.actions
export default authSlice.reducer