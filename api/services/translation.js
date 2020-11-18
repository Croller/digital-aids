const baseService = require("./baseService")
const _f = require("fetsch")

const defautlFields = "r.*"

const language_list         = require("../data/languages.json")
const restaurants       = require("../data/restaurants.json")

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
    
}

baseService.extend(TranslateService)


module.exports = TranslateService