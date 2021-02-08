// import AuthService from "../services/auth"
// import store from './store';
// import A from './actionTypes';

// let tokenUpdateTimer;

// const renewTokenIn = process.env.REACT_APP_TOKEN_RENEW || 1000 * 60 * 28; // ms. renew token in 28 minutes
// const usageThreshold = 1000 * 60 * 10; // renew only if used in the last 10 minutes

class Actions {

  // static async onTokenUpdate( tokenTimestamp ){ //( renewIn, usageTreshold ){

  //     const now = Date.now()
        
  //         // renew in time, that equals *default renew time* minus *the time already spent since tokenTimestamp*
  //         // this is needed for when a page is reloaded and renew token timer has to be set again.
  //         const tokenUpdateTimespan =  renewTokenIn - ( now -  tokenTimestamp) 

  //             if(tokenUpdateTimespan > 0 ){
    
  //                 console.debug("onTokenUpdate:  setting token renewal to:", tokenUpdateTimespan / 1000, "seconds" )
  //                 this.clearTokenUpdateTimer()
  //                 tokenUpdateTimer = setTimeout( async () => {
            
  //                     const { lastUsed, user } = store.getState()
  //                     const now = Date.now()
  //                     this.counter += 1
  //                     const counter = this.counter

  //                     // if logged in...
  //                     if( user ) { 
  //                         console.debug("token renewal: user is logged in")
  //                         // if has been used recently, renew the token
  //                         if( now - lastUsed <= usageThreshold ){
  //                             console.debug("App used recently, token is sent to immediate renewal", counter )                        
  //                             await AuthService.renew() 
  //                             console.debug("renewal token teceived", counter)                            
  //                         } else {
  //                             console.debug("token renewal: app not used recently. Logging out.")
  //                             // else - log out
  //                             await AuthService.logout()
  //                         }
  //                     }  else {
  //                         console.debug("token renewal: user not logged in, doing nothing")
  //                         // do nothing, the user isn't logged in yet
  //                         // (this should not happen at all, actually)
  //                     }
            
  //                 }, tokenUpdateTimespan )
  //             } else {
  //                 console.debug("token renewal time overdue, sending renewal request immediately. ", `${renewTokenIn} - (${now} - ${tokenTimestamp}) = ${tokenUpdateTimespan}`)
  //                 await AuthService.renew() 
  //             }           
  // }

  // static clearTokenUpdateTimer(){
  //     clearTimeout(tokenUpdateTimer)
  // }

}

Actions.isFetchingToken = false;
Actions.counter = 0;

export default Actions;
