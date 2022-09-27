import products from '../mocks/products';
//import axios from 'axios';

class ProductApi {
  getProducts = () => {
    return products;
  }
}
// class ProductApi {

//    getProducts = async() => {
//     //return products;
//     axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

//    const tt= await axios.get('http://127.0.0.1:5000/api/getproduct')
//     .then(res => {
//       console.log(res);
//       console.log(res.data);
//       console.log(typeof res.data);

//      return res.data;   
//     })
 
//   }
// }
export const productApi = new ProductApi();
