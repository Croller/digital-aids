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
        language: "en",
        cart: {},
        cartCount: 0,
        cartPrice: 0,
        cartHasItemsWithNoPrice: false
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
    const {type, payload } = action
    
    let cart, cartCount, index, item, slug, restCart, dishid, cartPrice

    console.debug("Dispatch type and payload:", type, payload)
    switch( type ){
        
        case A.SET_LANGUAGE:
            newState = {...newState, language: payload }
            break;
        
        case A.CLEAR_CART:
            newState = {...newState, cart: {}, cartCount: 0 }
            break;
        
        case A.ADD_TO_CART:

            ({slug, item} = payload);
            ({cart, cartCount, cartPrice } = newState );
            
            cart = { ...cart } // copy so that we don't mutate it
            
            // the portion of the cart that relates to the given restaurant
            restCart = cart[slug] ? [ ...cart[slug] ] : []

            const increment = item.quantity || 1

            // find if the item already exists in cart
            index = restCart.findIndex( i => i.dishid === item.dishid )
            console.debug("Found index:", index)

            // if there is already one in the cart...
            if( index >=0 ){
                
                // ...then use it as item
                item = restCart[index]
 
                console.debug("found existing item:", item)
                
                // ...and increase its quantity by payload.quantity or by 1 if none
                
                item.quantity = item.quantity ? item.quantity + increment : increment 
                
                restCart.splice(index,1, item )
                console.debug("After replacing element:", cart )

                // increment count
                cartCount += increment

                
                // update in restCart
                restCart.splice(index, 1, item )

            } else {

                console.debug("Item not found, adding a new one")
                
                if( !item.quantity ){
                    item.quantity = increment
                }

                // increment count
                cartCount += increment

                // add to restCart
                restCart = [...restCart, item ]
                
                // // update item in cart object
                // cart = {...cart, [slug]: restCart }

            }

            // increment price
            cartPrice += item.dishprice ? item.dishprice * increment : 0

            
            // update item in cart object
            cart = {...cart, [slug]: restCart }

            console.debug("After adding: ", cart )
            newState = {...newState, cart , cartCount, cartPrice }
            
            break;

        case A.DELETE_FROM_CART:
            ({cart, cartCount, cartPrice } = newState );

            ({slug, dishid} = payload);

            // copy
            cart = {...cart}
            
            // the portion of the cart that relates to the given restaurant
            restCart = cart[slug] ? [ ...cart[slug] ] : []
            
            // ind if item exists in cart
            index = restCart.findIndex( i => i.dishid === dishid )
            

            if( index >=0 ){
                item = restCart[index]
                console.debug("Found to delete:", item)
                
                // decrement quantity...
                item.quantity = item.quantity - 1

                console.debug("Quantity reduced to", item.quantity )
                // ...and count
                cartCount = cartCount - 1
                console.debug("Count reduced to:", cartCount)
                
                // decrement price
                console.debug("Cart price", cartPrice)
                cartPrice -= item.dishprice ? item.dishprice : 0
                console.debug("Decrementing cart price by: ", item.dishprice ? item.dishprice : 0)
                console.debug("Cart price after decrement", cartPrice)

                if(item.quantity <= 0){
                    console.debug("Item depleted. Removing from cart")
                    // if zero, remove
                    restCart.splice(index, 1)
                }


                // update item in cart object
                cart = {...cart, [slug]: restCart }

                console.debug("After removing: ", cart, cartCount)
                newState = { ...newState, cart, cartCount, cartPrice}
            }
            break;
        default:
            //newState = state;
            
    }

    localStorage.setItem( localStorageKey, JSON.stringify(newState) )
    
    return newState;
}