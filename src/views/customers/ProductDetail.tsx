import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import ProductService from '../../services/products'
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { state } = useLocation();
    const distinctSizes = [...new Set(state?.variants?.map((item:any) => item.size))];
    const [selectedSize, setSize] =  useState(distinctSizes[0])
    const [selectedPrice, setPrice] =  useState(state?.price);
    const [selectedImage, setImage] =  useState(state?.image);

    const colors = [...new Set(state?.variants?.filter((item:any) => item.size === selectedSize))];
  
  const AddToBag = ()=>{
    const data = { id: Date.now(), productId: state.id as number, userId : 1, qty: 1, variantId: state?.variants?.find(v=> v.image === selectedImage).id  as number }
    ProductService.addToBag(data).then(res => {
      toast("Added to bag", {
        position: "top-center",
        theme: "light",
    });
    })
    
  }

  return (
    <div className="container">
        <div className="row">
          <div className="col-5">
                <img style={{ width:'430px',height:'100%' }} src={selectedImage} alt="" />
           </div>
           <div className="col ">
            <div className="header py-2 border-bottom">
              <h5>{state.name}</h5>
              <p className='p-0 m-0' style={{ color:'#888282' }}>{state.description}</p>
            </div>
             <div className="body">
                <h5 className='p-0 mt-2' > $ {selectedPrice} <span className='mx-4 text-muted text-decoration-line-through'>MRP: ₹1649</span>  <span style={{ color:"#f0a94b" }} >(70% OFF)</span>  </h5>
                <p style={{ color:"#03a685", fontWeight:700, fontSize:'14px'}}>inclusive of all taxes</p>
              <h6 className='mb-2' style={{ textTransform:'uppercase' }}>select size</h6>
              <div className="sizes mt-2 mb-2" style={{ display:'flex'}}>
                {
                  distinctSizes?.map(v => (
                    <span  onClick={()=> setSize(v)} key={v} className='d-flex justify-content-center align-items-center  mx-1' style={{ width:'40px', height:'40px', borderRadius:'20px', cursor:'pointer', ...{ border : selectedSize === v ? '1px solid #f29deb': '1px solid #a9c6f5' }  }}>{v}</span>
                  ))
                }
              </div>
              <h6 className='mb-2'>More Colors</h6>
              <div className="mb-2 d-flex" >
                {
                  colors?.map(v=>(
                    <img onClick={()=>{
                      setPrice(v.price)
                      setImage(v.image)
                    }
                    } key={v} src={v.image} className='d-flex justify-content-center align-items-center border mx-1' style={{ width:'64px', height:'64px', borderRadius:'20px', cursor:'pointer' }}/>
                  ))
                }
              </div>
              <div className="buttons py-3 border-bottom">
                <div className="d-flex justify-content-between mt-2 w-50 ">
                    <button onClick={()=>AddToBag()} className="btn btn-primary btn-lg" style={{ textTransform:'uppercase' }}>Add To Bag</button>
                    <button className="btn btn-lg border" style={{ textTransform:'uppercase' }}>WishList</button>
                </div>
              </div>
             </div>

           </div>
        </div>
    </div>
  )
}

export default ProductDetail