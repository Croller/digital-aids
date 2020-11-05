import axios from 'axios'
import store from '../redux/store'
import Actions from '../redux/actions'
import A from '../redux/actionTypes'

const baseURL = process.env.REACT_APP_API
/**
 * A base client-side service class with maneagable cache and axios as .api property.
 * To create a descendant:
 * class NewClass extends baseClientService{
 *  ...
 * }
 * 
 * baseClientService.extend(NewClass) // this effectively copies the properties and methods
 * 
 */
class baseClientService {    

    static cache(index, value){
        this._CACHE[index] = value
    }
  
    static getCached (index, defaultValue ){ return this.cacheExists(index) ? this.Copy( this._CACHE[index] ) : defaultValue}

    static cacheExists(index) { return this._CACHE.hasOwnProperty(index)}

    static clearCache( index ) { 
        if( index ) {
            if( this.cacheExists(index) ){
                delete this._CACHE[index]
            }
        } else {
            this._CACHE = {}             
        }
    }
    static Copy( x ){
        return JSON.parse( JSON.stringify(x) );
    }

    static printCache(){ console.debug( "\n\n\nCache:\n", this._CACHE) }
    
    static Error( message ){ this.error = message }

    static extend( ancestor ) {
        Object.assign( ancestor, this )
    }



    static prepareConfig( config = {} ){
        // just in case...
        config = typeof config === "object" ? config : {}
        // get authorization header from redux state
        const {authorization} = store.getState()

        // get headers from passed config, if any
        let {headers = {} } = config
        // add authorization header
        headers = {...headers, authorization}


        return {...config, headers}
    }

    /**
     * Simple wrapper for axios get() method that adds authorization header from redux state. 
     * Will throw error on request error.
     * @param {*} url 
     * @param {*} config 
     */
    static async GET( url, config = {}){   
        try{
            const {data} = await baseClientService.api.get(url, this.prepareConfig(config) )
            return data        
        }catch(e){
            // console.log( "Error: ", e.requestData )
            if( e.response ){
                console.log( e.response )
                if( e.response.status === 401 ){
                    // oops, session terminated
                    // logout
                    this.dispatch( A.LOGOUT )
                    // show message
                    this.dispatch( A.SHOW_MESSAGE, {text: "Your session has expired, please log in again", level: "warning"})
                } else {
                    throw new Error(e.response.data)    
                }
            } else {
                throw new Error(e.message)
            }
        }  
    }

    /**
     * Simple wrapper for axios post() method that adds authorization header from redux state. Will throw error on request error.
     * @param {*} url 
     * @param {*} requestData 
     * @param {*} config 
     */
    static async POST( url, requestData = {}, config = {}){        
        try{

            const result = await baseClientService.api.post(url, requestData, this.prepareConfig(config))
            console.log("POST result:", result)
            const {data} = result 
            console.log("POST data:", data)
            return data  
        }catch(e){
            // console.log( "Error: ", e.requestData )
            if( e.response ){
                console.log( e.response )
                if( e.response.status === 401 ){
                    // oops, session terminated
                    // logout
                    this.dispatch( A.LOGOUT )
                    // show message
                    this.dispatch( A.SHOW_MESSAGE, {text: "Your session has expired, please log in again", level: "warning"})
                }
            } else {
                throw new Error(e.message)
            }
        }

        
    }


    static  dispatch( type, payload ){
        return store.dispatch( {type, payload } )
    }

    static action( actionName, actionArguments ){
        try{
            return Actions[actionName].apply( null, actionArguments )
        } catch(e){
            console.error(`Error in action ${actionName}: `, e.message )
            return false
        }
    }
}



baseClientService._CACHE = {}
baseClientService.api = axios.create({
    baseURL
})

// console.debug("API:",baseClientService.api)

// action types
baseClientService.actionTypes = A





export default baseClientService