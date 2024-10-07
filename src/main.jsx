import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login_1 from './components/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPosts from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import MyPosts from './pages/MyPosts.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication = {false}>
            <Login_1 />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication = {false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication >
            {" "}
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication >
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path:"/my-posts",
        element:(
          <AuthLayout authentication>
            <MyPosts />
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication >
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:<Post />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
