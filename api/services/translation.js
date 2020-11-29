const baseService = require("./baseService")
const _f = require("fetsch")

const defautlFields = "r.*"

const language_list         = require("../data/languages.json")
const restaurants       = require("../data/restaurants.json")
const trans             = require("../data/translations.json")

const fallbackLang = "en"

class TranslateService extends baseService{

    

    static async languagesByRestaurant(slug){
        const rest = restaurants.find( r => r.slug === slug )

        if( rest ){
            let {languages} = rest
            if( languages ){
                languages = languages.split(",")
                .map( id => ({ ...language_list[id], id } || {id, name: id, nativeName: id })  )
                .map( 
                    ln => (
                        {...ln, 
                            name: ln.name ? ln.name.split(",")[0] : ln.id , // if there are several comma-separated names, use the first one
                            nativeName: ln.nativeName ? ln.nativeName.split(",")[0] : ln.id // if there are several comma-separated names, use the first one
                        } ) 
                )
                return languages
            } else {
                return []
            }
        } else {
            return []
        }
    }
    

    static async getByKeys( keys, lang=fallbackLang, default_lang=fallbackLang ){
        
        // console.debug("traslating:", keys)
        
        
        if( !keys ){
            this.Error(`Translation request cannot be empty`)
            return false
        }
        
        keys = typeof keys === "string" ? [keys] : keys
        
        // const cachekey =  `${lang}/${default_lang}/${keys.join(".")}`
        const cachekey =  this.makeHash( `${lang}/${default_lang}/${keys.join(".")}` )
        // console.debug("hash:", cachekey )

        if( !this.cacheExists(cachekey) ){

            if( Array.isArray(keys) ){
                let t // to reference in error catch
                try {
    
                    const result =  keys.reduce( (res, key) => {
                        const found = trans.find( t => t.translationid === key )
                        if( found && typeof found === "object" ){
                            return {...res, 
                                [key]: { 
                                    [lang]: found[lang] || found[fallbackLang] , 
                                    [default_lang]: found[default_lang] || found[fallbackLang]  } }
                        } else return res
                    }, {} )

                    this.cache( cachekey, result )
                    return this.getCached(cachekey)
    
                } catch(e){
                    this.Error("Error translating request")
                    console.error("Error translating. Request:", keys, "\nKey with error: ", t )
                    return false
                }
    
                
            } else {
                console.error("Translation request error. Request:", keys )
                this.Error(`Translation request must be an array of string or a single string. Received: ${typeof keys}`)
                return false
            }
        } else {
            // console.debug("returning from cache", cachekey)
            return this.getCached(cachekey)
        }

    }
}

baseService.extend(TranslateService)


module.exports = TranslateService