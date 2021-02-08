import { tkey } from '../utils/functions';

const initialState = {
};

/**
 * Translation reducers
 * @param {*} state 
 * @param {*} action 
 */
export default function (state = initialState, action) {
  let newState = { ...state }; let 
    translations;

  const { type, payload } = action;

  switch (type) {
  case 'ADD_TRANSLATION':
    console.debug('add translation reducer', payload);

    translations = mergeTranslations(newState, payload);
    console.debug('Translation reducer: translation updated to:', translations);
    newState = { ...translations };
    break;
  default:
    // do nothing
    break;
  }

  return newState;
}

/**
 * One-level-deep merge for specific structure ( {key:object...})
 * @param {*} target 
 * @param {*} source 
 */
const mergeTranslations = (target, source) => {
  const result = { ...target };

  Object.keys(source).map(key => {
    const t = source[key];
    Object.keys(t).map(lang => {
      result[tkey(key, lang)] = t[lang];
    });
  });

  // if( typeof target === "object" && typeof source === "object" ){
  //     Object.keys(source).map( key => {
  //         // every field in translations is an object, so it's pretty much safe to do this:
  //         result[key] = 
  //         // if there is such translation already...
  //         result.hasOwnProperty(key) ? 
  //         // merge values in it.
  //         Object.assign( result[key], source[key] ) 
  //         // if there's no translation - add it
  //         : source[key]
  //     })
      
  // } 
  return result;
};

// export const _T = (key, translations) => translations[key] ? translations[key] : key
