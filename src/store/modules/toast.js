import {
    ADD_USER
} from '../mutation-types'
import * as actions from './toast/actions'
import mutations from './toast/mutation'
import getters from './toast/getters'

let state = {
	toastShow:false,
	message:""
};
export default {
   state,
    getters,
    actions,
     mutations
}