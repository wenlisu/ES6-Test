import showMask from './showMask';
import {
    dom
} from './sub';
const spinnerRes = class hideSpinnerCompent extends showMask {
    constructor(options) {
        super(options);
        this.hideTip("#spinnerMain.tipViewOpen");
    }
}
export function hideSpinner(){
    new spinnerRes();
};