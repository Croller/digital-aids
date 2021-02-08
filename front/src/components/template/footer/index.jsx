import React from 'react';
import {
  Badge, Box, Button, Container, 
} from '@material-ui/core';
import {
// LanguageOutlined as World, 
// RoomServiceOutlined as Cloche, 
// PhoneInTalkOutlined as Phone
} from '@material-ui/icons';
import { NavLink as Link } from 'react-router-dom';
import {
  Cloche, World, Plate, 
} from '../common/icons';
// import {connect} from 'react-redux'
import { getRestaurant } from '../../../redux/reducers';
// import Service, {_T, tr} from '../../../services/translations'
import './footer.scss';
import DefaultComponent, { connect } from '../../DefaultComponent';

// class Footer extends React.Component{
class Footer extends DefaultComponent {
  constructor(props) {
    super(props);

    this.setTranslations(['Order']);
  }
  
    setOverlay = overlay => this.props.setOverlay({ overlay, slug: this.props.slug })

    render() {
      const { slug, language } = this.props;

      const restState = getRestaurant(this.props, slug);
      // console.debug("footer restState:", restState )
      const { cartCount } = restState;

      return (
        <Box className="footer panel rectangular show-on-mobile">
          {/* &copy;&nbsp;Food & Fans, 2020 */}
          <Container>
            <div className="mobile-footer">
              <Button
                component={Link}
                to={`/${slug}/insider`}
                // to close other overlays, if any
                onClick={() => this.setOverlay(null)}
              >
                <Plate />
                <span>FOODTIPS</span>
              </Button>
                    
              <Button 
                // component={Link} to={`/${slug}/cart`}
                onClick={() => this.setOverlay('cart')}
                className={cartCount > 0 ? 'cart-has-dishes' : ''}
              >
                <Badge badgeContent={cartCount} showZero={false} className="badge-quantity">
                  <Cloche />
                </Badge>
                <span>
                  {this.TR('Order')}
                </span>
              </Button>

              <Button 
                // component={Link} to={`/${slug}/language`} back={`/${slug}/cart`}
                onClick={() => this.setOverlay('language')}
              >
                <World />
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
      );
    }
}

export default connect(Footer);

// export default connect(
//     state => ({...state.app, translations: state.translation}), //({language: state.language, cart: state.cart }),
//     dispatch => ({
//         lang: payload => dispatch( {type: A.SET_LANGUAGE, payload })
//     })
// )(Footer)
