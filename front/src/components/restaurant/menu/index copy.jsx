import React from 'react';
import {
  Grid, Button, Typography, Paper, 
} from '@material-ui/core';
import './menu.scss';
import { Redirect } from 'react-router-dom';
import Item from './item';
import ItemImages from './item_images';

// import { connect } from 'react-redux'
// import A from '../../../redux/actionTypes'
// import { getRestaurant } from '../../../redux/reducers'
// import { Carousel } from 'react-responsive-carousel';
// import Carousel from '../../template/carousel'
import CSSCarousel from '../../template/common/css-carousel';
import Social from '../social';
import Spinner from '../../template/common/Spinner';

import Service from '../../../services/translations';
import { debounce, updateScroll } from '../../../utils/functions';
import DefaultComponent, { connect } from '../../DefaultComponent';

const templates = {
  text: Item,
  images: ItemImages,
};

// scroll treshold
const scrollingTreshold = 6;
// init last scroll position
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

// root element
const root = document.getElementById('root');

/**
 * This is the second iteration of carousel, which also didn't make it to production.
 */

// class RestaurantMenu extends React.Component {
class RestaurantMenu extends DefaultComponent {
    state = {
      categoryid: null,
      restState: null,
      restaurant: null,
      translationLoaded: false, 
      menu: null,
      category: null,
      category_to_slide: null,
      redirect: null,
    }

    // top level carousel
    _Carousel = React.createRef();

    _CatsCarousel = React.createRef();

    _nestedCarouselRef = React.createRef();

    _test = React.createRef();

    // constructor(props){
    //     super(props);

    //     // ref to category carousel
    //     // this._categoryCarousel = React.createRef();
    // }
   
    _nestedCarousels = [];

    // constructor(props){
    //     super(props);

    //     // this._Carousel = React.createRef();
    // }

    constructor(props) {
      super(props);

      // pass translations to parent and set flag after they are loaded.
      this.setTranslations([
        'Allergens', 'YourOpinionIs',
      ],
      () => this.setState({ translationLoaded: true }));
    }

    addNestedCarousel = () => {
      const newLength = this._nestedCarousels.push(React.createRef());
      return this._nestedCarousels[newLength - 1];
    }

    goTo(slide_1, slide_2) {
      // console.debug("goTo:" , slide_1, slide_2)
      // console.debug("goTo: current" , this._Carousel.current)

      if (this._Carousel.current) {
        // scroll first level
        this._Carousel.current.goToSlide(slide_1);
            
        // scroll second level
        this.goToNested(slide_1, slide_2);
      } else {
        console.error('goTo: could not find primary carousel. Ref:', this._Carousel);
      }
    }

    goToNested(index, slide) {
      const carousel = this._nestedCarousels[index];
      if (carousel.current) {
        carousel.current.goToSlide(slide);
      } else {
        console.error('goToNested: could not find nested carousel', index);
      }
    }

    componentDidMount() {
      super.componentDidMount();
      // this.fetchTranslations()
      // select category

      const { menu, category } = this.props;
        
      // if( category ){
      // TODO: get category index in array and call slider's goTo method
      // const index = this.props.restaurant.
      this.selectMenu();
      // }

      // console.debug("componentDidMount props", this.props)

      // console.debug("componentDidMount:  carousel:", this._Carousel);
      // console.debug("componentDidMount:  test:", this._test);

      // this doesn't seem to fire at all: 
      // first the Spinner is rendered and the refs are not set.
      // if( this.props.menu && this._Carousel.current )
      //     this.goTo( this.props.menu - 1, 0); // go to first element of selected menu
    }

    componentDidUpdate(prevProps) {
      // console.debug("componentDidUpdate:  props:", this.props);
      // console.debug("componentDidUpdate:  prev props:", prevProps);
      // console.debug("componentDidUpdate:  carousel :", this._Carousel.current );
      if (prevProps.language !== this.props.language) {
        this.setState({ translationLoaded: false });
        this.fetchTranslations();
      }

      if (prevProps.menu !== this.props.menu || prevProps.category !== this.props.category) {
        this.selectMenu();
      }

      // if( this.props.menu && this._Carousel.current && 
      //     // if what's selected is not current slide - change it
      //     this._Carousel.current.state.currentSlide !== this.props.menu - 1 ){
      //     console.debug("componentDidUpdate: going to menu", this.props.menu)
      //     // TODO: if category selected, go to that category

      //     // category not selected: go to the first in list
      //     this.goTo( this.props.menu - 1, 0); // go to first element of selected menu

      // }
    }

    // fetchTranslations = async () => {
    //     // preload allergens for nested elments
    //     await Service.getByKeys([
    //         "Allergens", "YourOpinionIs"
    //     ],
    //     this.props.language
    //     )
    //     this.setState({translationLoaded: true})
    // }

    selectMenu = () => {
      let { menu: menu_id, category, restaurant } = this.props;
      // cast menu id to integer
      menu_id = parseInt(menu_id);

      // console.debug("selectMenuAndCategory: menu_id", menu_id, "menus:", restaurant.menus)
      const menu = restaurant.menus.find(m => m.menuid === menu_id); // || restaurant.menus[0] ;

      // if just the menu was selected, use the first category in menu
      // if( !category){
      //     category = menu.categories ? menu.categories[0] ? menu.categories.id :
      // }

      // prepare an object of slide indexes hashed by category id
      let category_to_slide;
      if (menu) {
        category_to_slide = menu.categories.reduce((res, c, ind) => ({
          ...res, [c.id]: ind, 
        }), {});
      }

      this.setState({ menu, category_to_slide }, () => {
        // go to selected category
        const slideIndex = category_to_slide ? category_to_slide[category] : null;
            
        // console.debug("selectMenuAndCategory", "slide index:", slideIndex, "menu:", menu, "category:",  category )
            
        // TODO this is a hack, have to find a way to subscribe to carousel reference addition
        setTimeout(() => {
          if (slideIndex && this._CatsCarousel.current) {
            this._CatsCarousel.current.goToSlide(slideIndex);
          } else {
            console.debug('selectMenuAndCategory: no slide index or no carousel');
          }
        }, 150);
      });
    }

    // toggleCategory = id => {
    //     const { slug, restState } = this.props
    //     // const restState = getRestaurant(this.props, slug)

    //     const { category } = restState.filters

    //     console.debug("toggling category", id)

    //     if (category === id)
    //         // this.setState({categoryid: null})
    //         this.props.setFilter(slug, null)
    //     else
    //         this.props.setFilter(slug, id)
    //     // this.setState({categoryid: id})
    // }

    updateScroll = target => {
      lastScrollTop = updateScroll(target, root, lastScrollTop);
    }
    // updateScroll =  target => {

    //     // console.debug("Scroll target:", target )

    //     // const {target} = ev;

    //     // let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    //     let st = target.scrollTop;

    //     // console.debug("Scrolling..", st)
    //     if (st > lastScrollTop + scrollingTreshold ){
    //         // downscroll
    //         root.classList.remove("scrolling-up")    
    //         root.classList.add("scrolling-down")    
    //     } else {
    //         if (st < lastScrollTop - scrollingTreshold ){
    //         // upscroll code
    //         root.classList.add("scrolling-up")    
    //         root.classList.remove("scrolling-down")    
    //         } else {
    //             // clear scrolling class 
    //             // root.classList.remove("scrolling-up")
    //             // root.classList.remove("scrolling-down")
    //         }
    //     }
    //     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    // }

    selectCategory = ind => {
      if (this._nestedCarouselRef.current) {
        this._nestedCarouselRef.current.goToSlide(ind);
      } else {
        console.debug('could not find nested carousel reference:', this._nestedCarouselRef);
      }
    }

    render() {
      const {
        slug,
        // category,
        // categories, 
        show_categories = true,
        // , cart 
        language,
        // translations
        restState,
        restaurant,
        menu: menu_id, 
        category,
            
      } = this.props;

      // get menu and category from state
      const {
        translationLoaded, 
        // category,
        menu,
        category_to_slide,
        redirect,
      } = this.state;

      // handle redirects
      if (redirect) {
        // reset redirect
        this.setState({ redirect: null });
        // go to url
        return <Redirect to={redirect} />;
      }

      if (!restaurant) {
        // console.debug("No element: restaurant")
        return <Spinner />; 
      }

      if (!menu_id || !category) {
        const to = `/${slug}/${restaurant.menus[0].menuid}/${restaurant.menus[0].categories[0].id}`;
        // console.debug("No element: menu or category. Redirect to ")
        // redirect to first categry in first menu in the restaurant
        return <Redirect to={to} />;
      }

      if (!translationLoaded) {
        // console.debug("No element: translation not loaded ")
        return <Spinner />; 
      }

      // const { restState = {}, restaurant } = this.props // getRestaurant( this.props, slug )
      let { 
        // category: selectedCategory, 
        search, 
      } = (restState.filters || {});
      search = search ? search.toLowerCase() : search;

      const needSecondTranslation = language !== restaurant.defaultlanguage;

      // console.debug("Render selectedCategory", selectedCategory)
      // console.debug("Menu restaurant:", restaurant)

      // const filteredCategories = selectedCategory ? categories.filter(c => c.id === selectedCategory) : categories

      let ItemComponent = Item;

      if (restaurant && restaurant.defaulttemplate) {
        ItemComponent = templates[restaurant.defaulttemplate];
      }

      // const carouselRef = this._categoryCarousel.current;

      // let menu_id = this.props.menu || restaurant ? restaurant.menus[0].menuid : null;

      // const menu = restaurant ? restaurant.menus.find( m => m.menuid === menu_id ) : restaurant.menus[0] ;

      const { items = [], categories = [] } = menu || {};
                        
      // console.debug("Menu index:", menu_id);
      // console.debug("Menu data:", menu);

      // reference to use in categories click handlers
      // console.debug("this._Carousel", this._Carousel);
      // const _nestedCarouselRef = this._Carousel.current ? this._Carousel.current.addNestedCarousel() : null;  // React.createRef();
        
      // const _nestedCarouselRef = React.createRef(); // this.addNestedCarousel();  // React.createRef();
      // const _nestedCarouselRef = React.createRef();

      // reference to category buttons container
      const _catButtons = React.createRef(); 

      return (
      // categories && restaurant ?
        restaurant
          ? (
            <div id="menus-carousel" className={`template-${restaurant.defaulttemplate} flex column align-items-center flex-grow`} ref={this._test}>
              { 
                menu
                // restaurant.menus && 
                // <CSSCarousel 
                // // <TwoLevelCarousel 
                // useJs
                // slidesCssClass="disable-scrollbars" 
                // id="menus-carousel"
                // ref={this._Carousel}
                // >
                        // { 
                // restaurant.menus.map((menu, menuIndex) => 
                        && (
                          <>
                            {
                               
                              // const { items = [], categories = [] } = menu
                                
                              // // reference to use in categories click handlers
                              // console.debug("this._Carousel", this._Carousel);
                              // // const _nestedCarouselRef = this._Carousel.current ? this._Carousel.current.addNestedCarousel() : null;  // React.createRef();
                              // const _nestedCarouselRef = this.addNestedCarousel();  // React.createRef();
                              // // const _nestedCarouselRef = React.createRef();
                                
                              // // reference to category buttons container
                              // const _catButtons = React.createRef(); 

                              // return (
                              // <div className="menu-wrapper" key={`rest-menu-${menuIndex}`} >
                              <div className="menu-wrapper">
                                {/* <h1>{menu.title}</h1> */}
                                {
                                  show_categories
                                            && (
                                              <>
                                                <div className="categories-carousel show-on-mobile">
                                                  <CSSCarousel
                                                    id="cats"
                                                    ref={this._CatsCarousel}
                                                    className="dots-bottom"
                                                    useJs
                                                    onSlideClick={(i) => this._CatsCarousel.current && this._CatsCarousel.current.goToSlide(i)}
                                                    onSlideChange={ 
                                                      slide => {
                                                      // console.debug("Category slide changed to", slide);
                                                        if (this._nestedCarouselRef.current) this._nestedCarouselRef.current.goToSlide(slide);
                                                        else console.debug('_nestedCarouselRef.current is not set');
                                                      }}
                                                    onScrollStop={ 
                                                      slide => {
                                                      // console.debug("Category scroll stopped at", slide);
                                                        if (this._nestedCarouselRef.current) this._nestedCarouselRef.current.goToSlide(slide);
                                                        else console.debug('_nestedCarouselRef.current is not set');
                                                      }}
                                                  >
                                                    {categories.map((cat, ind) => (
                                                      <div key={`mobile-cat-${ind}`}>
                                                        <span>{cat.title}</span>
                                                        <span>{cat.titledefault}</span>
                                                      </div>
                                                    ))}
                                                  </CSSCarousel>
                                                </div>
                                                <div className="categories" ref={_catButtons}>
                                                  {categories.map((cat, ind) => (
                                                    <Button
                                                      key={`cat-button-${ind}`}
                                                      // className={`category-button${(cat.id === selectedCategory) ? " selected" : ""}`}
                                                      className={`category-button${(ind === category) ? ' selected' : ''}`}
                                                      // onClick={() => this.toggleCategory(cat.id)}
                                                      onClick={() => {
                                                        this.selectCategory(ind);
                                                      }}
                                                    >
                                                      {
                                                        needSecondTranslation
                                                            && (
                                                              <div className="default-lang">
                                                                {cat.titledefault}
                                                              </div>
                                                            )
                                                      }
                                                      <div>
                                                        {cat.title}
                                                      </div>
                                                    </Button>
                                                  ))}
                                                </div>

                                              </>
                                            )
                                }
                                <CSSCarousel 
                                  id="body"
                                  className="menu-body category-carousel"
                                  useJs
                                  slidesCssClass="disable-scrollbars"
                                  // items={categories}
                                  ref={this._nestedCarouselRef}
                                  onSlideChange={
                                  // update buttons, selecting the active one
                                    currentSlide => {
                                      if (_catButtons.current.children) {
                                      // remove currently active, if any
                                        const active = _catButtons.current.querySelector(' .selected');
                                        if (active) active.classList.remove('selected');
                                        // add active to newly selected one.
                                        if (_catButtons.current.children[currentSlide]) {
                                          _catButtons.current.children[currentSlide].classList.add('selected');
                                        }
                                      } 

                                      if (this._CatsCarousel.current) this._CatsCarousel.current.goToSlide(currentSlide);
                                      else console.debug('this._CatsCarousel.current not set');
                                    }
                                  }
                                  onScrollStop={currentSlide => {
                                  // console.debug("Menu scroll stopped at slide", currentSlide);
                                    if (this._CatsCarousel.current) this._CatsCarousel.current.goToSlide(currentSlide);
                                    else console.debug('this._CatsCarousel.current not set');
                                  }}
                                >
                                  {/* {filteredCategories.map((cat, ind) => ( */}
                                  {categories.map((cat, ind) => (
                                    <div
                                      key={`cat-body-${ind}`} 
                                      className="category-content disable-scrollbars" 
                                      onScroll={ev => debounce(100, this.updateScroll)(ev.target)}
                                    // onScroll={ev => console.debug("Scroll event:", ev.currentTarget, ev.target)}
                                    >
                                      <div> 
                                        {' '}
                                        {/* need  this div here to fix sticky header on safari */ }
                                                   
                                        {/* <div className="category-header">
                                                            <h2 className="fw-600">{cat.title}</h2>
                                                            <div className="category-subtitle">{cat.titledefault}</div>
                                                        </div> */}
                                        <Paper className="category-body panel">
                                          <Grid container spacing={2} className="menu-items-list">
                                            {items.filter(d => d.dishcategoryid === cat.id
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
                                                                    )).map(
                                              (dish, index) => 
                                              // let cartItem = cart.find( i => i.dishid === dish.dishid )
                                              // cartItem = {...cartItem} //copy...
                                              // const quantity = cartItem ? cartItem.quantity : null;

                                                (
                                                  <Grid item xs={12} key={`menuitem-${index}`} className="menu-item-container">
                                                    {/* <Item                                                 */}
                                                    <ItemComponent
                                                      index={index + 1}
                                                      // cartItem={cartItem}
                                                      // quantity={quantity} 
                                                      restState={restState}
                                                      needSecondTranslation={needSecondTranslation}
                                                      slug={restaurant.slug}
                                                      {...dish}
                                                    />
                                                  </Grid>
                                                ),
                                                                    
                                            )}
                                          </Grid>
                                          <Social {...restaurant} />
                                        </Paper>
                                      </div>
                                    </div>
                                  ))
                                  }
                                </CSSCarousel>
                                {/* </div> */}
                              </div>

                            // )
                            // })
                            }
                            {/* } */}
                          </>
                        )
                        // {/* </CSSCarousel> */}
              }
            </div>
          ) : <Typography>No data obtained</Typography>
      );
    }
}

export default connect(RestaurantMenu);

// export default connect(
//     state => ({ ...state.app, translations: state.translation }),
//     dispatch => ({
//         setFilter: (slug, value) => dispatch({ type: A.SET_FILTER, payload: { slug, type: "category", value } })
//     })
// )(RestaurantMenu)
