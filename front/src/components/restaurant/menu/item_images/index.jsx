import { Badge, Button, Grid } from '@material-ui/core'
// import {Check, RoomService as Lid} from '@material-ui/icons'
import React from 'react'
import './style.scss'
import A from '../../../../redux/actionTypes'
import 
// Service, 
{tr} from '../../../../services/translations'
// import {getRestaurant} from '../../../../redux/reducers'
// import TagsService from '../../../../services/tags'
import {connect} from 'react-redux'
import Allergens from '../allergens';
import {Tick} from '../../../template/common/icons';


const {REACT_APP_MEDIA : MEDIA} = process.env 

class RestMenuItem extends React.Component{

    state = {
        // tag_list: null,
        showDialog: false
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

        const {showDialog} = this.state
        
        let {
            slug,
            dishid, 
            title, 
            default_title, 
            dishprice, 
            dishcategoryid,
            image = "no-image.jpg",
            pricefor, 
            amount,
            tags,
            index, 
            add, 
            needSecondTranslation = true,
            restState = {},
            
            tags_list,  // list of all allergens, translated to current language

            onSelect = console.debug, // callback for ComplexItem nested items.
            isSelected = false, // comes from ComplexItem and indicates whether the item is currently selected.

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

        const item = { 
            dishid, 
            title, 
            dishcategoryid, 
            default_title, 
            image, 
            dishprice,
            pricefor, 
            amount,
            tags, 
            quantity: 1 
        }
        const isOrdered = quantity > 0

        // console.debug("menu item render. quantity: ", quantity )
        
        const _tt = key => tr(key, language, translations )

        return( 
                <>
                <div className={`card-menu-item${ isOrdered  ? ' ordered' : "" }${ isSelected ? ` selected` : ''}`} >

                    
                    <Grid className="card-container" container key={`dish-${dishid}` }>
                        <Grid 
                            item xs={12} 
                            md={3} 
                            className="dish-image"
                            style={{backgroundImage: `url(${MEDIA}/images/restaurants/${slug}/dishes/${image})`}}
                            onClick={() => onSelect(item) }
                        >
                            <div className="dish-index">
                                {index}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6} className="dish-title-box flex column grow-children-1">
                            <div className="titles flex column">
                                <div className="flex row justify-between"
                                onClick={() => onSelect(item) }
                                >
                                    <div className="titles-inside">
                                        <div className="title-main">
                                            {title}
                                        </div>
                                        {
                                            needSecondTranslation &&
                                            <div className="title-default">
                                                {default_title}
                                            </div>
                                        }
                                    </div>
                                    <div className="checkmark">
                                        <div className={`button square`}>
                                            <Tick />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex row justify-between mt-2 align-items-end">
                                    <div>
                                        { tags && tags.length > 0 && 
                                            // <Badge
                                            // badgeContent={tags.length}
                                            // color="secondary"
                                            // >

                                                <Button 
                                                    onClick={()=> this.setState({showDialog: true })}
                                                    className="allergens-button"
                                                    variant="contained"
                                                >{_tt("Allergens")}</Button>
                                            // </Badge>
                                        }
                                    </div>
                                    {/* { Array.isArray(tags) && <div className="tags">
                                            {tags.map( t => {
                                                return <img key={`tag-${dishid}-${t}`} src={`${MEDIA}/images/tags/${t}.png`} alt={ tags_list && tags_list[t] ? tags_list[t].title : t } />
                                            })}
                                        </div>
                                    } */}
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
                                </div>

                                {/* {

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
                                    
                                } */}
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
                            <div className="button price">{`${parseFloat(dishprice).toFixed(2)}€`}</div>                            
                            
                        </Grid>
                        

                    </Grid>
                </div>
                <Allergens 
                    open={showDialog}
                    onClose = {() => this.setState({showDialog: false})}
                    tags={tags}
                    tags_list = {tags_list}
                    _t = {_tt}
                    dishid={dishid}
                    needSecondTranslation={needSecondTranslation}
                />
                </>
            
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