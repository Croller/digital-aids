import React from 'react'
import './style.scss'

class MenuItemList extends React.Component{

    render(){
        const {
            items, 
            category,
            Item,
            restState,
            slug,
            needSecondTranslation,
            className
        } = this.props;

        return(
            <div className="category-content disable-scrollbars">
                <div className="category-header">
                    <span>{category.title}</span>
                    {needSecondTranslation && <span>{category.titledefault}</span>}
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
                </div>
            </div>
        )
    }
}

export default MenuItemList