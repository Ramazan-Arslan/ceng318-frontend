import getHostAddress from './getHostAddress';
import axios from 'axios';

const getRequest = async (path) => {

   var token = localStorage.getItem('token');

   var address = getHostAddress();
   var returnedData = null;
   console.log("get",token)
   await axios.get(address + path, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
         returnedData = response.data;
      });
   return returnedData;

};


export default getRequest;