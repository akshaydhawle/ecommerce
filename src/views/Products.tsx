import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../services/products';
import { Product } from '../interfaces/product';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  const getProducts = (e?: ChangeEvent<HTMLInputElement>)=>{
    ProductService.getProducts(e?.target?.value)
    .then(res=>setProducts(res.data))
  }

  useEffect(()=>{
    getProducts();
  },[]);  

  const navigate = useNavigate();
  const onAddCategoryClick = ()=>{
        navigate('/admin/products/add');
  }

  const deleteProduct = (id:number)=>{
      ProductService.deleteProduct(id)
      .then(res=> {
        getProducts();
        toast('Product Deleted Successfully', {
            position: "top-center",
            theme: "dark",
        });
      }).catch(err=>{
        toast(err.response.data.error, {
            position: "top-center",
            theme: "dark",
        });
      })
  }

  const onUpdate = (data: Product)=>{
    navigate('/admin/products/add', { state: data });
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-12 ">
                <h2 className='mb-2 text-center'>Products</h2>
                <div className="d-flex flex-row-reverse mb-3">
                    <button onClick={onAddCategoryClick} className="btn btn-primary">Add Product</button>
                </div>
                <input onChange={getProducts} type="text" className="form-control mb-3" placeholder='Search products ....' />
                <table className='table p-2'>
                    <thead>
                        <tr>
                            <th className='px-3'>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>TotalQty</th>
                            <th>Added Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            products.map(c=>(
                                <tr key={c.name} >
                                    <td className='px-3'>
                                        <img className='w-10 h-10 border-radius img-fluid' src={c.image} alt=""  />
                                    </td>
                                    <td >{c.name}</td>
                                    <td >{c.category}</td>
                                    <td >{c.brand}</td>
                                    <td >{c.price}</td>
                                    <td >{c.totalQty}</td>
                                    <td >{c.createdAt}</td>
                                    <td>
                                        <div onClick={()=>onUpdate(c)} className="btn btn-info btn-sm">
                                            <FontAwesomeIcon  icon={faEdit} />
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={()=>deleteProduct(c.id)} className="btn btn-danger btn-sm">
                                            <FontAwesomeIcon  icon={faClose} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Products