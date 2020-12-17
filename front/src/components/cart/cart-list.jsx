import React from 'react'
import ItemText from '../restaurant/menu/item'
import ItemImage from '../restaurant/menu/item_images'
import '../restaurant/menu/item_images/style.scss'

class CartList extends React.Component{

    render(){
        const {items = [], item_type="text", restState = {}, slug } = this.props
        console.debug("CartList slug:", slug)
        return(
            <div className="menu-items-list">
                {items.map((item, index) => <div key={`cart-item-${index}`} className={`menu-item-container ${ item_type==="images" ? 'template-images' : "" }`}>
                    {item_type === "text" ?  
                    <ItemText key={`cart-item-${index}`} {...{...item, restState}} index={index+1} slug={slug}/> : 
                    <ItemImage key={`cart-item-${index}`} {...{...item, restState}} index={index+1} slug={slug} /> }
                </div>)}
            </div>            
        )
    }
}

export default CartList