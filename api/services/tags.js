const baseService = require("./baseService")
const _f = require("fetsch")

const defautlFields = "r.*"

const language_list         = require("../data/languages.json")
const tags       = require("../data/tags.json")

class TagsService extends baseService{

    

    static async getAll( slug, lang, default_lang ){
        // TODO: fetch only the ones used in restaurant with slug
        // return tags.map( t => ({ id: t.tagid, type: t.tagtype, title: t[lang] || t["en"], default_title: t[default_lang] || t["en"] }))
        return tags
        // only the allergens for now
        .filter( t => t.tagtype === "allergen")
        .map( t => ({ id: t.tagid, type: t.tagtype, title: t[lang] || t["en"], default_title: t[default_lang] || t["en"] }))
    }
    
}

baseService.extend(TagsService)


module.exports = TagsService