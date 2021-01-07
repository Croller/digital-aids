import React from 'react'
import './topbar.scss'
import Service, {tr} from '../../../services/translations'

import {
    AppBar, 
    Button, 
    Container, 
    // Grid, 
    MenuList, 
    MenuItem, 
    // Select, 
    // Paper, 
    Popper, 
    Grow,
    ClickAwayListener
} from '@material-ui/core'

import {CloseRounded as Cancel, RestaurantMenuOutlined as RestMenu} from '@material-ui/icons';

import Spinner from '../../template/common/Spinner';
import Search from '../../template/common/search';
import MobileSearch from '../../template/common/search/mobile';
// import CartWidget from '../../cart/cart-widget'
import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import {getRestaurant} from '../../../redux/reducers'

import {Link } from 'react-router-dom'
import { PhoneCall, World, Search as SearchIcon, Hamburger } from '../../template/common/icons';
const {REACT_APP_MEDIA : MEDIA} = process.env 


// const txt = {
//     "txt_menu": "Menu"
// }

// const _t = key => txt[key] ? txt[key] : key

class TopBar extends React.Component{

    state={
        showDropdownMenu : false,
        anchorEl: null
    }

    componentDidMount(){
        this.fetchTranslations();
    }

    componentDidUpdate( prevProps ){
        if(prevProps.language !== this.props.language ){
            this.fetchTranslations()
        }
    }

    fetchTranslations(){
        Service.getByKeys([
            "Menu",
            "Reservation",
            "reglament_1169",
            "Search"
        ], this.props.language )
    }


    onSearch = value => {
        const {restaurant } = this.props
        if( restaurant ){
            console.debug("Setting search value for", restaurant.slug, "to", value)
            this.props.setFilter( restaurant.slug, "search", value )
        }
    }

    updateOverlay = overlay => this.props.setOverlay({overlay, slug: this.props.restaurant.slug})

    render(){
        const {
            language, lang,
            restaurant, 
            showSearch = true,
            showHamburger = true,
            showPhone = true,
            showMenuButton = false,
            closeButtonLink,
            onSearchUpdate= v => console.debug(" search" , v) ,
            translations,
            restState
        } = this.props 

        if( !restaurant )
            return <Spinner />

        // const restState = getRestaurant(this.props, restaurant.slug)
        const {search = null } = restState.filters

        const {showDropdownMenu, anchorEl } = this.state
        // const anchorRef = React.createRef();
        const handleClose = () => this.setState({showDropdownMenu: false, anchorEl: null })

        const _t = key => tr(key, language, translations );

        return(

            <AppBar color="inherit" className="top-bar">
                    <Container className="top-bar-contents">                            
                        <Link to={`/${restaurant.slug}/details`} className="title">
                            {
                                restaurant.image ? 
                                <img alt={restaurant.title} 
                                title={restaurant.title} 
                                src={`${MEDIA}/images/restaurants/${restaurant.slug}/${restaurant.image}`} 
                                /> : restaurant.title
                            }
                        </Link>

                        <div className="bar-items hide-on-mobile">
                            {showSearch && 
                            <Search 
                            className="search-container reverse" 
                            // onChange={onSearchUpdate} 
                            placeholderText={ _t("Search") } 
                            value={search}
                            onSearch = {this.onSearch}
                            />
                            }
                            {/* <CartWidget slug={restaurant.slug } className="hide-on-mobile"/> */}
                            {showPhone && restaurant.phone &&
                                <a className="button panel flex row align-items-center icon-left" href={`tel:${restaurant.phone}`}><PhoneCall /> +{restaurant.phone}</a>                            
                            }

                            {showMenuButton &&
                            <Button className="panel button" component={Link} to={`/${restaurant.slug}`}>
                                {/* <RestMenu />  */}
                                {_t("Menu")}
                            </Button>                            
                            }
                            
                            {showHamburger &&
                            <>
                                <Button  
                                onClick={ ev => this.setState({showDropdownMenu: !showDropdownMenu, anchorEl: ev.target })}
                                className="button panel row align-items-center"
                                // ref={anchorRef}
                                >
                                    <Hamburger />
                                </Button>
                                <Popper anchorEl={anchorEl} open={showDropdownMenu} disablePortal transition>
                                {({ TransitionProps, placement }) => (

                                    <Grow 
                                        {...TransitionProps}
                                        style={{ transformOrigin: "right top"}} 
                                    >
                                        <div className="panel"
                                        id="dropdown-menu"                                         
                                        >
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={showDropdownMenu}>
                                <MenuItem component={Link} to={`/${restaurant.slug}/reglament-1169`} onClick={handleClose}>{_t("reglament_1169")}</MenuItem>
                                                    <MenuItem component={Link} to={`#`} onClick={handleClose}>{_t("Reservation")}</MenuItem>
                                                    <MenuItem component={Link} to={`/${restaurant.slug}/insider`} onClick={handleClose}>Foodans Insider</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </div>
                                    </Grow>
                                )}
                                </Popper>
                            </>

                            // <Button  className="button panel row align-items-center" component={Link} to={`/${restaurant.slug}/options`}><Hamburger /></Button>                            
                            }
                            {restaurant.languages &&
                                <>
                                    <Button 
                                    className="button panel row align-items-center icon-left"
                                    // onClick={() => lang(null) }>
                                    component={Link}
                                    to={`/${restaurant.slug}/language`}
                                    >
                                        <World />{language}
                                    </Button>
                                </>
                            }
                        </div>
                        <div className="mobile-buttons show-on-mobile">
                            {showSearch && 
                              <MobileSearch
                                placeholderText={ _t("Search") } 
                                value={search}
                                onSearch = {this.onSearch}
                              />
                            }
                            {showHamburger &&
                            <Button 
                            // component={Link} 
                            // to={`/${restaurant.slug}/options`}
                            onClick={() => this.updateOverlay("hamburger")}
                            ><Hamburger /></Button>                            
                            }
                            {closeButtonLink &&
                            <Button component={Link} to={closeButtonLink} 
                            onClick={() => this.updateOverlay(null)}
                            ><Cancel /></Button>                            
                            }
                        </div>
                    </Container>
                </AppBar>
        )
    }
}

// export default TopBar
export default connect(
    state => ({...state.app, translations: state.translation}),
    // null,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        setFilter: (slug , type, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type, value} } ),
        setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })

    })
)(TopBar)