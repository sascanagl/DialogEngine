import React, {Component} from "react";
import {hot} from "react-hot-loader";
import SynonymMap from "./SynonymMap.js";

const ucS ="uc:";

class SynonymMapTest extends Component{

  constructor(props) {
    super(props);
    this.keyIndex = 0;
    this.loopCount = 0;
    this.loopMax = 10;
    this.state = {
        text: "START\n"
    };
    this.loopDelay = 50;
    this.tick = this.tick.bind(this);
  }
  
  componentDidMount(){
    this.keys = SynonymMap.getSynonymKeys();
    //console.log("init keys:"+ this.keys);
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
        let uc = Math.floor(Math.random() * 2);
        if(uc>0) key = ucS + key; //randomly specify to capitalize the first letter
        let value = SynonymMap.getSynonym(key);
        //console.log("word: "+ word +" value:"+ wValue);
        this.setState((prevState) => ({text: prevState.text + value +", "}));
        this.loopCount = this.loopCount +1;
      }else{
        this.loopCount = 0;
        this.keyIndex = this.keyIndex +1;
        if(this.keyIndex < this.keyMax){
          this.setState((prevState) => ({text: prevState.text +'\n'}));
        }else{
          this.setState((prevState) => ({text: prevState.text +'\nFINISHED\n'}));
          this.componentWillUnmount();
        }
      }
  }

  render(){
    return(
      <div className="SynonymMapTest">
        <textarea rows="60" cols="150" id="view" name="view" value={this.state.text} readOnly />
      </div>
    );
  }
}

export default SynonymMapTest;
