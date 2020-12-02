const baseService           = require("./baseService")
const translationService    = require("./translation")

const _f = require("fetsch")

const defautlFields = "r.*"
const defaultLang = "en"

const rests             = require( '../data/restaurants.json')
const cuisines_list     = require( '../data/cuisines.json')
const dishes            = require( '../data/dishes.json')
const categories_list   = require( '../data/categories.json')
const menus             = require( '../data/menus.json')
const menu_dishes       = require( '../data/menu-dishes.json')
// const translations      = require( '../data/translations.json')

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
    static async get( slug, lang = defaultLang ){
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
                            return cuisine[lang] || cuisine[defaultLang]
                        }) 
                    

                    rest.languages = await translationService.languagesByRestaurant(slug)
                    
                    const menus = await this.getRestaurantMenus(
                        rest.id, 
                        new Date(),
                        lang, defaultlanguage
                    )
                    // const menu = await this.getRestorauntMenu( rest.id, lang, defaultlanguage )
                    // /// gather the categories
                    // const uniqueCategories = menu.reduce( (cats, item) => {
                    //     if( !cats.includes(item.dishcategoryid) )
                    //         return [...cats, item.dishcategoryid ]
                    //     else
                    //         return cats
                    // }, [])

                    // const categories = uniqueCategories.map( 
                    //     c => {
                    //         const foundCat = categories_list.find( cc => cc.categoryid === c)
                    //         let title, titledefault
                    //         if( foundCat ){
                    //             title = foundCat[`categorytitle${lang}`] || foundCat[`categorytitleen`]
                    //             titledefault =  
                    //                 lang === defaultlanguage ? null :
                    //             foundCat[`categorytitle${defaultlanguage}`] || foundCat[`categorytitleen`]
                    //         } else {
                    //             console.error("Category not found: ", c, ", using ID as title")
                    //             title = c
                    //         }

                    //         return {
                    //             id: c, 
                    //             title, titledefault
                    //         }
                    //     }
                    // )
                    // rest = {...rest, menu, categories }
                    rest = {...rest, menus}
                } 
                // console.log("Rest:" , rest)
                return rest

               
            } catch(e){
                console.error("Error fetching single restaurant: ", e.message )
                this.Error("Database error")
                return false;
            }
        } else {
            return this.getCached(restid)
        }
    }


    static async getRestorauntMenu( id, lang = defaultLang, default_lang = defaultLang ){

        console.debug(lang, default_lang)
        let result = dishes.filter( d => d.dishrestaurtantid === id )
        .map( dish => { 
            const {
            dishid,
            dishprice,
            dishcategoryid,
            dishmenuid,
            image,
            tags
            } = dish
            console.debug("image:", image)
            return { dishid,
                dishprice,
                dishcategoryid,
                image,
                dishmenuid,
                dishtitle: dish[`dishtitle${lang}`] || dish["dishtitleen"],
                dishtitledefault:  lang === default_lang ? null : dish[`dishtitle${default_lang}`],
                tags: tags ? tags.split(",") : []
                }
            }
        )

        

        return result;
    }

    /**
     * 
     * @param {*} id 
     * @param {Date} now Date object. Time for which to choose the menus.
     * @param {*} lang string two-letter ISO language code, main language to translate the menu into
     * @param {*} default_lang string two-letter ISO language code, default language of the restaurant
     */
    static async getRestaurantMenus( id, now, lang = defaultLang, default_lang = defaultLang ){
        // TODO: validate 'now' type

        // TODO: offset GMT for each restaurant.
        const weekday = now.getDay() + 1
        const daytime = now.getHours() * 60 + now.getMinutes() // convert time to integer

        // console.log( "weekday:", weekday, "daytime:", daytime)
        let rest_menus = menus.filter( m => 
            m.restaurantid === id &&
            (!m.activedays || m.activedays === weekday) &&
            (!m.hourfrom || m.hourfrom * 60 <= daytime ) && // comparing time * 60 with converted daytime
            (!m.hourto || m.hourto * 60 >= daytime )
        );

        if( Array.isArray(rest_menus) && rest_menus.length > 0 ){
            rest_menus = rest_menus.map ( m => {

                const _t = translationService._T( lang, default_lang )
                
                const title = _t(m.titletranslationid, 1)
                const default_title = _t(m.titletranslationid)

                const items = menu_dishes.filter(d => 
                d.restaurantid === id &&
                d.menuid === m.menuid 
                ).map( d => {
                    const dish = dishes.find( dd => d.dishid === dd.dishid )
                    // let translated = await translationService.getByKeys( [ dish.translationid ], lang, default_lang )
                    // console.debug("translated:", translated)
                    
                    const title = _t(dish.translationid, 1)
                    const default_title = _t(dish.translationid)

                    const {
                        dishid,
                        dishprice,
                        dishcategoryid,
                        image,
                        dishmenuid,
                        tags
                    } = dish
                    return {
                        dishid,
                        dishprice,
                        dishcategoryid,
                        image,
                        dishmenuid,
                        tags: tags ? tags.split(",") : [],
                        title,
                        default_title
                    }
                })  

                const uniqueCategories = items.reduce( (cats, item) => {
                    if( !cats.includes(item.dishcategoryid) )
                        return [...cats, item.dishcategoryid ]
                    else
                        return cats
                }, [])
                
                console.debug("Unique categories:", uniqueCategories)
                const categories = uniqueCategories.map( 
                    c => {
                        // const foundCat = categories_list.find( cc => cc.categoryid === c)

                        const title = _t(c, 1)
                        const titledefault = _t(c)
                        // let title, titledefault
                        // if( foundCat ){
                        //     title = foundCat[`categorytitle${lang}`] || foundCat[`categorytitleen`]
                        //     titledefault =  
                        //         lang === defaultlanguage ? null :
                        //     foundCat[`categorytitle${defaultlanguage}`] || foundCat[`categorytitleen`]
                        // } else {
                        //     console.error("Category not found: ", c, ", using ID as title")
                        //     title = c
                        // }

                        return {
                            id: c, 
                            title, titledefault
                        }
                    }
                )

                return {...m, title, default_title, categories,  items}
            })
        }
        // console.debug(rest_menus)
        return rest_menus;
    }
    
}

baseService.extend(RestService)


module.exports = RestService