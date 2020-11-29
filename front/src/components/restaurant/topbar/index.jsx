import React from 'react'
import './topbar.scss'

import {
    AppBar, 
    Button, 
    Container, 
    Grid, 
    MenuList, 
    MenuItem, 
    Select, 
    Paper, 
    Popper, 
    Grow,
    ClickAwayListener
} from '@material-ui/core'

import {LanguageOutlined, Menu as Hamburger, CloseRounded as Cancel, RestaurantMenuOutlined as RestMenu} from '@material-ui/icons';
import {ReactComponent as SearchIcon } from "../../../assets/svg/magnif.svg";
import Spinner from '../../template/common/Spinner';
import Search from '../../template/common/search';
// import CartWidget from '../../cart/cart-widget'
import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import {getRestaurant} from '../../../redux/reducers'

import {Link } from 'react-router-dom'
import { PhoneCall } from '../../template/common/icons';
const {REACT_APP_MEDIA : MEDIA} = process.env 


const txt = {
    "txt_menu": "Menu"
}

const _t = key => txt[key] ? txt[key] : key

class TopBar extends React.Component{

    state={
        showDropdownMenu : false,
        anchorEl: null
    }


    onSearch = value => {
        const {restaurant } = this.props
        if( restaurant ){
            console.debug("Setting search value for", restaurant.slug, "to", value)
            this.props.setFilter( restaurant.slug, "search", value )
        }
    }

    render(){
        const {
            language, lang,
            restaurant, 
            showSearch = true,
            showHamburger = true,
            showPhone = true,
            showMenuButton = false,
            closeButtonLink,
            onSearchUpdate= v => console.debug(" search" , v) 
        } = this.props 

        if( !restaurant )
            return <Spinner />

        const restState = getRestaurant(this.props, restaurant.slug)
        const {search = null } = restState.filters

        const {showDropdownMenu, anchorEl } = this.state
        // const anchorRef = React.createRef();
        const handleClose = () => this.setState({showDropdownMenu: false, anchorEl: null })

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
                            placeholder={"Search"} 
                            value={search}
                            onSearch = {this.onSearch}
                            />
                            }
                            {/* <CartWidget slug={restaurant.slug } className="hide-on-mobile"/> */}
                            {showPhone && restaurant.phone &&
                                <a className="button panel flex row align-items-center" href={`tel:${restaurant.phone}`}><PhoneCall /> +{restaurant.phone}</a>                            
                            }

                            {showMenuButton &&
                            <Button className="panel button" component={Link} to={`/${restaurant.slug}`}>
                                <RestMenu /> {_t("txt_menu")}
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
                                                    <MenuItem component={Link} to={`/${restaurant.slug}/reglament-1169`} onClick={handleClose}>Reglament (EU) №1169/2011 </MenuItem>
                                                    <MenuItem component={Link} to={`#`} onClick={handleClose}>Reservation</MenuItem>
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
                                    className="button panel row align-items-center"
                                    onClick={() => lang(null) }>
                                        <LanguageOutlined />{language}
                                    </Button>
                                </>
                            }
                        </div>
                        <div className="mobile-buttons show-on-mobile">
                            {showSearch && 
                            <Button><SearchIcon/></Button>
                            }
                            {showHamburger &&
                            <Button component={Link} to={`/${restaurant.slug}/options`}><Hamburger /></Button>                            
                            }
                            {closeButtonLink &&
                            <Button component={Link} to={closeButtonLink}><Cancel /></Button>                            
                            }
                        </div>
                    </Container>
                </AppBar>
        )
    }
}

// export default TopBar
export default connect(
    state => ({...state}),
    // null,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        setFilter: (slug , type, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type, value} } )
    })
)(TopBar)