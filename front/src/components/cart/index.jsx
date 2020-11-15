import { Container, Paper } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {ChevronLeft} from '@material-ui/icons'
import React from 'react'
import Service from '../../services/restaurants'
import Spinner from '../template/common/Spinner'
import Topbar from '../restaurant/topbar'
import Menu from '../restaurant/menu'
import {connect} from 'react-redux'
import A from '../../redux/actionTypes'
import './cart.scss'



class Cart extends React.Component{

    state = {
        restaurant: null 
    }
    componentDidMount(){
        this.fetchRestaurant()
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.slug !== prevProps.match.params.slug ){
            this.fetchRestaurant()
        }
    }

    async fetchRestaurant(){
        const {slug} = this.props.match.params
        const restaurant = await Service.getRestaurant( slug )
        this.setState({restaurant})
    }


    render(){

        const {restaurant} = this.state
        
        const {language} = this.props
        const {slug} = this.props.match.params

        const {cart, cartPrice} = this.props
        const menu = cart[slug] || []

        const total_text = "Total" // TODO: get from translations

        console.debug("MEnu", menu)
        if( !restaurant ){
            return restaurant === null ? <Spinner/> : <h2>Error loading data</h2>
        }

        // get all category ids within the cart
        const category_ids = menu.reduce( (r, i) =>{ return r.includes(i.dishcategoryid ) ? r : [...r, i.dishcategoryid] }, [] )
        console.debug("filtered caegory ids:", category_ids)

        // get all corresponding categories
        console.debug("all categories:", restaurant.categories)
        const categories = restaurant.categories.filter( c => category_ids.includes(c.id) )
        console.debug("filtered categories:", categories)

        return(
           
            <>
                <Topbar {...{restaurant, language}} />
                <Container key={`cart-${slug}`} className="cart">
                    
                    
                    <div className="breadcrumbs">
                        <Link to={`/${restaurant.slug}`} className="back-link"><ChevronLeft />Menu</Link>
                    </div>
                    

                    { restaurant ? 
                        <>
                            <Menu {...{menu, slug, categories, show_categories: false }}/>
                            <div className="total panel">
                                {total_text}:
                                <span>
                                    {cartPrice}€
                                </span>
                            </div>
                        </>
                        : <Spinner />
                    }
                    
                        
                </Container>
            </>
        )
    }
}


export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(Cart)