// MOCHA TEST
const Service = require("../services/translation")

var assert = require('assert');

describe('Check translation functionality', function () {
    it('should find translation and return it', async function () {
    
        const tr = await Service.translateOne("Yes", "es" )
        console.debug("Yes to ES -> ", tr );
        assert.strictEqual(  tr ,"Si", "Wrong translation" ) ;
        // console.debug("Fetched menus: \n", menus )
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });

    it('should fail to find translation and return the key', async function () {
    
        const tr = await Service.translateOne("Yesss", "es" )
        console.debug("Yesss (does not exist) to ES  -> ", tr );
        assert.strictEqual(  tr ,"Yesss", "Wrong translation" ) ;
        // console.debug("Fetched menus: \n", menus )
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });

    it('should fail to find translation and return english translation', async function () {
    
        const tr = await Service.translateOne("ThankYou", "ar" )
        console.debug("ThankYou to AR (does not exist) -> ", tr );
        assert.strictEqual(  tr ,"Thank you!", "Wrong translation" ) ;
        // console.debug("Fetched menus: \n", menus )
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });

    it('should retrieve an object with translations', async function () {
    
        const tr = await Service.getByKeys( ["ThankYou", "Yes", "Remove"], "es" )
        console.debug("By keys: ", tr );
        assert.strictEqual(  Object.keys( tr).length ,  3 , "Wrong translation" ) ;
        // console.debug("Fetched menus: \n", menus )
        // console.debug("Fetched dishes: \n", menus[0]["items"][0] )
    });
})