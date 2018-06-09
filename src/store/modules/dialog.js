import * as actions from './dialog/actions'
import mutations from './dialog/mutation'
import getters from './dialog/getters'
let state = {
	dialogShow:false,
	message:""
};
export default {
   state,
    getters,
    actions,
     mutations
}