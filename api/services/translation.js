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
    
    static async translateOne( key, language, defaulLanguage = fallbackLang ){
        const cachekey = `t-${key}-${language}`
        if( !this.cacheExists(cachekey) ){
            const found = trans.find( t => t.translationid === key )
            if( found ){
                const result = found[language] || found[defaulLanguage] || key
                this.cache(cachekey, result)
            } else {
                this.cache(cachekey, key)
            }
            return this.getCached(cachekey);
        } else {
            return this.getCached(cachekey);
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
                    let i = 0;
                    let result = {}
                    while( i < keys.length ){
                        const key = keys[i];
                        const tr1 = await this.translateOne(key, lang );
                        const tr2 = await this.translateOne(key, default_lang );
                        i+=1
                        // add translation pair
                        result[key] = {
                            [lang] : tr1 ,
                            [default_lang]: tr2
                        }
                    }
                    // const result =  keys.reduce( async (res, key) => {
                    //     const tr1 = await this.translateOne(key, lang );
                    //     const tr2 = await this.translateOne(key, default_lang );
                    //     return {...res, 
                    //         [lang] : tr1 ,
                    //         [default_lang]: tr2
                    //     }
                    //     // const found = trans.find( t => t.translationid === key )
                    //     // if( found && typeof found === "object" ){
                    //     //     return {...res, 
                    //     //         [key]: { 
                    //     //             [lang]: found[lang] || found[fallbackLang] , 
                    //     //             [default_lang]: found[default_lang] || found[fallbackLang]  } }
                    //     // } else return res
                    // }, {} )

                    this.cache( cachekey, result )
                    return this.getCached(cachekey)
    
                } catch(e){
                    this.Error("Error translating request")
                    console.error("Error translating. Request:", keys, "\nKey with error: ", t, "error:", e )
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

/**
 * A function factory that returns a function to translate into 2 languages: target language and restaurant's default language
 * @param {*} language target language code
 * @param {*} def_language restaurant's default language cod
 */
TranslateService._T = (language, def_language ) =>
// returns a function that will transate based on given key and index (index being 1 or anything else)
(key, ind ) => 
// if ind = 1 returns translation in current language, or key if not found
ind === 1 ? translate(key)[language] || key : 
// otherwise returns translation in restaurant's default language, or in requested language if found, or key if not found
translate(key)[def_language] || translate(key)[language] || key

// finds translation in translations object
const translate = (key) => trans.find( i => i.translationid === key ) ||  {}


module.exports = TranslateService