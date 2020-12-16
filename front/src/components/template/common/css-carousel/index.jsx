import React from 'react'
import item from '../../../restaurant/menu/item'
import './css-carousel.scss'
import uniquid from 'uniquid'
import {debounce} from '../../../../utils/functions'

const DefaultError = () => <div>Wrong type of data</div>

const Dot = props => {

    let { 
        id = `${props.id}-slide-${props.index}`,
        useJs = false, 
        title, 
        index,
        onClick
    } = props
    // fallback to index if no title is passed
    title = title || `#${index}`
    return (    
        useJs ?
        <li onClick={onClick} className="dot" role="button" aria-title={title}></li>
        :
        <li className="dot">
            <a 
            className="dot" 
            href={`#${id}`} 
            role="button"
            onClick={onClick} 
            // onClick={ev => ev.preventDefault()}
            aria-label={props.title || props.index }
            ></a>
        </li> 
    )
}

const Slide = props => (
    <div className="slide" {...props}>{props.index}</div>
)
class CssCarousel extends React.Component{

    state={
        carouselId: null,
        currentSlide: 0,
        offset: 0,
        items: [],
        dots: null,
        goToSlide: null

    }

    _slides = React.createRef();
    _dots   = React.createRef();


    componentDidMount(){
        this.markCurentlyActiveDot();
    }

    nextSlide = () => {
        const {currentSlide} = this.state
        const slideNum = this._slides.current.children ? this._slides.current.children.length : 0;

        const { circularSlides = true } = this.props

        if( slideNum >0 ){
            // wrap
            const nextSlide = 
            // if at the last slide, then
            currentSlide === slideNum - 1 ?
                // if circular navigation - return to 0, otherwise stay in place
                (circularSlides ? 0 : currentSlide ) 
                : 
                // not last slide: increase number
                currentSlide + 1;
            this.goToSlide( nextSlide )
        }
    }
    
    prevSlide = () => {
        const {currentSlide} = this.state
        const slideNum = this._slides.current.children ? this._slides.current.children.length : 0;

        const { circularSlides = true } = this.props

        if( slideNum >0 ){
            // wrap
            const prevSlide = 
            // if at the first slide, then
            currentSlide === 0 ?
                // if circular navigation - got to last slide, otherwise stay in place
                (circularSlides ?  slideNum - 1 : currentSlide ) 
                : 
                // not first slide: decrease number
                currentSlide - 1;
            this.goToSlide( prevSlide )
        }
    }

    // markCurentlyActiveDot = () => {
    //     const slides = this._slides.current

    //     // slide index equals container's left scroll divided by its screen width
    //     const currentSlide = Math.round( slides.scrollLeft / slides.clientWidth )
    //     console.debug( "Current slide: ", currentSlide )
    //     this.markDot(currentSlide)        
    // }

    /**
     * Mark dot that corresponds to currently active slide
     * @param {*} currentSlide 
     */
    markCurentlyActiveDot = () => {
        console.debug("marking active dot")
        const slides = this._slides.current
        if( slides ){
            // slide index equals container's left scroll divided by its screen width
            const currentSlide = Math.round( slides.scrollLeft / slides.clientWidth )
            console.debug( "Current slide: ", currentSlide )

            this.setState({currentSlide})

            this.markDot(currentSlide)

        }
        
    }

    /**
     * remove marker from currently marked dot and mark the requested dot
     * @param {*} currentSlide 
     */
    markDot = currentSlide => {
        const dotsContainer = this._dots.current;
        
        // Dots can be hidden if there's only one slide
        if( dotsContainer ){

            const dots = dotsContainer.children;
    
            // find currently active dot, if any
            const active = dotsContainer.querySelector(".active");
                                
            // remove marker
            if(active)
                active.classList.remove('active');
    
            // find required dot
            const slideDot = dots[currentSlide]
            // add marker to required dot, if any
            if(slideDot)
                slideDot.classList.add('active');
        }

        // call optional callback
        if( this.props.onSlideChange ){
            this.props.onSlideChange( currentSlide );
        }
    }

    

    /**
     * Method to browse the slides. Can be called from outside through ref.
     * @param {*} slideIndex 
     */
    goToSlide = slideIndex => {
        console.debug("Go to slide:", slideIndex)
        // get offset of index-th slide 
        const slides = this._slides.current
        if( slides && slides.children && slides.children[slideIndex] ){
            const offset = slides.children[slideIndex].offsetLeft
            console.debug("Moving to offset:", offset, "slides:", slides )
            slides.scrollLeft = offset; 
            // mark the corresponding dot
            this.markDot(slideIndex)
        } else {
            console.error("Could not find slides children:", this._slides)
        }

    }

    render(){
        
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
            ...other
        } = this.props

        const { id: carouselId = uniquid('carousel-')} = this.props

        // const { offset, items } = this.state 
        // console.debug("render offset:", offset)

        if( Array.isArray(children))
        return(
            <div className={`css-carousel${ className ? ` ${className}` : ''}`} id={carouselId} {...other}>
                {
                    // if there are children
                    (children && 
                        // and either there are more than one
                        (children.length > 1 || 
                            // or just one and idleSingleDot is false
                            children.length === 1 && !hideSingleDot ) &&
                            // show dots
                            <ul ref={this._dots} className="dots">
                                {children.map((item, index) => <DotComponent onClick={() =>this.goToSlide(index)} {...{...item, index, carouselId, useJs }}/> )}
                            </ul>
                    )
                }
                <div 
                ref={this._slides} 
                onScroll={debounce( 150, this.markCurentlyActiveDot )} 
                className={`slides ${slidesCssClass || ""}`}
                >
                    {children}
                </div>
            </div>
        )
        else 
        return ( <ErrorComponent {...this.props} /> )
    }
}

export default CssCarousel