import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './components/Main/Main'
import NotFound from './components/NotFound/NotFound'
import AddFormContainer from './components/Products/Add/AddFormContainer';
import ProductUpdate from './components/Products/Update/FormUpdate';
import ProduitList from './components/Products/ProductsList';


class App extends Component {
	render() {
		return (
			<Main>
				<Switch>
					<Route exact path="/" component={ProduitList}/>,
					<Route exact path="/update/:id" component={ProductUpdate}/>,

				,
					<Route path="/add" component={AddFormContainer}/>,
					<Route path="*" component={NotFound}/>,
				</Switch>
			</Main>
		)
	}
}

export default App;
