import LocationInfo      from "./LocationInfo"
import LoopInfo          from "./LoopInfo";
import AgentInfo         from "./AgentInfo";
import OutTriggerActions from "./OutTriggerActions";
class GameState {

    constructor(props){
        this.location     = props.location     ?? new LocationInfo(props);
        this.loop         = props.loop         ?? LoopInfo.getStartLoop();
        this.player       = props.player       ?? AgentInfo.getTestPlayer();
        this.envtext      = props.envtext      ?? new String();
        this.instext      = props.instext      ?? new String();
        this.outOptions   = props.outOptions   ?? [new OutTriggerActions({message:"I got nothin."})];
        this.envHandler   = props.envHandler   ?? "javascript:void";
        this.insHandler   = props.insHandler   ?? "javascript:void";
        this.outHandler   = props.outHandler   ?? "javascript:void";
        this.resetHandler = props.resetHandler ?? "javascript:void";
    }
}
export default GameState;
