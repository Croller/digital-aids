import React from 'react'
import './topbar.scss'
import {AppBar, Button, Container, Grid, MenuItem, Select} from '@material-ui/core'
import {LanguageOutlined, Menu as Hamburger, CloseRounded as Cancel} from '@material-ui/icons';
import {ReactComponent as SearchIcon } from "../../../assets/svg/magnif.svg";
import Spinner from '../../template/common/Spinner';
import Search from '../../template/common/search';
import CartWidget from '../../cart/cart-widget'
import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import {Link } from 'react-router-dom'
const {REACT_APP_MEDIA : MEDIA} = process.env 

class TopBar extends React.Component{


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
            closeButtonLink,
            onSearchUpdate= v => console.debug(" search" , v) 
        } = this.props 

        if( !restaurant )
            return <Spinner />

        return(

            <AppBar color="inherit" className="panel rectangular">
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
                            onSearch = {this.onSearch}
                            />
                            }
                            {/* <CartWidget slug={restaurant.slug } className="hide-on-mobile"/> */}
                            {restaurant.languages &&
                                <>
                                
                                <Button onClick={() => lang(null) }><LanguageOutlined />{language}</Button>
                                {/* <Select
                                value={language}
                                onChange={ (ev, newVal, a) => this.props.lang (newVal.props.value)  }
                                >
                                    {restaurant.languages.map( l => 
                                        <MenuItem key={`lang-${l.id}`} value={l.id}>{l.id}</MenuItem>
                                    )}
                                
                                </Select> */}
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
    // state => ({...state})
    null,
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
        setFilter: (slug , type, value ) => dispatch( {type: A.SET_FILTER, payload: {slug , type, value} } )
    })
)(TopBar)