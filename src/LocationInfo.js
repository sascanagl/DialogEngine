import AgentInfo from "./AgentInfo";

export const worldInfo  = [{ world:"main", zones: [ "party", "outside" , "hallway", 
                                                    "stairwell", "bathroom", "office", 
                                                    "landing", "theater", "upbathroom", "bedroom", "bedroom_hall" ]}];

export const zoneInfo   = [ { id: "party", display: "Great Room", // the main party room where everyone is entertained
                                               npcs: [
                                                  { id: "pauline"  , display: "Pauline Thompson", zone:"party" }, 
                                                  { id: "fiona"    , display: "Fiona McAllister", zone:"party" },   
                                                  { id: "margaret" , display: "Margaret Chun"   , zone:"party" },   
                                                  { id: "louis"    , display: "Louis Cagliostro", zone:"party" },   
                                                  { id: "tim"      , display: "Tim Kane"        , zone:"party" },   
                                                  { id: "harold"   , display: "Professor Harold Chun", zone:"party"},   
                                                  { id: "bobby"    , display: "Bobby Herrara"   , zone:"party" },
                                                  { id: "joe"      , display: "Officer Joe Friday" , zone:"party" },
                                                  { id: "bill"     , display: "Officer Bill Gannon", zone:"party" }
                                               ],
                                               adjacents: [ "outside", "hallway" ]
                            },
                            { id: "outside", display: "Outdoor Patio", // an outdoor space off the great room
                                               npcs: [],
                                               adjacents: [ "party" ]
                            },
                            { id: "hallway", display: "Hallway", // connecting the great room to the rest of the house
                                               npcs: [],
                                               adjacents: [ "party", "stairwell" ]
                            },
                            { id: "stairwell", display: "Stairwell", // connecting the great room to the rest of the house
                                               npcs: [],
                                               adjacents: [ "hallway", "office", "bathroom", "landing" ]
                            },
                            { id: "bathroom", display: "Bathroom", // at stairwell across from office/den
                                               npcs: [],
                                               adjacents: [ "stairwell" ]
                            },
                            { id: "office", display: "Office", // at stairwell across from bathroom
                                               npcs: [],
                                               adjacents: [ "stairwell" ]
                            },
                            { id: "landing", display: "Upstairs Landing", // top of stairs at theater
                                               npcs: [
                                                  { id: "jim"  , display: "Officer Jim Reed", zone:"landing"} 
                                               ],
                                               adjacents: [ "stairwell", "theater", "bedroom_hall" ]
                            },
                            { id: "theater", display: "Theater", // top of stairwell at landing. bathroom in back.
                                               npcs: [
                                                  { id: "david" , display: "David Addison Jr.", zone:"theater"  } 
                                               ],
                                               adjacents: [ "landing", "upbathroom"  ]
                            },
                            { id: "bedroom_hall", display: "Bedroom Hall", // end of upstairs hallway at bedroom door
                                               npcs: [
                                                  { id: "pete"  , display: "Officer Pete Malloy", zone:"bedroom_hall" } 
                                               ],
                                               adjacents: [ "landing", "bedroom" ]
                            },
                            { id: "bedroom", display: "Bedroom", // Upstairs bedroom with fire escape
                                               npcs: [
                                                  { id: "maddie" , display: "Maddie Hayes", zone:"bedroom" } 
                                               ],
                                               adjacents: [ "bedroom_hall", "upbathroom" ]
                            },
                            { id: "upbathroom", display: "Connecting Bathroom", // connects theater and bedroom
                                               npcs: [
                                                  { id: "rick" , display: "Rick Martin", zone:"upbathroom"}, // Mr. Body.  Deceased. 
                                                  { id: "john" , display: "Paramedic John Cage", zone:"upbathroom"},
                                                  { id: "roy"  , display: "Paramedic Roy DeSoto", zone:"upbathroom"}
                                               ],
                                               adjacents: [ "bedroom", "theater" ]
                            }
];
class LocationInfo {

    constructor(props){
        this.world   = props.world         ?? "main";
        this.zoneInfo= props.zoneInfo      ?? zoneInfo;
        this.zone    = props.zone          ?? zoneInfo[0].id;
        this.npc     = props.npc           ?? "none";
        this.locHandler = props.locHandler ?? "javascript:void()";          
        this.npcHandler = props.npcHandler ?? "javascript:void()";        
        
        this.getStartLocation = this.getStartLocation.bind(this);
        this.getZone = this.getZone.bind(this);
        this.getZones = this.getZones.bind(this);
        this.getNPCs = this.getNPCs.bind(this);
        this.setNPCs = this.setNPCs.bind(this);

        this.toString   = this.toString.bind(this);
    }
    toString(){
        return "World: "+ this.world +", "+
               "Zone: " + this.zone  +", "+
               "NPC: "  + this.npc;
    }

    /**
     * @return the starting zoneInfo zone object. normally zoneInfo[0]
     */
    getStartLocation() {
        return this.zoneInfo[0];
    }

    /**
     * Return the zoneInfo.zone matching the zone name provided.
     * @param {String} name -- the zoneInfo.zone to find
     * @return the matching zoneInfo object, or null.
     */
    getZone(id){
        console.log("LocationInfo.getZone for: "+ id);
        let match =  null;
        this.zoneInfo.forEach((z, i, arr)=>{
            //console.log("LocationInfo.getZone id: "+ z.id );
            if(z.id == id) {
                match = z;
            }
        })
        console.log("LocationInfo.getZone match = "+ match.id);
        return match;
    }

    /**
     * Return all the zone ids for this world/game
     * @return the array of zone ids in the world/game.
     */
    getZones(){
        console.log("LocationInfo.getZones...");
        return worldInfo.zones;
    }

    /**
     * Return the npcs array for the zone id provided.
     * @param {String} name -- the zoneInfo.zone id to find.
     * @return the matching zoneInfo.npcs array, or an empty array.
     */
    getNPCs(zid){
        console.log("LocationInfo.getNPCs for: "+ zid);
        let match =  [];
        this.zoneInfo.forEach((z, i, arr)=>{
            //console.log("LocationInfo.getZone id: "+ z.id );
            if(z.id == zid) {
                match = z.npcs;
            }
        })
        return match;
    }

    /**
     * Return the npcs array for the zone id provided.
     * @param {String} name -- the zoneInfo.zone id to find.
     * @return the matching zoneInfo.npcs array, or an empty array.
     */
    setNPCs(zid, npcs){
        console.log("LocationInfo.setNPCs for: "+ zid);
        this.zoneInfo.forEach((z, i, arr)=>{
            if(z.id == zid) {
                z.npcs = npcs;
            }
        })
    }
}
export default LocationInfo;
