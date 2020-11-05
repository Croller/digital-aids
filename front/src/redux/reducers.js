import A from './actionTypes'
import Actions from './actions'
const localStorageKey = "food&fans-digital-menus"

let localStorageState 

try {
    localStorageState = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey) ) : {}
} catch(e) {
    localStorageState = {}
}


const initialState = 
{
    ...{
        language: "en"
    },
    // overwrite values from local state, if any
    ...localStorageState
}


// const setToken = ( state, token, tokenTimestamp, other = {} ) => {
//     console.debug("reducers / setToken: token renewal")
//     // onTokenUpdate(state.tokenTimestamp)
//     Actions.onTokenUpdate(state.tokenTimestamp)
//     return {...state, authorization: `Bearer ${token}`, tokenTimestamp,  ...other }
//     // return {...state, authorization: `Bearer ${token}`, tokenTimestamp: Date.now(), ...other }
// }

// export const onTokenUpdate = state => Actions.onTokenUpdate(state) // renewTokenIn, usageThreshold )

export default function root( state = initialState, action ) { 

    let newState = {...state}
    // let {messages} = state
    // let now = Date.now()

    switch( action.type ){
        
        case A.SET_LANGUAGE:
            newState = {...newState, language: action.payload }
            break;
        default:
            //newState = state;
            
    }

    localStorage.setItem( localStorageKey, JSON.stringify(newState) )
    
    return newState;
}