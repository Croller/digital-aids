# Food Fans front end

React-based one page app.

All data is received as JSON via API calls from the app. 

Most of the media is stored at media server.

API and media server URLs have to be set in .env

## .env params
There's the **.env-example** file, you can duplicate it and rename to .env or .env-local, then edit the values to match your settings.

- **REACT_APP_API** - API URL (if using local server, it'll be something like https://localhost:8800)
- **REACT_APP_MEDIA** - media server URL
- **REACT_APP_GOOGLE_API** - Google API key, for google map widget.

## Note on Google maps:
I needed to remove default overlay objects from Google map widget, the simple-react-google-maps component didnt' have
a legal way of doing it, so to save time I just copy/pasted the index.js and change it in place.

The updated version is stored at **/src/assets/changed_node_files/index-updated.js**

Read the comments inside the file and inside **/src/components/restaurant/details/index.js** to solve the problem.

## App architecture

### Redux State

The app uses React-redux to store app state.

There are two reducers blocks: reducers.js that hanldes the **app state** and translation_reducers.js that handles **translations state**.

The **app state** is stored in local storage on every change and is fetched from there on page reload.

**App state** has three root elements:

```javascript
{
    language, // string, 2-character ISO 639-1 language code for currently selected language
    languageSelected, // bool, whether user has selected their language
    restaurants // object holding all of the restaurants' states that the user has visited.
}
```

A **restaurant state** consists of: 
```javascript
{
    cart, // restaurant's cart - array of objects, each of them is a dish object with added quantity value.
    filters, // object. used to filter items in categories, e.g. Search feature uses this object.
    cartCount, // int, number of items in cart
    cartPrice, // float or decmal, cart total price
    overlay,  // string : a string index of an overlay window to pop up above the menu. (See /src/components/main/Restaurant.jsx)
    conditions, // object that holds accepted conditions hashed by condition id. Can be used to store accepted conditions, like 'My age is over 18' etc, sitewide, if needed. { condition_id: result, ... },
    ofertaIsShown // bool: flag that an oferta pop-up on entering the menu has already been shown.
}
```

### DefaultComponent and Translations
**/src/components/DefaultComponent** is a default component that incapsulates translations.

To extend it do the next:

```javascript
import React from 'react';
// import component and custom connect wrapper from the DefaultComponent
import DefaultComponent, {connect} from 'DefaultComponent';

// import spinner component (just to illustrate the concept)
import Spinner from 'template/Spinner';

// extend the component
class NewComponentWithTranslations extends DefaultComponent {
    
    constructor(props){
        super(props);
        // Define translation ids to be fetched within constructor
        this.setTranslations(
            [
                // translation ids from translations table
                "MyOrder",
                "Total", 
                "ThankForOrder",
                "ThankYou"
            ],

            () => {
                // optional callback, called once the translations are fetched from server.
                // if not passed, the component sets the state.translationLoaded value to true,
                // so state.translationLoaded can be used in render method to wait 
                // until the moment the translations are ready.

                // do your logic here...
            }
        )
    }


    // use translations in render:
    render(){

        // fetch translations and language from props (DefaultComponent passes them there)
        const { language, translations } = this.props;

        // make a translator function out of incapsulated translator
        // (the _tr method of DefaultComponent)
        const _t = (key) => this._tr( key, language, translations );

        return (
            // if translations are fetched...
            this.state.translationLoaded ? 
            // this will show the MyOrder text from translations table in current language.
            <>
                { _t("MyOrder") }
                {
                    // the same can be done using the built-in _tr function
                    // but it's much longer:
                    this._tr( "MyOrder", language, translations );
                    // the _t variant is shorter and nicer to use :)
                }
            </>
            : // else show the spinner
            <Spinner />
            )
    }
}

// use custom connect to subscrube to redux and pass additional actions.
export default connect( 
    // first param is the class itseld
    NewComponentWithTranslations, 
    // Additional actions can be passed as second param, as an object holding functions,
    // each function must receive dispatch as first parameter and use it to dispatch the action:
    {
        // first parameter is always dispatch. After that - any number of parameters can be passed.
        emptyCart: (dispatch, payload) => dispatch( {type: A.CLEAR_CART, payload } )
    }
)

```
