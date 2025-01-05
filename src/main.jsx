import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Anime from './pages/Anime.jsx'

import Carousel from './pages/Carousel.jsx'
import { AuthLayout, Login } from './components/index.js'



import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/movie",
            element: <Movie />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
       
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
       
        {
            path: "/anime",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Anime />
                </AuthLayout>
            ),
        },
        {
            path: "/Carousel",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Carousel />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
