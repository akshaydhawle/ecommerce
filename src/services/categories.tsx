import axios from 'axios';
import { url }  from '../config.json';
import { Category } from '../interfaces/category';

async function getCategories(){
   const response = await axios.get(`${url}/categories`);
   return response;
}

async function getTerms(){
   const response = await axios.get(`${url}/terms`);
   return response;
}

async function addCategory(data:Partial<Category>){
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
    deleteCategory,
    getTerms
}


