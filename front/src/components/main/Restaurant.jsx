import React from 'react'
import Service from '../../services/restaurants'
import { getRestaurant } from '../../redux/reducers'
import TopBar from '../restaurant/topbar'
import Footer from '../template/footer'
import Spinner from '../template/common/Spinner'
import { connect } from 'react-redux'
import A from '../../redux/actionTypes'
import Routes from '../routes'


import Cart from '../cart'
import Menus from '../restaurant'
import Details from '../restaurant/details'
import Options from '../restaurant/hamburger-menu'
import Reglament from '../restaurant/reglament'
import Insider from '../restaurant/insider'
import Lang from '../restaurant/language'
import P404 from '../template/404'

class Restaurant extends React.Component{
    state ={
        restaurant: null,
        previousPage: null,
        restState: null,
        tags_list: null
    }

    componentDidMount(){
        this.fetchData()
    }
    
    componentDidUpdate( prevProps ){
        console.log("Restaurant: did update", this.props)
        if( prevProps.language !== this.props.language 
            || this.props.computedMatch.slug !== prevProps.computedMatch.slug 
            // needed to update restaurant-related data in menus
            || this.props.restaurants !== prevProps.restaurants
            ){
            console.debug("Restaurant: Updating language from", prevProps.language,"to", this.props.language)
            this.fetchData()
        }
    }

    async fetchData(){
        console.log("Restaurant: Fetching data", this.props.computedMatch)
        const {slug} = this.props.computedMatch.params
        const {language = 'en', setLanguage} = this.props
        let restaurant = await Service.getRestaurant( slug, language )
        let restState = getRestaurant( this.props, slug )


        this.setState({restaurant, restState})

        if( language === null ){
            setLanguage( restaurant.defaultlanguage )
        }
    }

    updateOverlay = overlay => {
        const {slug} = this.props.computedMatch.params;
        if( slug ){
            this.props.setOverlay({slug, overlay});
        } else {
            console.error("setOverlay: slug not found!")
        }
    }

    render(){
        const {restaurant, restState } = this.state;
        const {slug, page} = this.props.computedMatch.params
        const {
            language, 
            previousPage,
            languageSelected
        } = this.props

        // console.debug("Restaurant: match", this.props.computedMatch.params)
        // console.debug("Restaurant slug:", slug)
         console.debug("Restaurant: restaurant", restaurant )

        if( restaurant === false ){
            console.debug("Restaurant: Returning 404")
            return <P404 />
        }
        /*
          showSearch = true,
            showHamburger = true,
            showPhone = true,
            showMenuButton = false,
            closeButtonLink
         */


       
        
        
        
        
        
        if( !restaurant  || !restState) return <Spinner />
        
        const {overlay} = restState;
        
        // let showSearch = overlay || page ? false : true;
        let showSearch = false // removing the search altogether
        
        const showHamburger = [
            "cart",
            "hamburger",
            "language"
        ].includes( overlay ) ? false : true;
        
        // will show the close button on the next pages:
        let closeButtonLink = 
        [
            "cart", 
            "hamburger",
            "language"
        ].includes( overlay ) ? previousPage || `/${slug}` : false; 
        

        if( (page === "language" || overlay === "language") && !languageSelected )
            closeButtonLink = false

        let menu_ids = []
        if( restaurant.menus.map ){
            menu_ids = restaurant.menus.map( m => m.menuid);
        }

        console.debug("Menu ids:", menu_ids)

        return (<>
            <TopBar {...{restaurant, closeButtonLink, showSearch, restState, showHamburger}}/>
            {overlay && 
            // additional class is added to show bottom menu over the overlay
                <div className={`overlay showing-${overlay}${overlay === "cart" ? ' under-bottom-menu' : "" } `}>
                    { overlay === "cart"  && <Cart {...{restaurant, slug, restState}} />}
                    { overlay === "hamburger"  && <Options {...{restaurant, slug, restState}} />}
                    { overlay === "language"  && <Lang {...{restaurant, slug, restState}} />}
                </div>
            }
            
            <div className="page-content flex-grow">
                
                { 
                // show routes only if not overlaying
                !overlay && 
                // (it is neded so that the oferta that shows for the first time don't pop over the overlay)
                <Routes 
                    routes ={
                        [
                            {exact: true, path:`/${slug}`, component: Menus,  restaurant, slug, restState },
                            // {exact: true, path:`/${slug}/cart`, component: Cart,  restaurant, slug, restState },
                            {exact: true, path:`/${slug}/details`, component: Details,  restaurant, slug, restState },
                            // {exact: true, path:`/${slug}/options`, component: Options,  restaurant, slug, restState },
                            {exact: true, path:`/${slug}/insider`, component: Insider,  restaurant, slug, restState },
                            // {exact: true, path:`/${slug}/language`, component: Lang,  restaurant, slug, restState },
                            {exact: true, path:`/${slug}/reglament-1169`, component: Reglament,  restaurant, slug, restState },
                            {exact: true, path:`/${slug}/:menu(${menu_ids.join("|")})/:category?`, component: Menus,  restaurant, slug, restState },
                            {exact: true, path:`/${slug}/*`, component: P404,  restaurant, slug, restState },
                        ]
                    }
                />
                 }

            </div>
            
            <Footer {...{...restaurant, slug}}/>
        </>)
    }
}

export default connect(
    state => state.app ,
    dispatch => ({
        setLanguage: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        // payload must be: {slug, overlay}
        setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })

    })
)(Restaurant)