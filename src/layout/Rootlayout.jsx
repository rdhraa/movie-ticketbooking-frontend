import React, { useState } from 'react'
import {Header} from '../components/user/Header'
import Footer from '../components/user/Footer'
import {Outlet} from "react-router-dom"
import {UserHeader} from '../components/user/UserHeader'
import { useSelector } from 'react-redux'
const Rootlayout = () => {

  const user = useSelector((state) => state.user)
  console.log("user=====",user)
  
  return (
    <div>
      {user.isUserAuth ? <UserHeader/>:<Header/>}
      <div className="min-h-96">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Rootlayout
