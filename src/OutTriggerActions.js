
class OutTriggerActions {
    constructor(props){
        this.message = props.message ?? new String();
        this.trigger = props.trigger ?? new String();
        this.actions = props.actions ?? new String();
    }
}
export default OutTriggerActions;