import React from "react";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/Darkmode";

export const UserHeader = () => {
    return (
        <div className="flex justify-between items-center w-full px-20  h-24 shadow-2xl  ">
            <Link to={"/"}>
                <img src="/logo.png" alt="logo" className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32" />
            </Link>
            <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/films"}>Films</Link>
            </nav>

            <div className="flex gap-14 items-center ">
                <DarkMode />
                <Link to={"/user/profile"}>
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};