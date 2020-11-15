import React from 'react'
import {Badge} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {RoomService as Cloche} from '@material-ui/icons'
import './cart-widget.scss'
import {connect} from 'react-redux'

class CartWidget extends React.Component{

    render(){
        
        const {count, slug, ...other } = this.props
        return(
            <Link to={`/${slug}/cart`} {...other}>
                <Badge className="cart-widget" badgeContent={count}>
                    <Cloche />
                </Badge>
            </Link>
        )
    }
}

export default connect(
    state =>  ({ count: state.cartCount } )
)(CartWidget)