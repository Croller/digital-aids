const baseService           = require("./baseService")
const translationService    = require("./translation")
const tagService            = require("./tags")

const _f = require("fetsch")

// const defautlFields = "r.*"
const defaultLang = "en"

const rests             = require( '../data/restaurants.json')
const cuisines_list     = require( '../data/cuisines.json')
const dishes            = require( '../data/dishes.json')
const categories_list   = require( '../data/categories.json')
const _conditions       = require( '../data/conditions.json')
const _ofertas          = require( '../data/ofertas.json')
const menus             = require( '../data/menus.json')
const menu_dishes       = require( '../data/menu-dishes.json')
const insider_list      = require( '../data/insiders.json')
const { cacheExists } = require("./baseService")


qRestaurants = 
"SELECT %fields% FROM restaurants r \
%join% \
WHERE %where% \
%groupby% \
%limit%";

/**
 * This service fetches and returns restaurant data.
 * Everything's async here for future use of DB.
 */
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

                    let insiders = await this.getRestaurantInsiders(rest.id, lang);

                    // populate insiders with dishes
                    // insiders = insiders.map( i => {
                    //     let dish
                    //     let m_ind = 0
                    //     // search all the menus till the dish is found 
                    //     // (to get the already translated dish)
                    //     while( !dish && m_ind < menus.length  ){
                    //         const current_menu = menus[m_ind]
                    //         dish = current_menu && current_menu.items ? 
                    //             current_menu.items.find( d => d.dishid === i.dishid ) : null
                    //         m_ind ++ 
                    //     }
                    //     return {...i, dish }
                    // })

                    // get ofertas
                    const ofertas = await this.getRestaurantOfertas( rest.id, lang );

                    // get all dishes in restaurant
                    const all_dishes = await this.getRestaurantDishes( rest.id, lang, defaultlanguage)

                    rest = {
                        ...rest, 
                        menus,  
                        // photos: photos? photos.split(",") : [] ,
                        photos: photos? photos.split(/[, ]+/) : [] ,
                        insiders,
                        ofertas,
                        all_dishes
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

    static async getRestaurantDishes( restaurant_id, lang , default_lang ){

        const cacheIndex = `restaurant_dishes_${restaurant_id}_${lang}_${default_lang}`;

        if( !this.cacheExists(cacheIndex )){

            const ids = dishes.filter( d => d.dishrestaurtantid === restaurant_id ).map( d => d.dishid );
            // console.debug("Comparing", restaurant_id, "to dishes. e.g.", dishes[0],  "fetched ids:", ids )
            // parse dishes
            let i = 0;
            let result = {};
            while( i < ids.length){
                const d = await this.parseDish( ids[i], lang, default_lang );
                result = {...result, [ids[i]] : d };
                i++;
            }

            // return result;
            this.cache(cacheIndex, result)
            return this.getCached(cacheIndex)
        } else {
            return this.getCached(cacheIndex)
        }
        
    }

    static async getAllergenIds(){
        const cacheId = "a-ids";
        if( !this.cacheExists(cacheId) ){
            // not stored in cache, build it and store it

             // fetch only ids of allergns 
            let allergens = await tagService.getAll()
            allergens = Array.isArray(allergens) ? allergens.map( t => t.id) : []

            // cache it
            this.cache( cacheId, allergens );

            return this.getCached(cacheId);
        } else {
            return this.getCached(cacheId);
        }
    }

    // static async getRestorauntMenu( id, lang = defaultLang, default_lang = defaultLang ){


    //     // fetch only ids of allergns 
    //     let allergens = await tagService.getAll()
    //     allergens = Array.isArray(allergens) ? allergens.map( t => t.tagid) : []

        
    //     console.debug(lang, default_lang)
    //     let result = dishes.filter( d => d.dishrestaurtantid === id )
    //     .map( dish => { 
    //         const {
    //         dishid,
    //         dishprice,
    //         dishcategoryid,
    //         dishmenuid,
    //         image,
    //         tags
    //         } = dish
    //         console.debug("image:", image)
    //         return { dishid,
    //             dishprice,
    //             dishcategoryid,
    //             image,
    //             dishmenuid,
    //             dishtitle: dish[`dishtitle${lang}`] || dish["dishtitleen"],
    //             dishtitledefault:  lang === default_lang ? null : dish[`dishtitle${default_lang}`],
    //             tags: tags ? tags.split(",").filter( t => allergens.includes(t) ) : []
    //             }
    //         }
    //     )

        

    //     return result;
    // }


    static async getRestaurantInsiders( id, lang ){

        // gather
        const _insiders = insider_list.filter( i => i.restaurantid === id );

        // translate
        let i=0
        while( i < _insiders.length){
            const insider = _insiders[i];
            const imagetext = await  translationService.translateOne( insider.imagetext, lang );
            const text = await  translationService.translateOne( insider.translationid, lang );
            const dish = dishes.find( d => d.dishid === parseInt(insider.dishid) )
            _insiders[i] = 
            {..._insiders[i], 
                text,
                imagetext,
                // image: dish ? dish.image : null,
                
                price: dish ? dish.price : null,
                dish
             }
            i+=1;
        }


        return _insiders;
    }


    /**
     * pricedetails is a string containing description of a complex dish:
     * several categories with an option to select only one dish within each category.
     * E.g. a daily menu
     * 
     * @param {*} details string to parse
     * @param {*} lang currently selcted menu language
     * @param {*} default_lang restaurant's default language
     */
    static async breakDishPriceDetails( details, lang, default_lang ){

        // details consist of several categories separated by ';'
        let categories = typeof details === "string" ? details.split(";") : [];

        let i = 0;
        let result = []
        while(i<categories.length){
            let cat  = categories[i];
            
            // each category consists of category title translation_id and dish list, separated by non-zero amount of spaces
            const [translation_id, inner_dishes] =  typeof cat === "string" ? cat.split(/[ ]+/) : [];
            
            // if translation id and dish list is a string, continue 
            if( translation_id && typeof inner_dishes === "string" ){

                // translate title in two languages
                const title         = await translationService.translateOne(translation_id, lang)
                const default_title = await translationService.translateOne(translation_id, default_lang)

                // split dish ids
                const dish_ids =  inner_dishes.split(/[|]+/);

                console.debug("breakDishPriceDetails: split dish ids", inner_dishes, "result:", dish_ids )

                // collect dishes
                let ii = 0, items = []
                while( ii < dish_ids.length ){
                    const id = parseInt(dish_ids[ii]);
                    let collected_dish = await this.parseDish( id, lang, default_lang )

                    if( collected_dish ){
                        // update category id to category within complex item
                        collected_dish.dishcategoryid = translation_id // translation id and category id is the same (at least, at this point, 2021/01)
                        items = [ ...items, collected_dish ];
                    }

                    ii ++;
                }

                result = [ ...result, 
                    {
                        translation_id,
                        title,
                        default_title,
                        items
                    } 
                ]
            }
            i++;
        }
        
        return result.length > 0 ? result : null ;
    }

   

    /**
     * Parse dish, including translation and details parse.
     * @param {*} dish_id 
     * @param {*} lang 
     * @param {*} default_lang 
     */
    static async parseDish( dish_id, lang, default_lang ){

        const dish = dishes.find( dd => dish_id === dd.dishid );
        // console.debug("parseDish: finding ", dish_id, "in dishes: ", Boolean(dish));

        if( dish ){

            // check for translationid is needed for not to get error on json parse.
            const title         = dish.translationid ? await translationService.translateOne(dish.translationid, lang) : null
            const default_title = dish.translationid ? await translationService.translateOne(dish.translationid, default_lang) : null 
            const pricefor      = dish.pricefor ?
                await translationService.translateOne(dish.pricefor, default_lang)
                : null;

            const allergens = await this.getAllergenIds();
            
            // destructure dish
            let {
                dishid,
                dishprice,
                pricedetails,
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

            // split price details 
            pricedetails = await this.breakDishPriceDetails( pricedetails, lang, default_lang );
            
            
            const result = {
                dishid,
                dishprice,
                pricedetails,
                dishcategoryid,
                image,
                dishmenuid,
                pricefor,
                amount : amountText,
                viewonly,
                tags: tags ? tags.split(/[, ]+/).filter( t => allergens.includes(t) ) : [],
                title,
                default_title
            }
            return result;

        } else return false;
    }

    /**
     * 
     * @param {*} id 
     * @param {Date} now Date object. Time for which to choose the menus.
     * @param {*} lang string two-letter ISO language code, main language to translate the menu into
     * @param {*} default_lang string two-letter ISO language code, default language of the restaurant
     */
    static async getRestaurantMenusAsync( id, now, lang = defaultLang, default_lang = defaultLang ){


        // prepare all dishrestaurtantid
        const all_dishes = await this.getRestaurantDishes( id, lang, default_lang );

        // TODO: validate 'now' type

        // TODO: offset GMT for each restaurant.
        const weekday = now.getDay() + 1
        const daytime = now.getHours() * 60 + now.getMinutes() // convert time to integer


        // // fetch only ids of allergns 
        // let allergens = await tagService.getAll()
        // // console.debug("allergen:", allergens);
        // allergens = Array.isArray(allergens) ? allergens.map( t => t.id) : []
        // // console.debug("allergen:", allergens);


        // Select menus that are currently active
        let rest_menus = menus.filter( m => 
            m.restaurantid === id &&
            (!m.activedays || m.activedays === weekday) &&
            (!m.hourfrom || m.hourfrom * 60 <= daytime ) && // comparing time * 60 with converted daytime
            (!m.hourto || m.hourto * 60 >= daytime )
        );

        // console.debug("filered menus:", rest_menus);

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
                // find dihes by menu/dish xref menu_dishes
                const selected_dishes = menu_dishes.filter(d => 
                    d.restaurantid === id &&
                    d.menuid === m.menuid 
                    )

                
                // select id and category id from dish.
                ii = 0;
                while( ii < selected_dishes.length ){
                    const d = selected_dishes[ii];
                    
                    // fetch all dish data to get its category id
                    const _dish = all_dishes[d.dishid];

                    // we only need dish id and category id to populate menu
                    const dish = {
                        dishid: d.dishid,
                        dishcategoryid: _dish.dishcategoryid
                    }
                    // console.debug("getRestaurantMenusAsync: dish found and dish stored:", d, dish)
                    // const dish = await this.parseDish( parseInt(d.dishid), lang, default_lang );

                    // add dish to items
                    // if( !dish ){
                    //     items = [...items, { dishid: d.dishid, title: "Dish was not found" } ]
                    // } else {
                    items = [...items, dish ]
                    // }

                   
                    ii+=1
                }  

                const uniqueCategories = items.reduce( (cats, item) => {
                    // console.debug( item.dishid, item.dishcategoryid, cats.includes(item.dishcategoryid) );
                    if( !cats.includes(item.dishcategoryid) )
                        return [...cats, item.dishcategoryid ]
                    else
                        return cats
                }, [])
                
                // console.debug("Unique categories:", uniqueCategories)
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
    
                        // add conditions, if any
                        const cat_in_list = categories_list.find(ct => ct.categoryid === c )
                        let conditions = []
                        if( cat_in_list && cat_in_list.conditions ){
                            // split string into ids
                            const condition_list = cat_in_list.conditions.toString().split(/[, .;]+/)
                            // console.debug("category", cat_in_list, condition_list)
                            if ( Array.isArray(condition_list) ){

                                let i = 0
                                while( i < condition_list.length){

                                    const condition_id = parseInt( condition_list[i] );
                                    // find condition in condition list and add it to categorie's conditions
                                    const condition = _conditions.find( cnd => cnd.conditionid === condition_id );
                                    if( condition ){

                                        // translate condition
                                        condition.title     = condition.titletranslationid ? await translationService.translateOne(condition.titletranslationid, lang) : null
                                        condition.text      = condition.texttranslationid ? await translationService.translateOne(condition.texttranslationid, lang) : null
                                        condition.prompt    = condition.prompttranlsationid ? await translationService.translateOne(condition.prompttranlsationid, lang) : null
                                        condition.confirm_button    = condition.confirmbuttontid ? await translationService.translateOne(condition.confirmbuttontid, lang) : null
                                        condition.decline_button    = condition.declinebuttontid ? await translationService.translateOne(condition.declinebuttontid, lang) : null

                                        conditions = [...conditions, condition ];

                                    }
                                    i++
                                }
                            } 
                        }


                        categories = [...categories,
                            {
                                id: c || "", 
                                title, titledefault,
                                conditions
                            }
                        ]
                    }

                    iii += 1
                }
                console.debug("Packed categories:", categories.map(c => c.id))                
               
                // add the whole shebang to the menus array
                rest_menus_result = 
                [...rest_menus_result,
                    {...m, title, default_title, categories, items}
                ]
                i+=1;
            }
        }
        
        // order menus by ordering column
        return  rest_menus_result.sort( (a,b) => a.ordering - b.ordering );
    }
    

    
    /**
     * Returns a hashed by category id object of arrays of restaurant's ofertas, translated to given language, 
     * @param {*} id 
     * @param {*} language 
     */
    static async getRestaurantOfertas( id, language ){
        
        // TODO: fetch GMT offset for each restaurant and create the date using the offset.
        const now = new Date();

        let ofertas = _ofertas.filter( o => 
            // {

            //     const from = new Date(o.activefrom)
            //     const to = new Date(o.activeto)

            //     console.debug("from <= now:", from <=now, from , now)
            //     console.debug("to >= now:", to >=now, to , now)

            //     return o.restaurantid === id &&
            //     // filter by active date
            //     from <= now  &&
            //     to >= now
            // }

            // This is the short way
            o.restaurantid === id &&
            // filter by active date
            new Date(o.activefrom) <= now  &&
            new Date(o.activeto) >= now
            )
        

        let result = []
        let i=0;
        while( i < ofertas.length){
            const o = { ...ofertas[i] } // copy to avoid changes in original 
            
            // title - big green header under the image
            o.header         = o.headertranslationid ? await translationService.translateOne(o.headertranslationid, language) : null
            // first paragraph of text 
            o.text1         = o.text1translationid ? await translationService.translateOne(o.text1translationid, language) : null
            // optional second paragraph of text
            o.text2         = o.text2translationid ? await translationService.translateOne(o.text2translationid, language) : null
            // conditions - text in the bottom part of the oferta window, in gray field.
            o.conditions    = o.conditionstranslationid ? await translationService.translateOne(o.conditionstranslationid, language) : null
            // button text
            o.call_to_action= o.calltoactiontranslationid ? await translationService.translateOne(o.calltoactiontranslationid, language) : null
            
            // ids of categories the oferta will be shown in.
            // if omitted, it will be shown when user enters the menu for the first time 
            // when more than 1 oferta is present within category (or with no category)
            // one of them is randomly chosen to show.
            console.debug('o.categoryids', o.categoryids)
            o.categoryids = o.categoryids ? o.categoryids.split(/[,.;| ]+/) : null;
            result = [...result, o]
            i++;
        }

        // hash result by category id
        return result.reduce( (res, o) => {
            
            if (Array.isArray(o.categoryids)){

                o.categoryids.map( cid => {
                    // if result of category id is not empty (already an array)
                    res[cid] = res[cid] ? 
                    // it's added the oferta
                    [...res[cid], o] :  
                    // otherwise an array with single element is created
                    [o]
                })
            } else {
                // if result of empty string (reserved for no-category ofertas) is not empty (already an array)
                res[""] = res[""] ? 
                // it's added the oferta
                [...res[""], o] : 
                // otherwise an array with single element is created
                [o]
            }

            return res;
            
        }, {} );
    }
}

baseService.extend(RestService)


module.exports = RestService