import React, {Component} from "react";
import {hot} from "react-hot-loader";
import MessageMap from "./MessageMap";
import LoopInfo from "./LoopInfo";
import LocationInfo from "./LocationInfo";
import GameState from "./GameState";
import AgentInfo from "./AgentInfo";

class MessageMapTest extends Component{

  constructor(props) {
    super(props);
    this.keyIndex = 0;
    this.loopCount = 0;
    this.loopMax = 20;
    this.gameState = new GameState(props);
    this.state = {
        text: "START\n"
    };
    this.loopDelay = 1;
    this.tick = this.tick.bind(this);
  }
  
  componentDidMount(){
    this.keys = MessageMap.getMessageKeys();
    // console.log("MessageMap keys:" + this.keys);
    this.keyMax = this.keys.length;
    this.timerId = setInterval(
      () => this.tick(), 
      this.loopDelay
    );
  }
  componentWillUnmount(){
      clearInterval(this.timerId);
  }

  tick() {
      if(this.loopCount < this.loopMax){
        let key = this.keys[this.keyIndex];
        let value = MessageMap.getMessage( key,  this.gameState );
        this.setState((prevState) => ({ text: prevState.text + value +"\n" }));
        this.loopCount = this.loopCount +1;
      }else{
        this.loopCount = 0;
        this.keyIndex = this.keyIndex +1;
        if(this.keyIndex < this.keyMax){
          this.setState((prevState) => ({ text: prevState.text +'\n' }));
        }else{
          this.setState((prevState) => ({ text: prevState.text +'\nFINISHED\n' }));
          this.componentWillUnmount();
        }
      }
  }

  render(){
    return(
      <div className="MessageMapTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default MessageMapTest;
