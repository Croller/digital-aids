import React from 'react'
import Item from '../item';
import ImageItem from '../item_images';
import './style.scss';


/**
 * A complex item like Daily Menu.
 * Consists of a single price and an array of categories with dishes.
 * Only one dish per category can be selected.
 * 
 * The 
 */
class ComplexItem extends React.Component{


    // Select specific dish in category
    onSelect = dish => {
        console.debug("ComplexItem selected:", dish)

    }

    render(){

        const {
        pricedetails = [],
        Item,
        restState,
        needSecondTranslation,
        slug,
        language,
        tags_list
        } = this.props

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
                                {...item}
                                />
                            )}
                        </div>
                    </>
                    )
                })
            }
            </div>
          )
    }
}

export default ComplexItem