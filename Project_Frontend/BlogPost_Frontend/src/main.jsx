import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/home.jsx'
import Layout from './components/Layout/layout.jsx'
import Profile from './components/Profile/Profile.jsx'
import Login from './components/login/Login.jsx'
import Logout from './components/logout/logout.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import AllPost from './components/AllPost/AllPost.jsx'
import AddPost from './components/AddPost/AddPost.jsx'
import UserProfile from './components/UserProfile/userProfile.jsx'
import { RouterProvider } from 'react-router-dom'
import { store } from './authStore/store.js'
import { useDispatch } from 'react-redux'
import { addUserData,login_status_toggle } from './authStore/authSlice.js'
import axios from 'axios'
import './axios.config.js'



const router=createBrowserRouter(

  [ {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
        
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/logout',
        element:<Logout/>
      },
      {
        path:'/signup',
        element:<SignUp/>

      },
      {
        path:'all_post',
        element:<AllPost/>
      },
      {
        path:'add_post',
        element:<AddPost/>
      },
      {
        path:'/blogOwner/:userName',
        element:<UserProfile/>
      }
    ]
  }]
)
// const dispatch=useDispatch
const savedUser = localStorage.getItem("userData");
if (savedUser) {
  store.dispatch(addUserData(JSON.parse(savedUser)));
  store.dispatch(login_status_toggle(true));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
