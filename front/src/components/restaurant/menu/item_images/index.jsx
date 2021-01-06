import { Badge, Button, Grid } from '@material-ui/core'
// import {Check, RoomService as Lid} from '@material-ui/icons'
import React from 'react'
import './style.scss'
import A from '../../../../redux/actionTypes'
import Service, {tr} from '../../../../services/translations'
// import {getRestaurant} from '../../../../redux/reducers'
// import TagsService from '../../../../services/tags'
import {connect} from 'react-redux'
const {REACT_APP_MEDIA : MEDIA} = process.env 

class RestMenuItem extends React.Component{

    state = {
        tag_list: null
    }
    
    // componentDidMount() {
    //     this.fetchTranslations()
    // }

    // fetchTranslations = () => {
    //     Service.getByKeys([
    //         "Allergens"
    //     ],
    //     this.props.language
    //     )
    // }


    remove = (dishid, ev) => {
        ev.stopPropagation()
        // console.debug("removing", dishid)
        this.props.delete( dishid, this.props.slug )
    }

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
            image = "no-image.jpg",
            tags,
            index, 
            add, 
            needSecondTranslation = true,
            restState = {},

            language, 
            translations
            
        } = this.props
        // console.debug("Item slug:", slug, " props: ", this.props)
        // const restState = getRestaurant( reduxState, slug)
        // console.debug("restState", restState)
        let quantity
        
        // get the required cart
        const {cart = [] } = restState

        const cartItem = cart.find( i => i.dishid === dishid )
        
        if(cartItem) 
            ({quantity} = cartItem )

        const item = { dishid, title, dishcategoryid, default_title, image, dishprice, tags, quantity: 1 }
        const isOrdered = quantity > 0
        // console.debug("menu item render. quantity: ", quantity )
        
        const _tt = key => tr(key, language, translations )

        return( 
            
                <div className={`card-menu-item${ isOrdered  ? ' ordered' : "" }`} >

                    
                    <Grid className="card-container" container key={`dish-${dishid}` }>
                        <Grid 
                            item xs={12} 
                            md={3} 
                            className="dish-image"
                            style={{backgroundImage: `url(${MEDIA}/images/restaurants/${slug}/dishes/${image})`}}
                        >
                        </Grid>
                        <Grid item xs={12} md={6} className="dish-title-box flex row p2">
                            <div className="dish-index">
                                {index}
                            </div>
                            <div className="titles flex column align-items-start p-2">
                                <div className="title-main">
                                    {title}
                                </div>
                                {
                                    needSecondTranslation &&
                                    <div className="title-default">
                                        {default_title}
                                    </div>
                                }
                                {

                                    tags.length > 0 && 
                                    <>
                                    <div className="title-allergens">{_tt("Allergens")}</div>
                                    { Array.isArray(tags) && <div className="tags">
                                        {tags.map( t => {
                                            return <img src={`${MEDIA}/images/tags/${t}.png`} alt={ tags_list && tags_list[t] ? tags_list[t].title : t } />
                                        })}
                                    </div>
                                    }
                                    </>
                                }
                            </div>
                        
                        </Grid>
                        
                        <Grid item xs={12} md={3} className="price-container flex row justify-end align-items-start">
                            <div className="increment show-on-mobile flex-grow">
                                {/* <Badge badgeContent={ isOrdered ? <><Lid className="lid"/>{quantity}</> : 0 } showZero={false} color="default" className="quantity-badge"  > */}
                                    {dishprice && dishprice !== undefined &&
                                    <>
                                    <div className="button square plus"  onClick={ () => add( item, slug ) }>+</div>
                                        <div className={`button square black qty`}>{quantity || 0}</div> 
                                    <div className="button square" onClick={ ev => isOrdered ? this.remove(dishid, ev) : null }>-</div>
                                    
                                    </>
                                    }
                                {/* </Badge> */}
                                {/* <div className={ isOrdered ? `button quantity positive` : 'button quantity'}>{isOrdered ? <Check /> : "" }</div> */}
                            </div>
                            <div className="button price">{`${dishprice}€`}</div>                            
                            
                        </Grid>
                        

                    </Grid>
                </div>
            
        )
    }
}

export default connect(
    // state => ({cart: state.cart, filters: state.filters}),
    // state => ({reduxState: state}),
    state => ({language: state.app.language, translations: state.translation}),
    dispatch => ({
        add: (item, slug) => dispatch( { type: A.ADD_TO_CART, payload: {item, slug} } ),
        delete: (dishid, slug) => dispatch( { type: A.DELETE_FROM_CART, payload: {dishid, slug} } )
    })
)(RestMenuItem)