import React from 'react'
import ItemText from '../restaurant/menu/item'
import ItemImage from '../restaurant/menu/item_images'
import '../restaurant/menu/item_images/style.scss'

class CartList extends React.Component{

    render(){
        const {
            items = [], 
            item_type="text", 
            restState = {}, 
            slug, 
            language,
            restaurant,
            total
        } = this.props

        const needSecondTranslation = restaurant ? restaurant.defaultlanguage !== language : true;

        const Item = item_type === "text" ? ItemText : ItemImage;

        console.debug("CartList slug:", slug)
        return(
            <div className="menu-items-list">
                <div className="item-list-inside">
                    {items.map((item, index) => <div key={`cart-item-${index}`} className={`menu-item-container ${ item_type==="images" ? 'template-images' : "" }`}>
                        <Item 
                            key={`cart-item-${item.dishid}`}
                            index={index + 1}
                            restState={restState}
                            needSecondTranslation={needSecondTranslation}
                            slug={slug}
                            language = {language}
                            tags_list={restaurant.tags}
                            {...item}
                        />
                        {/* {item_type === "text" ?  
                        <ItemText key={`cart-item-${index}`} {...{...item, restState}} index={index+1} slug={slug}/> : 
                        <ItemImage key={`cart-item-${index}`} {...{...item, restState}} index={index+1} slug={slug} /> 
                        } */}
                        
                    </div>)}
                        
                    {total}
                </div>
            </div>            
        )
    }
}

export default CartList