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

    // state = {
    //     oferta: null
    // }

    // componentDidMount(){
    //     this.selectOferta()
    // }
    // componentDidUpdate(oldProps){
    //     if( oldProps.category !== this.props.category ){
    //         this.selectOferta()
    //     }
    // }

    // selectOferta(){

    //     const {
    //         restState,
    //         restaurant,
    //         category            
    //     } = this.props;

    //     const {ofertaIsShown} = restState
    //     console.debug("oferta category:", category )

    //     // ofertas are either ofertas for this category...
    //     const ofertas = 
    //     restaurant.ofertas[category] ?   
    //     restaurant.ofertas[category] :
    //     // or, if oferta hasn't been shown, 
    //     !ofertaIsShown ? 
    //     // ofertas for no category
    //     restaurant.ofertas[""] : 
    //     // otherwise, just nothing
    //     null

    //     console.debug("ofertas array:", ofertas)
    //     // if ofertas is not empty, select one randomly
    //     if( ofertas && ofertas.length > 0 ){
    //         const oferta = randomFromArray( ofertas, 1 )[0];
    //         if( oferta ){
    //             // set redux value
    //             this.props.showOferta(restaurant.slug);
    //         }
    //         this.setState({oferta})
    //     } else 
    //         this.setState({oferta: false})
    // }

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
            console.debug("MenuBody " , menu.menuid, "category not found: ", category, cat, menu.categories)
            // return <ErrorLoading {...{restaurant}} />
            return <Page404 {...{restaurant}} />
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

        // get oferta to show, if any
        // const {oferta} = this.state            

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