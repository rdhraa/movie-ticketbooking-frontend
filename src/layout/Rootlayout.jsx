import React, { useEffect, useState } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosinstance";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const RootLayout = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      const response = await axiosInstance({ method: "GET", url: "/user/check-user",withCredentials: true, });
      const user = response.data?.data;
      dispatch(saveUser(response.data.data));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(clearUser());
      setIsLoading(false);
    }
  };


  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return isLoading ? null : (
    <div className="flex min-h-screen flex-col ">
      {/* Header */}
      <div className="sticky top-0 z-50 shadow-md ">
        {user.isUserAuth ? <UserHeader /> : <Header />}
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
