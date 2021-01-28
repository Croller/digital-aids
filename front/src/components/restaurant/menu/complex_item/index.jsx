import React from 'react'
import { Button } from '@material-ui/core';
import DefaultComponent, {connect} from '../../../DefaultComponent';
import A from '../../../../redux/actionTypes'
import Spinner from '../../../template/spinner';
import './style.scss';

/**
 * A complex item like Daily Menu.
 * Consists of a single price and an array of categories with dishes.
 * Only one dish per category can be selected.
 * 
 * The 
 */
class ComplexItem extends DefaultComponent{


    state = {
        ...super.state,
        selected: {},
        selected_ids: []
    }

    constructor(props){
        super(props)
        this.setTranslations([
            "price",
            "Add to my order",
            "includingBreadAndDrinks"
        ])
    }

    // Select specific dish in category
    onSelect = (dish ) => {
        console.debug("ComplexItem selected:", dish)
        let {selected, selected_ids} = this.state

        // update selected items
        selected = {
            ...selected,
            [dish.dishcategoryid] : dish.dishid // one item per category
        }

        selected_ids = Object.values(selected)

        this.setState({
            selected, selected_ids            
        })
    }

    addToOrder = () => {

        // TODO: warn if not all categories are selected


        const {dishid, dishprice, slug} = this.props

        console.debug(this.state.selected)

        this.props.addToCart( {
            item: {
                dishid, 
                dishprice,
                // details is the ids of categories and corresponding selected items
                details: this.state.selected,
                quantity: 1
            },
            slug // restaurant slug
        } )

        // clear form
        this.setState({
            selected: {},
            selected_ids: []
        })
    }

    render(){

        const {
        pricedetails = [],
        dishprice,
        Item,
        restState,
        needSecondTranslation,
        slug,
        language,
        tags_list
        } = this.props

        const { translationLoaded, selected_ids } = this.state

        if( !translationLoaded ) return <Spinner />

        console.debug("ComplexItem pricedetails", pricedetails)
        return(<div className="complex-item">
            {
                // each element is a category with items
                pricedetails.map( cat => {
                    console.debug("ComplexItem: cat", cat)
                    
                    return (
                    <>
                        <div className="category-top left">
                            <div className="category-title active left">
                                <span>{cat.title}</span>
                                {cat.title!== cat.default_title && <span>{cat.default_title}</span>}
                            </div>
                        </div>
                        <div className="menu-item-container">
                            {cat.items.map( (item, index) => 
                                <Item 
                                key={`dish-item-${item.dishid}`}
                                index={index + 1}
                                restState={restState}
                                needSecondTranslation={needSecondTranslation}
                                slug={slug}
                                language = {language}
                                tags_list={tags_list}
                                onSelect={this.onSelect}
                                isSelected={ selected_ids.includes(item.dishid) }
                                {...item}
                                />
                            )}
                        </div>
                    </>
                    )
                })
            }

            <div className="complex-item-footer">
                <div className="price-title">{this.TR('price')}</div>
                <div className="price-text">
                    <span>{parseFloat(dishprice).toFixed(2)}&euro;</span>
                    <span>{this.TR('includingBreadAndDrinks')}</span>
                </div>
                <Button 
                onClick={this.addToOrder}
                disabled={selected_ids.length === 0}
                >{this.TR('Add to my order')}</Button>
            </div>
            </div>
          )
    }
}

export default connect(ComplexItem, {
    addToCart: (dispatch, payload ) => dispatch({type: A.ADD_TO_CART, payload }) 
})