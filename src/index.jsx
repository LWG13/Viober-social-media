import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import authReducer from "./component/ReactRedux/authSlice"
import { lazy, Suspense } from "react"
import Navigation from "./component/navigation"
import Contact from "./component/contact"
import Home from "./component/home"
import LoginPage from "./component/loginPage"
import HomePage from "./component/homePage.jsx"
import { Provider, useDispatch} from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { loadUser } from "./component/ReactRedux/authSlice.js"
import Otp from "./component/otp.jsx"
import PostDetail from "./component/postDetail.jsx"
import { QueryClientProvider, QueryClient } from "react-query"
import SignupPage from './component/signup'
import WatchPage from "./component/watchPage.jsx"
import Profile from "./component/profile.jsx"
import FavPost from './component/favPost.jsx'
import EmailPassword from "./component/emailPassword.jsx"
import ResetPassword from "./component/resetPassword.jsx"
import Setting from "./component/setting.jsx"
import EditAccount from "./component/settingAccount.jsx"
import SearchResult from "./component/searchResult.jsx"
import Nofication from "./component/nofication.jsx"
import Chat from "./component/chat.jsx"
import ChatUser from "./component/chatUser.jsx"
const queryClient = new QueryClient()
const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
store.dispatch(loadUser())
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation/>,
    children: [
      {
        path: "/",
        element: <Home/>,
        children: [
          {
            path: "/",
            element: <HomePage/>,
            
          },
          {
            path: "/:postId",
            element: <PostDetail/>,
          },
          {
            path: "/watch",
            element: <WatchPage/>
          },
          {
            path: "/fav",
            element: <FavPost />
          },
          {
            path: "/search-result",
            element: <SearchResult/>
          },
          {
            path: "/notification",
            element: <Nofication />
          }
        ]
      },
      {
       path: "/profile/:id",
       element: <Profile/>
      },
    ]
	},
  
  {
    path:"/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
  {
    path: "/verify",
    element: <EmailPassword />
  },
  {
    path: "/otp",
    element: <Otp />
  },
  {
    path: "/reset",
    element: <ResetPassword />
  },
  {
    path: "/setting",
    element: <Setting />,
    children: [
      {
       path: "/setting",
       element: <EditAccount />,
      },
      {
       path: "/setting/contact",
       element: <Contact />
      }
    ]
  },
  {
    path: "/chat",
    element: <Chat />,
    children: [
      {
        path: ":conversationId",
        element: <ChatUser />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <ToastContainer />
     <Provider store={store}>
        
                  <RouterProvider router={router} />
        
     </Provider>
  </QueryClientProvider>
	</React.StrictMode>
)