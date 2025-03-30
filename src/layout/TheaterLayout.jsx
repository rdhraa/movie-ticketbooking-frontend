import React from 'react'
import { Outlet } from 'react-router-dom'

export const TheaterLayout = () => {
  return (
    <div>
      <h1>theater header</h1>
      <Outlet/>
      <h1>theater footer</h1>
    </div>
  )
}


