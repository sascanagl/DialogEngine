import React, {Component} from "react";
import {hot}              from "react-hot-loader";
import "./App.css";
import LoopProcessor      from "./LoopProcessor";
import DialogState        from "./DialogState";
import MainContent        from "./MainContent";
import AgentInfo          from "./AgentInfo";
import LocationInfo       from "./LocationInfo";
import LoopInfo           from "./LoopInfo";
import GameState          from "./GameState";
import BusinessMurder     from "./BusinessMurder";

class App extends Component{

  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleNPCChange = this.handleNPCChange.bind(this);
    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleLoopState = this.handleLoopState.bind(this);
    this.handleEnvironment = this.handleEnvironment.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.handleOutputs = this.handleOutputs.bind(this);
    this.componentSaveState = this.componentSaveState.bind(this);
    this.componentClearState = this.componentClearState.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.componentStartGame = this.componentStartGame.bind(this);

    this.componentStartGame();
  }

  componentStartGame(){
    this.state = { loopProc:  new LoopProcessor({ name: "Business of Murder",
                                                  logic: BusinessMurder.getLogic()
                                               }),

                   gameState: new GameState({     location: new LocationInfo({ locHandler: this.handleLocationChange,
                                                                                npcHandler: this.handleNPCChange }),
                                                  player:   new AgentInfo(   { handler: this.handleProfileChange }),
                                                  envHandler: this.handleEnvironment,
                                                  insHandler: this.handleInputs,
                                                  outHandler: this.handleOutputs,
                                                  resetHandler: this.handleResetGame 
                                                  /* loop: new LoopInfo() defaults*/                              
                                           })
    };
    this.loopTimer = setInterval(()=>this.handleLoopState(), this.state.gameState.loop.delay *1000);
  }

  handleResetGame(evt) {
      this.componentClearState();
      this.componentStartGame();
  }

  componentClearState() {
      localStorage.removeItem("player");
      localStorage.removeItem("world");
      localStorage.removeItem("zone");
      localStorage.removeItem("zones");
  }

  componentSaveState() {
      localStorage.setItem("player", JSON.stringify(this.state.gameState.player));
      localStorage.setItem("world", this.state.gameState.location.world);
      localStorage.setItem("zone",  this.state.gameState.location.zone);
      localStorage.setItem("zones", JSON.stringify(this.state.gameState.location.zoneInfo));
  }

  // handle updates to the PlayerDialogPane
  handleInputs(evt){

  }

  // handle updates to the PlayerDialogPane
  handleOutputs(option){
      console.log("App.handleOutputs processing options.");
      clearInterval(this.loopTimer);
      let newState = this.state.gameState;
      if( option.trigger != null && option.trigger.length > 0 ) newState.loop.trigger = option.trigger;
      if( option.actions != null && option.actions.length > 0 ) newState = this.state.loopProc.doActions(option.actions, newState);
      this.setState({gameState: newState});
      this.loopTimer = setInterval(()=>this.handleLoopState(), 2000);
  }

  // handle updates to the EnvironmentView
  handleEnvironment(evt){

  }

  // main app processing loop9
  handleLoopState(source){
      console.log("App.handleLoopState processing call from "+ source);
      clearInterval(this.loopTimer);
      let newState = this.state.loopProc.processLoop(this.state.gameState );
      this.setState({gameState: newState});      
      this.loopTimer = setInterval(()=>this.handleLoopState(), newState.loop.delay * 1000);
  }

  handleLocationChange(evt) {
    console.log("App.handleLocationChange processing event.");
    clearInterval(this.loopTimer);
    const evtValue = evt.target.value;
    let newGameState = this.state.gameState;
    let newLocation = newGameState.location;
    if( evt.target.id == 'zone' ){
      newLocation.zone = evtValue;
    }else{
      newLocation.world = evtValue;
    }
    newGameState.location = newLocation;
    newGameState.instext = "";
    this.setState({gameState: newGameState});
    this.loopTimer = setInterval(()=>this.handleLoopState(), 2000);
  }

  // handle changes to the NPCSelector.js Radio Buttons
  handleNPCChange(evt){
    console.log("App.handleNPCChange processing event.");
    clearInterval(this.loopTimer);
    const evtValue = evt.target.value;
    let newGameState = this.state.gameState;
    let newLocation = newGameState.location;
    newLocation.npc = evtValue;
    newGameState.location = newLocation;
    this.setState({gameState: newGameState});
    this.loopTimer = setInterval(()=>this.handleLoopState(), 2000);
  }
  
  // handle changes to the PlayerProfile.js
  handleProfileChange(evt){
    console.log("App.handleProfileChange processing event.");
    clearInterval(this.loopTimer);
    const { name, value } = evt.target;
    let newGameState = this.state.gameState;
    let newPlayer = newGameState.player;
    switch(name){
      case "uid"        : newPlayer.uid = value        ; break;        
      case "firstName"  : newPlayer.firstName = value  ; break;
      case "lastName"   : newPlayer.lastName = value   ; break;
      case "age"        : newPlayer.age = value        ; break;
      case "gender"     : newPlayer.gender = value     ; break;
      case "race"       : newPlayer.race = value       ; break;
      case "skin"       : newPlayer.skin = value       ; break;
      case "eyes"       : newPlayer.eyes = value       ; break;
      case "hair"       : newPlayer.hair = value       ; break;
      case "cloth"      : newPlayer.cloth = value      ; break;
      case "height"     : newPlayer.height = value     ; break;
      case "weight"     : newPlayer.weight = value     ; break;
      case "cleanliness": newPlayer.cleanliness = value; break;
      case "beauty"     : newPlayer.beauty = value     ; break;
      case "strength"   : newPlayer.strength = value   ; break;
    }
    newGameState.player = newPlayer;
    this.setState({gameState: newGameState});
    this.loopTimer = setInterval(()=>this.handleLoopState(), 2000);
  }

  render(){
    console.log("App rendering...");
    return(
      <div className="App">
        <DialogState gameState={this.state.gameState} />
        <MainContent gameState={this.state.gameState} />
      </div>
    );
  }

  componentWillMount(){
      //
  }

  componentDidMount(){
      window.addEventListener('beforeunload', this.componentSaveState);
      let newGameState = this.state.gameState;
      let newPlayer = localStorage.getItem("player");
      let newZones = localStorage.getItem("zones");
      let newWorld = localStorage.getItem("world");
      let newZone  = localStorage.getItem("zone");

      if(newPlayer) {
        newGameState.player = JSON.parse(newPlayer);
      }
      if(newZones)  {
        newGameState.location.zoneInfo = JSON.parse(newZones);
      }

      if(newWorld) newGameState.location.world = newWorld;
      if(newZone)  newGameState.location.zone = newZone;

      this.setState({gameState: newGameState});
  }

  componentWillUnmount(){
      this.componentSaveState();
      window.removeEventListener('beforeunload', this.componentSaveState);
  }
}
export default App;
