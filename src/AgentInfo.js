
//           options          value, Display, value, Display, ...
export const genderOptions   = [{id:"male",     text:"Male"    }, {id:"female" , text:"Female" }];
export const raceOptions     = [{id:"american", text:"American"}, {id:"british", text:"British"}, {id:"russian", text:"Russian"}];
export const skinOptions     = [{id:"white",    text:"White"   }, {id:"brown"  , text:"Brown"  }, {id:"yellow" , text:"Yellow" }];
export const eyeOptions      = [{id:"blue",     text:"Blue"    }, {id:"brown"  , text:"Brown"  }, {id:"green"  , text:"Green"  }];
export const hairOptions     = [{id:"black",    text:"Black"   }, {id:"blond"  , text:"Blond"  }, {id:"red"    , text:"Red"    }];
export const clothOptions    = [{id:"black",    text:"Black"   }, {id:"white"  , text:"White"  }, {id:"grey"   , text:"Grey"   }];
export const heightOptions   = [{id:0, text:"Stub"  }, {id:1, text:"Average" } , {id:2, text:"Tower"     }];
export const weightOptions   = [{id:0, text:"Skinny"}, {id:1, text:"Average" } , {id:2, text:"Portly"    }];
export const cleanOptions    = [{id:0, text:"Filthy"}, {id:1, text:"Washed"  } , {id:2, text:"Spotless"  }];
export const beautyOptions   = [{id:0, text:"Scaggy"}, {id:1, text:"Pleasing"} , {id:2, text:"Gorgeous"  }];
export const strengthOptions = [{id:0, text:"Weak"  }, {id:1, text:"Capable" } , {id:2, text:"Like an OX"}];

class AgentInfo {

    constructor(props){
        this.uid = props.uid                 ?? Date.now();
        this.firstName = props.firstName     ?? "Test";
        this.lastName = props.lastName       ?? "Player";
        this.age = props.age                 ?? 18;
        this.gender = props.gender           ?? "male";      // male, female
        this.race = props.race               ?? "american";  // american, british, russian
        this.skin = props.skin               ?? "white";     // white, brown, yellow
        this.eyes = props.eyes               ?? "brown";     // blue, brown, green
        this.hair = props.hair               ?? "blond";     // black, blond, red
        this.cloth = props.cloth             ?? "grey";      // black, white, grey
        this.height = props.height           ?? 0;           // 0=sm, 1=med, 2=lg
        this.weight = props.weight           ?? 0;           // 0=sm, 1=med, 2=lg
        this.cleanliness = props.cleanliness ?? 0;           // 0=sm, 1=med, 2=lg
        this.beauty = props.beauty           ?? 0;           // 0=sm, 1=med, 2=lg
        this.strength = props.strength       ?? 0;           // 0=sm, 1=med, 2=lg
        this.handler = props.handler         ?? "javascript:void()";          
    }
    static getTestPlayer() {
        return new AgentInfo({firstName:"Test", lastName:"Player", age: 18, gender:"male", race:"american"});
    };
}
export default AgentInfo;
