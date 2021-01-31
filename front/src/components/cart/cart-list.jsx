import React from 'react'
import ComplexCartItem from '../restaurant/menu/complex_item/ComplexCartItem'
import ItemText from '../restaurant/menu/item'
import ItemImage from '../restaurant/menu/item_images'
import '../restaurant/menu/item_images/style.scss'
import Spinner from '../template/spinner'

class CartList extends React.Component{

    // state = {
    //     items: null
    // }

    // componentDidMount(){
    //     this.parseItems();
    // }

    // componentDidUpdate(prevProps){

    // }

    // parseItems = () => {
        
    //     let {items = [], restaurant = {} } = this.props
    //     // get all dishes
    //     const {all_dishes = 
    //         {} } = restaurant;

    //     // get dish details from all_dishes,
    //     // but add quantity and pricedetails from cart item
    //     items = items.map( i => ({ 
    //         ...all_dishes[ i.dishid ], 
    //         quantity: i.quantity, 
    //         details: i.details 
    //     }) )

    //     this.setState({items})
    // }

    render(){
        let {
            items = [], 
            item_type="text", 
            restState = {}, 
            slug, 
            language,
            restaurant,
            total
        } = this.props

        if( items === null ) return  <Spinner className="flex flex-column align-items-center" />

        const needSecondTranslation = restaurant ? restaurant.defaultlanguage !== language : true;

        const Item = item_type === "text" ? ItemText : ItemImage;

        const {all_dishes, menus} = restaurant;

        // update items fom all_dishes
        items = items.map( i => (
            {
                ...i, 
                // shallow-overwrite the item with corresponding item from all_dishes.
                // this preserves quantity and details, but overwrites translations and prices
                ...(all_dishes[i.dishid] || {} ) 
            } ) )

        console.debug("Updated items:", items)

        // console.debug("CartList slug:", slug)
        return(
            <div className="menu-items-list">
                <div className="item-list-inside">
                    {
                        menus.map && menus.map( menu => {
                            // get only this menu's items
                            const menu_items = items.filter( i => i.dishmenuid == menu.menuid );

                            return(
                                <>
                                {/* if more than one category, state menu name in one language */}
                                { menu.categories && menu.categories.length > 1 &&
                                    <div className="menu-title">{menu.title}</div>}

                                        {
                                        menu_items.length > 0 && menu_items.map((item, index) => 
                                        <div key={`cart-item-${index}`} className={`menu-item-container ${ item_type==="images" ? 'template-images' : "" }`}>
                                        {
                                            item.details && item.details.map ? 
                                            // details is an array of complex items details. 
                                            // So iterate through it.
                                            item.details.map( (details_item, details_index) => 
                                                <ComplexCartItem 
                                                    key={`cart-item-${item.dishid}-detail-${details_index}`}
                                                    details_index={details_index}
                                                    restState={restState}
                                                    needSecondTranslation={needSecondTranslation}
                                                    slug={slug}
                                                    language = {language}
                                                    Item= {Item}
                                                    restaurant = {restaurant}
                                                    // pass item itself as parent item...
                                                    {...item}
                                                    // ...but details from the iteration as details
                                                    details={details_item}
                                                />
                                                )
                                            :

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
                                        }
                                        {/* {item_type === "text" ?  
                                        <ItemText key={`cart-item-${index}`} {...{...item, restState}} index={index+1} slug={slug}/> : 
                                        <ItemImage key={`cart-item-${index}`} {...{...item, restState}} index={index+1} slug={slug} /> 
                                        } */}
                                        
                                    </div>)}
                                </>
                            )
                        })
                    }
                            
                        
                    {total}
                </div>
            </div>            
        )
    }
}

export default CartList