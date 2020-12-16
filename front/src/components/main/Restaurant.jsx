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
        restState: null
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
        const {language, setLanguage} = this.props
        let restaurant = await Service.getRestaurant( slug, language )
        let restState = getRestaurant( this.props, slug )
        this.setState({restaurant, restState})

        if( language === null ){
            setLanguage( restaurant.defaultlanguage )
        }
    }

    render(){
        const {restaurant, previousPage, restState } = this.state;
        const {slug, page} = this.props.computedMatch.params
        const {language} = this.props

        console.debug("Restaurant: match", this.props.computedMatch.params)
        console.debug("Restaurant slug:", slug)
         

        if( restaurant === false ){
            console.debug("Returning 404")
            return <P404 />
        }
        /*
          showSearch = true,
            showHamburger = true,
            showPhone = true,
            showMenuButton = false,
            closeButtonLink
         */

        // will show the close button on the next pages:
        let closeButtonLink = 
        [
            "cart", 
            "options",
            "language"
        ].includes( page ) ? previousPage || `/${slug}` : false; 
        
        let showSearch = page ? false : true;

        if( page === "language" && language === null )
            closeButtonLink = false


        if( !restaurant  || !restState) return <Spinner />

        return (<>
            <TopBar {...{restaurant, closeButtonLink, showSearch, restState}}/>
                <div className="page-content flex-grow">
                    
                    <Routes 
                        routes ={
                            [
                                {exact: true, path:`/${slug}`, component: Menus,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/cart`, component: Cart,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/details`, component: Details,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/options`, component: Options,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/insider`, component: Insider,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/language`, component: Lang,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/reglament-1169`, component: Reglament,  restaurant, slug, restState },
                                {exact: true, path:`/${slug}/*`, component: P404,  restaurant, slug, restState },
                            ]
                        }
                    />

                </div>
            <Footer {...{...restaurant, slug}}/>
        </>)
    }
}

export default connect(
    state => state.app ,
    dispatch => ({
        setLanguage: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(Restaurant)