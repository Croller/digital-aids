import {
  Button, Container, Dialog, DialogContent, 
} from '@material-ui/core';
// import {Link} from 'react-router-dom'
// import {ChevronLeft} from '@material-ui/icons'
import React from 'react';
// import Service from '../../services/restaurants'
// import TranslService, {_T, transl, tr} from '../../services/translations'
import { Close } from '@material-ui/icons';
import Spinner from '../template/common/Spinner';
import ErrorPage from '../template/common/error-loading';
// import Topbar from '../restaurant/topbar'
// import Menu from '../restaurant/menu'
// import {connect} from 'react-redux'
import A from '../../redux/actionTypes';
// import {getRestaurant} from '../../redux/reducers'
// import Redirect from '../template/common/redirect'

import './cart.scss';
import { Trash, ChefHead } from '../template/common/icons';
// import Footer from '../template/footer'
import Social from '../restaurant/social';
import CartList from './cart-list';
// import { Link } from 'react-router-dom'
import { updateScroll } from '../../utils/functions';
import DefaultComponent, { connect } from '../DefaultComponent';

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// root element
const root = document.getElementById('root');

const EmptyOrder = ({
  closeCart, button_text = 'Menu', text, text2, 
}) => (
  <div className="panel empty-cart-message">
    <div className="round-icon">
      <ChefHead />
    </div>
    <p>
      {text}
    </p>
    <p>
      {text2}
    </p>

    {/* <Button component={Link} to={menu_link}>{button_text}</Button> */}
    <Button onClick={closeCart}>{button_text}</Button>
  </div>
);

// class Cart extends React.Component{
class Cart extends DefaultComponent {
    state = {
      // restaurant: null,
      translations: null,
      showClearDialog: false,
    }

    constructor(props) {
      super(props);
      this.setTranslations(
        [
          'MyOrder',
          'Total', 
          'ThankForOrder',
          'ThankYou',
          'WantToClearEntireOrder',
          'askToConfirm',
          'Remove',
          'Do Not',
          'empty_order_text1',
          'empty_order_text2',
          'Allergens',
          'reglament_text_2',
          'reglament_text_3',
        ],
      );
    }

    render() {
      const { showClearDialog } = this.state;
      const {
        language, restaurant, restState, emptyCart, slug, translations, 
      } = this.props;
        
      const { cart, cartPrice } = restState;
      const cartIsEmpty = !cart || cart.length === 0;

      // console.debug("Cart slug:", slug, "props: ", this.props)
      if (!restaurant || !translations) {
        return restaurant === null ? <Spinner /> : <ErrorPage />;
      }

      if (!this.state.translationLoaded) return <Spinner />;
        
      // shortcuts for dialog handling
      const closeDialog = () => this.setState({ showClearDialog: false });
      const showDialog = () => this.setState({ showClearDialog: true });

      const type = (restaurant && restaurant.defaulttemplate) ? restaurant.defaulttemplate : 'text';

      return (
           
        <>
                
          <div
            key={`cart-${slug}`}
            className={`cart flex-grow template-${type}`}
            onScroll={({ target }) => {
              lastScrollTop = updateScroll(target, root, lastScrollTop);
            }}
          >
            <div className="cart-header flex row align-items-center space-between bg-white">
              <div className="title">
                {this.TR('MyOrder')}
              </div>
              {cart.length > 0
                        && <Button aria-label="Empty cart" className="empty-cart" onClick={showDialog}><Trash /></Button>
              }
            </div>
            { restaurant 
              ? !cartIsEmpty
                ? (
                  <>
                    <div className="bg-light-gray p2 rounded top-message">
                      {this.TR('askToConfirm')}
                    </div>
                    {/* <Menu {...{menu: cart, slug, categories, show_categories: false }}/> */}
                    <CartList 
                      items={cart} 
                      restState={{ cart }} 
                      slug={slug} 
                      item_type={restaurant.defaulttemplate}
                      restaurant={restaurant}
                      language={language}

                      total={(
                        <div className="total flex row align-items-center space-between">
                          <span>
                            {this.TR('Total')}
                            :
                          </span>
                          <span className="button ">
                            {(cartPrice * 1).toFixed(2)}
                            €
                          </span>
                        </div>
                      )}
                    />
                            
                  </>
                )
                : (
                  <EmptyOrder 
                    text={this.TR('empty_order_text1')}
                    text2={this.TR('empty_order_text2')}
                    // menu_link={`/${slug}`}
                    closeCart={() => this.props.setOverlay({ overlay: null, slug })}
                  />
                ) 

              : <Spinner />
            }
                    
            <Social {...{ ...restaurant }} message={cartIsEmpty ? this.TR('ThankYou') : this.TR('ThankForOrder')} />
          </div>
          <Dialog 
            open={showClearDialog}
            onClose={closeDialog}  
            className="dialog" 
          >
            <Close className="close-button" onClick={closeDialog} />
            <DialogContent className="text">
              { this.TR('WantToClearEntireOrder')}
            </DialogContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
              <Button className="bg-black c-white" onClick={() => { emptyCart(slug); closeDialog(); }}>{this.TR('Remove')}</Button>
              <Button className="bg-light-gray" onClick={closeDialog}>{this.TR('Do Not')}</Button>
            </div>
          </Dialog>
        </>
      );
    }
}

// export default connect(
//     state => ({...state.app, translations: state.translation } ),
//     dispatch => ({
//         lang: payload => dispatch( {type: A.SET_LANGUAGE, payload }),
//         emptyCart: payload => dispatch( {type: A.CLEAR_CART, payload } ),
//         setOverlay: payload => dispatch( {type: A.SET_OVERLAY, payload })
//     })
// )(Cart)

export default connect(Cart, {
  emptyCart: (dispatch, payload) => dispatch({ type: A.CLEAR_CART, payload }),
});
