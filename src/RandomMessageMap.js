import MessageMap from "./MessageMap";
import Synonyms   from "./Synonyms"       

const messages = new Map([

  ["amb.rand.noise"  , new Synonyms([ "no_text", "amb.rand.noise1", "no_text", "amb.rand.noise2", "no_text", "amb.rand.noise3" ])],
  ["amb.silence" , new Synonyms(["amb.silence2" ])],
  ["unknown" , new Synonyms([ "unknown1" , "unknown2" ])]
]);

class RandomMessageMap{

    static log(msg){ /* console.log("RandomMessageMap: "+ msg); */ }

    // it is possible the strWord has no synonyms
    static getRandomMessage(strKey, gameState){
      let message;
      if(strKey != null && strKey.length > 0){ 
        let lckey = strKey.toLowerCase(); 
        let objSynonyms = messages.get(lckey);
        let skey = objSynonyms.getSynonym();
        if (skey != null && skey.length > 0) {          
          message = MessageMap.getMessage(skey.toLowerCase(), gameState);
        }else{
          message = MessageMap.getMessage(lckey, gameState);
        }
      }
      return (message) ? message: " ";
    }

    static getRandomMessageKeys(){
      return Array.from(messages.keys());
    }
}
export default RandomMessageMap;
