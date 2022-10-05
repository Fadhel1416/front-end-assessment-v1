import React, { useState, useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { Container, Row, Col } from 'reactstrap'
import { chunk, parseInt } from 'lodash'
import axios from 'axios';
import {Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {Link} from "react-router-dom";
import categs from '../../mocks/categories';
import Header from '../Header/Header';


const ProductList = ({ products, onDelete }) => {
  //const productsGroups = chunk(products, 3)
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
  const [Listprod, setListprod] = useState([]);
 
    useEffect(() => {
      let isMounted = true;               // note mutable flag

      // Met à jour le titre du document via l’API du navigateur
      const tt=  axios.get('https://test-node-app100.herokuapp.com/api/getproduct')
      .then(res => {
       // console.log(res);
       // console.log(res.data);
       // console.log(typeof res.data);
      if(isMounted)
      {
        setListprod(res.data);
      }
      
      })   
      return () => { isMounted = false }; 

    },[]);
   //console.log(Listprod)

  return (
    <Fragment>
        <Header name="Products"/>

    <Container>
    
        <Row key={1} className="mb-5">
        {Listprod.map(product => (

            <Col sm="4" key={product._id} >
              <Card>
      <CardBody>
        <CardTitle>
          <Link to={`/update/${product._id}`}>{product.name}</Link>
          <Button close onClick={() => onDelete(product._id)} />
        </CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category =>(
                  <li key={parseInt(category)}>{categs[parseInt(category)].name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {product.receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {product.expirationDate}</ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
    </Col>
   ))}

        </Row>
    </Container>
    </Fragment>

  );
};

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default ProductList;
