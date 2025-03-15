import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import authReducer from "./component/ReactRedux/authSlice"
import { lazy, Suspense } from "react"
import Navigation from "./component/navigation"
import Home from "./component/home"
import LoginPage from "./component/loginPage"
import HomePage from "./component/homePage.jsx"
import { Provider, useDispatch} from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { loadUser } from "./component/ReactRedux/authSlice.js"
import PostDetail from "./component/postDetail.jsx"
import { QueryClientProvider, QueryClient } from "react-query"
import SignupPage from './component/signup'
import Profile from "./component/profile.jsx"
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
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
      <QueryClientProvider client={queryClient}>
     <Provider store={store}>
        
                  <RouterProvider router={router} />
        
     </Provider>
  </QueryClientProvider>
	</React.StrictMode>
)