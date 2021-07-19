import React, {Component} from "react";
import {hot}              from "react-hot-loader";
import "./App.css";

import LocationSelector   from "./LocationSelector";
import NPCSelector        from "./NPCSelector";
import PlayerEditor       from "./PlayerEditor";
import DialogOptions      from "./DialogOptions";

class MainContent extends Component{
    constructor(props){
      super(props);
    }

    render(){
      return(
          <div className="MainContent">
            <table className="MainContentTable">
              <tbody>
                <tr>
                  <td className="PlayerDialogPane">
                  <textarea rows="32" cols="70" placeholder="" 
                            id="playerview" name="playerview" maxLength="1024" 
                            value={this.props.gameState.instext} readOnly />
                  </td>
                  <td className="NPCDialogPane">
                    <DialogOptions    gameState={this.props.gameState} />
                  </td>
                  <td className="MainContentRightPane">
                    <LocationSelector gameState={this.props.gameState} />
                    <NPCSelector      gameState={this.props.gameState} />
                    <PlayerEditor     gameState={this.props.gameState} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="EnvDialogPane">
                  <textarea rows="8" cols="181" placeholder="Environment Text" 
                            id="envview" name="envview" maxLength="1024" 
                            value={this.props.gameState.envtext} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      );
    }
  }

export default MainContent;