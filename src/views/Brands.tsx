import { faClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BrandService from '../services/brands';
import { Brand } from '../interfaces/brand';

const Brands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  
  const getBrands = ()=>{
    BrandService.getBrands()
    .then(res=>setBrands(res.data))
  }

  useEffect(()=>{
    getBrands();
  },[]);  

  const navigate = useNavigate();
  const onAddBrandClick = ()=>{
        navigate('/admin/brands/add');
  }

  const deleteCategory = (id:number)=>{
      BrandService.deleteBrand(id)
      .then(res=> {
        getBrands();
        toast('Category Deleted Successfully', {
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

  const onUpdate = (data: Brand)=>{
    navigate('/admin/brands/add', { state: data });
  }

  return (
    <div className="container">
        <div className="row">
            <div className="col-12 ">
                    <h2 className='mb-2 text-center'>Brands</h2>
                <div className="d-flex flex-row-reverse ">
                    <button onClick={onAddBrandClick} className="btn btn-primary mb-2">Add Brand</button>
                </div>
                <table className='table p-2'>
                    <thead>
                        <tr>
                            <th className='px-3'>Image</th>
                            <th>Name</th>
                            <th>Added Date</th>
                            <th>Added By</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            brands.map(c=>(
                                <tr key={c.name} >
                                    <td className='px-3'>
                                        <img className='w-10 h-10 border-radius img-fluid' src={c.image} alt=""  />
                                    </td>
                                    <td >{c.name}</td>
                                    <td >{c.createdAt}</td>
                                    <td >{c.creator}</td>
                                    <td>
                                        <div onClick={()=>onUpdate(c)} className="btn btn-info btn-sm">
                                            <FontAwesomeIcon  icon={faEdit} />
                                        </div>
                                    </td>
                                    <td>
                                        <div onClick={()=>deleteCategory(c.id)} className="btn btn-danger btn-sm">
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

export default Brands