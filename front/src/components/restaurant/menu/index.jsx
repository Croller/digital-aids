import React from 'react'
import { Grid, Button, Typography, Paper } from '@material-ui/core'
import './menu.scss'
import Item from './item'
import ItemImages from './item_images'
import { connect } from 'react-redux'
import A from '../../../redux/actionTypes'
// import { getRestaurant } from '../../../redux/reducers'
// import { Carousel } from 'react-responsive-carousel';
// import Carousel from '../../template/carousel'
import CSSCarousel from '../../template/common/css-carousel'
import Social from '../social'
import Spinner from '../../template/common/Spinner'

import Service from '../../../services/translations'
import {debounce} from '../../../utils/functions'

const templates = {
    text: Item,
    images: ItemImages
}

// scroll treshold
const scrollingTreshold = 6;
// init last scroll position
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;;

// root element
const root = document.getElementById("root")

class RestaurantMenu extends React.Component {


    state = {
        categoryid: null,
        restState: null,
        restaurant: null,
        translationLoaded: false
    }

    constructor(props){
        super(props);

        // ref to category carousel
        // this._categoryCarousel = React.createRef();
    }
   

    componentDidMount() {
        this.fetchTranslations()
    }

    componentDidUpdate(prevProps){
        if( prevProps.language !== this.props.language ){
            this.setState({translationLoaded: false} )
            this.fetchTranslations()
        }
    }

    fetchTranslations = async () => {
        // preload allergens for nested elments
        await Service.getByKeys([
            "Allergens", "YourOpinionIs"
        ],
        this.props.language
        )
        this.setState({translationLoaded: true})
    }

    // componentDidUpdate(prevProps) {
        // console.debug("Updated!");
        // const prev = getRestaurant(prevProps, this.props.slug);
        // const now = getRestaurant(this.props, this.props.slug);

        // console.debug("prev and now:", prev, now);

        // /// THIS IS AWFUL (((((
        // if (prev.filters.caterory !== now.filters.caterory) {
        //     this.getRestaurantState()
        // }

        // if (prevProps.slug !== this.props.slug) {
        //     this.fetchRestaurant()
        // }
        // )
    // }

    // async fetchRestaurant() {
    //     const { slug, language } = this.props
    //     const restaurant = await Service.getRestaurant(slug, language)
    //     this.setState({ restaurant })
    // }

    // getRestaurantState() {
    //     const { slug, language } = this.props
    //     const restState = getRestaurant(this.props, slug)
    //     this.setState({ restState })
    // }

    toggleCategory = id => {
        const { slug, restState } = this.props
        // const restState = getRestaurant(this.props, slug)

        const { category } = restState.filters

        console.debug("toggling category", id)

        if (category === id)
            // this.setState({categoryid: null})
            this.props.setFilter(slug, null)
        else
            this.props.setFilter(slug, id)
        // this.setState({categoryid: id})
    }

    updateScroll =  target => {

        console.debug("Scroll target:", target )

        // const {target} = ev;
        

        // let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        let st = target.scrollTop;

        console.debug("Scrolling..", st)
        if (st > lastScrollTop + scrollingTreshold ){
            // downscroll
            root.classList.remove("scrolling-up")    
            root.classList.add("scrolling-down")    
        } else {
            if (st < lastScrollTop - scrollingTreshold ){
            // upscroll code
            root.classList.add("scrolling-up")    
            root.classList.remove("scrolling-down")    
            } else {
                // clear scrolling class 
                // root.classList.remove("scrolling-up")
                // root.classList.remove("scrolling-down")
            }
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }


    render() {
        const {
            slug,
            // categories, 
            // menu, 
            show_categories = true,
            // , cart 
            language,
            // translations
        } = this.props

        const {translationLoaded} = this.state
        if( !translationLoaded )
            return <Spinner /> 

        const { restState = {}, restaurant } = this.props // getRestaurant( this.props, slug )
        let { category: selectedCategory, search } = (restState.filters || {})
        search = search ? search.toLowerCase() : search

        const needSecondTranslation = language !== restaurant.defaultlanguage

        console.debug("Render selectedCategory", selectedCategory)
        console.debug("Menu restaurant:", restaurant)

        // const filteredCategories = selectedCategory ? categories.filter(c => c.id === selectedCategory) : categories


        let ItemComponent = Item

        if (restaurant && restaurant.defaulttemplate) {
            ItemComponent = templates[restaurant.defaulttemplate]
        }

        // const carouselRef = this._categoryCarousel.current;

        return (
            // categories && restaurant ?
            restaurant ?
                <div className={`template-${restaurant.defaulttemplate} flex column align-items-center flex-grow`}>

                    {/* <ul className="menu-list">
                        {
                            restaurant.menus && restaurant.menus.map((menu, menuIndex) =>
                                <li><a href={`#menu-${menuIndex}`}>{menu.title}</a></li>

                            )
                        }
                    </ul> */}

                    {/* <div id="menus-carousel"> */}
                    { restaurant.menus && 
                    <CSSCarousel 
                    useJs
                    slidesCssClass="disable-scrollbars" 
                    id="menus-carousel"
                    >
                        { restaurant.menus.map((menu, menuIndex) => {
                                const { items = [], categories = [] } = menu

                                
                                // reference to use in categories click handlers
                                const _nestedCarouselRef = React.createRef();
                                
                                // reference to category buttons container
                                const _catButtons = React.createRef(); 

                                return (
                                    <div className="menu-wrapper" key={`rest-menu-${menuIndex}`} >
                                        <h1>{menu.title}</h1>
                                        {
                                            show_categories &&
                                            <div className="categories" ref={_catButtons}>
                                                {categories.map((cat, ind) => (
                                                    <Button
                                                        key={`cat-button-${ind}`}
                                                        className={`category-button${(cat.id === selectedCategory) ? " selected" : ""}`}
                                                        // onClick={() => this.toggleCategory(cat.id)}
                                                        onClick={() => {
                                                            
                                                            if( _nestedCarouselRef.current ){

                                                                _nestedCarouselRef.current.goToSlide(ind)
                                                            }  else {
                                                                console.debug("could not find nested carousel reference:", _nestedCarouselRef)
                                                            }
                                                        } }
                                                    >
                                                        {
                                                            needSecondTranslation &&
                                                            <div className="default-lang">
                                                                {cat.titledefault}
                                                            </div>
                                                        }
                                                        <div>
                                                            {cat.title}
                                                        </div>
                                                    </Button>
                                                ))}
                                            </div>
                                        }
                                        {/* <div className="menus"> */}
                                        {/* <Carousel className="menu-body category-carousel"
                                            showThumbs={false}
                                        > */}
                                        <CSSCarousel 
                                            className="menu-body category-carousel"
                                            useJs
                                            slidesCssClass="disable-scrollbars"
                                            // items={categories}
                                            ref={_nestedCarouselRef}
                                            onSlideChange= {
                                                // update buttons, selecting the active one
                                                currentSlide => {
                                                    if( _catButtons.current.children ){
                                                        // remove currently active, if any
                                                        const active = _catButtons.current.querySelector(" .selected");
                                                        if( active )
                                                            active.classList.remove("selected");
                                                        // add active to newly selected one.
                                                        if(_catButtons.current.children[currentSlide] ){
                                                            _catButtons.current.children[currentSlide].classList.add("selected")
                                                        }
                                                    } 
                                                }
                                            }
                                        >
                                            {/* {filteredCategories.map((cat, ind) => ( */}
                                            {categories.map((cat, ind) => (
                                                <div key={`cat-body-${ind}`} 
                                                className="category-content disable-scrollbars" 
                                                onScroll={ ev => debounce(100, this.updateScroll )(ev.target) }
                                                // onScroll={ev => console.debug("Scroll event:", ev.currentTarget, ev.target)}
                                                >
                                                    <div className="category-header">
                                                        <h2 className="fw-600">{cat.title}</h2>
                                                        <div className="category-subtitle">{cat.titledefault}</div>
                                                    </div>
                                                    <Paper className="category-body panel" >
                                                        <Grid container spacing={2} className="menu-items-list">
                                                            {items.filter(d => d.dishcategoryid === cat.id &&
                                                                (
                                                                    // etiher search is empty
                                                                    !search
                                                                    // or 
                                                                    ||
                                                                    // title or default title include search term  
                                                                    (
                                                                        d.title.toLowerCase().includes(search) ||
                                                                        d.default_title.toLowerCase().includes(search)
                                                                    )
                                                                )
                                                            ).map(
                                                                (dish, index) => {
                                                                    // let cartItem = cart.find( i => i.dishid === dish.dishid )
                                                                    // cartItem = {...cartItem} //copy...
                                                                    // const quantity = cartItem ? cartItem.quantity : null;

                                                                    return (
                                                                        <Grid item xs={12} key={`menuitem-${index}`} className="menu-item-container" >
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
                                                                    )
                                                                }
                                                            )}
                                                        </Grid>
                                                        <Social {...restaurant}/>
                                                    </Paper>
                                                </div>
                                            ))
                                            }
                                        </CSSCarousel>
                                        {/* </div> */}
                                    </div>




                                )
                            })
                        }
                    </CSSCarousel> 
                    }
                        
                    {/* </div> */}


                </div> : <Typography>No data obtained</Typography>
        )
    }
}

export default connect(
    state => ({ ...state.app, translations: state.translation }),
    dispatch => ({
        setFilter: (slug, value) => dispatch({ type: A.SET_FILTER, payload: { slug, type: "category", value } })
    })
)(RestaurantMenu)