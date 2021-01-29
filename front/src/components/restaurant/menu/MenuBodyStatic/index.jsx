import React from 'react'
// import CssCarousel from '../../../template/common/css-carousel'
import './style.scss'
import '../../../template/common/css-carousel/css-carousel.scss'
import SimpleItem from '../item'
import ImageItem from '../item_images'
import MenuItemList from './MenuItemList'

// import ErrorLoading from '../../../template/common/error-loading'
import Page404 from '../../../template/404'
// import A from '../../../../redux/actionTypes'
import DefaultComponent, {connect} from '../../../DefaultComponent'
import Spinner from '../../../template/common/Spinner'
import { Link } from 'react-router-dom'
import {ChevronLeft} from '../../../template/common/icons'
import { makeMenuLink } from '../../../../utils/functions'
// import { Dialog, DialogContent } from '@material-ui/core'
// import { randomFromArray } from '../../../../utils/functions'
// import Oferta from '../../oferta'


const templates = {
    'text': SimpleItem,
    'images': ImageItem
}


/**
 * Renders just one category at a time, no carousel.
 * Created to replace the non-yet-working carousel template in MenuBody component
 */
// class MenuBody extends React.Component {
class MenuBody extends DefaultComponent {

    
    render() {
        const {
            menu,
            restState,
            restaurant,
            language,
            category,
            socialMessage // message to show at the bottom of each category in social block
        } = this.props;

        if( !restaurant ) return <Spinner />

        let {
            search } = (restState.filters || {})
        search = search ? search.toLowerCase() : search

        const needSecondTranslation = restaurant.defaultlanguage !== language;

        const type = (restaurant && restaurant.defaulttemplate) ? restaurant.defaulttemplate : "text"
        const Item = templates[type];

        
        const catIndex = menu.categories.findIndex( c => c.id === category )
        const cat = catIndex >= 0 ? menu.categories[catIndex] : null;
        const prevCategory = catIndex >= 0 ? menu.categories[catIndex - 1] : null;
        const nextCategory = catIndex >= 0 ? menu.categories[catIndex + 1] : null;
        
        if( !cat) {
            console.debug("MenuBody " , menu.menuid, "category not found: ", category, cat, menu.categories)
            // return <ErrorLoading {...{restaurant}} />
            return <Page404 {...{restaurant}} />
        }

        const {all_dishes = {} } = restaurant || {};

        let items = menu.items
        .filter(d => d.dishcategoryid === category            
        ) .map( 
            // fetch dish from dishes list
            d => all_dishes[d.dishid] 
            // if not found - use the original object
            // TODO: do something with this, there should be an error or something.
            || d )

        // Search if search is activated
        if( search ){
            items = items.filter( d => 
                    d.title.toLowerCase().includes(search) ||
                    d.default_title.toLowerCase().includes(search)
            )
        }

        const showBackToMainMenuButton = 
            // is not a main menu
            menu.mainmenu !== 1 && 
            // and has more than once category
            menu.categories.length > 1;


        return (
            <>
            <div id="menus-carousel" >
                <div className="menu-wrapper">
                    <div
                        id="menu-carousel-body"
                        // useJs
                        className={`menu-body category-carousel template-${type}` }
                        // slidesCssClass="disable-scrollbars"
                    >           
                        {
                            showBackToMainMenuButton &&
                            <div className="menu-title">
                                <Link className="back-button" to={makeMenuLink(restaurant.slug)}>
                                    <ChevronLeft />
                                </Link>
                                {menu.title}
                            </div>
                        }                 
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
                                socialMessage,
                                categories: menu.categories,
                                catIndex
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* <Dialog
                open={Boolean(oferta)}
                onClose={() => this.setState({oferta: false })}
                fullWidth
                className="oferta-dialog"
            >
                <DialogContent>
                    <Oferta {...oferta} slug={restaurant.slug} onClose={() => this.setState({oferta: false })} />
                </DialogContent>
            </Dialog> */}
            </>
        )
    }
}

export default connect(MenuBody, 
    // {
    //     showOferta: (dispatch, payload) => dispatch({type: A.OFERTA_IS_SHOWN, payload })
    // }
)