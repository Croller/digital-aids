import React from 'react';
// import CssCarousel from '../../../template/common/css-carousel'
import './style.scss';
import '../../../template/common/css-carousel/css-carousel.scss';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SimpleItem from '../item';
import ImageItem from '../item_images';
import MenuItemList from './MenuItemList';

// import ErrorLoading from '../../../template/common/error-loading'
import Page404 from '../../../template/404';
// import A from '../../../../redux/actionTypes'
import DefaultComponent, { connect } from '../../../DefaultComponent';
import Spinner from '../../../template/common/Spinner';
import ErrorPage from '../../../template/common/error-loading';
import { ChevronLeft } from '../../../template/common/icons';
import { makeMenuLink, updateScroll } from '../../../../utils/functions';
// import { Dialog, DialogContent } from '@material-ui/core'
// import { randomFromArray } from '../../../../utils/functions'
// import Oferta from '../../oferta'

const templates = {
  text: SimpleItem,
  images: ImageItem,
};

// scroll top tracker
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
// root element
const root = document.getElementById('root');

/**
 * Renders just one category at a time, no carousel.
 * Created to replace the non-yet-working carousel template in MenuBody component
 */
// class MenuBody extends React.Component {
class MenuBody extends DefaultComponent {
  componentDidMount() {
    this.prepareNotificationsTranslation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.menu !== this.props.menu) {
      this.prepareNotificationsTranslation();
    }
  }

  prepareNotificationsTranslation() {
    // these are two menu-level notifications that are shown within category.
    // have to translate them here and send down the chain to all categories.
    const {
      timetranslationid,
      notificationtranslationid,
    } = this.props.menu || {};

    if (timetranslationid || notificationtranslationid) {
      // set the translations to be fetched
      this.setTranslations([
        timetranslationid,
        notificationtranslationid,
      ].filter(Boolean), // remove empty elements
      );

      // fetch them and update state when done
      this.fetchTranslations().then( 
        result => this.setState({ translationLoaded: Boolean(result) }),
      );
    }
  }
    
  render() {
    const {
      menu,
      restState,
      restaurant,
      language,
      category,
      socialMessage, // message to show at the bottom of each category in social block

      setOverlay, // from DefaultComponent 
    } = this.props;

    if (!restaurant) return <Spinner />;

    let { search } = (restState.filters || {});
    search = search ? search.toLowerCase() : search;

    const needSecondTranslation = restaurant.defaultlanguage !== language;

    const type = (restaurant && restaurant.defaulttemplate) ? restaurant.defaulttemplate : 'text';
    const Item = templates[type];
        
    const catIndex = menu.categories.findIndex(c => c.id === category);
    const cat = catIndex >= 0 ? menu.categories[catIndex] : null;
    const prevCategory = catIndex >= 0 ? menu.categories[catIndex - 1] : null;
    const nextCategory = catIndex >= 0 ? menu.categories[catIndex + 1] : null;
        
    if (!cat) {
      console.debug('MenuBody ', menu.menuid, 'category not found: ', category, cat, menu.categories);
      // return <ErrorLoading {...{restaurant}} />
      return <Page404 {...{ restaurant }} />;
    }

    const { all_dishes = {} } = restaurant || {};

    let items = menu.items
      .filter(d => d.dishcategoryid === category).map( 
        // fetch dish from dishes list
        d => all_dishes[d.dishid] 
            // if not found - use the original object
            // TODO: do something with this, there should be an error or something.
            || d,
      );

    // Search if search is activated
    if (search) {
      items = items.filter(d => d.title.toLowerCase().includes(search)
                    || d.default_title.toLowerCase().includes(search));
    }

    const showBackToMainMenuButton = 
            // show the button if:
            // it is not a main menu
            menu.mainmenu !== 1 
            // and it has more than one category
            && menu.categories.length > 1;

    const {
      timetranslationid,
      notificationtranslationid,
    } = menu;

    const { translationLoaded } = this.state;
    console.debug( 
      'MenuBodyStatic: translations',
      timetranslationid,
      notificationtranslationid,
      translationLoaded, 
    );
    if ((timetranslationid || notificationtranslationid) && !translationLoaded) return translationLoaded === false ? <ErrorPage /> : <Spinner />;

    // translate working hours and notifiaction messages.
    let timeText; let 
      notificationText; 
    if (timetranslationid) timeText = this.TR(timetranslationid);

    if (notificationtranslationid) notificationText = this.TR(notificationtranslationid);

    return (
      <>
        <div
          id="menus-carousel"
          className={showBackToMainMenuButton ? 'secondary-menu' : ''} 
          onScroll={
            ({ target }) => {
              // only detect scroll if the menu is a secondary menu:
              // in this case it has to scroll together with top titles
              if (showBackToMainMenuButton) lastScrollTop = updateScroll(target, root, lastScrollTop);
            }
          }
        >
          <div className="menu-wrapper">
            <div
              id="menu-carousel-body"
              // useJs
              className={`menu-body category-carousel template-${type}`}
              // slidesCssClass="disable-scrollbars"
            >           
              {
                showBackToMainMenuButton
                            && (
                              <div className="menu-title">
                                <Button className="back-button" onClick={() => setOverlay({ overlay: 'hamburger', slug: restaurant.slug })}>
                                  <ChevronLeft />
                                  {menu.title}
                                </Button>
                                {/* <Link className="back-button" to={makeMenuLink(restaurant.slug, )}>
                                    <ChevronLeft />
                                    {menu.title}
                                </Link> */}
                              </div>
                            )
              }                 
              <MenuItemList
                className=""
                // key={`menu-item-list-${ind}`}
                {...{
                  restaurant,
                  restState,
                  menu_id: menu.menuid,
                  needSecondTranslation,
                  slug: restaurant.slug,
                  items,
                  Item,
                  category: cat,
                  prevCategory,
                  nextCategory,
                  language,
                  categories: menu.categories,
                  catIndex,

                  // messages
                  socialMessage,
                  timeText, 
                  notificationText,
                }}
              />
            </div>
          </div>
        </div>
        {/* <Dialog
                open={Boolean(oferta)}
                onClose={() => this.setState({oferta: false })}
                fullWidth
                className="oferta-dialog"
            >
                <DialogContent>
                    <Oferta {...oferta} slug={restaurant.slug} onClose={() => this.setState({oferta: false })} />
                </DialogContent>
            </Dialog> */}
      </>
    );
  }
}

export default connect(MenuBody, 
  // {
  //     showOferta: (dispatch, payload) => dispatch({type: A.OFERTA_IS_SHOWN, payload })
  // }
);
