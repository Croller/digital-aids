import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import Service from '../../services/map'
// import Reveal from '../reveal'


/**
 * The component scrolls to top page when loaded or changed.
 * If hash passed as part of the route, it scrolls to the hash.
 * 
 * kudos to https://stackoverflow.com/a/44438949/3770223
 */

class ScrollToTopRoute extends Component {


  hashCheckerInterval = null

  state = {
    revealProps: {}
  }

  yOffset = process.env.REACT_APP_HASH_SCROLL_OFFSET || -180  


  componentDidMount(){
    const {revealProps = {} } = this.props
    this.setState( revealProps )

    // update head tags
    // Service.updatePage()


    if (this.props.location.hash ){
      const {hash} = this.props.location 
      // console.debug("Going to hash:", hash.substr(1))  
      this.scrollToHash(hash.substr(1))
    } else {
      window.scrollTo({top:0, behavior: "smooth"})
    }

    this.setBodyClass();
  }

  scrollToHash ( hash ){
    // 
    this.hashCheckerInterval = setInterval(() => {
      const el = document.getElementById(hash)
      // console.debug("checked hash target....", el)
      if( el ){
        
        try {

          // console.debug("found hash target:", el)
  
          // calculate offset position to scroll to
          const pos = el.getBoundingClientRect().top + window.pageYOffset + this.yOffset;
  
          // scroll
          window.scrollTo( { top: pos, behavior: "smooth" })
        } catch( e ){
          console.debug("Error scrolling to hash", e )
        }

        // clear the hash checker interval
        clearInterval(this.hashCheckerInterval)
        
      }      
    }, 100 );

  }

  setBodyClass(){
    // update background 
    const {bodyClass = "bg-default"} = this.props
    document.body.className = bodyClass;
  }

  componentDidUpdate(prevProps) {
    // if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
    if (this.props.location.pathname !== prevProps.location.pathname ) {

      window.scrollTo({top:0, behavior: "smooth"})
      // this.setState( { revealProps: {...this.props.revealProps, appear: true}})
    }

    // hash changed
    if (this.props.location.hash !== prevProps.location.hash){
      const {hash} = this.props.location
      console.log( "Moving to hash", hash)
    }

    if( this.props.bodyClass !== prevProps.bodyClass ){
      this.setBodyClass()
    }

  }

  

  render() {
    const { component: Component, revealProps = {}, ...rest } = this.props;
    // const {revealProps } = this.state

    return <Route {...rest} render={props => (<Component {...props} />)} />;
  }
}

export default withRouter(ScrollToTopRoute);