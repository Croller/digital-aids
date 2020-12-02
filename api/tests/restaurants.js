// MOCHA TEST
const Service = require("../services/restaurants")

var assert = require('assert');

let menus

describe('Check menus selection functionality', function () {
    it('should return menus for restaurant las-cuevas', async function () {
    
        menus = await  Service.getRestaurantMenus(
            3700,
            new Date(), "en", "es"
            )
        assert.strictEqual( Array.isArray( menus) , true, "Wrong result type" ) ;
        // console.debug("Fetched menus: \n", menus )
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });

    it('should return menus for restaurant las-cuevas for monday, 13:20 (2 menus)', async function () {
    
        menus = await  Service.getRestaurantMenus(
            3700,
            new Date("2020-11-30 13:20:00"), "en", "es"
            )
        assert.strictEqual( menus.length, 2, "Wrong number of menus selected" ) ;
        // console.debug("Fetched menus: \n", menus )
        menus.map ( m => console.debug( 
            {
                id: m.menuid,
                title: m.title + " / " + m.default_title,
                item_count: m.items.length
            }
        ))
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });
    
    it('should return menus for restaurant las-cuevas for monday, 16:59', async function () {
    
        menus = await  Service.getRestaurantMenus(
            3700,
            new Date("2020-11-30 16:59:59"), "en", "es"
            )
            assert.strictEqual( menus.length, 2, "Wrong number of menus selected" ) ;
        // console.debug("Fetched menus: \n", menus )
        menus.map ( m => console.debug( 
            {
                id: m.menuid,
                title: m.title + " / " + m.default_title,
                item_count: m.items.length
            }
        ))
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });
    it('should return menus for restaurant las-cuevas for monday, 17:01', async function () {
    
        menus = await  Service.getRestaurantMenus(
            3700,
            new Date("2020-11-30 17:01:00"), "en", "es"
            )
            assert.strictEqual( menus.length, 1, "Wrong number of menus selected" ) ;
        // console.debug("Fetched menus: \n", menus )
        menus.map ( m => console.debug( 
            {
                id: m.menuid,
                title: m.title + " / " + m.default_title,
                item_count: m.items.length,
                categories: m.categories,
            }
        ))
        // console.debug("Categories:\n", m.categories)
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });
})