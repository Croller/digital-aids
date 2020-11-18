import React from 'react'
import { Badge, Box, Button } from '@material-ui/core'
import {
    // LanguageOutlined as World, 
    // RoomServiceOutlined as Cloche, 
    // PhoneInTalkOutlined as Phone
} from '@material-ui/icons'
import {Cloche, PhoneCall as Phone, World } from '../common/icons'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import './footer.scss'

class Footer extends React.Component{

    render(){
        const {slug, lang, language, cart } = this.props

        const currentCart = cart[slug] || []

        return(
            <Box className="footer panel rectangular" >
                {/* &copy;&nbsp;Food & Fans, 2020 */}
                <div className="mobile-footer">
                    <Button onClick={() => lang(null)}><World/>{}</Button>
                    <Button component={Link} to={`/${slug}/cart`}>
                        <Badge badgeContent={cart.length} showZero={false} className="badge-quantity">
                            <Cloche/>
                        </Badge>
                    </Button>
                    <Button><Phone/></Button>
                </div>
            </Box>
        )
    }
}

export default connect(
    state => ({language: state.language, cart: state.cart }),
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(Footer)