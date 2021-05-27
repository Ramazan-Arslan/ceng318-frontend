import getHostAddress from './getHostAddress';
import axios from 'axios';

const postRequest = async (path, json) => {
   var address = getHostAddress();
   var returnedData = null;
   var token = localStorage.getItem("token");
   console.log(address+path)

   if(Boolean(token))
   {
      await axios.post(address + path, json, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
         returnedData = response.data;
      });
   }
   else
   {
      await axios.post(address + path, json)
      .then((response) => {
         returnedData = response.data;
      });
   }

   return returnedData;
};


export default postRequest;