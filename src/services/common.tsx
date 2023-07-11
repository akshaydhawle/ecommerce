import axios from 'axios';
import { url }  from '../config.json';

async function getColors(){
   const response = await axios.get(`${url}/colors`);
   return response;
}
async function getSizes(){
   const response = await axios.get(`${url}/sizes`);
   return response;
}


export default {
    getSizes,
    getColors
}


