import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { Container, Row, Col } from 'reactstrap'
import { chunk, parseInt } from 'lodash'
import axios from 'axios';
import {Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {Link} from "react-router-dom";
import categs from '../../mocks/categories';
import ProductUpdate from './Update/FormUpdate'
import {Route, Switch} from 'react-router-dom'

const ProductList = ({ products, onDelete }) => {
  //const productsGroups = chunk(products, 3)
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
  const [Listprod, setListprod] = useState([]);
 
    useEffect(() => {
      // Met à jour le titre du document via l’API du navigateur
      const tt=  axios.get('http://127.0.0.1:5000/api/getproduct')
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(typeof res.data);
      setListprod(res.data);
      })   
    
    });
   //console.log(Listprod)

  return (
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
                  <li>{categs[category[0]].name}</li>
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
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductList;
