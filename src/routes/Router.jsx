import { RootLayout } from "../layout/Rootlayout";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import Home from "../pages/user/Home";
import {createBrowserRouter} from "react-router-dom"
import {Profile} from "../pages/user/Profile";
import ProtectedRoute from "./ProtectedRoute";
import { ErrorPage } from "../pages/shared/ErrorPage";
import {Films} from "../pages/user/Films";
import { FilmDetails } from "../pages/user/FilmDetails";
import { LoginPage } from "../pages/shared/LoginPage";
import { TheaterLayout } from "../layout/TheaterLayout";
import { SignupPage } from "../pages/shared/SignupPage";
import { SeatBooking } from "../pages/user/SeatBooking";


export const router = createBrowserRouter([
    {
      path:"",
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
        path: "/",
        element: <Home/>,
        },
        {
        path: "about",
        element: <About/>,
        },
        {
        path: "contact",
        element: <Contact/>,
        },
        {
          path: "login",
          element: <LoginPage/>,
        },
        {
          path: "signup",
          element: <SignupPage/>,
        },
        {
          path: "films",
          element:<Films/>,
        },
        {
          path: "about-film/:id",
          element:<FilmDetails/>,
        },
        
      {
        path:"user",
        element:<ProtectedRoute/>,
        children:[

          {
            path: "profile",
            element: <Profile/>,
          },
          {
            path:"payment",
            element:<h1>payment</h1>
          },
          {
            path:"payment/success",
            element:<h1>payment success</h1>
          },
          {
            path:"payment/cancel",
            element:<h1>payment cancelled</h1>
          },
          
        ]
        },

        {
          path:"screening",
          element:<ProtectedRoute/>,
          children:[
            {
              path:"film/:filmId",
              element:<SeatBooking/>
            }
          ]
        }
        
    ],
  },
  {
    path:"theater",
    element:<TheaterLayout/>,
    children:[
      {path:"login",
      element:<LoginPage role="theater"/>
      },
      {path:"signup",
        element:<h1>signup</h1>
      },
    ]
  }
  ]);