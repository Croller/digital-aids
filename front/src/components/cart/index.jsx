import { Button, Container, Paper } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {ChevronLeft} from '@material-ui/icons'
import React from 'react'
import Service from '../../services/restaurants'
import TranslService, {_T} from '../../services/translations'
import Spinner from '../template/common/Spinner'
import ErrorPage from '../template/common/error-loading'
import Topbar from '../restaurant/topbar'
import Menu from '../restaurant/menu'
import {connect} from 'react-redux'
import A from '../../redux/actionTypes'
import {getRestaurant} from '../../redux/reducers'
import Redirect from '../template/common/redirect'

import './cart.scss'
import { Trash } from '../template/common/icons'
import Footer from '../template/footer'
import Social from '../restaurant/social'



class Cart extends React.Component{

    state = {
        restaurant: null,
        translations: null,
        _t: null
    }
    componentDidMount(){
        this.fetchRestaurant( {} )
        
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.slug !== prevProps.match.params.slug ){
            this.fetchRestaurant( prevProps )
        }
    }

    async fetchTranslations( default_lang ){
        const { language } = this.props
        if( language ){
            const translations = await TranslService.getByKeys(
                [
                    "MyOrder",
                    "Total", 
                    "ThankForOrder"
                ],
                language, default_lang
            )

            return translations
        } else {
            return false
        }
    }

    async fetchRestaurant( prevProps ){
        const {language} = this.props 
        const {slug} = this.props.match.params
        const restaurant = await Service.getRestaurant( slug )

        let {translations} = this.state 

        if( restaurant ){
            if( !translations || translations && ( language !== prevProps.language) ){
                
                translations = await this.fetchTranslations( restaurant.defaultlangage )

                // get translation function
                const _t = _T(translations, language, restaurant.defaultlangage )

                this.setState({restaurant, translations, _t })
                
    
            } else {
    
                this.setState({restaurant})
            }
        } else {
            this.setState({restaurant})            
        }

    }


    render(){

        const {restaurant, translations, _t } = this.state
        
        const {language, emptyCart } = this.props

        
        const {slug} = this.props.match.params

        
        
        if( !language){
            // redirect to language selector
            return <Redirect to={`/${slug}/language`} back={window.location.pathname} />
        }

        const restState = getRestaurant( this.props, slug )
        
        // const {cart, cartPrice} = this.props
        // const menu = cart[slug] || []
        const {cart, cartPrice} = restState

        console.debug("MEnu", cart)
        if( !restaurant || !translations ){
            return restaurant === null || translations === null ? <Spinner/> : <ErrorPage />
        }
        

        // get all category ids within the cart
        const category_ids = cart.reduce( (r, i) =>{ return r.includes(i.dishcategoryid ) ? r : [...r, i.dishcategoryid] }, [] )
        console.debug("filtered caegory ids:", category_ids)

        // get all corresponding categories
        console.debug("all categories:", restaurant.categories)
        const categories = restaurant.categories.filter( c => category_ids.includes(c.id) )
        console.debug("filtered categories:", categories)

        return(
           
            <>
                <Topbar {...{restaurant, language}} 
                showHamburger={false}
                showSearch={false}
                closeButtonLink={`/${slug}`}
                />
                <Container key={`cart-${slug}`} className="cart flex-grow">
                    <div className="flex row align-items-center space-between mb-3">
                        <div className="title">
                            {_t("MyOrder", 1)}
                        </div>
                        <Button aria-label="Empty cart" className="empty-cart" onClick={() => emptyCart(slug)}><Trash/></Button>
                    </div>
                    { restaurant ? 
                        <>
                            <Menu {...{menu: cart, slug, categories, show_categories: false }}/>
                            <div className="total flex row align-items-center space-between">
                                <span>
                                    {_t("Total", 1)}:
                                </span>
                                <span className="button ">
                                    {(cartPrice * 1).toFixed(2)}€
                                </span>
                            </div>
                        </>
                        : <Spinner />
                    }
                    
                        
                </Container>
                <Social {...{...restaurant}} message={_t("ThankForOrder", 1)} />
                <Footer {...{...restaurant}} />
            </>
        )
    }
}


export default connect(
    state => state,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        emptyCart: payload => dispatch( {type: A.CLEAR_CART, payload } )
    })
)(Cart)