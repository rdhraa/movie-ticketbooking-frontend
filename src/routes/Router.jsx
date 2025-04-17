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
import {UserSignupPage } from "../pages/shared/SignupPage";
import { SeatBooking } from "../pages/user/SeatBooking";
import { Success } from "../pages/user/Success";
import {TheaterDashboard} from "../pages/theater/Dashboard";
import { AddMovie } from "../pages/theater/AddMovie";
import { MyFilms } from "../pages/theater/MyFilms";
import { AddScreeningPage } from "../pages/theater/AddScreening";
import { ManageShows } from "../pages/theater/ManageShows";
import { MyBookings } from "../pages/theater/MyBookings";
import { TheaterProfile } from "../pages/theater/Profile";
import { TheaterSignupPage } from "../pages/theater/TheaterSignup";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import {AdminLayout} from "../layout/AdminLayout";
import { AdminSignup } from "../pages/admin/AdminSignup";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { TheaterList } from "../pages/admin/TheaterList";
import { TheaterDetails } from "../pages/admin/TheaterDetails";
import { UsersListPage } from "../pages/admin/UsersListPage";
import UserProfileView from "../pages/admin/UserProfileView";
import { MoviesListPage } from "../pages/admin/MovieListPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import { Cancel } from "../pages/user/Cancel";
import AdminProtectedRoute from "./AdminProtectedRoute";
import TheaterProtectedRoute from "./TheaterProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <UserSignupPage /> },
      { path: "films", element: <Films /> },
      { path: "about-film/:id", element: <FilmDetails /> },

      {
        path: "user",
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "payment", element: <h1>payment</h1> },
          { path: "payment/success", element: <Success /> },
          { path: "payment/cancel", element: <Cancel /> },
        ],
      },

      {
        path: "screening",
        element: <ProtectedRoute />,
        children: [{ path: "film/:filmId", element: <SeatBooking /> }],
      },
    ],
  },

  // THEATER ROUTES
  {
    path: "theater",
    element: <TheaterLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <LoginPage role="theater" /> },
      { path: "signup", element: <TheaterSignupPage /> },

      {
        element: <TheaterProtectedRoute />, 
        children: [
          { path: "dashboard", element: <TheaterDashboard /> },
          { path: "add-film", element: <AddMovie /> },
          { path: "my-films", element: <MyFilms /> },
          { path: "add-screening", element: <AddScreeningPage /> },
          { path: "my-screenings", element: <ManageShows /> },
          { path: "my-bookings", element: <MyBookings /> },
          { path: "profile", element: <TheaterProfile /> },
        ],
      },
    ],
  },

  // ADMIN ROUTES
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "signup", element: <AdminSignup /> },
      { path: "login", element: <AdminLogin /> },

      {
        element: <AdminProtectedRoute />, 
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "profile", element: <AdminProfilePage /> },
          { path: "theaters", element: <TheaterList /> },
          { path: "theaters/:id", element: <TheaterDetails /> },
          { path: "users", element: <UsersListPage /> },
          { path: "users/:userId", element: <UserProfileView /> },
          { path: "movies", element: <MoviesListPage /> },
        ],
      },
    ],
  },
]);