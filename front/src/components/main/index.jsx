import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../routes'
import routes from '../../data/routes'
// import {debounce} from '../../utils/functions'
// import Footer from '../template/footer'

// import A from '../../redux/actionTypes'
// import Actions from '../../redux/actions'

import "./main.scss"

// import CartWidget from '../cart/cart-widget'

// let usageDefer = Date.now()
// const deferUsageDelay = 1000 // ms

// import Restaurant from './Restaurant'

// const scrollingTreshold = 6;
// // init last scroll position
// let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;;

// // root element
// const root = document.getElementById("root")


class Main extends React.Component {
    

    // updateScroll = () => {
        

    //     let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    //     console.debug("Scrolling..", st)
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
    //             root.classList.remove("scrolling-up")
    //             root.classList.remove("scrolling-down")
    //         }
    //     }
    //     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    // }

    componentDidMount(){
        // mark main element with last scroll direction

        
        
        
        // window.addEventListener("scroll", 
        // debounce( 100, this.updateScroll )
        // , false);

        // () => { 
        //     let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        //     console.debug("Scrolling..", st)
        // if (st > lastScrollTop + scrollingTreshold ){
        //     // downscroll
        //     root.classList.remove("scrolling-up")    
        //     root.classList.add("scrolling-down")    
        // } else {
        //     if (st < lastScrollTop - scrollingTreshold ){
        //     // upscroll code
        //     root.classList.add("scrolling-up")    
        //     root.classList.remove("scrolling-down")    
        //     } else {
        //         // clear scrolling class 
        //         root.classList.remove("scrolling-up")
        //         root.classList.remove("scrolling-down")
        //     }
        // }
        // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling    
        // }
        // , false);
    }

    render() {
        const { showDrawer } = this.props
        
        return (
            <div className={`main ${showDrawer ? "drawer-open" : ""}`}>
                <Router>
                    <Routes routes={routes} /> 
                </Router>
            </div>
        )
    }
}

export default Main
// export default connect(
//     state => state ,
//     // state => ({showDrawer: state.showDrawer, tokenTimestamp: state.tokenTimestamp }) ,
//     // dispatch => ({
//     //     setUsageTime: () => dispatch({ type: A.SET_USAGE_TIMESTAMP })
//     // })
// )(Main)