/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Button, Dialog } from '@material-ui/core';
import Social from '../../social';
// import CategoriesTop from './CategoriesTop';
// import {Title} from './CategoriesTop';
import './style.scss';
import A from '../../../../redux/actionTypes';
import { Clock, Forbidden } from '../../../template/common/icons';
import Oferta from '../../oferta';
import ComplexItem from '../complex_item';
import { updateScroll, randomFromArray } from '../../../../utils/functions';

// MEDIA root
const { REACT_APP_MEDIA: MEDIA } = process.env; 

// scroll top tracker
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
// root element
const root = document.getElementById('root');

const DialogContent = ({ children }) => <div className="dialog-content content">{children}</div>;

class MenuItemList extends React.Component {
    state = {
      oferta: null,
      // conditionsAccepted: true,
      // categoryConditionsNotAccepted: null, 
      categoryConditionsAcceptance: true,
      firstCondition: null, 
      cat: null,
    }

    componentDidMount() {
      this.selectOferta();
      this.checkConditions();
    }

    componentDidUpdate({ category }) {
      if (category.id !== this.props.category.id) {
        this.selectOferta();
        this.checkConditions();
      }
    }

    selectOferta() {
      const {
        restState,
        restaurant,
        category,            
      } = this.props;

      const { ofertaIsShown } = restState;
      console.debug('oferta category:', category.id);

      // ofertas are either ofertas for this category...
      const ofertas = restaurant.ofertas[category.id]   
        ? restaurant.ofertas[category.id]
        // or, if oferta hasn't been shown, 
        : !ofertaIsShown 
        // ofertas for no category
          ? restaurant.ofertas[''] 
        // otherwise, just nothing
          : null;

      console.debug('ofertas array:', ofertas);
      // if ofertas is not empty, select one randomly
      if (ofertas && ofertas.length > 0) {
        const oferta = randomFromArray(ofertas, 1)[0];
        if (oferta) {
          // set redux value
          console.debug('selected oferta:', oferta);
          // this.props.showOferta(restaurant.slug);
        }
        this.setState({ oferta });
      } else this.setState({ oferta: false });
    }

    checkConditions() {
      const {
        categories, 
        catIndex,
        restState, 
      } = this.props;

      const cat = categories[catIndex] || {};
      const { conditions: category_conditions = null } = cat; 
        
      const { conditions = {} } = restState;

      console.debug('state conditions:', conditions);
      console.debug('category_conditions:', category_conditions);
      const unacceptedConditions = category_conditions.filter(
        cond => !conditions[cond.conditionid.toString()],
      )
        // add the result to the unaccepted conditions, if any
        .map(cond => ({ ...cond, result: conditions[cond.conditionid.toString()] }));

      console.debug('unacceptedConditions:', unacceptedConditions);

      const categoryConditionsNotAccepted = unacceptedConditions.length > 0;
      const firstCondition = unacceptedConditions[0];

      this.setState({
        // categoryConditionsNotAccepted, 
        firstCondition, 
        cat,
        categoryConditionsAcceptance: categoryConditionsNotAccepted ? null : true, // acceptance is empty if there is a condition to accept
      });
    }

    render() {
      const {
        items, 
        // category,
        prevCategory, nextCategory,
        Item,
        restState,
        slug,
        // menu_id,
        needSecondTranslation,
        className,
        restaurant,
        language,
        // categories,
        // catIndex,
        // conditions = {},
        // acceptCondition,
            
        // message texts
        socialMessage,
        timeText, 
        notificationText,
      } = this.props;

      console.debug('MenuItemList: prevCat, nextCat:', prevCategory, nextCategory);

      // const baseRoot = `/${slug}/${menu_id}/`;

      // get oferta to show, if any,
      // get conditions details,
      // get category itself
      const {
        oferta,
        // categoryConditionsNotAccepted, 
        categoryConditionsAcceptance,
        firstCondition,
        cat = {},
      } = this.state; 

      return (
        <div className="category-content disable-scrollbars">
                
          {/* Hiding the top carousel for the time being...  */}
          {/* <CategoriesTop 
                    categories={categories}
                    currentIndex={catIndex}
                    menu_id={menu_id}
                    slug={slug}
                /> */}

          { 
            // only if category is fetched
            cat
            
                && (
                  <div className="category-top left">
                    <div className="category-title active left">
                      <span>{cat.title}</span>
                      {cat.title !== cat.titledefault && <span>{cat.titledefault}</span>}
                    </div>
                  </div>
                )
          }

          {/* <div className="category-header">
                    { prevCategory && 
                    <Link to={`${baseRoot}${prevCategory.id}`} className="prev">
                        <span className="active">{prevCategory.title}</span>
                        {needSecondTranslation && <span className="active">{prevCategory.titledefault}</span>}
                    </Link>}
                    
                    <div className="active">
                        <span className="active">{category.title}</span>
                        {needSecondTranslation && <span className="active">{category.titledefault}</span>}
                    </div>
                    
                    { nextCategory && 
                    <Link className="next" to={`${baseRoot}${nextCategory.id}`}>
                        <span className="active">{nextCategory.title}</span>
                        {needSecondTranslation && <span className="active">{nextCategory.titledefault}</span>}
                    </Link>}
                </div> */}
          <div
            className="menu-items-list"
            onScroll={({ target }) => {
              lastScrollTop = updateScroll(target, root, lastScrollTop);
            }}
          >
            {timeText && (
              <div className="working-hours-message top-message time">
                <Clock />
                {timeText}
              </div>
            ) }
            {notificationText && <div className="notification-message top-message">{notificationText}</div>}
            <div className="item-list-inside">
              {items.map((dish, index) => (
                <div className={`menu-item-container ${className}`}>
                  {
                    // if no price details - use the passed item.
                    dish.pricedetails === null 
                      ? (
                        <Item 
                          key={`dish-item-${dish.dishid}`}
                          index={index + 1}
                          restState={restState}
                          needSecondTranslation={needSecondTranslation}
                          slug={slug}
                          language={language}
                          tags_list={restaurant.tags}
                          {...dish}
                        />
                      )
                      : (
                        <ComplexItem
                          key={`dish-item-${dish.dishid}`}
                          index={index + 1}
                          restState={restState}
                          needSecondTranslation={needSecondTranslation}
                          slug={slug}
                          language={language}
                          tags_list={restaurant.tags}
                          // pass the Item component to complex dish
                          Item={Item}
                          {...dish}
                        />
                      )
                  }
                </div>
              ))}  
            </div>

            <Social {...{ ...restaurant }} message={socialMessage} />                  
          </div>

          <Dialog
            className={
              `conditions-dialog${firstCondition && firstCondition.result === false ? ' hide' 
                : categoryConditionsAcceptance === false ? ' declined'
                  : ''}
                    `}
            // open={categoryConditionsNotAccepted}
            open={categoryConditionsAcceptance !== true}
          >
            {/* Uncomment the next line to get the thing working with redux state, multiple conditions and once per session */}
            {/* {firstCondition && firstCondition.result === false ?  */}
            { categoryConditionsAcceptance === false 
              ? <Forbidden />
              : (
                <DialogContent>
                        
                  <img
                    className="logo"
                    alt={restaurant.title} 
                    title={restaurant.title} 
                    src={`${MEDIA}/images/restaurants/${slug}/${restaurant.image}`} 
                  />
                        
                  <div className="text">
                    {firstCondition && firstCondition.text}
                  </div>
                  <div className="prompt">
                    {firstCondition && firstCondition.prompt}
                  </div>
                  <div className="buttons">
                    {/* <div className="buttons"> */}
                    <Button 
                      className="confirm" 
                      // There was a decision to make the condition appear every time user gets to the category.
                      // To make it accepted once per session, uncomment the next line and comment the setState one.
                      // onClick={() => firstCondition && acceptCondition( firstCondition.conditionid, true, slug )}
                      onClick={() => this.setState({ categoryConditionsAcceptance: true })}
                    >
                      {firstCondition && firstCondition.confirm_button}
                    </Button>
                    <Button 
                      className="decline"
                      // There was a decision to make the condition appear every time user gets to the category.
                      // To make it accepted once per session, uncomment the next line and comment the setState one.
                      // onClick={() => firstCondition && acceptCondition( firstCondition.conditionid, false, slug )}
                      onClick={() => this.setState({ categoryConditionsAcceptance: false })}
                    >
                      {firstCondition && firstCondition.decline_button}
                    </Button>
                    {/* </div> */}
                  </div>
                </DialogContent>
              )
            }
          </Dialog>

          <Dialog
            // show if there is an oferta + conditions were accepted with true
            open={Boolean(oferta) && categoryConditionsAcceptance === true}
            onClose={() => this.setState({ oferta: false })}
            fullWidth
            className="oferta-dialog"
          >
            <DialogContent>
              <Oferta {...oferta} slug={restaurant.slug} onClose={() => this.setState({ oferta: false })} />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
}

export default connect(
  null,
  dispatch => ({
    acceptCondition: (condition_id, result, slug) => dispatch({ type: A.ACCEPT_CONDITION, payload: { condition_id, result, slug } }),
    showOferta: payload => dispatch({ type: A.OFERTA_IS_SHOWN, payload }),
  }),
)(MenuItemList);
