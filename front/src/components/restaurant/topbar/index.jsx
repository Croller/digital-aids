import React from 'react'
import './topbar.scss'
import {AppBar, Container, Grid, MenuItem, Select} from '@material-ui/core'
import {LanguageOutlined} from '@material-ui/icons';
import Spinner from '../../template/common/Spinner'
import CartWidget from '../../cart/cart-widget'

class TopBar extends React.Component{

    render(){
        const {language, restaurant} = this.props 

        if( !restaurant )
            return <Spinner />

        return(

            <AppBar variant="elevation" elevation={6} color="inherit">
                    <Container className="top-bar-contents">                            
                        <div className="title">{restaurant.title}</div>
                    
                    
                        <CartWidget slug={restaurant.slug } className="hide-on-mobile"/>
                        {restaurant.languages &&
                            <>
                            <LanguageOutlined />
                            <Select
                            value={language}
                            onChange={ (ev, newVal, a) => this.props.lang (newVal.props.value)  }
                            >
                                {restaurant.languages.split(",").map( l => 
                                    <MenuItem key={`lang-${l}`} value={l}>{l}</MenuItem>
                                )}
                            
                            </Select>
                            </>
                        }
                    </Container>
                </AppBar>
        )
    }
}

export default TopBar