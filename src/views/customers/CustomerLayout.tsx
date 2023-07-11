import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../navbar/NavBar'

const CustomerLayout = () => {
  return (
    <div className="fluid-container ">

          <NavBar
           
          />
      
    <div className="row ">
      <div className="col-3">
        {/* <ul className="list-group">
            <li className='list-group-item'>Customers</li>
            <li className='list-group-item'>Customers</li>
            <li className='list-group-item'>Customers</li>
            <li className='list-group-item'>Customers</li>
            <li className='list-group-item'>Customers</li>
        </ul> */}
      </div>
      <div className="col-9">
        <div id="main " className="mx-3">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
  )
}

export default CustomerLayout