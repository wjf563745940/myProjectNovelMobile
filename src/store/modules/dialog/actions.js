//user
import * as types from '../../mutation-types'
export const alert_dialog = ({ commit },message) => {
   	 commit(types.ALERT_DIALOG,message);
}
export const alert_dialog_hide = ({ commit }) => {
   	 commit(types.ALERT_DIALOG_HIDE);
}
