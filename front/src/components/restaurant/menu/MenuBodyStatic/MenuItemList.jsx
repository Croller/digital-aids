import React from 'react'
import { Link } from 'react-router-dom';
import Social from '../../social';
import './style.scss';

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
            restaurant
        } = this.props;

        console.debug("MenuItemList: prevCat, nextCat:", prevCategory, nextCategory)

        const baseRoot = `/${slug}/${menu_id}/`;

        return(
            <div className="category-content disable-scrollbars">
                <div className="category-header">
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
                </div>
                <div className="menu-items-list">
                    {items.map( (dish, index)=> 
                        <div className={`menu-item-container ${className}`}>
                            <Item 
                                key={`dish-item-${dish.dishid}`}
                                index={index + 1}
                                restState={restState}
                                needSecondTranslation={needSecondTranslation}
                                slug={slug}
                                {...dish}
                            />
                        </div>
                    )}  

                    <Social {...{ ...restaurant }} message=""/>                  
                </div>
            </div>
        )
    }
}

export default MenuItemList