import React from 'react';
import CssCarousel from '../../../template/common/css-carousel';
import './style.scss';
import SimpleItem from '../item';
import ImageItem from '../item_images';
import MenuItemList from './MenuItemList';

const templates = {
  text: SimpleItem,
  images: ImageItem,
};

class MenuBody extends React.Component {
  render() {
    const {
      menu,
      restState,
      restaurant,
      language,
      category,
    } = this.props;

    let { search } = (restState.filters || {});
    search = search ? search.toLowerCase() : search;

    const needSecondTranslation = restaurant.defaultlanguage !== language;

    const type = (restaurant && restaurant.defaulttemplate) ? restaurant.defaulttemplate : 'text';
    const Item = templates[type];

    return (
      <div id="menus-carousel">
        <div className="menu-wrapper">

          <CssCarousel
            id="menu-carousel-body"
            useJs
            className={`menu-body category-carousel template-${type}`}
            slidesCssClass="disable-scrollbars"
          >
            {menu.categories.map((cat, ind) => {
              const items = menu.items.filter(d => d.dishcategoryid === cat.id
                                && (
              // etiher search is empty
                                  !search
                                    // or 
                                    ||
                                    // title or default title include search term  
                                    (
                                      d.title.toLowerCase().includes(search)
                                        || d.default_title.toLowerCase().includes(search)
                                    )
                                ));

              return (
                <MenuItemList
                  className=""
                  key={`menu-item-list-${ind}`}
                  {...{
                    restState,
                    needSecondTranslation,
                    slug: restaurant.slug,
                    items,
                    Item,
                    category: cat,
                  }}
                />
              );
            })}
          </CssCarousel>
        </div>
      </div>
    );
  }
}

export default MenuBody;
