import axios from 'axios';
import { url }  from '../config.json';

interface Category {
    id?: number;
    name: string;
    creator: string;
    createdAt: string;
    image: string;
}

async function getCategories(){
   const response = await axios.get(`${url}/categories`);
   return response;
}

async function addCategory(data:Category){
   let response;
   if(data.id){
      response = await axios.put(`${url}/categories/${data.id}`,{ ...data });
   }else {
      response = await axios.post(`${url}/categories`,{...data, id: Date.now()});
   }
   return response;
}

async function deleteCategory(id:number){
   const response = await axios.delete(`${url}/categories/${id}`);
   return response;
}

export default {
    getCategories,
    addCategory,
    deleteCategory
}


