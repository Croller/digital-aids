import React from 'react';
// import {connect} from 'react-redux';
import DefaultComponent, {connect} from '../../DefaultComponent';
import CssCarousel from '../../template/common/css-carousel';
import Spinner from '../../template/common/Spinner';
import {Paper, Grid} from '@material-ui/core'
import Item from './item'
import ItemImages from './item_images'
import Social from '../social'

const templates = {
    text: Item,
    images: ItemImages
}


class CarouselMenu extends DefaultComponent{

    _catList = React.createRef()
    _mainCarousel = React.createRef()

    constructor(props){
        super(props)
        super.setTranslations([
            "Menu","ThankYou"
        ])
    }

    render(){
        let 
        { 
            menu: menu_id, 
            category, 
            restaurant,
            language,
            restState = {}
        } = this.props;
        
        // cast to integer
        menu_id = menu_id ? parseInt(menu_id) : menu_id;

        if( !restaurant ){
            return <Spinner />
        }

        // get default language
        const {
            defaultlanguage
        } = restaurant

        
        // get current menu
        const menu = menu_id ? restaurant.menus.find(m => {
            return m.menuid === menu_id
        } ) : restaurant.menus[0]

        // get categories and items from menu
        const { 
            categories = [] ,
            items = []
        } = menu || {}

        const translationRequired = defaultlanguage !== language

        // select single item component
        let ItemComponent = Item
        if (restaurant && restaurant.defaulttemplate) {
            ItemComponent = templates[restaurant.defaulttemplate]
        }

        // fetch search filter
        let { 
            search 
        } = (restState.filters || {})
        search = search ? search.toLowerCase() : search


        return (
            <div >
                Menu { menu && menu.title} | {category} 
                <CssCarousel
                ref={this._catList}
                >
                    {categories.map( (c,i) => <div key={`cat-${i}`}>
                        <div>{c.title}</div>
                        {translationRequired &&  <div>{c.titledefault}</div> }
                    </div>)}
                </CssCarousel>
                <CssCarousel
                ref={this._catList}
                >
                    {categories.map( (cat,i) => <div key={`cat-contents-${i}`}>
                    <div> {/* need  this div here to fix sticky header on safari*/ }
                        <Paper className="category-body panel" >
                            <Grid container spacing={2} className="menu-items-list">
                                {items.filter(d => d.dishcategoryid === cat.id &&
                                    (
                                        // etiher search is empty
                                        !search
                                        // or 
                                        ||
                                        // title or default title include search term  
                                        (
                                            d.title.toLowerCase().includes(search) ||
                                            d.default_title.toLowerCase().includes(search)
                                        )
                                    )
                                ).map(
                                    (dish, index) => {
                                        // let cartItem = cart.find( i => i.dishid === dish.dishid )
                                        // cartItem = {...cartItem} //copy...
                                        // const quantity = cartItem ? cartItem.quantity : null;

                                        return (
                                            <Grid item xs={12} key={`menuitem-${index}`} className="menu-item-container" >
                                                {/* <Item                                                 */}
                                                <ItemComponent
                                                    index={index + 1}
                                                    // cartItem={cartItem}
                                                    // quantity={quantity} 
                                                    restState={restState}
                                                    needSecondTranslation={translationRequired}
                                                    slug={restaurant.slug}
                                                    {...dish}
                                                />
                                            </Grid>
                                        )
                                    }
                                )}
                            </Grid>
                            <Social {...restaurant}/>
                        </Paper>
                    </div>
                    </div>)}
                </CssCarousel>
            </div>
        )
    }
}

export default connect(CarouselMenu);