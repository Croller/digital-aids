
import { 
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

const {REACT_APP_MEDIA : MEDIA} = process.env 


class RestMenuItem extends React.Component{

    state = {
        tag_list: null,
        restState: null
    }


    // remove = (dishid, ev) => {
    //     ev.stopPropagation()
    //     // console.debug("removing", dishid)
    //     this.props.delete( dishid, this.props.slug )
    // }

    render(){
        // const {slug} = this.props

        const {tags_list} = this.state
        
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
            translations
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

        const item = { 
            dishid, 
            title, 
            dishcategoryid, 
            default_title, 
            dishprice, 
            tags, 
            quantity: 1 
        }
        const isOrdered = quantity > 0
        // console.debug("menu item render. quantity: ", quantity )
        const _t = key => tr(key, language, translations)
        
        return( 
            
                <div className={`rest-menu-item${ isOrdered  ? ' ordered' : "" }`} >

                    <div className="dish-index">
                        {index}
                    </div>
                    <div className="flex column text-align-left">

                        <Grid container key={`dish-${dishid}` }>
                            <Grid item xs={12} md={9} className="dish-title-box">
                                <div className="title-main">
                                    {title}
                                </div>
                                {
                                    needSecondTranslation && 
                                    <div className="title-default">
                                        {default_title}
                                    </div>
                                }

                                { Array.isArray(tags) && <div className="tags">
                                        {tags.map( t => {
                                            return <img key={`tag-${dishid}-${t}`} src={`${MEDIA}/images/tags/${t}.png`} alt={ tags_list && tags_list[t] ? tags_list[t].title : t } />
                                        })}
                                    </div>
                                }
                                {
                                    pricefor && 
                                    <div className="pricefor">
                                        {pricefor}
                                    </div>
                                    
                                }
                                {
                                    amount && 
                                    <div className="amount">
                                        {amount}
                                    </div>
                                    
                                }
                            </Grid>
                                {/* { Array.isArray(tags) && <Grid item xs={12} className="tags">
                                        {tags.map( t => {
                                            return <img key={`tag-${dishid}-${t}`} src={`${MEDIA}/images/tags/${t}.png`} alt={ tags_list && tags_list[t] ? tags_list[t].title : t } />
                                        })}
                                    </Grid>
                                } */}
                            
                            
                            <Grid item xs={12} md={3}>
                                {dishprice && 
                                <Quantity {...{item, slug, quantity, viewonly}} />
                                 }   
                                
                                
                                
                            </Grid>
                            

                        </Grid>
                    </div>
                </div>
            
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