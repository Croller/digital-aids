import React from 'react'
import { Badge, Box, Button, Container } from '@material-ui/core'
import {
    // LanguageOutlined as World, 
    // RoomServiceOutlined as Cloche, 
    // PhoneInTalkOutlined as Phone
} from '@material-ui/icons'
import {Cloche, PhoneCall as Phone, World, Plate } from '../common/icons'
import {NavLink as Link, Link as ALink} from 'react-router-dom'
// import {connect} from 'react-redux'
import A from '../../../redux/actionTypes'
import {getRestaurant} from '../../../redux/reducers'
// import Service, {_T, tr} from '../../../services/translations'
import './footer.scss'
import DefaultComponent, {connect} from '../../DefaultComponent'



const txt = {
    'my_order': "My order",
    "callus": "Call us"

}

// class Footer extends React.Component{
class Footer extends DefaultComponent{
    
    constructor(props){
        super(props);

        this.setTranslations(["Order"])
    }
    // state = {
    //     translations: null
    // }

    // componentDidMount(){
    //     this.fetchData()
    
    // }
    
    // componentDidUpdate( prevProps ){
    //     if( prevProps.language !== this.props.language){
    //         this.fetchData()
    //     }    
    // }
    
    // async fetchData(){
    //     const translations = await Service.getByKeys(
    //         [
    //             // "CallUs",
    //             "Order", 
    //         ],
    //         this.props.language,
    //         this.props.defaultlanguage
    //     )

    //     this.setState({translations})
    // }

    render(){
        const {slug, language, translations } = this.props

        const restState = getRestaurant( this.props, slug )
        // console.debug("footer restState:", restState )
        const { cartCount} = restState

        // const translations = this.state.translations || {}

        // const _t = _T( translations, language, defaultlanguage )
        const _tt = (key, defaultValue) => this._tr(key, language, translations, defaultValue)

        return(
            <Box className="footer panel rectangular show-on-mobile" >
                {/* &copy;&nbsp;Food & Fans, 2020 */}
                <Container>
                <div className="mobile-footer">
                    <Button component={Link} to={`/${slug}/insider`}><Plate/><span>FOODTIPS</span></Button>
                    
                    <Button component={Link} to={`/${slug}/cart`}>
                        <Badge badgeContent={cartCount} showZero={false} className="badge-quantity">
                            <Cloche/>
                        </Badge>
                        <span>
                            {_tt("Order")}
                        </span>
                    </Button>

                    <Button component={Link} to={`/${slug}/language`} back={`/${slug}/cart`}><World/>
                        <span>
                            {language}
                        </span>
                    </Button>
                    {/* <Button component={ALink} to={`tel: +${phone}`}>
                        <Phone/>
                        <span>{_t("CallUs", 1)}</span>
                    </Button> */}
                </div>
                </Container>
            </Box>
        )
    }
}

export default connect(Footer)

// export default connect(
//     state => ({...state.app, translations: state.translation}), //({language: state.language, cart: state.cart }),
//     dispatch => ({
//         lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
//     })
// )(Footer)