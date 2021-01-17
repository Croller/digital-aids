import React from 'react'
// import { Link } from 'react-router-dom';
import { updateScroll } from '../../../../utils/functions';
import Social from '../../social';
// import CategoriesTop from './CategoriesTop';
// import {Title} from './CategoriesTop';
import './style.scss';
import {connect} from 'react-redux'
import A from '../../../../redux/actionTypes'
import { Button, Dialog, DialogContent } from '@material-ui/core';
import {Forbidden} from '../../../template/common/icons'

// MEDIA root
const {REACT_APP_MEDIA : MEDIA} = process.env 

// scroll top tracker
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
// root element
const root = document.getElementById("root")

class MenuItemList extends React.Component{

    render(){
        const {
            items, 
            category,
            prevCategory, nextCategory,
            Item,
            restState,
            slug,
            menu_id,
            needSecondTranslation,
            className,
            restaurant,
            language,
            socialMessage,
            categories, catIndex,
            // conditions = {},
            acceptCondition
        } = this.props;

        console.debug("MenuItemList: prevCat, nextCat:", prevCategory, nextCategory)

        const baseRoot = `/${slug}/${menu_id}/`;

        const cat = categories[catIndex] || {}
        const {conditions: category_conditions = null } = cat 
        
        
        const {conditions = {}} = restState;

        console.debug("state conditions:", conditions)
        console.debug("category_conditions:", category_conditions)
        const unacceptedConditions = category_conditions.filter(
            cond => !conditions[ cond.conditionid.toString() ]
        )
        // add the result to the unaccepted conditions, if any
        .map( cond => ({...cond, result: conditions[ cond.conditionid.toString() ] }) )

        console.debug("unacceptedConditions:", unacceptedConditions)

        const categoryConditionsNotAccepted = unacceptedConditions.length > 0
        const firstCondition = unacceptedConditions[0]

        return(
            <div className="category-content disable-scrollbars">
                
                {/* Hiding the top carousel for the time being...  */}
                {/* <CategoriesTop 
                    categories={categories}
                    currentIndex={catIndex}
                    menu_id={menu_id}
                    slug={slug}
                /> */}

            <div className="category-top left">
                <div className="category-title active left">
                    <span>{cat.title}</span>
                    {cat.title!== cat.titledefault && <span>{cat.titledefault}</span>}
                </div>
            </div>

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
                <div className="menu-items-list"
                    onScroll={({target}) => {
                        lastScrollTop = updateScroll(target, root, lastScrollTop )
                    }}
                >
                    <div className="item-list-inside">
                        {items.map( (dish, index)=> 
                            <div className={`menu-item-container ${className}`}>
                                <Item 
                                    key={`dish-item-${dish.dishid}`}
                                    index={index + 1}
                                    restState={restState}
                                    needSecondTranslation={needSecondTranslation}
                                    slug={slug}
                                    language = {language}
                                    tags_list={restaurant.tags}
                                    {...dish}
                                />
                            </div>
                        )}  
                    </div>

                    <Social {...{ ...restaurant }} message={socialMessage} />                  
                </div>

                {
                    // Condition accept dialog
                <Dialog
                className={`conditions-dialog${firstCondition && firstCondition.result === false ? ' hide' : '' }`}
                open={categoryConditionsNotAccepted}
                >
                    {firstCondition && firstCondition.result === false ? 
                    <Forbidden />
                    :     
                    <DialogContent>
                        
                        <img className="logo" alt={restaurant.title} 
                        title={restaurant.title} 
                        src={`${MEDIA}/images/restaurants/${slug}/${restaurant.image}`} 
                        />
                        
                        <div className="text">
                            {firstCondition && firstCondition.text}
                        </div>
                        <div className="prompt">
                            {firstCondition && firstCondition.prompt}
                        </div>
                        {/* <div className="buttons"> */}
                            <Button 
                            className="confirm" 
                            onClick={() => firstCondition && acceptCondition( firstCondition.conditionid, true, slug )}
                            >{firstCondition && firstCondition.confirm_button}</Button>
                            <Button 
                            className="decline"
                            onClick={() => firstCondition && acceptCondition( firstCondition.conditionid, false, slug )}
                            >{firstCondition && firstCondition.decline_button}</Button>
                        {/* </div> */}
                    </DialogContent>
                }
                </Dialog>
                }
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        acceptCondition: (condition_id, result, slug) => dispatch({type: A.ACCEPT_CONDITION, payload: {condition_id, result, slug}})
    })
)(MenuItemList)