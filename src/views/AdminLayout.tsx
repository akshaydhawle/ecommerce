import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCoffee,
  faDatabase,
  faHome,
  faShirt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const AdminLayout = () => {
  const [ active, setActive ] = useState('');
  const list = [
    {
      title: "Dashboard",
      imgUrl: <FontAwesomeIcon icon={faHome} />,
      forward: '/admin/orders'
    },
    {
      title: "Customers",
      imgUrl: <FontAwesomeIcon icon={faUser} />,
      forward: '/admin/customers'
    },
    {
      title: "Products",
      imgUrl: <FontAwesomeIcon icon={faDatabase} />,
      forward: '/admin/products'
    },
    {
      title: "Categories",
      imgUrl: <FontAwesomeIcon icon={faCircle} />,
      forward: '/admin/categories'
    },
    {
      title: "Brands",
      imgUrl: <FontAwesomeIcon icon={faShirt} />,
      forward: '/admin/brands'
    },
  ];

  return (
    <div className="fluid-container m-5">
      <div className="row ">
        <div className="col-3">
          <ul className="list-group rounded-pill">
            {list.map((l) => (
              <Link onClick={e=> setActive(l.title)} className="text-decoration-none" to={l.forward}>
                <li className={`list-group-item d-flex column-gap-3 py-3 px-3 ${active === l.title ? 'active border-0' : '' }`} >
                    <i>{l.imgUrl}</i> 
                    {l.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="col-9">
          <div id="main " className="mx-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
