//user
import * as types from '../../mutation-types'
export const select_item = ({ commit },message) => {
   	 commit(types.SELECT_ITEM,message);
}
export const select_dict = ({ commit },id) => {
   	 commit(types.SELECT_DICT,id);
}
