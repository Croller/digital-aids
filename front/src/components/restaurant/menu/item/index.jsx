
import { 
    Badge,
    Button,
    // Badge, Button, 
Grid 
} from '@material-ui/core'
// import {Check, RoomService as Lid} from '@material-ui/icons'
import React from 'react'
import './style.scss'
import A from '../../../../redux/actionTypes'
// import {getRestaurant} from '../../../../redux/reducers'
// import TagsService from '../../../../services/tags'
import {connect} from 'react-redux'
import Quantity from '../quantity'
import {tr} from '../../../../services/translations'
import Allergens from '../allergens'
import ItemActions from './ItemActions'

const {REACT_APP_MEDIA : MEDIA} = process.env 

/**
 * Menu item for 'text only' template 
 */
class RestMenuItem extends React.Component{

    state = {
        tag_list: null,
        restState: null,
        showDialog: false
    }


    // remove = (dishid, ev) => {
    //     ev.stopPropagation()
    //     // console.debug("removing", dishid)
    //     this.props.delete( dishid, this.props.slug )
    // }

    showAllergens( tags ){
        
    }

    render(){
        // const {slug} = this.props

        const { showDialog} = this.state
        
        let {
            slug,
            dishid, 
            title, 
            default_title, 
            dishprice, 
            dishcategoryid,
            tags,
            index, 
            needSecondTranslation,
            pricefor,
            amount,
            viewonly,
            // add, 
            // reduxState
            restState,
            // filters = {},
            // quantity 
            // cartItem,
            // cart
            language,
            translations,
            tags_list,
            isSelected = false // comes from ComplexItem
        } = this.props
        // console.debug("Item slug:", slug, " props: ", this.props)
        // const restState = getRestaurant( reduxState, slug)
        // console.debug("restState", restState)
        let quantity
        
        // get the required cart
        const {cart} = restState

        // TODO: refactor this it's not optimal at all
        const cartItem = cart.find( i => i.dishid === dishid )
        
        if(cartItem) 
            ({quantity} = cartItem )

        // const item = { 
        //     dishid, 
        //     title, 
        //     dishcategoryid, 
        //     default_title, 
        //     dishprice, 
        //     tags, 
        //     quantity: 1 
        // }
        const item = { 
            dishid, 
            title, 
            dishcategoryid, 
            default_title, 
            dishprice,
            pricefor, 
            amount,
            tags, 
            quantity: 1
        }

        const isOrdered = quantity > 0
        // console.debug("menu item render. quantity: ", quantity )
        const _t = key => tr(key, language, translations)

        const AllergensButton = tags && tags.length > 0 ? 
        <div className="button-container">
            <Button 
                onClick={()=> this.setState({showDialog: true })}
                className="allergens-button"
                variant="contained"
            >{_t("Allergens")}</Button> 
        </div>
        : "";
        
        return( 
            <>
                <div className={`rest-menu-item${ isOrdered  ? ' ordered' : "" }${ isSelected ? ` selected` : ''}${ viewonly ? ` viewonly` : ''}`} >

                    <div className="flex column text-align-left flex-grow">
                        
                        <div className="index-and-titles">
                            <div className="dish-index">
                                {index}
                                    
                            </div>
                            <div className="dish-title-box">
                                <div className="title-main">
                                    {title}
                                </div>
                                {
                                    needSecondTranslation && 
                                    <div className="title-default">
                                        {default_title}
                                    </div>
                                }
                                {/* <div className="flex row justify-between mt-1">
                                    <div>
                                        { tags && tags.length > 0 && !viewonly && 
                                        // only show allergens button here if not in view-only mode.
                                        // otherwise it's shown next to the price.
                                            AllergensButton
                                        }
                                    </div>
                                    {
                                        amount && 
                                        <div className="amount">
                                            {amount}
                                        </div>
                                        
                                    }
                                </div> */}
                            </div>                            
                        </div>

                        <ItemActions
                        {
                        ...{item, 
                            // restaurant slug
                            slug, 
                            // dish quantity
                            quantity, 
                            // amount in units
                            amount,
                            // "price for" string. Actually, means the same as amount (it didn't at first), they probably should be merged.
                            pricefor,
                            // whether the category is view-only
                            viewonly, 
                            // allergens button (to show next to the price in view-only mode)
                            AllergensButton
                        }} />
                        {/* <div> */}
                            {/* <Grid item xs={12} md={9} className="dish-title-box"> */}


                            {/* <Grid item xs={12} md={3}> */}
                            {/* <div>
                                {dishprice && 
                                <Quantity {
                                    ...{item, 
                                        // restaurant slug
                                        slug, 
                                        // dish quantity
                                        quantity, 
                                        // whether the category is view-only
                                        viewonly, 
                                        // allergens button (to show next to the price in view-only mode)
                                        AllergensButton
                                    }} />
                                }  
                            </div> */}
                            

                        {/* </div> */}
                    </div>
                </div>
                <Allergens 
                    open={showDialog}
                    onClose = {() => this.setState({showDialog: false})}
                    tags={tags}
                    tags_list = {tags_list}
                    _t = {_t}
                    dishid={dishid}
                    needSecondTranslation={needSecondTranslation}
                />
            </>
            
        )
    }
}

export default connect(
    // state => ({cart: state.cart, filters: state.filters}),
    state => ({reduxState: state.app, language: state.app.language, translations: state.translation }),
    dispatch => ({
        add: (item, slug) => dispatch( { type: A.ADD_TO_CART, payload: {item, slug} } ),
        delete: (dishid, slug) => dispatch( { type: A.DELETE_FROM_CART, payload: {dishid, slug} } )
    })
)(RestMenuItem)