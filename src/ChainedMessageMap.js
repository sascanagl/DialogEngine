import SynonymMap       from "./SynonymMap";
import MarkedMessage    from "./MarkedMessage";
import MessageMap       from "./MessageMap";
import RandomMessageMap from "./RandomMessageMap";

// $s{Synonym}           = SynonymMap.getSynonym
// $s{uc:Synonym}        = SynonymMap.getSynonym.capitalizeFirstLetter
// $m{messageKey}        = MessageMap.getMessage
// $r{randomMessageKey}  = RandomMessageMap.getRandomMessage
// $c{chainedMessageKey} = ChainedMessageMap.getChainedMessage

const sS = "$s{";
const mS = "$m{";
const rS = "$r{";
const cS = "$c{";

const chains = new Map([

    [ "party.init1", "$m{party.init1}\n$m{party.init5} $m{party.init10} $m{party.init15}"],
    [ "party.init5", "$m{party.init20} $m{party.init25} $m{party.init30}"],
    [ "outside.init1", "$m{outside.init1} $m{outside.init5}"]
]);

class ChainedMessageMap{

    static log(msg){ /* console.log("ChainedMessageMap: "+ msg); */ }

    // called internally only
    static replaceSynonyms( message){
        let val = null;
        let mMsg = new MarkedMessage(message, 0, sS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = SynonymMap.getSynonym(mMsg.key.toLowerCase()); // get a synonym
            mMsg.replaceMark(val);
        }
        return mMsg.message;
    }

    // called internally only
    static replaceMessages( message, gameState){
        let val = null;
        let mMsg = new MarkedMessage(message, 0, mS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = MessageMap.getMessage(mMsg.key, gameState);
            mMsg.replaceMark(val);
        }
        return mMsg.message;
    }

    // called internally only
    static replaceRandomMessages( message, gameState){
        let val = null;
        let mMsg = new MarkedMessage(message, 0, rS);
        while(mMsg.hasMark && mMsg.hasKey()){
            val = RandomMessageMap.getRandomMessage(mMsg.key, gameState);
            mMsg.replaceMark(val);
        }
        return mMsg.message;
    }
  
    // this is who we call externally
    // linefeeds = true | false
    /**
     * 
     * @param {*} msgKey 
     * @param {*} gameState 
     * @param {*} linefeeds 
     */
    static getChainedMessages(msgKey, gameState, linefeeds){
        let phrase = String(chains.get(msgKey));
        let append;
        if(phrase != null && phrase.length > 0){
            phrase = ChainedMessageMap.replaceSynonyms(phrase); 
            if(linefeeds===true && phrase != null) phrase += "\n";
            phrase = ChainedMessageMap.replaceMessages(phrase, gameState);
            if(linefeeds===true && phrase != null) phrase += "\n";
            phrase = ChainedMessageMap.replaceRandomMessages(phrase, gameState);
            if(linefeeds===true && phrase != null) phrase += "\n";
            return phrase;
        }else{
            phrase = "Hmm...";
        }
        return "Bad ChainedMessage: "+ msgKey;
    }
  
    static getChainedMessageKeys(){
      return Array.from(chains.keys());
    }
}
export default ChainedMessageMap;
