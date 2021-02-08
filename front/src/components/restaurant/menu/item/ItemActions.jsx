import React from 'react';
import { connect } from 'react-redux';
import A from '../../../../redux/actionTypes';

const ItemActions = props => {
  const {
    add, 
    del, 
    item = {},
    slug,
    quantity,
    amount,
    pricefor,
    viewonly,
    AllergensButton,
  } = props;

  // console.debug("quantity props:", props)

  const { dishid, dishprice } = item;
  const isOrdered = quantity > 0;
    
  // remove item from cart
  const remove = (id, ev) => {
    ev.stopPropagation();
    del(id, slug);
  };

  return (
    <div className="item-actions">
      <div className="allergens-and-buttons">
        {AllergensButton}
        {dishprice && !viewonly
                && (
                  <>
                    <div className="increment show-on-mobile">   
                      <div className="button square plus" onClick={() => add(item, slug)}>+</div>
                      <div className="button square black qty">{quantity || 0}</div> 
                      <div className="button square" onClick={ev => (isOrdered ? remove(dishid, ev) : null)}>-</div>
                    </div>
                  </>
                )
        }
      </div>
      <div className="amount-and-price">
        <div className="">
          <div className="amount">{amount || pricefor}</div>
        </div>
        <div className="button price">{`${parseFloat(dishprice).toFixed(2)}€`}</div>
      </div>
    </div>

  // <div className="price-container">
  //      {dishprice && !viewonly &&
  //      <>
  //         <div className="increment show-on-mobile">   
  //                 <div className="button square plus"  onClick={ () => add( item, slug ) }>+</div>
  //                 <div className={`button square black qty`}>{quantity || 0}</div> 
  //                 <div className="button square" onClick={ ev => isOrdered ? remove(dishid, ev) : null }>-</div>
  //         </div>
  //         <div></div>
  //     </>
  //     }
  //     {
  //         viewonly && AllergensButton
  //     }
  //     {/* <div className="button price">{`${dishprice}€`}</div> */}
  //     <div className="button price">{`${parseFloat(dishprice).toFixed(2)}€`}</div>
  // </div>
  );
};

export default connect(
  null,
  dispatch => ({
    add: (item, slug) => dispatch({ type: A.ADD_TO_CART, payload: { item, slug } }),
    del: (dishid, slug) => dispatch({ type: A.DELETE_FROM_CART, payload: { dishid, slug } }),
  }),
)(ItemActions);
