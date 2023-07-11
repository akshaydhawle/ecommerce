import axios from 'axios';
import { url }  from '../config.json';
import { Brand } from '../interfaces/brand';

async function getBrands(){
   const response = await axios.get(`${url}/brands`);
   return response;
}

async function addBrand(data:Partial<Brand>){
   let response;
   if(data.id){
      response = await axios.put(`${url}/brands/${data.id}`,{ ...data });
   }else {
      response = await axios.post(`${url}/brands`,{...data, id: Date.now()});
   }
   return response;
}

async function deleteBrand(id:number){
   const response = await axios.delete(`${url}/brands/${id}`);
   return response;
}

export default {
    getBrands,
    addBrand,
    deleteBrand
}


