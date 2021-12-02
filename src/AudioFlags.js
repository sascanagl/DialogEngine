import React, {Component} from "react";
import "./App.css";

class AudioFlags extends Component{
    
    constructor(props){
        super(props);
        this.narrate = props.narrate ?? true;
        this.environ = props.environ ?? true;
        this.atmos   = props.atmos   ?? true;
    }

    render(){
      return(
          <table className="AudioFlagsTable">
            <thead className="AudioFlagsHeader">
            <tr><th>Audio</th></tr>
            </thead>
            <tbody className="AudioFlagsContent">
              <tr>
                <td><input type="checkbox" checked={this.props.gameState.audioFlags.narrate} 
                                           id="narrate" name="narrate" 
                                           onChange={(evt) => {this.props.gameState.audioHandler(evt)}} >
                </input><label for="narrate">Narrate</label></td>
              </tr>
              <tr>
                <td><input type="checkbox" checked={this.props.gameState.audioFlags.environ} 
                                           id="environ" name="environ" 
                                           onChange={(evt) => {this.props.gameState.audioHandler(evt)}} >
                </input><label for="environ">Environ</label></td>
              </tr>
              <tr>
                <td><input type="checkbox" checked={this.props.gameState.audioFlags.atmos} 
                                           id="atmos" name="atmos" 
                                           onChange={(evt) => {this.props.gameState.audioHandler(evt)}} >
                </input><label for="atmos">Atmos</label></td>
              </tr>
            </tbody>
          </table>
      );
    }
  }    
  export default AudioFlags;