import axios from 'axios';
import { url }  from '../config.json';
import { Product } from '../interfaces/product'

async function getProducts(searchString=''){
   const response = await axios.get(`${url}/products?q=${searchString}`);
   return response;
}

async function addProduct(data:Product){
   let response = false;
   if(data.id){
      await data.variant.map(async variant=>{
         await axios.put(`${url}/variants/${variant.id}`,{ ...variant });
      })
      delete data.variant;
      await axios.put(`${url}/products/${data.id}`,{ ...data });
      response = true;
   }else {
      const id = Date.now();
      await data.variant.map(async variant=>{
         await axios.post(`${url}/variants/`,{ ...variant, id: Date.now(), productId: id });
      })
      delete data.variant;
      await axios.post(`${url}/products`,{...data, id });
      response = true;
   }
   return response;
}

async function deleteProduct(id:number){
   const response = await axios.delete(`${url}/products/${id}`);
   return response;
}

async function deleteVariant(id:number){
   const response = await axios.delete(`${url}/variants/${id}`);
   return response;
}

async function addToBag(data: { productId:number; userId:number, qty: number, variantId: number }){
   const response = await axios.post(`${url}/cart`,data );
   return response;
}

export default {
    getProducts,
    addProduct,
    deleteProduct,
    deleteVariant,
    addToBag
}


