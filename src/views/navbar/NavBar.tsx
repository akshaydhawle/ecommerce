import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from '../../services/categories'
import { Category } from "../../interfaces/category";
import useAuthStore from "../../store/UserStore";

const NavBar = () => {
const [categoriesList, setCategories] = useState<Category[]>([]);
const [subcategories, setSubcategories] = useState<any[]>([]);
const user = useAuthStore((state:any) => state.user);
console.log(user);

const categories = ["Men", "Women", "Kids", "Home & Living", "Beauty"];

useEffect(()=>{
    CategoryService.getCategories().then(res=> setCategories(res.data));
},[]);

const handleMouseEnter = (value:string) => {
    const data = categoriesList.filter(c=> c.name === value);
    setSubcategories(data); 
  };

  const handleMouseLeave = () => {
    setSubcategories([]);
  };


  return (
    <>
    <nav className="navbar navbar-expand-lg mb-1 border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Myntra
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {categories.map((c) => (
              <li 
              onMouseEnter={()=>handleMouseEnter(c)}
              className="nav-item">
                <Link className="nav-link" to="/">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          <p className="d-flex justify-content-center align-items-center m-2 border px-2">{user?.role.toUpperCase()}</p>
          </form>
        </div>
      </div>
    </nav>
    {
        subcategories.length && (
            <div 
            onMouseLeave={()=>handleMouseLeave()}
            className="mx-5 w-25 border d-flex flex-row" style={{ height:'40vh', position:'absolute', background:'#fff', zIndex:1 }}>
            <ul className="row" >
                {
                    subcategories.map(s=>(
                        <div className="col-6 d-flex p-2" >
                            <img src={s.image} style={{ width:'28px',height:'28px', borderRadius:'99%' }} alt="" />
                            <li className="p-1" style={{ listStyle :'none', cursor:'pointer', color:'#a29898', fontSize:'0.8rem'}}>{s.subCategory}</li>
                        </div>
                        ))
                }
            </ul>
      </div>
        )
    }
    
    </>
  );
};

export default NavBar;
