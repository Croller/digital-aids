import A from './actionTypes'
// import Actions from './actions'
const localStorageKey = "food&fans-digital-menus"

let localStorageState 

try {
    localStorageState = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey) ) : {}
} catch(e) {
    localStorageState = {}
}


const initialRestaurantState = {
    cart: [], // restaurant's cart
    filters: {}, // filters
    cartCount: 0, // items in cart
    cartPrice: 0, // cart total price
    cartHasItemsWithNoPrice: false,
    overlay: "language",
    conditions: {}, // accepted conditions: { condition_id: result, ... },
    ofertaIsShown: false // flag that an oferta pop-up on entering the menu was shown
}

const initialState = 
{
    ...{
        language: null,
        languageSelected: false,
        restaurants: {}
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


// returns restaurant by its slug if exists or initial state if not.
export const getRestaurant = (_state, slug) => {
    console.debug("getRestaurant _state:", _state)
    console.debug("getRestaurant slug:", slug )
    const result = _state && _state.restaurants ? _state.restaurants[slug] || {...initialRestaurantState}  : {...initialRestaurantState}  /// _state.restaurants[slug] ? {..._state.restaurants[slug] } : {...initialRestaurantState}
    console.debug("getRestaurant result:", result)
    return result
}

export default function root( state = initialState, action ) { 

    let newState = {...state}
    
    // let {messages} = state
    // let now = Date.now()
    const {type: payloadType, payload } = action;
    
    let 
    restaurant, restaurants,
    cart, 
    cartCount, 
    condition_id,
    details,
    details_index,
    index, 
    item, 
    slug, 
    rest,
    // restCart, 
    result,
    dishid, 
    cartPrice,
    type,
    overlay, 
    value;
    

    console.debug("Dispatch type and payload:", payloadType, payload)
    switch( payloadType ){
        
        case A.SET_LANGUAGE:
            newState = {...newState, language: payload  }
            break;
        
        case A.SET_LANGUAGE_SELECTED:
            newState = {...newState, languageSelected: true  }
            break;
        
        case A.CLEAR_CART:
            console.debug("clearing cart for" , payload  )
            restaurant = getRestaurant( newState, payload)
            
            if( restaurant ){
                // restaurant.cart = []
                // restaurant.cartCount = 0 
                
                // newState.restaurants[payload] = restaurant 
                ({ restaurants } = newState );

                newState = {
                    ...newState, 
                    restaurants: 
                        {...restaurants, 
                            [payload]: {
                                ...restaurant, 
                                cart: [], 
                                cartCount: 0,
                                cartPrice: 0,
                            } 
                        } 
                    } 
            }else {
                console.debug("Wrong restaurant slug passed: ", payload)
            }
            break;
        
        case A.ADD_TO_CART:

            ({slug, item} = payload);
            
            restaurant = getRestaurant( newState, slug);
            console.debug("getRestaurant got:", restaurant);
            ({cart, cartCount, cartPrice } = restaurant);
            
            // cart = { ...cart } // copy so that we don't mutate it
            
            // the portion of the cart that relates to the given restaurant
            // restCart = cart[slug] ? [ ...cart[slug] ] : []

            const increment = item.quantity || 1;

            // find if the item already exists in cart
            index = cart.findIndex( i => i.dishid === item.dishid );
            console.debug("Found index:", index);

            // get details if any
            ({details} = item );

            console.debug("ADD_TO_CART: details found", details)
            


            // if there is already one in the cart...
            if( index >=0 ){

                // ...use the found item it as item
                item = cart[index]

                // if details are passed, add them to item's details
                if( details ){
                    item.details = [...item.details, details];
                }
 
                console.debug("found existing item:", item)
                
                // ...and increase its quantity by payload.quantity or by 1 if none
                
                item.quantity = item.quantity ? item.quantity + increment : increment 
                
                // replace
                cart.splice(index,1, item )
                console.debug("After replacing element:", cart )

                // increment count
                cartCount += increment

                
                // update in restCart
                // cart.splice(index, 1, item )

            } else {

                console.debug("Item not found, adding a new one")
                
                if( !item.quantity ){
                    item.quantity = increment
                }

                // if details are passed, put them inside an array
                // because for the same complex item there may be more than one
                // set of details (e.g. user can order more than one daily menu combinations)
                if( details ){
                    item.details = [details];
                }

                // increment count
                cartCount += increment

                // add to cart
                cart = [...cart, item ]

            }

            // increment price
            cartPrice += item.dishprice ? item.dishprice * increment : 0

            
            // update item in cart object
            // cart = {...cart, [slug]: ca }
            restaurant = {...restaurant, cart, cartCount, cartPrice }

            console.debug("After adding: ", restaurant );
            // newState = {...newState, cart , cartCount, cartPrice }

            // update restaurat in state
            // newState.restaurants[slug] = restaurant
            
            newState = {...newState, restaurants: {...restaurants, [slug]: restaurant } } 
            
            break;

        case A.DELETE_FROM_CART:
            ({
                slug, 
                dishid , 
                details_index 
            } = payload);

            restaurant = getRestaurant( newState, slug);
            ({cart, cartCount, cartPrice } = restaurant );


            // copy
            // cart = {...cart}
            
            // the portion of the cart that relates to the given restaurant
            // restCart = cart[slug] ? [ ...cart[slug] ] : []
            
            // ind if item exists in cart
            index = cart.findIndex( i => i.dishid === dishid )
            

            if( index >=0 ){
                item = cart[index]
                console.debug("Found to delete:", item)

                // flag - whether the quantity will really change
                let quantity_will_change = true;

                // if details_index passed, check if there's a details item with this index
                if( details_index >= 0 ){

                    // get the details
                    ({details} = item);

                    // if there's an item with given index...
                    if( details && details[details_index]){
                        // remove details item
                        details.splice(details_index, 1);
                        // overwrite details
                        item.details = details;
                    } else {
                        // ...otherwise - item actually not found - there was an error
                        console.error("DELETE_FROM_CART: details item not found - ", details_index);
                        quantity_will_change = false;
                    }
                } 

                if( quantity_will_change ){

                    // decrement quantity...
                    item.quantity = item.quantity - 1
    
    
    
                    // ...and count
                    cartCount = cartCount - 1
                    
                    console.debug("Quantity reduced to", item.quantity )
                    console.debug("Count reduced to:", cartCount)
                    // decrement price
                    console.debug("Cart price", cartPrice)
                    cartPrice -= item.dishprice ? item.dishprice : 0
                    console.debug("Decrementing cart price by: ", item.dishprice ? item.dishprice : 0)
                    console.debug("Cart price after decrement", cartPrice)
    
                    if(item.quantity <= 0){
                        console.debug("Item depleted. Removing from cart")
                        // if zero, remove
                        cart.splice(index, 1)
                    }
    
    
                    // update item in cart object
                    // cart = {...cart, [slug]: restCart }
                    restaurant = {...restaurant, cart, cartCount, cartPrice}
    
                    console.debug("After removing: ", restaurant );
                    // newState = { ...newState, cart, cartCount, cartPrice}
                    ({ restaurants } = newState );
                    newState = {...newState, restaurants: {...restaurants, [slug]: restaurant } } 
                }

            }
            break;

        case A.SET_FILTER:
            // set specific filter for specific restaurant
            /**
             * @param {string} slug
             * @param {string} type type of filter ('search' etc)
             * @param {*} value value to set to the filter
             */
            ({slug, type, value} = payload);
            
            restaurant = getRestaurant( newState, slug);

            const filters = restaurant.filters || {}

            // filters fotr this particular restaurant
            // const restFilters = filters[slug] || {}

            // set new value
            filters[type] = value

            // update filters 
            // filters[slug] = restFilters

            restaurant = {...restaurant, filters };

            // update new state
            // newState = {...newState, filters }
            ({restaurants} = newState);
            restaurants = {...restaurants, [slug]: restaurant }
            newState = {...newState, restaurants }
            
            break;    
        

        case A.SET_OVERLAY:
            ({slug, overlay} = payload);
            restaurant = getRestaurant( newState, slug);

            if( ["cart", "hamburger", "language", null ].includes(overlay)){
                restaurant = {...restaurant, overlay };

                ({restaurants} = newState);
                restaurants = {...restaurants, [slug]: restaurant };
                newState = {...newState, restaurants };
            } else {
                console.debug("SET OVERLAY: wrong overlay type", overlay)
            } 
            break;

        case A.ACCEPT_CONDITION:
            ({ condition_id, result, slug } = payload);
            ({restaurants} = newState);
            rest = restaurants[slug]
            if( rest ){

                const {conditions = {} } = rest
                rest = {...rest, conditions: {...conditions, [condition_id]: result } }

                restaurants = {...restaurants, [slug]: rest }
    
                newState = { ...newState, restaurants }
            }
            break;

        case A.OFERTA_IS_SHOWN:
            // payload is the restaurant's slug.

            ({restaurants} = newState);
            // find restaurant
            rest = restaurants[payload]

            if( rest ){
                // update value                
                rest = {...rest, ofertaIsShown: true }
                // update restaurants
                restaurants = {...restaurants, [payload]: rest }
                // update state
                newState = { ...newState, restaurants }
            }
            break;
        default:
            //newState = state;
            
    }

    localStorage.setItem( localStorageKey, JSON.stringify(newState) )
    
    return newState;
}