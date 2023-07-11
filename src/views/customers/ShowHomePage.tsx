import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../../services/categories";
import { Category } from "../../interfaces/category";
import { Brand } from "../../interfaces/brand";
import BrandService from "../../services/brands";

const ShowHomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const getCategories = () => {
    CategoryService.getCategories().then((res) => setCategories(res.data.splice(0,4)));
  };

  const getBrands = () => {
    BrandService.getBrands().then((res) => setBrands(res.data.splice(0,4)));
  };

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="fluid-container">
        <div className="categories mb-3 p-3"  style={{ background:'#fac7af'}}>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-2 text-white">Categories</h2>
                <Link className="text-decoration-none text-white"  to='/customers'>Browse All Categories</Link>
            </div>
            <div className="row ">
                {categories.map((c) => (
                <div className="col-3 " >
                    <div className="card mb-2" style={{ width: "15rem" }}>
                    <img
                        style={{ height: "200px" }}
                        src={c.image}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title text-muted">{c.name}</h5>
                        <a href="#" className="btn btn-primary">
                        View
                        </a>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className="brands p-3" style={{ background:'#fac7af'}}>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-2 text-white">Brands</h2>
                <Link className="text-decoration-none text-white" to='/customers'>Browse All Brands</Link>
            </div>
            <div className="row">
                {brands.map((c) => (
                <div className="col-3 p-2">
                    <div className="card mb-2" style={{ width: "15rem" }}>
                    <img
                        style={{ height: "200px" }}
                        src={c.image}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body d-flex justify-content-between">
                        <h5 className="card-title text-muted">{c.name}</h5>
                        <a href="#" className="btn btn-primary">
                        View
                        </a>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ShowHomePage;
