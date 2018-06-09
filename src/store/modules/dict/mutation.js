import * as types from '../../mutation-types'
export default {
  [types.SELECT_ITEM] (state, dictIndex ) {
  	var flag=false;
    for(var obj of state.dict[state.active].list){
    	if(flag){
    		obj.isactive=false;
    	}else if(obj.itemKey===dictIndex){
    		obj.isactive=true;
    	}else{
    		obj.isactive=false;
    	}
    }
  },
  [types.SELECT_DICT] (state,  id ) {
    state.active=id;
  }
}




