import React from 'react';
import item from '../../../restaurant/menu/item';
import './css-carousel.scss';
import uniquid from 'uniquid';
import { debounce } from '../../../../utils/functions';

const DefaultError = () => <div>Wrong type of data</div>;
const scrollEndTreshold = 30; // ms, time to debounce scrollStop event

/**
 * Returns child index within parent element, if any.
 * If no parent element is found, false is returned
 * @param {*} element 
 */
const getChildIndex = element => (element.parentNode 
  ? [...element.parentNode.children].indexOf(element)
  : false);

const Dot = props => {
  let { 
    id = `${props.id}-slide-${props.index}`,
    useJs = false, 
    title, 
    index,
    onClick,
  } = props;
  // fallback to index if no title is passed
  title = title || `#${index}`;
  return (    
    useJs
      ? <li onClick={onClick} className="dot" role="button" aria-title={title} />
      : (
        <li className="dot">
          <a 
            className="dot" 
            href={`#${id}`} 
            role="button"
            onClick={onClick} 
            // onClick={ev => ev.preventDefault()}
            aria-label={props.title || props.index}
          />
        </li>
      ) 
  );
};

const Slide = props => (
  <div className="slide" {...props}>{props.index}</div>
);
class CssCarousel extends React.Component {
    state={
      carouselId: null,
      currentSlide: null,
      offset: 0,
      items: [],
      dots: null,
      goToSlide: null,

    }

    _slides = React.createRef();

    _dots = React.createRef();

    _items = null

    _scrollingTimer = null;

    /**
     * Shows whether is currently scrolling.
     * Used to determine onScrollStart callback.
     */
    // _isScrolling = false;

    /**
     * Shows whether goToSlide was called.
     * Used to determine whether to call the onSlideChange callback:
     * If the flag is true, onSlideChange isn't called.
     * Scroll stop clears the flag.
     */
    _isScrollingToSlide = false; 

    componentDidMount() {
      this.populateItems(
        // once the items are populated, mark the dot.
        // this.markCurentlyActiveDot
      );
      this.markCurentlyActiveDot();

      // set id
      const { id: carouselId = uniquid('carousel-') } = this.props;
      this.setState({ carouselId });
    }

    /**
     * prepare an array of slides.
     */ 
    populateItems = callback => {
      if (this._slides.current && this._slides.current.children) {
        this._items = [...this._slides.current.children];
        this._items.forEach((i, ind) => i.addEventListener('click', ev => this.slideClick(ind, ev)));
        callback && callback();
      }
    }

    /**
     * Slide click event handler
     * @param {*} slideIndex index of clicked slide
     * @param {*} ev the original event
     */
    slideClick = (slideIndex, ev) => {
      if (typeof this.props.onSlideClick === 'function') {
        this.props.onSlideClick(slideIndex, ev);
      }
    }

    nextSlide = () => {
      const { currentSlide } = this.state;
      const slideNum = this._slides.current.children ? this._slides.current.children.length : 0;

      const { circularSlides = true } = this.props;

      if (slideNum > 0) {
        // wrap
        const nextSlide = 
            // if at the last slide, then
            currentSlide === slideNum - 1
            // if circular navigation - return to 0, otherwise stay in place
              ? (circularSlides ? 0 : currentSlide) 
              : 
            // not last slide: increase number
              currentSlide + 1;
        this.goToSlide(nextSlide);
      }
    }
    
    prevSlide = () => {
      const { currentSlide } = this.state;
      const slideNum = this._slides.current.children ? this._slides.current.children.length : 0;

      const { circularSlides = true } = this.props;

      if (slideNum > 0) {
        // wrap
        const prevSlide = 
            // if at the first slide, then
            currentSlide === 0
            // if circular navigation - got to last slide, otherwise stay in place
              ? (circularSlides ? slideNum - 1 : currentSlide) 
              : 
            // not first slide: decrease number
              currentSlide - 1;
        this.goToSlide(prevSlide);
      }
    }

    // markCurentlyActiveDot = () => {
    //     const slides = this._slides.current

    //     // slide index equals container's left scroll divided by its screen width
    //     const currentSlide = Math.round( slides.scrollLeft / slides.clientWidth )
    //     console.debug( "Current slide: ", currentSlide )
    //     this.markDot(currentSlide)        
    // }

    // TODO: for some reason the dot click isn't working good!!!

    /**
     * Mark dot that corresponds to currently active slide
     */
    markCurentlyActiveDot = () => {
      const slides = this._slides.current;
      console.debug('markCurentlyActiveDot', slides, this._items);
      if (slides && this._items) {
        // if( this._items ){

        // console.debug("markCurentlyActiveDot: _items is", this._items)
        // get slide that's in the center of the container
        // const center = slides.clientWidth / 2;
        // const children = [...slides.children];
        let i = this._items.length - 1; // children.length - 1
        let currentSlide = 0; // first slide by default
            
        // the central point of slides viewport
        const scrollOffset = slides.scrollLeft + slides.clientWidth / 2;
        // going from the last slide to first
        while (i >= 0) {
          // const slide = children[i]
          const slide = this._items[i];
          const isBetween = slide.offsetLeft < scrollOffset && slide.offsetLeft + slide.offsetWidth > scrollOffset;
          // console.debug(`markCurentlyActiveDot ${this.state.carouselId}: `, `${scrollOffset} between ${slide.offsetLeft} and  ${slide.offsetLeft + slide.offsetWidth}? ${isBetween}`)
          // if slide's leftmost point is to the left of parent center, it's the first in the view.
          // if( slide.p < center && slide.offsetLeft + slide.offsetWidth > center ){
          if (isBetween) {
            // if( slide.left < center && slide.right > center ){
            currentSlide = i;
            i = -1; // jump out of cycle
            // }
          }
          i -= 1;
        }

        // slide index equals container's left scroll divided by its screen width
        // const currentSlide = Math.round( slides.scrollLeft / slides.clientWidth )
        // console.debug( "markCurentlyActiveDot Current slide: ", currentSlide, "prev slide: ", this.state.currentSlide   )
        if (currentSlide !== this.state.currentSlide) {
          // console.debug( "markCurentlyActiveDot changing slide to ", currentSlide )
          this.setState({ currentSlide }, () => {
            // once the slide is set, 
            // call optional callback
            const { onSlideChange } = this.props;
                        
            if (onSlideChange && typeof onSlideChange === 'function' 
                        // don't do it if scrolling by goToSlide call
                        && !this._isScrollingToSlide
            ) {
              onSlideChange(currentSlide);
            }
          });
          this.markDot(currentSlide);
        }
      }
    }

    /**
     * remove marker from currently marked dot and mark the requested dot
     * @param {*} currentSlide 
     */
    markDot = currentSlide => {
      const dotsContainer = this._dots.current;
        
      // Dots can be hidden if there's only one slide
      if (dotsContainer) {
        const dots = dotsContainer.children;
    
        // find currently active dot, if any
        const active = dotsContainer.querySelector('.active');
                                
        // remove marker
        if (active) active.classList.remove('active');
    
        // find required dot
        const slideDot = dots[currentSlide];
        // add marker to required dot, if any
        if (slideDot) slideDot.classList.add('active');
      }

      if (this._slides.current && this._items && this._items[currentSlide]) {
        // remove currently active element class
        this._slides.current.querySelectorAll('.active').forEach(i => (i && i.classList ? i.classList.remove('active') : null));

        // add active class to current slide
        this._items[currentSlide].classList && this._items[currentSlide].classList.add('active');
      }

      // call optional callback
      // if( this.props.onSlideChange ){
      //     this.props.onSlideChange( currentSlide );
      // }
    }

    /**
     * Method to browse the slides. Can be called from outside through ref.
     * @param {*} slideIndex 
     */
    goToSlide = slideIndex => {
      console.debug('Go to slide:', slideIndex);
      // get offset of index-th slide 
      const slides = this._slides.current;
      // if( slides && slides.children && slides.children[slideIndex] ){
      if (slides && this._items && this._items[slideIndex]) {
        // the slide to go to
        const slide = this._items[slideIndex];
            
        // set scrolling flag
        this._isScrollingToSlide = true;

        // calculate necessary offset:
        // slide's left point plus half its width minus half the parent's vieport.
        // It will make te slide stay in the center of the viewport.
        const offset = slide.offsetLeft + slide.offsetWidth / 2 - slides.offsetWidth / 2;

        // console.debug("Go to slide: slide boundaries is", [slides.children[slideIndex]] )
        // console.debug("Go to slide: Moving to offset:", offset, 'slide #', slideIndex)
        slides.scrollLeft = offset; 
        // mark the corresponding dot
        this.markDot(slideIndex);

        // update current slide value
        // this.setState({currentSlide: slideIndex} )

        // call optional callback.
        const { onGoToSlide } = this.props;
        if (onGoToSlide && typeof onGoToSlide === 'function') {
          onGoToSlide(slideIndex);
        }
      } else {
        console.error('Could not find slides children:', this._slides);
      }
    }

    /**
     * is called on scroll, debounces until treshold id broken, then calls the onScrollStop callback 
     * @param {*} ev 
     */
    trackSrcollStop = ev => {
      const { onScrollStop } = this.props; 
      // console.debug("Tracking scroll stop", onScrollStop)
      // if callback is passed...
      if (onScrollStop && typeof onScrollStop === 'function') {
        // console.debug("Tracking scroll stop - debouncing")
        clearTimeout(this._scrollingTimer);
        // debounce its execution
        this._scrollingTimer = setTimeout(() => {
          // reset _isScrollingToSlide flag
          this._isScrollingToSlide = false;

          // pass the current slide to callback.
          // TODO: it might not be set yet, actually, have to run tests here.
          onScrollStop(this.state.currentSlide);
        }, scrollEndTreshold);
      }
    }

    render() {
      const {
        // items, 
        ErrorComponent = DefaultError, 
        DotComponent = Dot,
        SlideComponent = Slide,
        className,
        slidesCssClass,
        useJs,
        children,
        hideSingleDot = true,
        scrollDebounceValue = 10,
        ...other
      } = this.props;

      const { carouselId } = this.state;
      // const { offset, items } = this.state 
      // console.debug("render offset:", offset)

      if (Array.isArray(children)) {
        return (
          <div className={`css-carousel${className ? ` ${className}` : ''}`} id={carouselId} {...other}>
            {
            // if there are children
              (children 
                        // and either there are more than one
                        && (children.length > 1 
                            // or just one and idleSingleDot is false
                            || children.length === 1 && !hideSingleDot)
                            // show dots
                            && (
                              <ul ref={this._dots} className="dots">
                                {children.map((item, index) => (
                                  <DotComponent
                                    onClick={() => this.goToSlide(index)}
                                    {...{
                                      ...item, index, carouselId, useJs, 
                                    }}
                                  />
                                ))}
                              </ul>
                            )
              )
            }
            <div 
              ref={this._slides} 
              onScroll={ev => {
              // mark dot
                debounce(scrollDebounceValue, this.markCurentlyActiveDot)(ev);

                // detect scroll stop event
                this.trackSrcollStop(ev);
              }
              } 
              className={`slides ${slidesCssClass || ''}`}
                
            >
              {children}
            </div>
          </div>
        ); 
      }
      return (<ErrorComponent {...this.props} />);
    }
}

export default CssCarousel;
