//user
import * as types from '../../mutation-types'
export const alert_toast = ({ commit },message) => {
   	 commit(types.ALERT_TOAST,message);
}
export const alert_toast_hide = ({ commit }) => {
   	 commit(types.ALERT_TOAST_HIDE,data);
}
