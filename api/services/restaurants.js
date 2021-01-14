const baseService           = require("./baseService")
const translationService    = require("./translation")
const tagService            = require("./tags")

const _f = require("fetsch")

// const defautlFields = "r.*"
const defaultLang = "en"

const rests             = require( '../data/restaurants.json')
const cuisines_list     = require( '../data/cuisines.json')
const dishes            = require( '../data/dishes.json')
// const categories_list   = require( '../data/categories.json')
const menus             = require( '../data/menus.json')
const menu_dishes       = require( '../data/menu-dishes.json')
const insider_list      = require( '../data/insiders.json')


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
                    const {cuisines, defaultlanguage  = lang, photos } = rest
                    // console.log( "cuisines:", cuisines)
                    // console.debug("cuisines", "check")
                    // rest.cuisines = cuisines.split(",").map ( 
                    rest.cuisines = cuisines.split(/[, ]+/).map ( 
                        c => {
                            
                            const cuisine = cuisines_list.find( c1=> c1.cuisineid === c )
                            return cuisine[lang] || cuisine[defaultLang]
                        }) 
                        
                        
                    rest.languages = await translationService.languagesByRestaurant(slug)
                    // console.debug("languages", "check")

                    rest.tags = await tagService.getAll( slug, lang, defaultlanguage );
                    // console.debug("tags", "check")
                    // const menus = await this.getRestaurantMenus(
                    const menus = await this.getRestaurantMenusAsync(
                        rest.id, 
                        new Date(),
                        lang, defaultlanguage
                    );

                    // console.debug("menus", "check")

                    let insiders = await this.getRestaurantInsiders(rest.id);

                    // populate insiders with dishes
                    insiders = insiders.map( i => {
                        let dish
                        let m_ind = 0
                        // search all the menus till the dish is found 
                        // (to get the already translated dish)
                        while( !dish && m_ind < menus.length  ){
                            const current_menu = menus[m_ind]
                            dish = current_menu && current_menu.items ? 
                                current_menu.items.find( d => d.dishid === i.dishid ) : null
                            m_ind ++ 
                        }
                        return {...i, dish }
                    })

                    // console.debug("insiders", "check")

                    rest = {
                        ...rest, 
                        menus,  
                        // photos: photos? photos.split(",") : [] ,
                        photos: photos? photos.split(/[, ]+/) : [] ,
                        insiders
                    }
                } 
                // console.log("Rest:" , rest)
                return rest

               
            } catch(e){
                console.log(e);
                console.error("Error fetching single restaurant: ", e.message )
                this.Error("Database error")
                return false;
            }
        } else {
            return this.getCached(restid)
        }
    }


    static async getRestorauntMenu( id, lang = defaultLang, default_lang = defaultLang ){


        // fetch only ids of allergns 
        let allergens = await tagService.getAll()
        allergens = Array.isArray(allergens) ? allergens.map( t => t.tagid) : []

        
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
                tags: tags ? tags.split(",").filter( t => allergens.includes(t) ) : []
                }
            }
        )

        

        return result;
    }


    static async getRestaurantInsiders( id ){

        // gather
        const _insiders = insider_list.filter( i => i.restaurantid === id );

        // translate
        let i=0
        while( i < _insiders.length){
            const insider = _insiders[i];
            const text = await  translationService.translateOne( insider.translationid );
            const dish = dishes.find( d => d.dishid === insider.dishid )
            _insiders[i] = 
            {..._insiders[i], 
                text,
                image: dish ? dish.image : null,
                price: dish ? dish.price : null
             }
            i+=1;
        }


        return _insiders;
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

            rest_menus = rest_menus.map (  m => {

                const _t = translationService._T( lang, default_lang )
                
                const title = _t(m.titletranslationid, 1)
                const default_title = _t(m.titletranslationid)
                // const title         = translationService.translateOne(m.titletranslationid, lang)
                // const default_title = translationService.translateOne(m.titletranslationid, default_lang)

                const items = menu_dishes.filter(d => 
                d.restaurantid === id &&
                d.menuid === m.menuid 
                ).map( d => {
                    const dish = dishes.find( dd => d.dishid === dd.dishid )
                    // let translated = await translationService.getByKeys( [ dish.translationid ], lang, default_lang )
                    // console.debug("translated:", translated)
                    if( !dish ){
                            return { dishid: d.dishid, title: "Dish was not found" }
                    }
                    const title = _t(dish.translationid, 1)
                    const default_title = _t(dish.translationid)
                    // const title         = translationService.translateOne(dish.translationid, lang)
                    // const default_title = translationService.translateOne(dish.translationid, default_lang)

                    const {
                        dishid,
                        dishprice,
                        dishcategoryid,
                        image,
                        dishmenuid,
                        photos,
                        tags
                    } = dish
                    return {
                        dishid,
                        dishprice,
                        dishcategoryid,
                        image,
                        photos: photos? photos.split(",") : [] ,
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

                        const title = _t(c, 1)
                        const titledefault = _t(c)
                        // const title         = translationService.translateOne(c, lang)
                        // const titledefault  = translationService.translateOne(c, default_lang)



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

    /**
     * 
     * @param {*} id 
     * @param {Date} now Date object. Time for which to choose the menus.
     * @param {*} lang string two-letter ISO language code, main language to translate the menu into
     * @param {*} default_lang string two-letter ISO language code, default language of the restaurant
     */
    static async getRestaurantMenusAsync( id, now, lang = defaultLang, default_lang = defaultLang ){
        // TODO: validate 'now' type

        // TODO: offset GMT for each restaurant.
        const weekday = now.getDay() + 1
        const daytime = now.getHours() * 60 + now.getMinutes() // convert time to integer


        // fetch only ids of allergns 
        let allergens = await tagService.getAll()
        // console.debug("allergen:", allergens);
        allergens = Array.isArray(allergens) ? allergens.map( t => t.id) : []
        // console.debug("allergen:", allergens);


        // Select menus that are currently active
        let rest_menus = menus.filter( m => 
            m.restaurantid === id &&
            (!m.activedays || m.activedays === weekday) &&
            (!m.hourfrom || m.hourfrom * 60 <= daytime ) && // comparing time * 60 with converted daytime
            (!m.hourto || m.hourto * 60 >= daytime )
        );

        console.debug("filered menus:", rest_menus);

        let rest_menus_result = []

        if( Array.isArray(rest_menus) && rest_menus.length > 0 ){

            let i =0, ii=0, iii=0; // iterators
            
            
            while( i < rest_menus.length ){
                const m = rest_menus[i];
            // = rest_menus.map (  m => {

                // const _t = translationService._T( lang, default_lang )
                
                // const title = _t(m.titletranslationid, 1)
                // const default_title = _t(m.titletranslationid)
                const title         = await translationService.translateOne(m.titletranslationid, lang)
                const default_title = await translationService.translateOne(m.titletranslationid, default_lang)

                
                let items = []
                const selected_dishes = menu_dishes.filter(d => 
                    d.restaurantid === id &&
                    d.menuid === m.menuid 
                    )

                // menu_dishes.filter(d => 
                ii = 0;
                while( ii < selected_dishes.length ){
                    const d = selected_dishes[ii];

                    const dish = dishes.find( dd => d.dishid === dd.dishid )

                    if( !dish ){
                            items = [...items, { dishid: d.dishid, title: "Dish was not found" } ]
                    } else {



                        // const title = _t(dish.translationid, 1)
                        // const default_title = _t(dish.translationid)
                        
                        // check for translationid is needed for not to get error on json parse
                        const title         = dish.translationid ? await translationService.translateOne(dish.translationid, lang) : null
                        const default_title = dish.translationid ? await translationService.translateOne(dish.translationid, default_lang) : null 
                        const pricefor      = dish.pricefor ?
                            await translationService.translateOne(dish.pricefor, default_lang)
                            : null;

                        
                        // destructure dish
                        const {
                            dishid,
                            dishprice,
                            dishcategoryid,
                            image,
                            dishmenuid,
                            tags,
                            amount,
                            viewonly,
                            units
                        } = dish

                        let amountText
                        if( amount && units  ){
                            const unitsTranslation = await  translationService.translateOne( units, default_lang);
                            amountText = `${amount}${unitsTranslation}`;
                        }
                        
                        console.debug(">", dishid, dishcategoryid );
                        // add dish data to items, mix in the translations
                        items = [...items, 
                            {
                            dishid,
                            dishprice,
                            dishcategoryid,
                            image,
                            dishmenuid,
                            pricefor,
                            amount : amountText,
                            viewonly,
                            // tags: tags ? tags.split(",") : [],
                            // tags: tags ? tags.split(",").filter( t => allergens.includes(t) ) : [],
                            tags: tags ? tags.split(/[, ]+/).filter( t => allergens.includes(t) ) : [],
                            title,
                            default_title
                            }
                        ]
                    }
                    ii+=1
                }  

                const uniqueCategories = items.reduce( (cats, item) => {
                    console.debug(item.dishid, item.dishcategoryid, cats.includes(item.dishcategoryid) );
                    if( !cats.includes(item.dishcategoryid) )
                        return [...cats, item.dishcategoryid ]
                    else
                        return cats
                }, [])
                
                console.debug("Unique categories:", uniqueCategories)
                let categories = [] ;
                iii = 0;
                while( iii < uniqueCategories.length ){
                    const c = uniqueCategories[iii];
                    
                    // for the time being, skip empty categories.
                    if( c ){
                        // const title = _t(c, 1)
                        // const titledefault = _t(c)
                        const title         = c ? await translationService.translateOne(c, lang) : ""
                        const titledefault  = c ? await translationService.translateOne(c, default_lang) : ""
    
                        categories = [...categories,
                            {
                                id: c || "", 
                                title, titledefault
                            }
                        ]
                    }

                    iii += 1
                }
                console.debug("Packed categories:", categories)
                
               
                // add the whole shebang to the menus array
                rest_menus_result = 
                [...rest_menus_result,
                    {...m, title, default_title, categories, items}
                ]
                i+=1;
            }
        }
        // console.debug(rest_menus)
        return rest_menus_result;
    }
    
}

baseService.extend(RestService)


module.exports = RestService