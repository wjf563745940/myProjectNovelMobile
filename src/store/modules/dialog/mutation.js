import * as types from '../../mutation-types'
export default {
  [types.ALERT_DIALOG] (state,  message ) {
    state.dialogShow=true;
    state.message=message;
  },
  [types.ALERT_DIALOG_HIDE] (state) {
    state.dialogShow=false;
   state.message="";
  }
}




