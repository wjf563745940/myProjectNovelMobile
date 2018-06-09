import * as types from '../../mutation-types'
export default {
  [types.ALERT_TOAST] (state,  message ) {
    state.toastShow=true;
    state.message=message;
  },
  [types.ALERT_TOAST_HIDE] (state) {
    state.toastShow=false;
   state.message="";
  }
}




