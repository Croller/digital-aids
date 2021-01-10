import React from 'react'
// import CssCarousel from '../../../template/common/css-carousel'
import './style.scss'
import '../../../template/common/css-carousel/css-carousel.scss'
import SimpleItem from '../item'
import ImageItem from '../item_images'
import MenuItemList from './MenuItemList'
import ErrorLoading from '../../../template/common/error-loading'

const templates = {
    text: SimpleItem,
    images: ImageItem
}


/**
 * Renders just one category at a time.
 */
class MenuBody extends React.Component {

    render() {
        const {
            menu,
            restState,
            restaurant,
            language,
            category,
            socialMessage // message to show at the bottom of each category in social block
        } = this.props;

        let {
            search } = (restState.filters || {})
        search = search ? search.toLowerCase() : search

        const needSecondTranslation = restaurant.defaultlanguage !== language;

        const type = (restaurant && restaurant.defaulttemplate) ? restaurant.defaulttemplate : "text"
        const Item = templates[type];

        // const cat = menu.categories.find( c => c.id === category )
        const catIndex = menu.categories.findIndex( c => c.id === category )
        const cat = catIndex >= 0 ? menu.categories[catIndex] : null;
        const prevCategory = catIndex >= 0 ? menu.categories[catIndex - 1] : null;
        const nextCategory = catIndex >= 0 ? menu.categories[catIndex + 1] : null;
        
        if( !cat) {
            console.debug("MenuBody: category not found: ", category, cat)
            return <ErrorLoading {...{restaurant}} />
        }

        const items = menu.items.filter(d => d.dishcategoryid === category &&
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
        ); 
            

        return (
            <div id="menus-carousel" >
                <div className="menu-wrapper">

                    <div
                        id="menu-carousel-body"
                        // useJs
                        className={`menu-body category-carousel template-${type}` }
                        // slidesCssClass="disable-scrollbars"
                    >                            
                        <MenuItemList
                            className={``}
                            // key={`menu-item-list-${ind}`}
                            {...{
                                restaurant,
                                restState,
                                menu_id : menu.menuid ,
                                needSecondTranslation,
                                slug: restaurant.slug,
                                items,
                                Item,
                                category: cat,
                                prevCategory, nextCategory,
                                language,
                                socialMessage
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuBody