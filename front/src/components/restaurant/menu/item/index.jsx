import { Badge, Button, Grid } from '@material-ui/core'
import {Check, RoomService as Lid} from '@material-ui/icons'
import React from 'react'
import './style.scss'
import A from '../../../../redux/actionTypes'
import {connect} from 'react-redux'
const {REACT_APP_MEDIA : MEDIA} = process.env 

class RestMenuItem extends React.Component{


    remove = (dishid, ev) => {
        ev.stopPropagation()
        // console.debug("removing", dishid)
        this.props.delete( dishid, this.props.slug )
    }

    render(){
        const {slug} = this.props
        console.debug("Item slug:", slug, " props: ", this.props)
        let {
            dishid, 
            dishtitle, 
            dishtitledefault, 
            dishprice, 
            dishcategoryid,
            tags,
            index, 
            add, 
            filters = {},
            // quantity 
            // cartItem,
            cart
        } = this.props

        let quantity
        
        // get the required cart
        cart = cart[slug] || []

        const cartItem = cart.find( i => i.dishid === dishid )
        
        if(cartItem) 
            ({quantity} = cartItem )

        const item = { dishid, dishtitle, dishcategoryid, dishtitledefault, dishprice, tags, quantity: 1 }
        const isOrdered = quantity > 0
        console.debug("menu item render. quantity: ", quantity )
        
        return( 
            
                <div className={`rest-menu-item${ isOrdered  ? ' ordered' : "" }`} >

                    <div className="dish-index">
                        {index}
                    </div>
                    <Grid container key={`dish-${dishid}` }>
                        <Grid item xs={12} sm={9} className="dish-title-box">
                            <div className="title-main">
                                {dishtitle}
                            </div>
                            <div className="title-default">
                                {dishtitledefault}
                            </div>
                        </Grid>
                        { Array.isArray(tags) && <Grid item xs={12} className="tags">
                                {tags.map( t => {
                                    return <img src={`${MEDIA}/images/tags/${t}.png`} />
                                })}
                            </Grid>
                        }
                        
                        <Grid item xs={12} sm={3} className="price-container">
                            <div className="increment show-on-mobile">
                                {/* <Badge badgeContent={ isOrdered ? <><Lid className="lid"/>{quantity}</> : 0 } showZero={false} color="default" className="quantity-badge"  > */}
                                    {dishprice &&  
                                    <>
                                    <div className="button square plus"  onClick={ () => add( item, slug ) }>+</div>
                                        <div className={`button square black qty`}>{quantity || 0}</div> 
                                    <div className="button square" onClick={ ev => isOrdered ? this.remove(dishid, ev) : null }>-</div>
                                    <div className="button price">{`${dishprice}€`}</div>
                                    </>
                                    }
                                {/* </Badge> */}
                                {/* <div className={ isOrdered ? `button quantity positive` : 'button quantity'}>{isOrdered ? <Check /> : "" }</div> */}
                            </div>
                            
                            
                        </Grid>
                        

                    </Grid>
                </div>
            
        )
    }
}

export default connect(
    state => ({cart: state.cart, filters: state.filters}),
    dispatch => ({
        add: (item, slug) => dispatch( { type: A.ADD_TO_CART, payload: {item, slug} } ),
        delete: (dishid, slug) => dispatch( { type: A.DELETE_FROM_CART, payload: {dishid, slug} } )
    })
)(RestMenuItem)