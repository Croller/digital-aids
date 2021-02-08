import React from 'react';
import ActionTypes from '../../../../redux/actionTypes';
import DefaultComponent, { connect } from '../../../DefaultComponent';
// import DefaultComponent, {connect} from '../../../DefaultComponent'
import { Tick } from '../../../template/common/icons';
import './style.scss';

class ComplexCartItem extends DefaultComponent {
  render() {
    const {
      dishid,
      details,
      dishprice,
      Item,
      restState,
      restaurant,
      needSecondTranslation,
      slug,
      title, 
      default_title,
      language,
      details_index,
      deleteFromCart,
    } = this.props;
    
    const { all_dishes } = restaurant;

    const items = Object.values(details).map(d => (
      all_dishes[d] || {}
    ));

    console.debug('ComplexCartItem props', this.props);
    console.debug('Updated details', items);
        
    return (

      <div className="complex-item in-cart">
        <>
          <div className="category-top spread">
            <div className="category-title active">
              <span>{title}</span>
              {needSecondTranslation && <span>{default_title}</span>}
            </div>
            <div className="price-details">
              <div
                className="button square"
                onClick={() => deleteFromCart(slug, dishid, details_index)}
              >
                <Tick />
              </div>                            
              <div className="button">
                {parseFloat(dishprice).toFixed(2)}
                &euro;
              </div>
            </div>
          </div>
          <div className="menu-item-container">
            {items.map((item, index) => (
              <Item 
                key={`dish-item-${item.dishid}`}
                index={index + 1}
                restState={restState}
                needSecondTranslation={needSecondTranslation}
                slug={slug}
                language={language}
                tags_list={restaurant.tags}
                {...item}
              />
            ))}
          </div>
        </>
      </div>

    );
  }
}

export default connect(ComplexCartItem, 
  {
    deleteFromCart: (dispatch, slug, dishid, details_index) => dispatch({
      type: ActionTypes.DELETE_FROM_CART, 
      payload: { slug, dishid, details_index },
    }),
  });
