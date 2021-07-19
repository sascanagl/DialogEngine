import Synonyms from "./Synonyms.js";

const synonyms = new Map([
  ["academics" , new Synonyms([ "scholars", "professors" ])],
  ["anywhere"  , new Synonyms([ "everywhere", "wherever", "anyplace" ])],
  ["apartment" , new Synonyms([ "abode", "home", "flat", "residence", "digs" ])],
  ["bobby"     , new Synonyms([ "he", "him", "his" ])],
  ["chance"    , new Synonyms([ "happen", "hazard", "stumble", "venture" ])],
  ["chicago"   , new Synonyms([ "the Windy City" ])],
  ["coworkers" , new Synonyms([ "associates", "colleagues" ])],
  ["direction" , new Synonyms([ "awareness", "surity", "purpose", "plan", "destination" ])],
  ["entered"   , new Synonyms([ "set foot in", "walked into", "stepped into" ])],
  ["evening"   , new Synonyms([ "night" ])],
  ["fiona"     , new Synonyms([ "she", "her", "hers" ])],
  ["gathering" , new Synonyms([ "party", "affair", "meeting", "congregation" ])],
  ["harold"    , new Synonyms([ "he", "him", "his" ])],
  ["intended"  , new Synonyms([ "expected" ])],
  ["informal"  , new Synonyms([ "relaxed", "casual", "straightforward", "easygoing", "laid back", "ordinary" ])],
  ["little"    , new Synonyms([ "no" , "slight" , "minor" ])],
  ["John Law"  , new Synonyms([ "Pig", "Bacon", "Blue", "Bobby", "Fuzz", "Five-O", "Gumshoe", "Mountie", "Vics" ])],
  ["lost"      , new Synonyms([ "adrift" , "astray" , "disoriented" ])],
  ["lois"      , new Synonyms([ "he", "him", "his" ])],
  ["margaret"  , new Synonyms([ "she", "her", "hers" ])],
  ["nearby"    , new Synonyms([ "close by"  , "very near", "not far"    ])],
  ["notice"    , new Synonyms([ "note", "heed", "thought", "awareness", "regard" ])],
  ["painful"   , new Synonyms([ "difficult", "unbearable"               ])],
  ["pauline"   , new Synonyms([ "she", "her", "hers" ])],
  ["quiet"     , new Synonyms([ "soft", "soulful", "muted", "low", "dull", "muffled" ])],
  ["rick"      , new Synonyms([ "he", "him", "his" ])],
  ["seek"      , new Synonyms([ "find", "pursue", "chase", "hunt", "scout", "solicit" ])],
  ["showing"   , new Synonyms([ "presenting", "demonstrating", "promoting", "relaying" ])],
  ["silence"   , new Synonyms([ "quiet", "stillness" ])],
  ["softly"    , new Synonyms([ "soulfully", "faintly", "gently", "tenderly", "delicately" ])],
  ["speechless", new Synonyms([ "confused", "muddled", "befuddled"      ])],
  ["strangers" , new Synonyms([ "newcomers", "unknowns", "unfamiliars", "outsiders", "visitors" ])],
  ["thanks"    , new Synonyms([ "thank you", "much obliged", "gracias"  ])],
  ["think"     , new Synonyms([ "ponder"   , "contemplate" , "muse"     ])],
  ["tim"       , new Synonyms([ "he", "him", "his" ])],
  ["uc"        , new Synonyms([ "the University of Chicago" ])],
  ["utterly"   , new Synonyms([ "completely" , "totally" , "wholly", "altogether", "categorically", "entirely" ])],
  ["walking"   , new Synonyms([ "striding" , "meandering"  , "waddling" ])],
  ["wander"    , new Synonyms([ "stroll" , "amble"  , "walk", "dawdle", "saunter", "meander", "roam", "prowl", "drift", "traipse", "mosey", "trudge" ])],
  ["watch"     , new Synonyms([ "see", "behold", "observe", "view", "study", "witness" ])],
  ["welcome"   , new Synonyms([ "entrée" ])],
  ["whispers"  , new Synonyms([ "mumbles" , "murmurs"  , "breathes"     ])],
  ["wow"       , new Synonyms([ "jeez", "unbelievable", "uncanny", "whoa" ])],
  ["wrestling" , new Synonyms([ "rustling", "noises", "jostling"        ])]
]);

const ucS = "uc:"; // upCase first letter of returned synonym

class SynonymMap{

    static capFirst(key){
        return key.charAt(0).toUpperCase() + key.slice(1);
    }

    // it is possible the strWord has no synonyms
    // ucs:strWord means to upCase first letter before return
    // n:strwork means to get the specific index instead of a random index (Pronounds)
    // ucs:n:strwork means to get the specific index (pronound) and upCase the first letter
    static getSynonym(strWord){
      if(strWord != null && strWord.length > 0){        
        let ucBool = strWord.startsWith(ucS);
        let key = ucBool ? strWord.slice(ucS.length) :
                           strWord;
        let pindex = key.indexOf(":");
        let person = 0;
        if(pindex > 0) {
          person = key.substring(0,pindex);
          key = key.substring(pindex+1);
        }
        // return null or new word
        // null means use the key given
        let objSynonym = synonyms.get(key.toLowerCase()); 
        if(objSynonym != null){
            let str = null;
            if(person > 0){
                str = objSynonym.getPronoun(person);
            }else{
                str = objSynonym.getSynonym();
            }
            if(str != null && str.length > 0)
                return ucBool ? SynonymMap.capFirst(str) : str; 
            if(person == 3)
                key = key +"'s"; // 3rd person possessive
        }
        return ucBool ? SynonymMap.capFirst(key) : key;
      }
      return strWord;
    }

    static getSynonymKeys(){
      return Array.from(synonyms.keys());
    }
}
export default SynonymMap;
