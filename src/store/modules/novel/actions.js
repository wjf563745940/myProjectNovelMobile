//user
import * as types from '../../mutation-types'
// export const getNovelById = ({ commit },user) => {
//    api.addUser({"name":user},function(data){
//    	 commit(types.ADD_USER,data);
//    })
// }
export const setNovel = ({ commit },data) => {
	console.log("setNovel")
   	 commit(types.SETNOVEL,data);
}
