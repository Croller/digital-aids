/**
 * cudos to https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
 * @param {*} string 
 */
export function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}


/**
 * Replace words wrapped with %..% with corresponding items from items{} object
 * E.g. 
 * items: { %name%: "Me", %age%: 12 }
 * str: "I am %name" and I'm %age% years old. That's %name%."
 * strFormat(str, items) => "I am Me and I'm 12 years old. that's Me."
 * @param {*} str 
 * @param {*} items 
 */
export function strFormat( str, items ){
    return str.replace(/%\w+%/g, key => {
        return items[key] || key;
     });
     
}

/**
 * Kudos to https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array/38571132#comment74054264_38571132
 * @param {*} array 
 * @param {*} num 
 */
export const randomFromArray = ( array, num ) =>  array.sort(() => 0.5 - Math.random()).slice(0, num )


/**
 * Loads an external script asynchronously and optionally executes a callback once it's done.
 * Kudos to https://stackoverflow.com/a/53396827/3770223
 * @param {*} url 
 * @param {*} callback 
 */
export function loadScript( url, callback = null ) {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    if( callback && typeof callback === 'function')
        script.onload = () => callback()

    document.body.appendChild(script);
}


/**
 * Replace anything within %..% with correponding eement from passed array
 * Kudos to https://stackoverflow.com/questions/7975005/format-a-javascript-string-using-placeholders-and-an-object-of-substitutions#comment100792501_35187109
 * @param {string} message 
 * @param {string[]} values 
 */
export function textFormat(message, values) { 
    let i = 0; 
    if( message )
        return message.replace(/%\w+%/g, (match, idx) => { return values[i++]; }); 
    else {
        console.warn("textFormat: passed value is not a string, null returned.")
        return null
    }
}

/**
 * Scrolls to given element with given offset in pixels
 */
export function scrollToElement( el, yOffset = 0, options = {behavior: 'smooth'}){    
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;  
    window.scrollTo({...options, top: y });
}


export function removePrefix( str, prefix ){
    return str.indexOf(prefix) === 0 ? str.substr(prefix.length) : str;
}

/**
 * Populates target object's fields recursively from corresponding fields in source object. 
 * Only fields already existing in target object are updated.
 * If target field type is object, the function is called recursively to populate the field.
 * If source object is null, target is returned unchanged.
 * If target object is null, null is returned.
 * @param {object|null} target 
 * @param {object|null} source 
 * @returns {object|null}
 */
export function populateObjectRecursively( target, source ){
    if(source === null || target === null ) return target


    

    if( typeof target === "object" && typeof source === "object" ){
        let result = {}

        Object.keys(target).map( key => {
            if( source.hasOwnProperty( key ) )
                switch( typeof target[key] ){
                    case "object":
                        if( typeof source[key] === "object" ) // recursion
                            result[key] = populateObjectRecursively( target[key], source[key] )
                        else
                            result[key] = source[key]
                        break;
                    default:
                        result[key] = source[key]
                        break;
                }
        } )
        // repopulated object
        return result
    } 
    // orginal value
    return target
}


/**
 * Debounce function factory.
 * Receives debounce delay and callback. 
 * Returns a debounced event handler that will call the callback 
 * once the period between handler calls is larger than debounce delay.
 * @param {*} delay in ms
 * @param {*} callback event handler
 * @usage Show left scroll once the scrollng is stopped:
 * el.addEventListener("scroll", debounce(300, ev => console.debug(ev.target.scrollLeft)) )
 */
export function debounce( delay=200, callback = console.debug ){
    let timer
    return ev => {
        
        console.debug("Debounce: received event: ", ev )
        // debounce
        if( timer )
            clearTimeout(timer);
    
        // set timer again
        timer = setTimeout( () => {
            console.debug("Debounce: Debounced event: ", ev )
            callback(ev)
        } , delay )
    }

}

/**
 * Returns whether object obj has property key
 * @param {*} obj 
 * @param {*} key 
 */
export const has = (obj, key) => typeof obj === "object" && obj.hasOwnProperty(key)

// module.exports = {
//     slugify, 
//     strFormat, 
//     randomFromArray, 
//     loadScript,
//     textFormat
// }


/**
 * Creates key for translations object from translation key and language
 * @param {*} key 
 * @param {*} language 
 */
export const tkey = (key, language) => `${key}+${language}`