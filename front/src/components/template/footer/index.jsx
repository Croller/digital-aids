import React from 'react'
import { Badge, Box, Button, Container } from '@material-ui/core'
import {
    // LanguageOutlined as World, 
    // RoomServiceOutlined as Cloche, 
    // PhoneInTalkOutlined as Phone
} from '@material-ui/icons'
import {Cloche, PhoneCall as Phone, World } from '../common/icons'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import {getRestaurant} from '../../../redux/reducers'
import './footer.scss'


const txt = {
    'my_order': "My order",
    "callus": "Call us"

}

class Footer extends React.Component{

    render(){
        const {slug, lang, language } = this.props

        const restState = getRestaurant( this.props, slug )
        console.debug("footer restState:", restState )
        const { cartCount} = restState

        return(
            <Box className="footer panel rectangular" >
                {/* &copy;&nbsp;Food & Fans, 2020 */}
                <Container>
                <div className="mobile-footer">
                    <Button onClick={() => lang(null)}><World/>{language}</Button>
                    <Button component={Link} to={`/${slug}/cart`}>
                        <Badge badgeContent={cartCount} showZero={false} className="badge-quantity">
                            <Cloche/>
                        </Badge>
                        {txt['my_order']}
                    </Button>
                    <Button><Phone/>{txt['callus']}</Button>
                </div>
                </Container>
            </Box>
        )
    }
}

export default connect(
    state => state, //({language: state.language, cart: state.cart }),
    dispatch => ({
        lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
    })
)(Footer)