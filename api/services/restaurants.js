const baseService = require("./baseService")
const _f = require("fetsch")

const defautlFields = "r.*"

const rests             = require("../data/restaurants.json")
const cuisines_list     = require( '../data/cuisines.json')
const dishes            = require( '../data/dishes.json')
const categories_list   = require( '../data/categories.json')

qRestaurants = 
"SELECT %fields% FROM restaurants r \
%join% \
WHERE %where% \
%groupby% \
%limit%";

class RestService extends baseService{

    

    /**
     * Get single restaurant by slug
     * @param {*} slug 
     */
    static async get( slug, lang = "en" ){
        const restid = `restaurant_${slug}`

        if( !this.cacheExists(restid)){

            try{


                let rest = rests.find( r => r.slug === slug )
        
                rest = {...rest} ///copy it...
                if( rest ){
                    // console.log( "Rest:", rest)
                    // populate cuisines list
                    const {cuisines, defaultlanguage  = lang } = rest
                    // console.log( "cuisines:", cuisines)

                    rest.cuisines = cuisines.split(",").map ( 
                        c => {

                            const cuisine = cuisines_list.find( c1=> c1.cuisineid === c )
                            return cuisine[lang] || cuisine["en"]
                        }) 
                    

                        
                        
                    const menu = await this.getRestorauntMenu( rest.id, lang, defaultlanguage )
                    /// gather the categories
                    const uniqueCategories = menu.reduce( (cats, item) => {
                        if( !cats.includes(item.dishcategoryid) )
                            return [...cats, item.dishcategoryid ]
                        else
                            return cats
                    }, [])

                    const categories = uniqueCategories.map( 
                        c => {
                            const foundCat = categories_list.find( cc => cc.categoryid === c)
                            let title, titledefault
                            if( foundCat ){
                                title = foundCat[`categorytitle${lang}`] || foundCat[`categorytitleen`]
                                titledefault =  
                                    lang === defaultlanguage ? null :
                                foundCat[`categorytitle${defaultlanguage}`] || foundCat[`categorytitleen`]
                            } else {
                                console.error("Category not found: ", c, ", using ID as title")
                                title = c
                            }

                            return {
                                id: c, 
                                title, titledefault
                            }
                        }
                    )
                    rest = {...rest, menu, categories }
                } 
                // console.log("Rest:" , rest)
                return rest

                // const q = _f.strFormat(
                //     qRestaurants, 
                //     {
                //         "%fields%" :  defaultFields,
                //         "%where%": "active='1' AND deleted='0' AND r.slug=?",
                //         "%limit%": "LIMIT 1",
                //         "%groupby%": "GROUP BY u.id"
                //     }
                // )
    
                // // console.debug(q)
                // const [restaurants] = await this.DB.query(
                //     q,
                //     [slug]
                // )
    
                // if( Array.isArray(restaurants) && restaurants.length > 0){
                //     // array is received, fetch first element and cache it
                //     this.cache(restid, restaurants[0] )
                //     // return cached
                //     return this.getCached(restid) 

                // } else {
                //     // no array or empty array is received
                //     this.Error("Restaurant not found")
                //     return false
                // }
            } catch(e){
                console.error("Error fetching single restaurant: ", e.message )
                this.Error("Database error")
                return false;
            }
        } else {
            return this.getCached(restid)
        }
    }


    static async getRestorauntMenu( id, lang = "en", default_lang = "en" ){
        console.debug(lang, default_lang)
        let result = dishes.filter( d => d.dishrestaurtantid === id )
        .map( dish => { 
            const {
            dishid,
            dishprice,
            dishcategoryid
            } = dish
            return { dishid,
                dishprice,
                dishcategoryid,
                dishtitle: dish[`dishtitle${lang}`] || dish["dishtitleen"],
                dishtitledefault:  lang === default_lang ? null : dish[`dishtitle${default_lang}`]
                }
            }
        )

        

        return result;
    }
    
}

baseService.extend(RestService)


module.exports = RestService