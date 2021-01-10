import { Button, Container, Dialog, DialogContent } from '@material-ui/core'
// import {Link} from 'react-router-dom'
// import {ChevronLeft} from '@material-ui/icons'
import React from 'react'
// import Service from '../../services/restaurants'
import TranslService, {_T, transl, tr} from '../../services/translations'
import Spinner from '../template/common/Spinner'
import ErrorPage from '../template/common/error-loading'
// import Topbar from '../restaurant/topbar'
// import Menu from '../restaurant/menu'
import {connect} from 'react-redux'
import A from '../../redux/actionTypes'
// import {getRestaurant} from '../../redux/reducers'
// import Redirect from '../template/common/redirect'

import './cart.scss'
import { Trash, ChefHead } from '../template/common/icons'
// import Footer from '../template/footer'
import Social from '../restaurant/social'
import CartList from './cart-list'
import { Link } from 'react-router-dom'
import {updateScroll} from '../../utils/functions'


let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;;

// root element
const root = document.getElementById("root")

const EmptyOrder = ({closeCart, button_text = "Menu", text}) => 
    <div className="panel empty-cart-message">
        <div className="round-icon">
            <ChefHead/>
        </div>
        <p>
            {text}
        </p>

        {/* <Button component={Link} to={menu_link}>{button_text}</Button> */}
        <Button onClick={closeCart}>{button_text}</Button>
    </div>


class Cart extends React.Component{

    state = {
        // restaurant: null,
        translations: null,
        showClearDialog: false
    }
    componentDidMount(){
        console.debug("cart componentDidMount is called")
        // this.fetchRestaurant( {} )
        this.fetchTranslations()
        
    }

    componentDidUpdate(prevProps){
        console.debug("cart componentDidUpdate is called")
        // const {slug} =  this.props.computedMatch.params
        const {restaurant, language} = this.props
        
        // const {slug: old_slug} = prevProps
        const {language: old_language, restaurant: old_restaurant } = prevProps
        console.debug("cart language:", language, old_language)
        if( 
            // slug !== old_slug  || 
            restaurant !== old_restaurant ||
            language !== old_language ){
            // this.fetchRestaurant( prevProps )
            this.fetchTranslations()
        }
    }

    async fetchTranslations( ){
        console.debug("cart Fetchtranslations is called")
        const { language, restaurant } = this.props

        const default_lang = restaurant ? restaurant.defaultlanguage : "en"

        // if( language ){
            // const translations = await TranslService.getByKeys(
            TranslService.getByKeys(
                [
                    "MyOrder",
                    "Total", 
                    "ThankForOrder",
                    "ThankYou",
                    "WantToClearEntireOrder",
                    "askToConfirm",
                    "Remove",
                    "No",
                    "empty_order"
                ],
                language, default_lang
            )

            // this.setState({translations})
        // } else {
        //     return false
        // }
    }

  


    render(){

        const {showClearDialog } = this.state
        const {language, restaurant, restState, emptyCart, slug, translations } = this.props
        
        const {cart, cartPrice} = restState
        const cartIsEmpty = !cart || cart.length === 0

        // console.debug("Cart slug:", slug, "props: ", this.props)
        if( !restaurant || !translations ){
            return restaurant === null  ? <Spinner/> : <ErrorPage />
        }
        
        // translation function for current language
        const _tt = (key) => tr(key, language, translations)
        // const _tdef = key => transl( key, restaurant.defaultlanguage)

        console.debug("Translations:", translations);
        // shortcuts for dialog handling
        const closeDialog = () => this.setState({showClearDialog: false})
        const showDialog = () => this.setState({showClearDialog: true})

        return(
           
            <>
                
                <Container key={`cart-${slug}`} className="cart flex-grow"
                onScroll={({target}) => {
                    lastScrollTop = updateScroll(target, root, lastScrollTop )
                }}
                >
                    <div className="cart-header flex row align-items-center space-between bg-white">
                        <div className="title">
                            {_tt("MyOrder")}
                        </div>
                        {cart.length > 0 &&
                        <Button aria-label="Empty cart" className="empty-cart" onClick={showDialog}><Trash/></Button>
                        }
                    </div>
                    { restaurant ? 
                        !cartIsEmpty ?
                        <>
                            <div className="bg-light-gray p2 rounded top-message">
                                {_tt("askToConfirm")}
                            </div>
                            {/* <Menu {...{menu: cart, slug, categories, show_categories: false }}/> */}
                            <CartList items={cart} restState={{cart}} slug={slug} item_type={restaurant.defaulttemplate}/>
                            <div className="total flex row align-items-center space-between">
                                <span>
                                    {_tt("Total")}:
                                </span>
                                <span className="button ">
                                    {(cartPrice * 1).toFixed(2)}€
                                </span>
                            </div>
                        </>
                        :
                        <EmptyOrder 
                        text={_tt("empty_order")} 
                        // menu_link={`/${slug}`}
                        closeCart = {() => this.props.setOverlay({overlay: null, slug})}
                        /> 

                        : <Spinner />
                    }
                    
                    <Social {...{...restaurant}} message={ cartIsEmpty ? _tt("ThankYou") : _tt("ThankForOrder")} />
                </Container>
                <Dialog 
                    open={showClearDialog}
                    onClose={closeDialog}  
                    className="dialog" 
                >
                    <DialogContent className="text">
                        { _tt('WantToClearEntireOrder')}
                    </DialogContent>
                    <div  style={{display: "flex", flexDirection: "column", alignSelf: "center"}}>
                        <Button className="bg-black c-white" onClick={() => { emptyCart(slug); closeDialog() }}>{_tt('Remove')}</Button>
                        <Button className="bg-light-gray" onClick={closeDialog}>{_tt('No')}</Button>
                    </div>
                </Dialog>
            </>
        )
    }
}


export default connect(
    state => ({...state.app, translations: state.translation } ),
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        emptyCart: payload => dispatch( {type: A.CLEAR_CART, payload } ),
        setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })
    })
)(Cart)