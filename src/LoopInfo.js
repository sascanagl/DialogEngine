
class LoopInfo {

    constructor(props){
        this.trigger   = props.trigger   ?? "";
        this.nxtrigger = props.nxtrigger ?? "";
        this.delay     = props.delay     ?? 0;
    }
    static getStartLoop(){
        return new LoopInfo({trigger: "start", nxtrigger: "", delay: 0 });
    }
}
export default LoopInfo;
