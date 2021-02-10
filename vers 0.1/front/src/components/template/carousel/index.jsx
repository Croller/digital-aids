import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./carousel-styles.scss"
class FFCArousel extends Carousel{


    render(){
        return(
            <div className="ff-carousel">
                {super.render()}
            </div>
        )
    }
    
}

export default FFCArousel