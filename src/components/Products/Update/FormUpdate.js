import React, {useState,useEffect} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import {getMultiSelected, repeat} from '../../../utils';
import {isCategoriesValid, isDateValid, isNameValid,isRatingValid} from '../Update/validators';
import axios from 'axios';
import FlashMessage from 'react-flash-message'
import { useHistory,useParams } from "react-router-dom";
import categs from '../../../mocks/categories';


const FormUpdate = () => {
   // const {product = {}} = props;
    let { id } = useParams();
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [rating, setRating] = useState(0);
    const [categories, setCategories] = useState([]);
    const [itemsInStock, setItemsInStock] = useState(0);
    const [receiptDate, setReceiptDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [featured, setFeatured] = useState(false);
    const[falshm,setFlashm]=useState(null);
    const[falshdate,setFlashdate]=useState(null);
    const[falshfiled,setFlashfield]=useState(null);
    const[falshoption,setFlashoption]=useState(null);
    const history = useHistory();
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    const style = {
        color: 'red',
        display: 'none'
      };
    //   useEffect(() => {
    //     let isMounted = true;               // note mutable flag
    //     someAsyncOperation().then(data => {
    //       if (isMounted) setState(data);    // add conditional check
    //     })
    //     return () => { isMounted = false }; // cleanup toggles value, if unmounted
    //   }, []); 
      useEffect(() => {
        let isMounted = true;               // note mutable flag

        // Met à jour le titre du document via l’API du navigateur
         axios.get(`https://test-node-app100.herokuapp.com/api/product/get/${id}`)
        .then(res => {  
            if(isMounted){    
          setName(res.data.name);
          setBrand(res.data.brand);
          setRating(res.data.rating);
          setCategories(res.data.categories);
          setItemsInStock(res.data.itemsInStock);
          setReceiptDate(res.data.receiptDate);
          setExpirationDate(res.data.expirationDate);
          setFeatured(res.data.featured);}
          
        })  
        return () => { isMounted = false }; 
      },[]);
      const onSubmit = async(e) => {
        e.preventDefault();
   
       // const product={name:e.target.name,brand:e.target.brand,rating:e.target.rating,categories:e.target.categories,itemsInStock:e.target.itemsInStock,expirationDate:e.target.expirationDate,featured:e.target.featured};
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      
        const options={
            name:name,
            brand:brand,
            rating:rating,
            categories:categories,
            itemsInStock:itemsInStock,
            expirationDate:expirationDate,
            receiptDate:receiptDate,
            featured:featured
        }
        if(!isNameValid(name) ){
            setFlashfield(true)
        }
        else if(!isCategoriesValid(categories)){
            setFlashoption(true)
        }
        else if(!isDateValid(expirationDate)){
            setFlashdate(true)

        }
        else{

       await axios.put(`https://test-node-app100.herokuapp.com/api/product/update/${id}`,options)
        .then(res => {
          //console.log(res);
          //console.log(res.data);
          setFlashm(true);
          setTimeout(() => {
            history.push("/");

        }, 3000);
        })
    }}
    const handlechange=(e)=>{
        setRating(e.target.value);
        if(isRatingValid(e.target.value)){
           setFeatured(true);         
        }
        else{
            setFeatured(false);
        }
    }
 
  
    return (
       
        <Form onSubmit={onSubmit}>
              {
            falshm
            ?<FlashMessage duration={5000}><span className='alert alert-success' style={{marginLeft: '200px',width:'500px'}}>Your product has been modified</span></FlashMessage>:null
          }
           {
            falshdate
            ?<FlashMessage duration={5000}><span className='alert alert-danger' style={{marginLeft: '200px',width:'500px'}}>If a product has an expiration date it must expire not less than 30 days since now</span></FlashMessage>:null
          }
            {
            falshfiled
            ?<FlashMessage duration={5000}><span className='alert alert-danger' style={{marginLeft: '200px',width:'500px'}}>Name is required, the length must not be greater than 200
            </span></FlashMessage>:null
          }
          
          {
            falshoption
            ?<FlashMessage duration={5000}><span className='alert alert-danger' style={{marginLeft: '200px',width:'500px'}}> A product must have from 1 to 5 categories</span></FlashMessage>:null
          }
            <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                    invalid={!isNameValid(name)}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Name'
                    defaultValue={name}
                    onChange={({target}) => setName(target.value)}
                />
                <FormFeedback>Name is required, the length must not be greater than 200</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='brand'>Brand</Label>
                <Input
                    type='text'
                    name='brand'
                    id='brand'
                    placeholder='Brand'
                    defaultValue={brand}
                    onChange={({target}) => setBrand(target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="rating">Rating</Label>
                <Input
                    type="select"
                    name="rating"
                    id="rating"
                    value={rating}
                    onChange={handlechange}
                >
                    {repeat(11).map((v) => (
                        
                         <option key={v}  value={v}>{v}</option>
                        
                        ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="categories">Categories</Label>
                <Input
                    invalid={!isCategoriesValid(categories)}
                    type="select"
                    name="categories"
                    id="categories"
                    multiple
                    className="select2"
                    defaultValue={categories}
                    onChange={({target}) => setCategories(getMultiSelected(target))}
                >
                {categs.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </Input>
                <FormFeedback>A product must have from 1 to 5 categories</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="itemsInStock">Items In Stock</Label>
                <Input type="number" name="itemsInStock" id="itemsInStock" defaultValue={itemsInStock}
                       onChange={({target}) => setItemsInStock(target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="expirationDate">Expiration date</Label>
                <Input
                    type="date"
                    name="expirationDate"
                    id="expirationDate"
                    defaultValue={expirationDate}
                    onChange={({target}) => setExpirationDate(target.value)}
                    invalid={!isDateValid(expirationDate)}


                />
               <FormFeedback>If a product has an expiration date it must expire not less than 30 days since
                    now</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="receiptDate">Receipt date</Label>
                <Input type="date" name="receiptDate" id="receiptDate" defaultValue={receiptDate}
                       onChange={({target}) => setReceiptDate(target.value)}
                />
            </FormGroup>
            <FormGroup check>
            <Label check>
                    <Input type="checkbox" checked={featured} 
                           onChange={({target}) => setFeatured(target.checked)}
                           invalid={!isRatingValid(rating)}
                    />              

                    Featured
                </Label>
                <label style={style}>You must check the case featured</label>  

            </FormGroup>
            <Button>Submit</Button>
          
        </Form>
    ); 
}

// FormUpdate.propTypes = {
//     product: PropTypes.object,
//     categories: PropTypes.array.isRequired,
//     onSave: PropTypes.func.isRequired,
// };

export default FormUpdate;
