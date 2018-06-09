import * as types from '../../mutation-types'
console.log(types.ADD_USER)
export default {
	// [types.ADD_USER] (state, { message }) {
 //    addMessage(state, message)
 //  },
 	// "ADD_USER":function(state){
 	// 	addMessage(state)
 	// }
	// types["ADD_USER"]:function(){

	// }
  [types.SETNOVEL] (state, data) {
  	console.log("setNovel",data)
    state.data=data;
  }
}


