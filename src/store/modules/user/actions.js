//user
import * as types from '../../mutation-types'
import * as api from '@/api/user'
export const add_user = ({ commit },user) => {
   api.addUser({"name":user},function(data){
   	 commit(types.ADD_USER,data);
   	  commit(types.ALERT_TOAST,"添加成功！");
   })
}
export const select_user_sex=({commit},message)=>{
	api.updateUser(message,function(data){
		commit(types.SELECT_USER_SEX,data);
	})
}
