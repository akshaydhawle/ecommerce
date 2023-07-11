import React, { useEffect, useState } from 'react'
import ProductsService from '../../services/products'
import { Product } from '../../interfaces/product';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    ProductsService.getProducts().then(res=> setProducts(res.data))
  },[])

  const gotoDetail = (data:any)=>{
    navigate('/product-detail',{state:data})
  }


  return (
    <div className="fluid-container ">
            <div className="row p-5 ">
                {products.map((c) => (
                <div className="col-3 mb-3">
                    <div className="card" >
                    <img
                        style={{ height: "200px" }}
                        src={c.image}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body d-flex flex-column" style={{ cursor:'pointer'}} onClick={()=>gotoDetail(c)}>
                        <p className="card-title text-decoration-underline">{c.name}</p>
                        <p className='m-0 p-0' style={{ fontSize:'12px', height:'2rem', textTransform:'capitalize', color:'#908888' }}>{c.description?.substr(0,40)}</p>
                        <div className="d-flex justify-content-between mt-2">
                          <p className="m-0 p-0 "  style={{ fontSize:'14px', }}>RS {c.price}</p>
                          <p className="m-0 p-0 text-decoration-line-through"  style={{ fontSize:'14px', color:'#f75f5f'}}>Discount 20%</p>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
    </div>
  )
}

export default ProductsList