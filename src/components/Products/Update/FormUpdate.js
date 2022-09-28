import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
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
    const history = useHistory();
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    const style = {
        color: 'red',
        display: 'none'
      };
      useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
         axios.get(`http://127.0.0.1:5000/api/product/get/${id}`)
        .then(res => {        
          setName(res.data.name);
          setBrand(res.data.brand);
          setRating(res.data.rating);
          setCategories(res.data.categories);
          setItemsInStock(res.data.itemsInStock);
          setReceiptDate(res.data.receiptDate);
          setExpirationDate(res.data.expirationDate);
          setFeatured(res.data.featured);
          
        })  
      
      });
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

       await axios.put(`http://127.0.0.1:5000/api/product/update/${id}`,options)
        .then(res => {
          console.log(res);
          console.log(res.data);
          setFlashm(true);
          setTimeout(() => {
            history.push("/");

        }, 3000);
        })
    }
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
                    defaultValue={rating}
                    onChange={handlechange}
                >
                    {repeat(11).map((v) => (
                        <option key={v} defaultValue={v}>{v}</option>
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
                {categories.map(index => (
                        <option key={index} defaultValue={index}>{categs[index].name}</option>
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

                />
               
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
